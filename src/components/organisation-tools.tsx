"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

export type OrganisationSubjectOption = {
  slug: string;
  name: string;
  shortName: string;
};

export type OrganisationToolsProps = {
  subjects?: OrganisationSubjectOption[];
  studentSection?: string;
  compact?: boolean;
};

type PomodoroMode = "focus" | "shortBreak" | "longBreak";

const POMODORO_MODES: Record<
  PomodoroMode,
  {
    label: string;
    shortLabel: string;
    minutes: number;
    seconds: number;
    accent: string;
    badgeClass: string;
    subtitle: string;
  }
> = {
  focus: {
    label: "Concentration (25 min)",
    shortLabel: "25 min · Travail",
    minutes: 25,
    seconds: 25 * 60,
    accent: "var(--brand)",
    badgeClass: "badge-brand",
    subtitle: "Une seule tâche, téléphone éloigné, stylo et brouillon devant toi.",
  },
  shortBreak: {
    label: "Pause courte (5 min)",
    shortLabel: "5 min · Pause",
    minutes: 5,
    seconds: 5 * 60,
    accent: "var(--green)",
    badgeClass: "badge-green",
    subtitle: "Lève-toi, hydrate-toi et repose tes yeux loin de l'écran.",
  },
  longBreak: {
    label: "Pause longue (15 min)",
    shortLabel: "15 min · Pause longue",
    minutes: 15,
    seconds: 15 * 60,
    accent: "var(--blue)",
    badgeClass: "badge-blue",
    subtitle: "Récompense après 4 cycles complets de concentration.",
  },
};

const STORAGE_EXAM_DATE_KEY = "bac-coach-target-exam-date";
const STORAGE_SOUND_MUTED_KEY = "bac-coach-pomodoro-muted";
const STORAGE_EVENT_NAME = "bac-coach-org-storage";

function subscribeOrgStorage(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT_NAME, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT_NAME, onStoreChange);
  };
}

function writeOrgStorage(key: string, value: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (value === null || value === "") {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
    window.dispatchEvent(new Event(STORAGE_EVENT_NAME));
  } catch {
    // Ignore les erreurs de stockage en navigation privée stricte.
  }
}

function readOrgStorage(key: string): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function getTodayStorageKey(referenceMs: number | null): string {
  const d = referenceMs ? new Date(referenceMs) : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `bac-coach-pomodoros-${y}-${m}-${day}`;
}

/**
 * Calcule le premier mercredi de juin à 08h00 (date traditionnelle d'ouverture
 * de la session principale du Baccalauréat tunisien).
 */
export function getFirstWednesdayOfJune(year: number): Date {
  const juneFirst = new Date(year, 5, 1, 8, 0, 0, 0);
  const dayOfWeek = juneFirst.getDay(); // 0 = Dimanche ... 3 = Mercredi
  const offsetDays = (3 - dayOfWeek + 7) % 7;
  return new Date(year, 5, 1 + offsetDays, 8, 0, 0, 0);
}

export function getOfficialNextBacDate(referenceDate: Date): Date {
  const year = referenceDate.getFullYear();
  const thisYearSession = getFirstWednesdayOfJune(year);
  // On garde la session de l'année en cours jusqu'à la fin de la semaine d'épreuves
  const sessionEnd = new Date(thisYearSession.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (referenceDate.getTime() <= sessionEnd.getTime()) {
    return thisYearSession;
  }
  return getFirstWednesdayOfJune(year + 1);
}

function formatDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateInputToMorning(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const parsed = new Date(y, m - 1, d, 8, 0, 0, 0);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatTimerMMSS(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Synthétise une alerte sonore douce et claire via Web Audio API
 * (fonctionne à 100 % hors-ligne sans fichier MP3 externe).
 */
export function playPomodoroAlert(kind: "focus-complete" | "break-complete" | "test"): boolean {
  if (typeof window === "undefined") return false;

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtx) return false;

  try {
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const notes =
      kind === "focus-complete"
        ? [523.25, 659.25, 783.99, 1046.5] // Do5 - Mi5 - Sol5 - Do6 (fin des 25 min)
        : kind === "break-complete"
          ? [783.99, 659.25, 783.99] // Sol5 - Mi5 - Sol5 (reprise du travail)
          : [587.33, 880.0]; // Ré5 - La5 (test rapide)

    const startBase = ctx.currentTime + 0.03;

    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, startBase + index * 0.19);

      gain.gain.setValueAtTime(0.0001, startBase + index * 0.19);
      gain.gain.exponentialRampToValueAtTime(0.22, startBase + index * 0.19 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startBase + index * 0.19 + 0.36);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startBase + index * 0.19);
      osc.stop(startBase + index * 0.19 + 0.38);
    });

    const totalMs = notes.length * 220 + 600;
    window.setTimeout(() => {
      void ctx.close().catch(() => {});
    }, totalMs);

    return true;
  } catch {
    return false;
  }
}

