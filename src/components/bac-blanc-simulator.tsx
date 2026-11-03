"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { recordQuizAttempt } from "@/app/actions";
import { SECTIONS } from "@/lib/sections";

export type BacBlancQuestion = {
  id: string;
  quizSlug: string;
  quizTitle: string;
  subjectSlug: string;
  subjectName: string;
  subjectShortName: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type BacBlancSubjectOption = {
  slug: string;
  name: string;
  shortName: string;
  sections: string[];
};

export type BacBlancSimulatorProps = {
  questions: BacBlancQuestion[];
  subjects: BacBlancSubjectOption[];
  defaultSection?: string;
};

type SimulatorPhase = "setup" | "running" | "results";

const DURATION_OPTIONS = [
  { minutes: 5, label: "5 min", hint: "Sprint rapide" },
  { minutes: 10, label: "10 min", hint: "Devoir éclair" },
  { minutes: 15, label: "15 min", hint: "Conditions standard" },
  { minutes: 25, label: "25 min", hint: "Session longue" },
] as const;

const COUNT_OPTIONS = [
  { value: 6, label: "6 questions" },
  { value: 10, label: "10 questions" },
  { value: 16, label: "16 questions" },
  { value: 0, label: "Maximum disponible" },
] as const;

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function mentionFromNote20(note20: number): {
  label: string;
  badgeClass: string;
  advice: string;
} {
  if (note20 >= 16) {
    return {
      label: "Mention Très Bien",
      badgeClass: "badge-green",
      advice: "Excellente maîtrise sous contrainte de temps. Continue sur les sujets complets d'annales !",
    };
  }
  if (note20 >= 14) {
    return {
      label: "Mention Bien",
      badgeClass: "badge-blue",
      advice: "Très bon niveau d'ensemble. Relis les explications de tes rares erreurs pour viser 16+/20.",
    };
  }
  if (note20 >= 12) {
    return {
      label: "Mention Assez Bien",
      badgeClass: "badge-gold",
      advice: "Bases solides ! Travaille la rapidité et sécurise les points faciles sur tes matières à fort coefficient.",
    };
  }
  if (note20 >= 10) {
    return {
      label: "Admis · Passable",
      badgeClass: "badge-slate",
      advice: "Tu dépasses la moyenne, mais une marge de sécurité est indispensable : reprends les fiches liées aux erreurs ci-dessous.",
    };
  }
  return {
    label: "À consolider (< 10/20)",
    badgeClass: "badge-brand",
    advice: "Révise d'abord les fiches de cours et les flashcards des chapitres concernés, puis relance un Bac Blanc de 10 minutes.",
  };
}

export function BacBlancSimulator({
  questions,
  subjects,
  defaultSection = "Sciences expérimentales",
}: BacBlancSimulatorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Paramètres de configuration
  const [selectedSection, setSelectedSection] = useState<string>(defaultSection || "Toutes");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [questionLimit, setQuestionLimit] = useState<number>(10);
  const [durationMin, setDurationMin] = useState<number>(10);

  // État de l'épreuve
  const [phase, setPhase] = useState<SimulatorPhase>("setup");
  const [examQuestions, setExamQuestions] = useState<BacBlancQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [confirmSubmit, setConfirmSubmit] = useState<boolean>(false);

  // Chronomètre (basé sur l'horloge réelle pour éviter toute dérive en arrière-plan mobile)
  const [totalDurationSec, setTotalDurationSec] = useState<number>(600);
  const [remainingSec, setRemainingSec] = useState<number>(600);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [timedOut, setTimedOut] = useState<boolean>(false);
  const [onlyErrorsFilter, setOnlyErrorsFilter] = useState<boolean>(false);

  const deadlineRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const finishedRef = useRef<boolean>(false);
  const answersRef = useRef<Record<string, number>>({});
  const examQuestionsRef = useRef<BacBlancQuestion[]>([]);

  const visibleSubjects = useMemo(() => {
    const withQuestions = subjects.filter((subject) =>
      questions.some((q) => q.subjectSlug === subject.slug),
    );
    if (selectedSection === "Toutes") return withQuestions;
    return withQuestions.filter(
      (subject) => subject.sections.length === 0 || subject.sections.includes(selectedSection),
    );
  }, [questions, selectedSection, subjects]);

  const activeSubjectSlug = useMemo(() => {
    if (selectedSubject === "all") return "all";
    return visibleSubjects.some((s) => s.slug === selectedSubject) ? selectedSubject : "all";
  }, [selectedSubject, visibleSubjects]);

  const candidatePool = useMemo(() => {
    const allowedSlugs = new Set(visibleSubjects.map((s) => s.slug));
    return questions.filter((q) => {
      if (activeSubjectSlug !== "all") return q.subjectSlug === activeSubjectSlug;
      return allowedSlugs.has(q.subjectSlug);
    });
  }, [activeSubjectSlug, questions, visibleSubjects]);

  const effectiveCount =
    questionLimit === 0
      ? candidatePool.length
      : Math.min(questionLimit, candidatePool.length);

  const persistExamScores = useCallback(
    (finalQuestions: BacBlancQuestion[], finalAnswers: Record<string, number>) => {
      const bySubject = new Map<string, { score: number; total: number }>();
      for (const item of finalQuestions) {
        const entry = bySubject.get(item.subjectSlug) ?? { score: 0, total: 0 };
        entry.total += 1;
        if (finalAnswers[item.id] === item.answerIndex) {
          entry.score += 1;
        }
        bySubject.set(item.subjectSlug, entry);
      }

      startTransition(async () => {
        try {
          await Promise.all(
            Array.from(bySubject.entries()).map(([subjectSlug, stats]) =>
              recordQuizAttempt(`bac-blanc-${subjectSlug}`, subjectSlug, stats.score, stats.total),
            ),
          );
          router.refresh();
        } catch {
          // Fonctionne même en mode hors-ligne si le serveur est injoignable.
        }
      });
    },
    [router],
  );

  const finishExam = useCallback(
    (didTimeOut: boolean) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const now = Date.now();
      const usedSeconds = startedAtRef.current
        ? Math.min(totalDurationSec, Math.max(1, Math.round((now - startedAtRef.current) / 1000)))
        : totalDurationSec;

      deadlineRef.current = null;
      setElapsedSec(didTimeOut ? totalDurationSec : usedSeconds);
      setRemainingSec(didTimeOut ? 0 : Math.max(0, totalDurationSec - usedSeconds));
      setTimedOut(didTimeOut);
      setConfirmSubmit(false);
      setPhase("results");

      persistExamScores(examQuestionsRef.current, answersRef.current);
    },
    [persistExamScores, totalDurationSec],
  );

  useEffect(() => {
    if (phase !== "running") return;

    const interval = window.setInterval(() => {
      if (!deadlineRef.current) return;
      const secondsLeft = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setRemainingSec(secondsLeft);
      if (secondsLeft <= 0) {
        window.clearInterval(interval);
        finishExam(true);
      }
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [finishExam, phase]);

  const startNewExam = (customDeck?: BacBlancQuestion[]) => {
    const deck =
      customDeck ??
      shuffleArray(candidatePool).slice(
        0,
        questionLimit === 0 ? candidatePool.length : Math.min(questionLimit, candidatePool.length),
      );

    if (deck.length === 0) return;

    const durationSeconds = durationMin * 60;
    const now = Date.now();

    finishedRef.current = false;
    startedAtRef.current = now;
    deadlineRef.current = now + durationSeconds * 1000;
    answersRef.current = {};
    examQuestionsRef.current = deck;

    setExamQuestions(deck);
    setAnswers({});
    setFlagged({});
    setCurrentIndex(0);
    setConfirmSubmit(false);
    setTimedOut(false);
    setOnlyErrorsFilter(false);
    setTotalDurationSec(durationSeconds);
    setRemainingSec(durationSeconds);
    setElapsedSec(0);
    setPhase("running");
  };

  const selectChoice = (questionId: string, choiceIdx: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: choiceIdx };
      answersRef.current = next;
      return next;
    });
  };

  const clearChoice = (questionId: string) => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];
      answersRef.current = next;
      return next;
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // --- PHASE 1 : CONFIGURATION DU BAC BLANC ---
  if (phase === "setup") {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="card p-5 sm:p-7">
          <span className="badge badge-brand">Conditions d&apos;examen</span>
          <h2 className="display mt-3 text-2xl font-semibold text-[var(--ink)]">
            Paramètre ton épreuve chronométrée
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Choisis ta filière, ta matière et ton temps imparti. Une fois le chronomètre lancé, aucune réponse ni
            correction ne sera affichée avant la remise finale de ta copie.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="eyebrow block mb-2">1. Filière</label>
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedSection("Toutes")}
                  className={`chip whitespace-nowrap ${selectedSection === "Toutes" ? "chip-active" : ""}`}
                >
                  Toutes les filières
                </button>
                {SECTIONS.map((section) => (
                  <button
                    key={section}
                    type="button"
                    onClick={() => setSelectedSection(section)}
                    className={`chip whitespace-nowrap ${selectedSection === section ? "chip-active" : ""}`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow block mb-2">2. Matière de l&apos;épreuve</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("all")}
                  className={`chip ${activeSubjectSlug === "all" ? "chip-active" : ""}`}
                >
                  Bac Blanc transversal ({visibleSubjects.length} matières)
                </button>
                {visibleSubjects.map((subject) => (
                  <button
                    key={subject.slug}
                    type="button"
                    onClick={() => setSelectedSubject(subject.slug)}
                    className={`chip ${activeSubjectSlug === subject.slug ? "chip-active" : ""}`}
                  >
                    {subject.shortName}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="eyebrow block mb-2">3. Nombre de questions</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {COUNT_OPTIONS.map((option) => {
                  const isActive = questionLimit === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setQuestionLimit(option.value)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                        isActive
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]"
                          : "border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)] hover:border-[var(--line-strong)]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="eyebrow block mb-2">4. Temps imparti (compte à rebours)</label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {DURATION_OPTIONS.map((option) => {
                  const isActive = durationMin === option.minutes;
                  return (
                    <button
                      key={option.minutes}
                      type="button"
                      onClick={() => setDurationMin(option.minutes)}
                      className={`rounded-xl border p-3 text-left transition ${
                        isActive
                          ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                          : "border-[var(--line)] bg-[var(--surface-subtle)] hover:border-[var(--line-strong)]"
                      }`}
                    >
                      <p className="text-sm font-bold text-[var(--ink)]">{option.label}</p>
                      <p className="mt-0.5 text-[0.7rem] text-[var(--ink-soft)]">{option.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-5">
            <p className="text-xs text-[var(--ink-soft)]">
              Sujet prêt :{" "}
              <strong className="text-[var(--ink)]">
                {effectiveCount} question{effectiveCount > 1 ? "s" : ""}
              </strong>{" "}
              · Chronomètre fixé à <strong className="text-[var(--ink)]">{durationMin} min</strong>
            </p>
            <button
              type="button"
              onClick={() => startNewExam()}
              disabled={effectiveCount === 0}
              className="btn btn-primary disabled:opacity-40"
            >
              Lancer le chronomètre →
            </button>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="card p-5">
            <p className="eyebrow">Règles du mode Bac Blanc</p>
            <ul className="mt-3 space-y-2.5 text-sm text-[var(--ink-soft)]">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                <span>
                  <strong className="text-[var(--ink)]">Zéro indice immédiat :</strong> contrairement aux quiz
                  classiques, tu composes en autonomie totale jusqu&apos;à la fin.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                <span>
                  <strong className="text-[var(--ink)]">Navigation libre &amp; drapeau :</strong> passe une question
                  difficile, marque-la « À relire » et reviens-y avant la sonnerie.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" />
                <span>
                  <strong className="text-[var(--ink)]">Arrêt automatique :</strong> à <code>00:00</code>, la copie est
                  relevée automatiquement et corrigée sur 20.
                </span>
              </li>
            </ul>
          </section>

          <section
            className="rounded-2xl border p-5"
            style={{
              background: "var(--callout-warn-bg)",
              borderColor: "var(--callout-warn-border)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "var(--callout-warn-ink)" }}>
              Conseil méthode jour J
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              Fais une première passe rapide pour sécuriser toutes les questions évidentes, puis consacre les dernières
              minutes aux questions marquées d&apos;un drapeau.
            </p>
          </section>
        </aside>
      </div>
    );
  }

  // --- PHASE 2 : ÉPREUVE CHRONOMÉTRÉE EN COURS (SANS VOIR LES RÉPONSES) ---
  if (phase === "running") {
    const currentQuestion = examQuestions[currentIndex];
    const selectedChoice = currentQuestion ? answers[currentQuestion.id] : undefined;
    const isFlagged = currentQuestion ? Boolean(flagged[currentQuestion.id]) : false;
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = examQuestions.length - answeredCount;
    const flaggedCount = Object.values(flagged).filter(Boolean).length;
    const timeRatio = totalDurationSec > 0 ? (remainingSec / totalDurationSec) * 100 : 0;
    const isCriticalTime = remainingSec <= 60;
    const isWarningTime = remainingSec > 60 && remainingSec <= 120;

    return (
      <div className="space-y-5">
        {/* Barre supérieure fixe : Compte à rebours & Remise de copie */}
        <div className="card sticky top-[68px] z-30 p-4 shadow-[var(--shadow-md)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-xl border px-3.5 py-2 font-mono text-lg font-bold tracking-wider ${
                  isCriticalTime
                    ? "animate-pulse border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--brand)]"
                    : isWarningTime
                      ? "border-[var(--callout-warn-border)] bg-[var(--callout-warn-bg)] text-[var(--callout-warn-ink)]"
                      : "border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)]"
                }`}
                aria-live="off"
                title="Temps restant avant relevé automatique de la copie"
              >
                ⏱ {formatClock(remainingSec)}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                  Épreuve en cours · Sans corrigé
                </p>
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {answeredCount} / {examQuestions.length} répondue{answeredCount > 1 ? "s" : ""}
                  {flaggedCount > 0 ? ` · ${flaggedCount} à relire` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {confirmSubmit ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--brand)]">
                    {unansweredCount > 0
                      ? `${unansweredCount} question(s) sans réponse. Confirmer ?`
                      : "Rendre la copie maintenant ?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmSubmit(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Continuer
                  </button>
                  <button
                    type="button"
                    onClick={() => finishExam(false)}
                    className="btn btn-primary btn-sm"
                  >
                    Confirmer et corriger
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmSubmit(true)}
                  className="btn btn-primary btn-sm"
                >
                  Rendre ma copie
                </button>
              )}
            </div>
          </div>

          <div className="progress-track mt-3">
            <div
              className="progress-fill"
              style={{
                width: `${timeRatio}%`,
                background: isCriticalTime
                  ? "var(--brand)"
                  : isWarningTime
                    ? "var(--gold)"
                    : "var(--green)",
              }}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
          {/* Carte de la question courante */}
          <section className="card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="badge badge-slate">
                  Question {currentIndex + 1} / {examQuestions.length}
                </span>
                <span className="badge badge-blue">{currentQuestion.subjectShortName}</span>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`chip !py-1 !text-xs ${isFlagged ? "chip-active" : ""}`}
              >
                ⚑ {isFlagged ? "Marquée à relire" : "À relire"}
              </button>
            </div>

            <p className="mt-2 text-xs text-[var(--ink-soft)]">{currentQuestion.quizTitle}</p>

            <h2
              dir="auto"
              className="display mt-3 text-xl font-semibold leading-snug text-[var(--ink)] sm:text-2xl"
            >
              {currentQuestion.prompt}
            </h2>

            <div className="mt-5 space-y-2.5">
              {currentQuestion.choices.map((choice, choiceIdx) => {
                const isSelected = selectedChoice === choiceIdx;
                return (
                  <button
                    key={choiceIdx}
                    type="button"
                    onClick={() => selectChoice(currentQuestion.id, choiceIdx)}
                    className="flex w-full cursor-pointer items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition"
                    style={{
                      borderColor: isSelected ? "var(--ink)" : "var(--line)",
                      background: isSelected ? "var(--surface-subtle)" : "var(--paper)",
                    }}
                  >
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold"
                      style={{
                        borderColor: isSelected ? "var(--ink)" : "var(--line-strong)",
                        background: isSelected ? "var(--ink)" : "transparent",
                        color: isSelected ? "var(--cream)" : "var(--ink-soft)",
                      }}
                    >
                      {String.fromCharCode(65 + choiceIdx)}
                    </span>
                    <span dir="auto" className="font-medium text-[var(--ink)]">
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-4">
              <button
                type="button"
                onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                disabled={currentIndex === 0}
                className="btn btn-ghost btn-sm disabled:opacity-40"
              >
                ← Précédente
              </button>

              {selectedChoice !== undefined ? (
                <button
                  type="button"
                  onClick={() => clearChoice(currentQuestion.id)}
                  className="text-xs font-semibold text-[var(--ink-soft)] underline hover:text-[var(--brand)]"
                >
                  Effacer ma réponse
                </button>
              ) : (
                <span className="text-xs text-[var(--ink-soft)]">Aucune réponse sélectionnée</span>
              )}

              {currentIndex + 1 < examQuestions.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((idx) => Math.min(examQuestions.length - 1, idx + 1))}
                  className="btn btn-dark btn-sm"
                >
                  Suivante →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmSubmit(true)}
                  className="btn btn-primary btn-sm"
                >
                  Terminer l&apos;épreuve →
                </button>
              )}
            </div>
          </section>

          {/* Grille de navigation de la copie */}
          <aside className="space-y-4">
            <section className="card p-5">
              <p className="eyebrow">Feuille de route</p>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">
                Clique sur un numéro pour accéder directement à la question.
              </p>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {examQuestions.map((q, idx) => {
                  const hasAnswer = answers[q.id] !== undefined;
                  const hasFlag = Boolean(flagged[q.id]);
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className="relative flex h-10 items-center justify-center rounded-xl border text-xs font-bold transition"
                      style={{
                        borderColor: isCurrent
                          ? "var(--brand)"
                          : hasFlag
                            ? "var(--gold)"
                            : hasAnswer
                              ? "var(--green-border)"
                              : "var(--line)",
                        background: isCurrent
                          ? "var(--brand)"
                          : hasAnswer
                            ? "var(--green-soft)"
                            : "var(--surface-subtle)",
                        color: isCurrent
                          ? "#ffffff"
                          : hasAnswer
                            ? "var(--green)"
                            : "var(--ink-soft)",
                      }}
                      title={`Question ${idx + 1}${hasFlag ? " (À relire)" : ""}`}
                    >
                      {idx + 1}
                      {hasFlag ? (
                        <span
                          className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[var(--gold)]"
                          aria-hidden
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-[var(--line)] pt-3 text-[0.72rem] text-[var(--ink-soft)]">
                <p className="flex items-center justify-between">
                  <span>Répondues</span>
                  <strong className="text-[var(--ink)]">{answeredCount}</strong>
                </p>
                <p className="flex items-center justify-between">
                  <span>Sans réponse</span>
                  <strong className="text-[var(--ink)]">{unansweredCount}</strong>
                </p>
                <p className="flex items-center justify-between">
                  <span>Marquées « À relire »</span>
                  <strong className="text-[var(--ink)]">{flaggedCount}</strong>
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    );
  }

  // --- PHASE 3 : ÉCRAN DE RÉSULTATS À LA FIN DU CHRONO ---
  const totalQuestions = examQuestions.length;
  const correctCount = examQuestions.filter((q) => answers[q.id] === q.answerIndex).length;
  const unansweredFinal = examQuestions.filter((q) => answers[q.id] === undefined).length;
  const wrongCount = totalQuestions - correctCount - unansweredFinal;
  const note20 = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 200) / 10 : 0;
  const percent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const mention = mentionFromNote20(note20);

  const subjectSummary = Array.from(
    examQuestions.reduce((acc, q) => {
      const row = acc.get(q.subjectSlug) ?? {
        name: q.subjectName,
        correct: 0,
        total: 0,
      };
      row.total += 1;
      if (answers[q.id] === q.answerIndex) row.correct += 1;
      acc.set(q.subjectSlug, row);
      return acc;
    }, new Map<string, { name: string; correct: number; total: number }>()),
  );

  const displayedReview = onlyErrorsFilter
    ? examQuestions
        .map((q, originalIndex) => ({ q, originalIndex }))
        .filter(({ q }) => answers[q.id] !== q.answerIndex)
    : examQuestions.map((q, originalIndex) => ({ q, originalIndex }));

  return (
    <div className="space-y-6">
      <section className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${mention.badgeClass}`}>{mention.label}</span>
              {timedOut ? (
                <span className="badge badge-brand">Temps écoulé · Relevé automatique</span>
              ) : (
                <span className="badge badge-slate">Copie remise avant la fin du chrono</span>
              )}
            </div>
            <h2 className="display mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
              {note20.toFixed(1).replace(".", ",")} <span className="text-xl text-[var(--ink-soft)]">/ 20</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">{mention.advice}</p>
            {isPending ? (
              <p className="mt-1.5 text-xs text-[var(--ink-soft)]">
                Enregistrement du résultat dans ton tableau de niveau…
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => startNewExam(examQuestions)}
              className="btn btn-ghost btn-sm"
            >
              Refaire ce sujet
            </button>
            <button
              type="button"
              onClick={() => setPhase("setup")}
              className="btn btn-primary btn-sm"
            >
              Nouveau Bac Blanc
            </button>
            <Link href="/evaluation" className="btn btn-dark btn-sm">
              Mon niveau
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              Bonnes réponses
            </p>
            <p className="display mt-1 text-2xl font-semibold text-[var(--green)]">
              {correctCount} / {totalQuestions}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              Erreurs / Oublis
            </p>
            <p className="display mt-1 text-2xl font-semibold text-[var(--brand)]">
              {wrongCount} err. · {unansweredFinal} vide{unansweredFinal > 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              Taux de réussite
            </p>
            <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">{percent} %</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              Temps utilisé
            </p>
            <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">
              {formatClock(elapsedSec)} <span className="text-xs text-[var(--ink-soft)]">/ {durationMin}:00</span>
            </p>
          </div>
        </div>

        {subjectSummary.length > 1 ? (
          <div className="mt-5 border-t border-[var(--line)] pt-4">
            <p className="eyebrow mb-2.5">Détail par matière</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {subjectSummary.map(([slug, stats]) => {
                const subPercent = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-3.5 py-2 text-xs"
                  >
                    <span className="font-semibold text-[var(--ink)]">{stats.name}</span>
                    <span className="font-bold text-[var(--ink-soft)]">
                      {stats.correct}/{stats.total} ({subPercent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* Corrigé complet question par question dévoilé uniquement après l'épreuve */}
      <section className="card p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="eyebrow">Corrigé intégral débloqué</p>
            <h3 className="display mt-1 text-xl font-semibold text-[var(--ink)]">
              Analyse détaillée de ta copie
            </h3>
          </div>
          {correctCount < totalQuestions ? (
            <button
              type="button"
              onClick={() => setOnlyErrorsFilter((val) => !val)}
              className={`chip ${onlyErrorsFilter ? "chip-active" : ""}`}
            >
              {onlyErrorsFilter
                ? `Voir toutes les questions (${totalQuestions})`
                : `Voir uniquement mes erreurs (${totalQuestions - correctCount})`}
            </button>
          ) : null}
        </div>

        <div className="space-y-3">
          {displayedReview.map(({ q, originalIndex }) => {
            const chosen = answers[q.id];
            const isCorrect = chosen === q.answerIndex;
            const isBlank = chosen === undefined;
            return (
              <div
                key={q.id}
                className="rounded-2xl border p-4"
                style={{
                  borderColor: isCorrect ? "var(--green-border)" : "var(--danger-border)",
                  background: isCorrect ? "var(--green-soft)" : "var(--danger-soft)",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                    Question {originalIndex + 1} · {q.subjectShortName}
                  </span>
                  <span className={`badge ${isCorrect ? "badge-green" : "badge-brand"}`}>
                    {isCorrect ? "Correct (+1)" : isBlank ? "Non répondu (0)" : "Incorrect (0)"}
                  </span>
                </div>

                <p dir="auto" className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  {q.prompt}
                </p>

                <div className="mt-2 space-y-1 text-xs">
                  <p className="text-[var(--ink-soft)]">
                    Ta réponse :{" "}
                    <strong className="text-[var(--ink)]">
                      {chosen !== undefined ? q.choices[chosen] : "Aucune réponse sélectionnée"}
                    </strong>
                  </p>
                  {!isCorrect ? (
                    <p style={{ color: "var(--green)" }}>
                      Bonne réponse attendue : <strong>{q.choices[q.answerIndex]}</strong>
                    </p>
                  ) : null}
                </div>

                <p dir="auto" className="mt-2.5 border-t border-[var(--line)] pt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                  <strong className="text-[var(--ink)]">Explication :</strong> {q.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
