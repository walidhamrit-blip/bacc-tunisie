"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useMemo, useState, useTransition } from "react";
import {
  generateStudentStudyPlan,
  toggleStudyPlanSlot,
  type StudyPlanActionState,
} from "@/app/actions";
import { SECTIONS, SECTION_INFO, type SectionName } from "@/lib/sections";
import {
  ACTIVITY_TYPE_META,
  DAYS_OF_WEEK,
  STUDY_RHYTHM_META,
  computeStudyPlanSummary,
  formatMinutesAsHours,
  type StudyPlanRhythm,
  type StudyPlanSlot,
} from "@/lib/study-planner";

type WeeklyPlannerClientProps = {
  studentName: string;
  activeSection: SectionName;
  isLocked: boolean;
  weekLabel: string;
  initialWeekdayMinutes: number;
  initialWeekendMinutes: number;
  initialRhythm: StudyPlanRhythm;
  initialSlots: StudyPlanSlot[];
  planUpdatedAtIso: string;
};

const INITIAL_ACTION_STATE: StudyPlanActionState = {
  ok: false,
  errors: [],
  message: "",
};

const WEEKDAY_OPTIONS = [
  { value: 60, label: "1 h 00 / soir (léger)" },
  { value: 90, label: "1 h 30 / soir (recommandé)" },
  { value: 120, label: "2 h 00 / soir (soutenu)" },
  { value: 150, label: "2 h 30 / soir (intensif)" },
  { value: 180, label: "3 h 00 / soir (sprint)" },
];

const WEEKEND_OPTIONS = [
  { value: 120, label: "2 h 00 / jour (sam. & dim.)" },
  { value: 180, label: "3 h 00 / jour (recommandé)" },
  { value: 240, label: "4 h 00 / jour (approfondi)" },
  { value: 300, label: "5 h 00 / jour (simulation Bac)" },
];