function getCountdownAdvice(daysRemaining: number): {
  phaseBadge: string;
  badgeClass: string;
  message: string;
} {
  if (daysRemaining <= 0) {
    return {
      phaseBadge: "Jour J · Session en cours",
      badgeClass: "badge-brand",
      message:
        "Respire calmement, lis chaque énoncé jusqu'au bout et sécurise d'abord les questions que tu maîtrises.",
    };
  }
  if (daysRemaining <= 21) {
    return {
      phaseBadge: "Sprint final",
      badgeClass: "badge-brand",
      message:
        "Priorité absolue aux annales chronométrées, aux formules clés (Flashcards) et au sommeil régulier.",
    };
  }
  if (daysRemaining <= 75) {
    return {
      phaseBadge: "Dernière ligne droite",
      badgeClass: "badge-gold",
      message:
        "Alterne 2 blocs Pomodoro sur ta matière à fort coefficient et 1 bloc sur une matière complémentaire.",
    };
  }
  if (daysRemaining <= 160) {
    return {
      phaseBadge: "Consolidation active",
      badgeClass: "badge-blue",
      message:
        "Chaque chapitre terminé maintenant est un chapitre que tu n'auras qu'à relire sereinement en mai.",
    };
  }
  return {
    phaseBadge: "Construction des bases",
    badgeClass: "badge-green",
    message:
      "La régularité bat le bachotage : 2 à 3 Pomodoros de 25 minutes chaque soir construisent une mention solide.",
  };
}

