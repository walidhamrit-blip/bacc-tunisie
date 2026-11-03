"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { recordQuizAttempt } from "@/app/actions";
import type { QuizQuestion } from "@/db/schema";

export function QuizPlayer({
  quizSlug,
  subjectSlug,
  subjectName,
  questions,
}: {
  quizSlug: string;
  subjectSlug: string;
  subjectName: string;
  questions: QuizQuestion[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [isPending, startTransition] = useTransition();

  const question = questions[index];
  const score = useMemo(
    () => answers.reduce((sum, answer, answerIndex) => (answer === questions[answerIndex]?.answerIndex ? sum + 1 : sum), 0),
    [answers, questions],
  );
  const total = questions.length;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const progress = Math.round(((index + (validated ? 1 : 0)) / total) * 100);

  function validate() {
    if (selected === null) return;
    setValidated(true);
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = selected;
      return next;
    });
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
      startTransition(async () => {
        await recordQuizAttempt(quizSlug, subjectSlug, score, total);
        router.refresh();
      });
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setValidated(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setValidated(false);
    setAnswers([]);
    setFinished(false);
  }

  if (total === 0) {
    return <p className="text-sm text-[var(--ink-soft)]">Ce quiz sera disponible très bientôt.</p>;
  }

  if (finished) {
    const message =
      percent >= 80
        ? "Excellent niveau : tu maîtrises cette notion, passe à un exercice plus difficile."
        : percent >= 50
          ? "Bonne base : relis les points clés de la fiche puis refais le quiz pour viser 80 %."
          : "À retravailler : commence par la fiche de cours, puis reviens au quiz dans 15 minutes.";
    return (
      <div className="card p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Résultat enregistré dans ton tableau de niveau</p>
            <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">
              {score} / {total} · {percent} %
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={restart} className="btn btn-ghost btn-sm">
              Refaire
            </button>
            <Link href="/evaluation" className="btn btn-primary btn-sm">
              Voir mon niveau
            </Link>
          </div>
        </div>
        <div className="progress-track mt-4">
          <div
            className="progress-fill"
            style={{ width: `${percent}%`, background: percent >= 50 ? "var(--green)" : "var(--brand)" }}
          />
        </div>
        <p className="mt-3 text-sm text-[var(--ink-soft)]">{message}</p>
        {isPending ? <p className="mt-2 text-xs text-[var(--ink-soft)]">Enregistrement en cours…</p> : null}

        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-[var(--ink)]">Correction détaillée</p>
          {questions.map((item, itemIndex) => {
            const given = answers[itemIndex];
            const isCorrect = given === item.answerIndex;
            return (
              <div
                key={itemIndex}
                className="rounded-xl border p-3"
                style={{
                  borderColor: isCorrect ? "var(--green-border)" : "var(--danger-border)",
                  background: isCorrect ? "var(--green-soft)" : "var(--danger-soft)",
                }}
              >
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {itemIndex + 1}. {item.prompt}
                </p>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">
                  Ta réponse : {given !== undefined ? item.choices[given] : "aucune"} · Bonne réponse :{" "}
                  <strong>{item.choices[item.answerIndex]}</strong>
                </p>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">{subjectName}</p>
          <p className="text-sm font-semibold text-[var(--ink)]">
            Question {index + 1} sur {total}
          </p>
        </div>
        <span className="badge badge-brand">{percent} % de réussite</span>
      </div>
      <div className="progress-track mb-5">
        <div className="progress-fill" style={{ width: `${progress}%`, background: "var(--brand)" }} />
      </div>

      <p className="text-[1.02rem] font-semibold leading-snug text-[var(--ink)]">{question.prompt}</p>

      <div className="mt-4 space-y-2">
        {question.choices.map((choice, choiceIndex) => {
          const isSelected = selected === choiceIndex;
          const isRight = validated && choiceIndex === question.answerIndex;
          const isWrong = validated && isSelected && choiceIndex !== question.answerIndex;
          return (
            <button
              key={choiceIndex}
              type="button"
              onClick={() => (validated ? null : setSelected(choiceIndex))}
              className="flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition"
              style={{
                borderColor: isRight
                  ? "var(--green)"
                  : isWrong
                    ? "var(--brand)"
                    : isSelected
                      ? "var(--ink)"
                      : "var(--line)",
                background: isRight
                  ? "var(--green-soft)"
                  : isWrong
                    ? "var(--danger-soft)"
                    : isSelected
                      ? "var(--surface-subtle)"
                      : "var(--paper)",
                cursor: validated ? "default" : "pointer",
              }}
            >
              <span
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.68rem] font-bold"
                style={{
                  borderColor: isRight ? "var(--green)" : isWrong ? "var(--brand)" : "var(--line-strong)",
                  color: isRight ? "var(--green)" : isWrong ? "var(--brand)" : "var(--ink-soft)",
                }}
              >
                {String.fromCharCode(65 + choiceIndex)}
              </span>
              <span className="text-[var(--ink)]">{choice}</span>
            </button>
          );
        })}
      </div>

      {validated ? (
        <div
          className="mt-4 rounded-xl border p-3 text-sm"
          style={{
            borderColor: "var(--green-border)",
            background: "var(--green-soft)",
            color: "var(--green-ink)",
          }}
        >
          <strong>{selected === question.answerIndex ? "Bonne réponse !" : "Réponse à corriger."}</strong>{" "}
          {question.explanation}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3">
        <Link href="/quiz" className="text-xs font-semibold text-[var(--ink-soft)] underline">
          Quitter le quiz
        </Link>
        {validated ? (
          <button type="button" onClick={next} className="btn btn-primary btn-sm" disabled={isPending}>
            {index + 1 >= total ? "Voir mon score" : "Question suivante"}
          </button>
        ) : (
          <button type="button" onClick={validate} className="btn btn-dark btn-sm" disabled={selected === null}>
            Valider ma réponse
          </button>
        )}
      </div>
    </div>
  );
}