export function WeeklyPlannerClient({
  studentName,
  activeSection,
  isLocked,
  weekLabel,
  initialWeekdayMinutes,
  initialWeekendMinutes,
  initialRhythm,
  initialSlots,
  planUpdatedAtIso,
}: WeeklyPlannerClientProps) {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [showConfigPanel, setShowConfigPanel] = useState<boolean>(false);
  const [optimisticCompleted, setOptimisticCompleted] = useState<
    Record<string, boolean>
  >({});
  const [sessionXpDelta, setSessionXpDelta] = useState<number>(0);

  const [isToggling, startToggleTransition] = useTransition();
  const [genState, genFormAction, isGenerating] = useActionState(
    generateStudentStudyPlan,
    INITIAL_ACTION_STATE,
  );

  const slots = useMemo(
    () =>
      initialSlots.map((slot) => {
        const key = `${planUpdatedAtIso}::${slot.id}`;
        const override = optimisticCompleted[key];
        return override === undefined ? slot : { ...slot, completed: override };
      }),
    [initialSlots, optimisticCompleted, planUpdatedAtIso],
  );

  const summary = useMemo(() => computeStudyPlanSummary(slots), [slots]);

  const slotsByDay = useMemo(() => {
    return DAYS_OF_WEEK.map((dayName, dayIndex) => {
      const daySlots = slots.filter((s) => s.dayIndex === dayIndex);
      const totalMin = daySlots.reduce((acc, s) => acc + s.durationMin, 0);
      const doneCount = daySlots.filter((s) => s.completed).length;
      return {
        dayIndex,
        dayName,
        slots: daySlots,
        totalMin,
        doneCount,
      };
    });
  }, [slots]);

  const visibleDays = useMemo(
    () =>
      selectedDay === "all"
        ? slotsByDay
        : slotsByDay.filter((d) => d.dayIndex === selectedDay),
    [selectedDay, slotsByDay],
  );

  function handleToggleSlot(slot: StudyPlanSlot) {
    const key = `${planUpdatedAtIso}::${slot.id}`;
    const nextValue = !slot.completed;

    setOptimisticCompleted((prev) => ({
      ...prev,
      [key]: nextValue,
    }));

    startToggleTransition(async () => {
      const result = await toggleStudyPlanSlot(slot.id);
      if (result && result.ok) {
        setSessionXpDelta((prev) => prev + result.xpDelta);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* BANDEAU MONO-SECTION VERROUILLÉE OU DÉMO */}
      {isLocked ? (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 text-sm"
          style={{
            background: "var(--green-soft)",
            borderColor: "var(--green-border)",
          }}
        >
          <div className="space-y-0.5">
            <p className="font-bold text-[var(--green)]">
              🔒 Planning hebdomadaire verrouillé sur ta section : {activeSection}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">
              Abonnement individuel de <strong className="text-[var(--ink)]">{studentName}</strong>{" "}
              · Pondéré automatiquement par les coefficients officiels ({SECTION_INFO[activeSection].short}), tes lacunes et ton Carnet SRS.
            </p>
          </div>
          <span className="badge badge-green">
            {SECTION_INFO[activeSection].short} · Section unique
          </span>
        </div>
      ) : (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 text-xs"
          style={{
            background: "var(--callout-warn-bg)",
            borderColor: "var(--callout-warn-border)",
          }}
        >
          <p className="text-[var(--ink)]">
            <strong>Mode démonstration :</strong> ce planning est calculé sur le profil visiteur (
            <strong>{activeSection}</strong>). Active gratuitement ton{" "}
            <strong>abonnement individuel mono-section</strong> pour verrouiller ton propre emploi
            du temps jusqu&apos;au Bac.
          </p>
          <Link href="/mon-compte" className="btn btn-primary btn-sm shrink-0">
            🔒 Créer mon compte (1 section) →
          </Link>
        </div>
      )}

      {/* CARTES SYNTHÈSE HEBDOMADAIRE */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Période active
          </p>
          <p className="display mt-1 text-xl font-semibold text-[var(--ink)]">
            {weekLabel || "Planning sur 7 jours"}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            Stratégie : <strong>{STUDY_RHYTHM_META[initialRhythm].short}</strong>
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Volume hebdomadaire
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--brand)]">
            {formatMinutesAsHours(summary.totalMinutes)}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            {formatMinutesAsHours(initialWeekdayMinutes)}/soir ·{" "}
            {formatMinutesAsHours(initialWeekendMinutes)}/j week-end
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Créneaux validés
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--green)]">
            {summary.completedSlots} / {summary.totalSlots}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            {formatMinutesAsHours(summary.completedMinutes)} accomplis cette semaine
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Assiduité &amp; Bonus XP
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--blue)]">
            {summary.completionPct} %
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            {sessionXpDelta > 0
              ? `+${sessionXpDelta} XP gagnés dans cette session`
              : "+10 XP par créneau validé"}
          </p>
        </div>
      </div>

      {/* BARRE DE PROGRESSION & BOUTON PERSONNALISATION */}
      <section className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Répartition pondérée par matière officielle</p>
            <h2 className="display text-lg font-semibold text-[var(--ink)]">
              Équilibre de ta semaine ({activeSection})
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowConfigPanel((prev) => !prev)}
            className="btn btn-dark btn-sm"
          >
            {showConfigPanel
              ? "Fermer les réglages"
              : "⚙️ Adapter mon rythme & régénérer"}
          </button>
        </div>

        <div className="progress-track mt-3">
          <div
            className="progress-fill"
            style={{
              width: `${summary.completionPct}%`,
              background: "var(--green)",
            }}
          />
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {summary.bySubject.map((item) => (
            <div
              key={item.subjectSlug}
              className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-xs font-bold text-[var(--ink)]">
                  {item.subjectIcon} {item.subjectName}
                </span>
                <span className="badge badge-slate">
                  ×{String(item.coefficient).replace(".", ",")}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between text-xs text-[var(--ink-soft)]">
                <strong className="text-[var(--ink)]">
                  {formatMinutesAsHours(item.minutes)} ({item.sharePct} %)
                </strong>
                <span>
                  {item.slotsDone}/{item.slotsTotal} fait(s)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* PANNEAU DE RE-GÉNÉRATION DU PLANNING */}
        {showConfigPanel ? (
          <form
            action={genFormAction}
            className="mt-5 space-y-4 border-t border-[var(--line)] pt-5"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {!isLocked ? (
                <div>
                  <label
                    htmlFor="plan-section"
                    className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                  >
                    Filière (mode démo)
                  </label>
                  <select
                    id="plan-section"
                    name="section"
                    defaultValue={activeSection}
                    className="select"
                  >
                    {SECTIONS.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="plan-weekday"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                >
                  Soirs de semaine (Lun – Ven)
                </label>
                <select
                  id="plan-weekday"
                  name="dailyMinutesWeekday"
                  defaultValue={String(initialWeekdayMinutes)}
                  className="select"
                >
                  {WEEKDAY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="plan-weekend"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                >
                  Week-end (Samedi &amp; Dimanche)
                </label>
                <select
                  id="plan-weekend"
                  name="dailyMinutesWeekend"
                  defaultValue={String(initialWeekendMinutes)}
                  className="select"
                >
                  {WEEKEND_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="plan-rhythm"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                >
                  Stratégie de priorisation
                </label>
                <select
                  id="plan-rhythm"
                  name="preferredRhythm"
                  defaultValue={initialRhythm}
                  className="select"
                >
                  {(Object.keys(STUDY_RHYTHM_META) as StudyPlanRhythm[]).map((r) => (
                    <option key={r} value={r}>
                      {STUDY_RHYTHM_META[r].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--ink-soft)]">
                La régénération recalcule tes priorités selon tes derniers scores aux quiz et tes
                cartes dues dans le Carnet SRS.
              </p>
              <button
                type="submit"
                disabled={isGenerating}
                className="btn btn-primary btn-sm"
              >
                {isGenerating
                  ? "Calcul intelligent..."
                  : "🔄 Régénérer mon planning sur 7 jours"}
              </button>
            </div>
          </form>
        ) : null}

        {genState.ok && genState.message ? (
          <div
            className="mt-4 rounded-xl border p-3 text-xs font-semibold text-[var(--green)]"
            style={{
              background: "var(--green-soft)",
              borderColor: "var(--green-border)",
            }}
          >
            {genState.message}
          </div>
        ) : null}
      </section>

      {/* FILTRE PAR JOUR */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setSelectedDay("all")}
          className={`btn btn-sm ${
            selectedDay === "all" ? "btn-primary" : "btn-ghost"
          }`}
        >
          Semaine complète (7 j)
        </button>
        {slotsByDay.map((d) => (
          <button
            key={d.dayIndex}
            type="button"
            onClick={() => setSelectedDay(d.dayIndex)}
            className={`btn btn-sm ${
              selectedDay === d.dayIndex ? "btn-dark" : "btn-ghost"
            }`}
          >
            {d.dayName} ({d.doneCount}/{d.slots.length})
          </button>
        ))}
      </div>

      {/* GRILLE DES 7 JOURS */}
      <div className="space-y-5">
        {visibleDays.map((day) => {
          const allDone =
            day.slots.length > 0 && day.doneCount === day.slots.length;

          return (
            <section key={day.dayIndex} className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] bg-[var(--surface-subtle)] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <h3 className="display text-lg font-semibold text-[var(--ink)]">
                    {day.dayName}
                  </h3>
                  {day.dayIndex >= 5 ? (
                    <span className="badge badge-gold">Week-end approfondi</span>
                  ) : (
                    <span className="badge badge-slate">Soirée après lycée</span>
                  )}
                  {allDone ? (
                    <span className="badge badge-green">✓ Journée validée</span>
                  ) : null}
                </div>

                <span className="text-xs font-semibold text-[var(--ink-soft)]">
                  {formatMinutesAsHours(day.totalMin)} · {day.doneCount}/
                  {day.slots.length} créneau(x) terminé(s)
                </span>
              </div>

              <div className="divide-y divide-[var(--line)]">
                {day.slots.map((slot) => {
                  const actMeta =
                    ACTIVITY_TYPE_META[slot.activityType] ??
                    ACTIVITY_TYPE_META.cours;

                  return (
                    <div
                      key={slot.id}
                      className={`flex flex-col justify-between gap-4 p-4 transition sm:flex-row sm:items-center sm:px-5 ${
                        slot.completed ? "opacity-75" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          disabled={isToggling}
                          onClick={() => handleToggleSlot(slot)}
                          aria-label={
                            slot.completed
                              ? `Marquer « ${slot.title} » comme à faire`
                              : `Valider le créneau « ${slot.title} »`
                          }
                          className="mt-0.5 grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-lg border text-xs font-bold transition"
                          style={{
                            borderColor: slot.completed
                              ? "var(--green)"
                              : "var(--line-strong)",
                            background: slot.completed
                              ? "var(--green)"
                              : "var(--paper)",
                            color: slot.completed ? "#ffffff" : "transparent",
                          }}
                        >
                          ✓
                        </button>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-[var(--ink)]">
                              {slot.subjectIcon} {slot.subjectName}
                            </span>
                            <span className={`badge ${actMeta.badgeClass}`}>
                              {actMeta.label}
                            </span>
                            <span className="badge badge-slate">
                              ⏱ {slot.durationMin} min
                            </span>
                            {slot.specialty ? (
                              <span className="badge badge-brand">
                                Spécialité ×{String(slot.coefficient).replace(".", ",")}
                              </span>
                            ) : null}
                          </div>

                          <p
                            className={`text-sm font-semibold text-[var(--ink)] ${
                              slot.completed ? "line-through" : ""
                            }`}
                          >
                            {slot.title}
                          </p>
                          <p className="text-xs text-[var(--ink-soft)]">
                            {slot.reason}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 pl-9 sm:pl-0">
                        <Link
                          href={slot.targetHref}
                          className="btn btn-ghost btn-sm"
                        >
                          {actMeta.cta}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