export function OrganisationTools({
  subjects = [],
  studentSection,
  compact = false,
}: OrganisationToolsProps) {
  // Horloge temps réel (initialisée côté client pour éviter tout écart d'hydratation SSR)
  const [nowMs, setNowMs] = useState<number | null>(null);

  // Préférences persistées via useSyncExternalStore (zéro setState dans useEffect)
  const customExamDateStr = useSyncExternalStore(
    subscribeOrgStorage,
    () => readOrgStorage(STORAGE_EXAM_DATE_KEY),
    () => "",
  );

  const soundMutedRaw = useSyncExternalStore(
    subscribeOrgStorage,
    () => readOrgStorage(STORAGE_SOUND_MUTED_KEY),
    () => "",
  );
  const isMuted = soundMutedRaw === "1";

  const todayCyclesRaw = useSyncExternalStore(
    subscribeOrgStorage,
    () => readOrgStorage(getTodayStorageKey(nowMs)),
    () => "0",
  );
  const completedToday = Math.max(0, Number.parseInt(todayCyclesRaw || "0", 10) || 0);

  // État du minuteur Pomodoro
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [remainingSec, setRemainingSec] = useState<number>(POMODORO_MODES.focus.seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [focusTask, setFocusTask] = useState<string>("");
  const [focusSubject, setFocusSubject] = useState<string>("");
  const [alertBanner, setAlertBanner] = useState<string | null>(null);
  const [editingDate, setEditingDate] = useState<boolean>(false);

  const deadlineRef = useRef<number | null>(null);
  const modeRef = useRef<PomodoroMode>("focus");
  const mutedRef = useRef<boolean>(isMuted);

  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  // Horloge 1s pour le compte à rebours J-J
  useEffect(() => {
    const initialTick = window.setTimeout(() => {
      setNowMs(Date.now());
    }, 0);
    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(interval);
    };
  }, []);

  const handleCycleFinished = useCallback(() => {
    const finishedMode = modeRef.current;
    setIsRunning(false);
    deadlineRef.current = null;

    if (!mutedRef.current) {
      playPomodoroAlert(finishedMode === "focus" ? "focus-complete" : "break-complete");
    }

    if (finishedMode === "focus") {
      const key = getTodayStorageKey(Date.now());
      const previous = Number.parseInt(readOrgStorage(key) || "0", 10) || 0;
      const updated = previous + 1;
      writeOrgStorage(key, String(updated));

      const nextMode: PomodoroMode = updated % 4 === 0 ? "longBreak" : "shortBreak";
      modeRef.current = nextMode;
      setMode(nextMode);
      setRemainingSec(POMODORO_MODES[nextMode].seconds);
      setAlertBanner(
        nextMode === "longBreak"
          ? "Bravo ! 4 Pomodoros complétés : accorde-toi 15 minutes de pause longue."
          : "Session de 25 min terminée ! Lance tes 5 minutes de pause.",
      );
    } else {
      modeRef.current = "focus";
      setMode("focus");
      setRemainingSec(POMODORO_MODES.focus.seconds);
      setAlertBanner("Pause terminée ! Prêt à relancer 25 minutes de concentration ?");
    }
  }, []);

  // Boucle haute précision du Pomodoro basée sur Date.now()
  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      if (!deadlineRef.current) return;
      const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setRemainingSec(left);
      if (left <= 0) {
        window.clearInterval(interval);
        handleCycleFinished();
      }
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [handleCycleFinished, isRunning]);

  // Titre dynamique de l'onglet navigateur pendant le Pomodoro
  useEffect(() => {
    if (typeof document === "undefined" || !isRunning) return;
    const previousTitle = document.title;
    const prefix = mode === "focus" ? "🍅" : "☕";
    document.title = `${formatTimerMMSS(remainingSec)} ${prefix} ${POMODORO_MODES[mode].shortLabel} · Bac Coach`;
    return () => {
      document.title = previousTitle;
    };
  }, [isRunning, mode, remainingSec]);

  const switchMode = (nextMode: PomodoroMode) => {
    setIsRunning(false);
    deadlineRef.current = null;
    modeRef.current = nextMode;
    setMode(nextMode);
    setRemainingSec(POMODORO_MODES[nextMode].seconds);
    setAlertBanner(null);
  };

  const toggleStartPause = () => {
    setAlertBanner(null);
    if (isRunning) {
      if (deadlineRef.current) {
        const left = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
        setRemainingSec(left);
      }
      deadlineRef.current = null;
      setIsRunning(false);
      return;
    }

    const startSeconds = remainingSec > 0 ? remainingSec : POMODORO_MODES[mode].seconds;
    deadlineRef.current = Date.now() + startSeconds * 1000;
    setRemainingSec(startSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    deadlineRef.current = null;
    setRemainingSec(POMODORO_MODES[mode].seconds);
    setAlertBanner(null);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    writeOrgStorage(STORAGE_SOUND_MUTED_KEY, nextMuted ? "1" : "0");
    if (!nextMuted) {
      playPomodoroAlert("test");
    }
  };

  // --- Calcul dynamique du compte à rebours J-J ---
  const countdownData = useMemo(() => {
    if (nowMs === null) return null;

    const nowDate = new Date(nowMs);
    const officialDate = getOfficialNextBacDate(nowDate);
    const customParsed = customExamDateStr ? parseDateInputToMorning(customExamDateStr) : null;
    const targetDate = customParsed ?? officialDate;
    const isCustom = Boolean(customParsed);

    const diffMs = targetDate.getTime() - nowMs;
    const safeDiffSec = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(safeDiffSec / 86400);
    const hours = Math.floor((safeDiffSec % 86400) / 3600);
    const minutes = Math.floor((safeDiffSec % 3600) / 60);
    const seconds = safeDiffSec % 60;

    // Progression de l'année scolaire (15 septembre -> date cible du Bac)
    const schoolStartYear =
      targetDate.getMonth() >= 8 ? targetDate.getFullYear() : targetDate.getFullYear() - 1;
    const schoolStart = new Date(schoolStartYear, 8, 15, 8, 0, 0, 0);
    const totalYearMs = Math.max(1, targetDate.getTime() - schoolStart.getTime());
    const elapsedYearMs = Math.min(totalYearMs, Math.max(0, nowMs - schoolStart.getTime()));
    const yearProgressPct = Math.round((elapsedYearMs / totalYearMs) * 100);

    const formattedTarget = new Intl.DateTimeFormat("fr-TN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(targetDate);

    // Jalons clés de l'année du Bac tunisien
    const examYear = targetDate.getFullYear();
    const milestones = [
      {
        label: "Devoir de synthèse N°1 (T1)",
        date: new Date(examYear - 1, 11, 7, 8, 0, 0),
      },
      {
        label: "Devoir de synthèse N°2 (T2)",
        date: new Date(examYear, 2, 2, 8, 0, 0),
      },
      {
        label: "Bac Sport & Épreuves pratiques",
        date: new Date(examYear, 3, 20, 8, 0, 0),
      },
      {
        label: "Session principale du Bac",
        date: getFirstWednesdayOfJune(examYear),
      },
    ].map((item) => {
      const deltaDays = Math.ceil((item.date.getTime() - nowMs) / (1000 * 60 * 60 * 24));
      return {
        ...item,
        deltaDays,
        done: deltaDays < 0,
      };
    });

    return {
      targetDate,
      officialDate,
      isCustom,
      days,
      hours,
      minutes,
      seconds,
      yearProgressPct,
      formattedTarget,
      advice: getCountdownAdvice(days),
      milestones,
    };
  }, [customExamDateStr, nowMs]);

  const currentModeConfig = POMODORO_MODES[mode];
  const progressFraction =
    currentModeConfig.seconds > 0
      ? Math.min(1, Math.max(0, (currentModeConfig.seconds - remainingSec) / currentModeConfig.seconds))
      : 0;
  const ringRadius = 74;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - progressFraction);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* PANNEAU 1 : MINUTEUR POMODORO 25M / 5M AVEC ALERTE SONORE */}
      <section className="card flex flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`badge ${currentModeConfig.badgeClass}`}>
                🍅 Méthode Pomodoro
              </span>
              <span className="badge badge-slate">
                {completedToday} cycle{completedToday > 1 ? "s" : ""} aujourd&apos;hui
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                className="chip !px-2.5 !py-1 !text-xs cursor-pointer"
                title={isMuted ? "Réactiver l'alerte sonore" : "Couper l'alerte sonore"}
              >
                {isMuted ? "🔕 Muet" : "🔔 Son actif"}
              </button>
              <button
                type="button"
                onClick={() => playPomodoroAlert("test")}
                className="chip !px-2.5 !py-1 !text-xs cursor-pointer"
                title="Écouter l'alerte sonore de fin de cycle"
              >
                Tester ♪
              </button>
            </div>
          </div>

          {/* Sélecteur 25 min / 5 min / 15 min */}
          <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-1">
            {(["focus", "shortBreak", "longBreak"] as const).map((key) => {
              const cfg = POMODORO_MODES[key];
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchMode(key)}
                  className={`cursor-pointer rounded-xl px-2.5 py-2 text-center text-xs font-semibold transition ${
                    active
                      ? "bg-[var(--ink)] text-[var(--cream)] shadow-xs"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {cfg.shortLabel}
                </button>
              );
            })}
          </div>

          {alertBanner ? (
            <div
              role="status"
              className="mt-3 rounded-xl border px-3.5 py-2.5 text-xs font-semibold"
              style={{
                background: "var(--green-soft)",
                borderColor: "var(--green-border)",
                color: "var(--green)",
              }}
            >
              🔔 {alertBanner}
            </div>
          ) : null}

          {/* Cadran circulaire + affichage MM:SS */}
          <div className="mt-5 flex flex-col items-center justify-center sm:flex-row sm:gap-6">
            <div className="relative grid h-44 w-44 shrink-0 place-items-center">
              <svg
                viewBox="0 0 180 180"
                className="h-44 w-44 -rotate-90"
                aria-hidden
              >
                <circle
                  cx="90"
                  cy="90"
                  r={ringRadius}
                  fill="none"
                  stroke="var(--track-bg)"
                  strokeWidth="10"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={ringRadius}
                  fill="none"
                  stroke={currentModeConfig.accent}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 300ms ease, stroke 250ms ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-4xl font-bold tracking-tight text-[var(--ink)]">
                  {formatTimerMMSS(remainingSec)}
                </span>
                <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  {isRunning ? "En cours" : "En pause"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex-1 text-center sm:mt-0 sm:text-left">
              <p className="display text-lg font-semibold text-[var(--ink)]">
                {currentModeConfig.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">
                {currentModeConfig.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <button
                  type="button"
                  onClick={toggleStartPause}
                  className="btn btn-primary btn-sm"
                >
                  {isRunning
                    ? "⏸ Mettre en pause"
                    : remainingSec < currentModeConfig.seconds
                      ? "▶ Reprendre"
                      : "▶ Démarrer"}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="btn btn-ghost btn-sm"
                >
                  ↺ Réinitialiser
                </button>
                <button
                  type="button"
                  onClick={() => switchMode(mode === "focus" ? "shortBreak" : "focus")}
                  className="btn btn-ghost btn-sm"
                  title="Basculer entre 25 min de travail et 5 min de pause"
                >
                  {mode === "focus" ? "Pause 5m →" : "Travail 25m →"}
                </button>
              </div>
            </div>
          </div>

          {/* Objectif optionnel de la session */}
          {!compact ? (
            <div className="mt-5 grid gap-2.5 border-t border-[var(--line)] pt-4 sm:grid-cols-[0.9fr_1.1fr]">
              {subjects.length > 0 ? (
                <div>
                  <label htmlFor="pomodoro-subject" className="eyebrow mb-1 block">
                    Matière ciblée
                  </label>
                  <select
                    id="pomodoro-subject"
                    value={focusSubject}
                    onChange={(e) => setFocusSubject(e.target.value)}
                    className="select !py-2 !text-xs"
                  >
                    <option value="">Choisir une matière…</option>
                    {subjects.map((sub) => (
                      <option key={sub.slug} value={sub.shortName}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
              <div className={subjects.length === 0 ? "sm:col-span-2" : ""}>
                <label htmlFor="pomodoro-goal" className="eyebrow mb-1 block">
                  Objectif de ces 25 minutes
                </label>
                <input
                  id="pomodoro-goal"
                  type="text"
                  value={focusTask}
                  onChange={(e) => setFocusTask(e.target.value)}
                  placeholder="Ex. : Primitives — refaire l'exercice 2 sans corrigé"
                  className="input !py-2 !text-xs"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-xs text-[var(--ink-soft)]">
          <span>
            {focusSubject || focusTask ? (
              <>
                Cap actuel :{" "}
                <strong className="text-[var(--ink)]">
                  {[focusSubject, focusTask].filter(Boolean).join(" · ")}
                </strong>
              </>
            ) : (
              "Cycle optimal : 25 min d'effort intense + 5 min de vraie pause."
            )}
          </span>
          {compact ? (
            <Link href="/organisation" className="font-semibold text-[var(--brand)]">
              Ouvrir l&apos;espace organisation →
            </Link>
          ) : null}
        </div>
      </section>

      {/* PANNEAU 2 : COMPTE À REBOURS DYNAMIQUE J-J AVANT LE BACCALAURÉAT */}
      <section className="card flex flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`badge ${countdownData?.advice.badgeClass ?? "badge-brand"}`}>
                🗓️ {countdownData?.advice.phaseBadge ?? "Calendrier du Bac"}
              </span>
              {studentSection ? (
                <span className="badge badge-slate">{studentSection}</span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setEditingDate((prev) => !prev)}
              className="chip !px-2.5 !py-1 !text-xs cursor-pointer"
            >
              {editingDate ? "Fermer" : "⚙️ Date cible"}
            </button>
          </div>

          {editingDate && countdownData ? (
            <div className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5 text-xs">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="min-w-[180px] flex-1">
                  <label htmlFor="custom-bac-date" className="eyebrow mb-1 block">
                    Personnaliser la date d&apos;épreuve (Bac ou Bac Blanc)
                  </label>
                  <input
                    id="custom-bac-date"
                    type="date"
                    value={customExamDateStr || formatDateInputValue(countdownData.targetDate)}
                    onChange={(e) => writeOrgStorage(STORAGE_EXAM_DATE_KEY, e.target.value)}
                    className="input !py-1.5 !text-xs"
                  />
                </div>
                {countdownData.isCustom ? (
                  <button
                    type="button"
                    onClick={() => writeOrgStorage(STORAGE_EXAM_DATE_KEY, null)}
                    className="btn btn-ghost btn-sm"
                  >
                    Date officielle auto
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Grand compteur J - X */}
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="eyebrow">Compte à rebours Baccalauréat</p>
                <p className="display mt-1 text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
                  {countdownData ? `J - ${countdownData.days}` : "J - …"}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                  {countdownData?.isCustom ? "Échéance personnalisée" : "Session principale"}
                </span>
                <p className="mt-0.5 text-xs font-semibold capitalize text-[var(--ink)]">
                  {countdownData ? countdownData.formattedTarget : "Chargement du calendrier…"}
                </p>
              </div>
            </div>

            {/* Décompte précis Jours / Heures / Minutes / Secondes */}
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                { value: countdownData ? String(countdownData.days) : "--", unit: "Jours" },
                {
                  value: countdownData ? String(countdownData.hours).padStart(2, "0") : "--",
                  unit: "Heures",
                },
                {
                  value: countdownData ? String(countdownData.minutes).padStart(2, "0") : "--",
                  unit: "Minutes",
                },
                {
                  value: countdownData ? String(countdownData.seconds).padStart(2, "0") : "--",
                  unit: "Secondes",
                },
              ].map((cell) => (
                <div
                  key={cell.unit}
                  className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-2 py-2.5"
                >
                  <p className="font-mono text-lg font-bold text-[var(--ink)] sm:text-xl">
                    {cell.value}
                  </p>
                  <p className="text-[0.63rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                    {cell.unit}
                  </p>
                </div>
              ))}
            </div>

            {/* Barre d'avancement de l'année scolaire */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[0.72rem]">
                <span className="font-semibold text-[var(--ink-soft)]">
                  Avancement de l&apos;année scolaire (sept. → juin)
                </span>
                <strong className="text-[var(--ink)]">
                  {countdownData ? `${countdownData.yearProgressPct}%` : "—"}
                </strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${countdownData ? countdownData.yearProgressPct : 0}%`,
                    background: "var(--brand)",
                  }}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
            {countdownData
              ? countdownData.advice.message
              : "Calcul automatique des jours restants avant le coup d'envoi des épreuves nationales."}
          </p>

          {/* Repères clés de l'année en mode détaillé */}
          {!compact && countdownData ? (
            <div className="mt-4 space-y-1.5 border-t border-[var(--line)] pt-3.5">
              <p className="eyebrow mb-2">Repères de l&apos;année</p>
              {countdownData.milestones.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 text-xs"
                >
                  <span className="font-medium text-[var(--ink)]">{m.label}</span>
                  <span
                    className={`badge ${
                      m.done ? "badge-green" : m.deltaDays <= 30 ? "badge-brand" : "badge-slate"
                    }`}
                  >
                    {m.done ? "Passé ✓" : `J - ${m.deltaDays}`}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-xs">
          <Link href="/programme" className="font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)]">
            Voir le programme par trimestre →
          </Link>
          <Link href="/bac-blanc" className="font-semibold text-[var(--brand)]">
            S&apos;entraîner en Bac Blanc →
          </Link>
        </div>
      </section>
    </div>
  );
}
