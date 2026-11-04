"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import {
  deleteBacSimulation,
  saveBacSimulation,
  type SaveSimulationState,
} from "@/app/actions";
import {
  OPTIONAL_SUBJECT_CHOICES,
  buildDefaultNotesForSection,
  buildPrefilledNotesFromProjections,
  clampNote20,
  computeBacAndOrientation,
  formatFrDecimal,
} from "@/lib/bac-calculator";
import { SECTIONS, SECTION_INFO, normalizeSection, type SectionName } from "@/lib/sections";

export type SavedSimulationSummary = {
  id: number;
  label: string;
  section: string;
  notes: Record<string, number>;
  optionEnabled: boolean;
  optionName: string;
  optionNote20: number;
  sportDispense: boolean;
  mg20: number;
  fgScore: number;
  mentionLabel: string;
  createdAtIso: string;
};

type BacCalculatorClientProps = {
  initialSection: SectionName;
  isLocked: boolean;
  studentName: string;
  projectionsBySlug: Record<string, number>;
  savedSimulations: SavedSimulationSummary[];
};

const INITIAL_SAVE_STATE: SaveSimulationState = {
  ok: false,
  errors: [],
  message: "",
};

export function BacCalculatorClient({
  initialSection,
  isLocked,
  studentName,
  projectionsBySlug,
  savedSimulations,
}: BacCalculatorClientProps) {
  const firstSavedForSection = savedSimulations.find(
    (sim) => sim.section === initialSection,
  );

  const [activeSection, setActiveSection] = useState<SectionName>(initialSection);
  const [notes, setNotes] = useState<Record<string, number>>(() =>
    firstSavedForSection
      ? firstSavedForSection.notes
      : buildPrefilledNotesFromProjections(initialSection, projectionsBySlug),
  );
  const [optionEnabled, setOptionEnabled] = useState<boolean>(
    firstSavedForSection ? firstSavedForSection.optionEnabled : true,
  );
  const [optionName, setOptionName] = useState<string>(
    firstSavedForSection ? firstSavedForSection.optionName : "Espagnol",
  );
  const [optionNote20, setOptionNote20] = useState<number>(
    firstSavedForSection ? firstSavedForSection.optionNote20 : 13.5,
  );
  const [sportDispense, setSportDispense] = useState<boolean>(
    firstSavedForSection ? firstSavedForSection.sportDispense : false,
  );
  const [previewBonus7, setPreviewBonus7] = useState<boolean>(false);
  const [simulationLabel, setSimulationLabel] = useState<string>("");
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  const [saveState, saveFormAction, isSaving] = useActionState(
    saveBacSimulation,
    INITIAL_SAVE_STATE,
  );
  const [isDeleting, startDeleteTransition] = useTransition();

  const effectiveSection: SectionName = isLocked ? initialSection : activeSection;

  const result = computeBacAndOrientation({
    section: effectiveSection,
    notes,
    optionEnabled,
    optionName,
    optionNote20,
    sportDispense,
  });

  function handleSectionSwitch(nextSection: SectionName) {
    if (isLocked) return;
    setActiveSection(nextSection);
    setNotes(
      nextSection === initialSection
        ? buildPrefilledNotesFromProjections(nextSection, projectionsBySlug)
        : buildDefaultNotesForSection(nextSection, 12),
    );
    setSportDispense(false);
    setFeedbackBanner(`Grille officielle chargée pour la section « ${nextSection} ».`);
  }

  function handleSubjectNoteChange(subjectKey: string, rawValue: string) {
    const parsed = Number.parseFloat(rawValue.replace(",", "."));
    const nextVal = Number.isFinite(parsed) ? clampNote20(parsed) : 0;
    setNotes((prev) => ({
      ...prev,
      [subjectKey]: nextVal,
    }));
  }

  function handleImportEstimatedNotes() {
    const imported = buildPrefilledNotesFromProjections(
      effectiveSection,
      projectionsBySlug,
    );
    setNotes(imported);
    setFeedbackBanner(
      "Notes pré-remplies à partir de ton historique de quiz, Bac Blanc et devoirs sur Bac Coach.",
    );
  }

  function handleApplyUniformPreset(targetNote: number, label: string) {
    setNotes(buildDefaultNotesForSection(effectiveSection, targetNote));
    if (optionEnabled) {
      setOptionNote20(Math.min(20, targetNote + 1.5));
    }
    setFeedbackBanner(`Scénario « ${label} » appliqué sur toutes les matières.`);
  }

  function handleLoadSavedSimulation(sim: SavedSimulationSummary) {
    const targetSection = isLocked
      ? initialSection
      : normalizeSection(sim.section);
    if (!isLocked) {
      setActiveSection(targetSection);
    }
    setNotes({
      ...buildDefaultNotesForSection(targetSection, 10),
      ...sim.notes,
    });
    setOptionEnabled(sim.optionEnabled);
    setOptionName(sim.optionName || "Espagnol");
    setOptionNote20(clampNote20(sim.optionNote20));
    setSportDispense(sim.sportDispense);
    setSimulationLabel(sim.label);
    setFeedbackBanner(
      `Simulation « ${sim.label} » restaurée dans le calculateur.`,
    );
  }

  function handleDeleteSimulation(id: number) {
    startDeleteTransition(async () => {
      await deleteBacSimulation(id);
    });
  }

  const fgTermStrings = [
    `4 × ${formatFrDecimal(result.mg20)}`,
    ...result.subjectRows
      .filter((row) => row.fgWeight > 0)
      .map(
        (row) =>
          `${formatFrDecimal(row.fgWeight, row.fgWeight % 1 === 0 ? 0 : 1)} × ${formatFrDecimal(row.note20)} (${row.symbol})`,
      ),
  ];

  const displayedFgForBenchmarks = previewBonus7
    ? result.fgWith7PercentBonus
    : result.fgScore;

  return (
    <div className="space-y-6">
      {/* BANDEAU VERROUILLAGE MONO-SECTION OU SÉLECTEUR DÉMO */}
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
              🔒 Calculateur calibré sur ta section verrouillée : {effectiveSection}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">
              Abonnement individuel de <strong className="text-[var(--ink)]">{studentName}</strong>{" "}
              · Les coefficients officiels, la Formule Globale (FG) et tes simulations sauvegardées
              sont dédiés exclusivement à ta filière.
            </p>
          </div>
          <span className="badge badge-green">
            {SECTION_INFO[effectiveSection].short} · Mono-section
          </span>
        </div>
      ) : (
        <div className="card space-y-4 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Mode démonstration · Choix de la filière à simuler</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Explore les 7 sections officielles ci-dessous, ou{" "}
                <Link
                  href="/mon-compte"
                  className="font-semibold text-[var(--brand)] underline underline-offset-2"
                >
                  crée ton compte élève mono-section
                </Link>{" "}
                pour verrouiller ta filière et isoler tes simulations personnelles.
              </p>
            </div>
            <Link href="/mon-compte" className="btn btn-primary btn-sm shrink-0">
              🔒 Verrouiller ma section →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((sec) => {
              const selected = sec === effectiveSection;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => handleSectionSwitch(sec)}
                  className={`chip cursor-pointer ${selected ? "chip-active" : ""}`}
                >
                  <span>{sec}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* BARRE DE PRÉ-REMPLISSAGE INTELLIGENT & SCÉNARIOS RAPIDES */}
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleImportEstimatedNotes}
            className="btn btn-dark btn-sm"
          >
            ✨ Importer mes notes estimées Bac Coach
          </button>
          <button
            type="button"
            onClick={() => handleApplyUniformPreset(14, "Objectif Mention Bien (14/20)")}
            className="btn btn-ghost btn-sm"
          >
            🎯 Viser 14/20
          </button>
          <button
            type="button"
            onClick={() => handleApplyUniformPreset(16, "Objectif Mention Très Bien (16/20)")}
            className="btn btn-ghost btn-sm"
          >
            🏆 Viser 16/20
          </button>
          <button
            type="button"
            onClick={() => handleApplyUniformPreset(10, "Seuil d'admission (10/20)")}
            className="btn btn-ghost btn-sm"
          >
            ↺ Base 10/20
          </button>
        </div>

        {feedbackBanner ? (
          <p className="text-xs font-medium text-[var(--green)]">{feedbackBanner}</p>
        ) : (
          <p className="text-xs text-[var(--ink-soft)]">
            Ajuste les curseurs par pas de <strong>0,25 pt</strong> : MG et FG se recalculent en direct.
          </p>
        )}
      </div>

      {/* GRILLE PRINCIPALE : SAISIE DES NOTES (GAUCHE) + RÉSULTATS & ORIENTATION (DROITE) */}
      <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
        {/* COLONNE GAUCHE : MATIÈRES OFFICIELLES + OPTION */}
        <div className="space-y-4">
          <section className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] px-5 py-4">
              <div>
                <p className="eyebrow">Épreuves obligatoires · {effectiveSection}</p>
                <h2 className="display mt-0.5 text-xl font-semibold text-[var(--ink)]">
                  Saisie des notes sur 20 &amp; coefficients officiels
                </h2>
              </div>
              <span className="badge badge-slate">
                Somme des coef. : ×{formatFrDecimal(result.totalCoefficients, result.totalCoefficients % 1 === 0 ? 0 : 1)}
              </span>
            </div>

            <div className="divide-y divide-[var(--line)]">
              {result.subjectRows.map((row) => (
                <div
                  key={row.key}
                  className={`p-4 sm:px-5 transition ${
                    row.isDispensed ? "opacity-55" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-6 min-w-7 items-center justify-center rounded-md bg-[var(--surface-muted)] px-1.5 text-xs font-bold text-[var(--ink)]">
                          {row.symbol}
                        </span>
                        <label
                          htmlFor={`note-${row.key}`}
                          className="font-semibold text-[var(--ink)]"
                        >
                          {row.label}
                        </label>
                        {row.specialty ? (
                          <span className="badge badge-brand">Spécialité</span>
                        ) : null}
                      </div>
                      {row.hint ? (
                        <p className="text-xs text-[var(--ink-soft)]">{row.hint}</p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="badge badge-slate">
                        Coef. ×{formatFrDecimal(row.coefficient, row.coefficient % 1 === 0 ? 0 : 1)}
                      </span>
                      {row.fgWeight > 0 ? (
                        <span className="badge badge-blue">
                          +{formatFrDecimal(row.fgWeight, row.fgWeight % 1 === 0 ? 0 : 1)}×{row.symbol} dans FG
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {row.dispensable ? (
                    <div className="mt-2.5 flex items-center gap-2">
                      <input
                        id="sport-dispense-toggle"
                        type="checkbox"
                        checked={sportDispense}
                        onChange={(e) => setSportDispense(e.target.checked)}
                        className="h-4 w-4 accent-[var(--brand)]"
                      />
                      <label
                        htmlFor="sport-dispense-toggle"
                        className="cursor-pointer text-xs font-medium text-[var(--ink-soft)]"
                      >
                        Dispensé(e) médicalement d&apos;Éducation physique (retire ×1 du total des coefficients)
                      </label>
                    </div>
                  ) : null}

                  {!row.isDispensed ? (
                    <div className="mt-3 grid items-center gap-3 sm:grid-cols-[1fr_104px_120px]">
                      <input
                        type="range"
                        min={0}
                        max={20}
                        step={0.25}
                        value={row.note20}
                        aria-label={`Curseur note ${row.label}`}
                        onChange={(e) =>
                          handleSubjectNoteChange(row.key, e.target.value)
                        }
                        className="w-full cursor-pointer accent-[var(--brand)]"
                      />

                      <div className="relative">
                        <input
                          id={`note-${row.key}`}
                          type="number"
                          min={0}
                          max={20}
                          step={0.25}
                          value={row.note20}
                          onChange={(e) =>
                            handleSubjectNoteChange(row.key, e.target.value)
                          }
                          className="input py-1.5 pr-9 text-right font-semibold"
                        />
                        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-soft)]">
                          /20
                        </span>
                      </div>

                      <div className="text-right text-xs">
                        <p className="font-semibold text-[var(--ink)]">
                          {formatFrDecimal(row.weightedPoints)} pts
                        </p>
                        <p className="text-[0.7rem] text-[var(--ink-soft)]">
                          +1 pt → +{formatFrDecimal(row.impactPlus1OnFg)} FG
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs italic text-[var(--ink-soft)]">
                      Matière neutralisée (dispense officielle active).
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* MATIÈRE À OPTION (BONUS OFFICIEL AU-DESSUS DE 10/20) */}
          <section className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <input
                  id="option-enabled-toggle"
                  type="checkbox"
                  checked={optionEnabled}
                  onChange={(e) => setOptionEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[var(--brand)]"
                />
                <div>
                  <label
                    htmlFor="option-enabled-toggle"
                    className="cursor-pointer font-semibold text-[var(--ink)]"
                  >
                    Épreuve facultative · Matière à option (règle officielle du bonus)
                  </label>
                  <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                    Seuls les points strictement supérieurs à <strong>10,00 / 20</strong> sont
                    ajoutés en bonus pur au numérateur, sans augmenter la somme des coefficients.
                  </p>
                </div>
              </div>
              <span className="badge badge-gold">
                Bonus : +{formatFrDecimal(result.optionBonusPoints)} pt(s)
              </span>
            </div>

            {optionEnabled ? (
              <div className="mt-4 grid items-center gap-3 sm:grid-cols-[170px_1fr_104px]">
                <select
                  value={optionName}
                  onChange={(e) => setOptionName(e.target.value)}
                  aria-label="Choix de la matière à option"
                  className="select py-2 text-sm"
                >
                  {OPTIONAL_SUBJECT_CHOICES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.25}
                  value={optionNote20}
                  aria-label="Curseur note matière à option"
                  onChange={(e) =>
                    setOptionNote20(clampNote20(Number.parseFloat(e.target.value)))
                  }
                  className="w-full cursor-pointer accent-[var(--gold)]"
                />

                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={20}
                    step={0.25}
                    value={optionNote20}
                    aria-label="Note matière à option sur 20"
                    onChange={(e) =>
                      setOptionNote20(
                        clampNote20(
                          Number.parseFloat(e.target.value.replace(",", ".")),
                        ),
                      )
                    }
                    className="input py-1.5 pr-9 text-right font-semibold"
                  />
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-soft)]">
                    /20
                  </span>
                </div>
              </div>
            ) : null}
          </section>
        </div>

        {/* COLONNE DROITE : VERDICT BAC, SCORE D'ORIENTATION FG, PALIERS & SAUVEGARDE */}
        <div className="space-y-4 lg:sticky lg:top-20">
          {/* CARTE 1 : MOYENNE GÉNÉRALE MG & VERDICT OFFICIEL */}
          <section className="card space-y-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="eyebrow">Moyenne Générale du Baccalauréat (MG)</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="display text-4xl font-semibold sm:text-5xl"
                    style={{ color: result.verdict.accentColor }}
                  >
                    {formatFrDecimal(result.mg20)}
                  </span>
                  <span className="text-lg font-semibold text-[var(--ink-soft)]">
                    / 20
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`badge ${result.verdict.badgeClass}`}>
                  {result.verdict.mentionLabel}
                </span>
                <p className="mt-1 text-xs font-semibold text-[var(--ink-soft)]">
                  {result.verdict.arabicLabel}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-[var(--ink)]">
                <span>{result.verdict.statusLabel}</span>
                <span>
                  {formatFrDecimal(result.totalPoints)} pts ÷{" "}
                  {formatFrDecimal(result.totalCoefficients, result.totalCoefficients % 1 === 0 ? 0 : 1)}
                </span>
              </div>
              <p className="mt-1.5 text-[var(--ink-soft)]">{result.verdict.summary}</p>
            </div>

            {result.hasEliminatoryZero ? (
              <div
                className="rounded-xl border p-3 text-xs"
                style={{
                  background: "var(--danger-soft)",
                  borderColor: "var(--danger-border)",
                }}
              >
                <strong className="text-[var(--brand)]">
                  ⚠️ Note éliminatoire détectée (00/20) :
                </strong>{" "}
                <span className="text-[var(--ink)]">
                  Au Baccalauréat tunisien, un zéro dans une épreuve obligatoire empêche
                  l&apos;admission directe et bloque tout rachat (الإسعاف).
                </span>
              </div>
            ) : null}

            {result.mg20 >= 9 && result.mg20 < 10 ? (
              <div
                className="rounded-xl border p-3 text-xs space-y-1.5"
                style={{
                  background: "var(--callout-warn-bg)",
                  borderColor: "var(--callout-warn-border)",
                }}
              >
                <p className="font-bold text-[var(--gold-ink)]">
                  ⚖️ Diagnostic réglementaire du Rachat (الإسعاف · 9,00 à 9,99/20)
                </p>
                <ul className="space-y-1 text-[var(--ink)]">
                  <li>
                    • Moyenne des matières principales ({result.rachatSpecialtyHint}) :{" "}
                    <strong>{formatFrDecimal(result.specialtyAvg20)}/20</strong>{" "}
                    {result.specialtyAvg20 >= 9 ? "✅ (≥ 9,00)" : "❌ (< 9,00)"}
                  </li>
                  <li>
                    • Absence de note éliminatoire (00/20) :{" "}
                    {!result.hasEliminatoryZero ? "✅ Oui" : "❌ Non"}
                  </li>
                  <li>
                    • Condition lycée à vérifier :{" "}
                    <strong>Moyenne annuelle ≥ 10,00/20</strong> &amp; bonne conduite.
                  </li>
                </ul>
              </div>
            ) : null}

            {result.nextThresholdTarget ? (
              <p className="text-xs text-[var(--ink-soft)]">
                🎯 Prochain cap —{" "}
                <strong className="text-[var(--ink)]">
                  {result.nextThresholdTarget.label}
                </strong>{" "}
                : il manque{" "}
                <strong className="text-[var(--brand)]">
                  +{formatFrDecimal(result.nextThresholdTarget.missingWeightedPoints)} points pondérés
                </strong>{" "}
                sur le total général.
              </p>
            ) : null}
          </section>

          {/* CARTE 2 : SCORE D'ORIENTATION UNIVERSITAIRE (FG & BONUS 7%) */}
          <section className="card space-y-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="eyebrow">Orientation Universitaire · Formule Globale (FG)</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="display text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
                    {formatFrDecimal(result.fgScore)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                    pts FG
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-3 py-2 text-right">
                <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                  Avec bonus géo. +7 %
                </p>
                <p className="display text-lg font-semibold text-[var(--blue)]">
                  {formatFrDecimal(result.fgWith7PercentBonus)} pts
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                Formule officielle ({effectiveSection})
              </p>
              <p className="formula mt-1 text-sm font-semibold text-[var(--ink)]">
                {result.fgFormulaText}
              </p>
              <p className="mt-1.5 text-[0.72rem] text-[var(--ink-soft)]">
                Détail : {fgTermStrings.join(" + ")} ={" "}
                <strong className="text-[var(--ink)]">
                  {formatFrDecimal(result.fgScore)}
                </strong>
              </p>
            </div>

            {result.topFgLeverageSubject ? (
              <div
                className="rounded-xl border p-3 text-xs"
                style={{
                  background: "var(--callout-info-bg)",
                  borderColor: "var(--callout-info-border)",
                }}
              >
                <strong style={{ color: "var(--callout-info-ink)" }}>
                  💡 Meilleur levier FG :
                </strong>{" "}
                <span className="text-[var(--ink)]">
                  Gagner <strong>+1,00 pt</strong> en{" "}
                  <strong>{result.topFgLeverageSubject.label}</strong> ajoute immédiatement{" "}
                  <strong>+{formatFrDecimal(result.topFgLeverageSubject.impactPlus1OnMg)}</strong> à
                  ta moyenne MG et{" "}
                  <strong>+{formatFrDecimal(result.topFgLeverageSubject.impactPlus1OnFg)} pts</strong>{" "}
                  à ton score FG !
                </span>
              </div>
            ) : null}

            {/* REPÈRES D'ORIENTATION UNIVERSITAIRE */}
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  Repères indicatifs · Guide Orientation Tunisie
                </p>
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[var(--ink-soft)]">
                  <input
                    type="checkbox"
                    checked={previewBonus7}
                    onChange={(e) => setPreviewBonus7(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[var(--blue)]"
                  />
                  <span>Simuler +7 % régional</span>
                </label>
              </div>

              <div className="space-y-2">
                {result.benchmarks.map((bench) => {
                  const reached = previewBonus7
                    ? bench.reachedWithBonus7
                    : bench.reachedBase;
                  const missing = previewBonus7
                    ? bench.missingFgWithBonus7
                    : bench.missingFgBase;
                  const pct = Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round(
                        (displayedFgForBenchmarks /
                          Math.max(1, bench.indicativeFgThreshold)) *
                          100,
                      ),
                    ),
                  );

                  return (
                    <div
                      key={bench.id}
                      className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[var(--ink)]">
                            {bench.institution}
                          </p>
                          <p className="text-[0.7rem] text-[var(--ink-soft)]">
                            {bench.domain} · Seuil indicatif ≈{" "}
                            <strong>{bench.indicativeFgThreshold} pts</strong>
                          </p>
                        </div>

                        {reached ? (
                          <span className="badge badge-green shrink-0">
                            ✓ Accessible
                          </span>
                        ) : !result.verdict.admitted ? (
                          <span className="badge badge-slate shrink-0">
                            Bac requis (MG ≥ 10)
                          </span>
                        ) : (
                          <span className="badge badge-gold shrink-0">
                            -{formatFrDecimal(missing)} pts FG
                          </span>
                        )}
                      </div>

                      <div className="progress-track mt-2">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${pct}%`,
                            background: reached ? "var(--green)" : "var(--brand)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CARTE 3 : SAUVEGARDER & COMPARER MES SIMULATIONS */}
          <section className="card space-y-4 p-5">
            <div>
              <p className="eyebrow">Suivi d&apos;objectifs (+20 XP à la 1re sauvegarde)</p>
              <h3 className="display mt-0.5 text-lg font-semibold text-[var(--ink)]">
                Sauvegarder ce scénario dans mon espace
              </h3>
            </div>

            <form action={saveFormAction} className="space-y-3">
              <input type="hidden" name="section" value={effectiveSection} />
              <input
                type="hidden"
                name="notesJson"
                value={JSON.stringify(notes)}
              />
              <input
                type="hidden"
                name="optionEnabled"
                value={optionEnabled ? "true" : "false"}
              />
              <input type="hidden" name="optionName" value={optionName} />
              <input
                type="hidden"
                name="optionNote20"
                value={String(optionNote20)}
              />
              <input
                type="hidden"
                name="sportDispense"
                value={sportDispense ? "true" : "false"}
              />

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  name="label"
                  maxLength={70}
                  value={simulationLabel}
                  onChange={(e) => setSimulationLabel(e.target.value)}
                  placeholder={`Ex. Objectif ${result.benchmarks[0]?.institution.split("/")[0]?.trim() ?? "Mention Bien"}`}
                  className="input text-sm"
                />
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn btn-primary btn-sm shrink-0"
                >
                  {isSaving ? "Enregistrement..." : "💾 Sauvegarder"}
                </button>
              </div>
            </form>

            {saveState.errors.length > 0 ? (
              <div
                className="rounded-xl border p-3 text-xs text-[var(--brand)]"
                style={{
                  background: "var(--danger-soft)",
                  borderColor: "var(--danger-border)",
                }}
              >
                {saveState.errors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            ) : null}

            {saveState.ok && saveState.message ? (
              <div
                className="rounded-xl border p-3 text-xs font-medium text-[var(--green)]"
                style={{
                  background: "var(--green-soft)",
                  borderColor: "var(--green-border)",
                }}
              >
                {saveState.message}
              </div>
            ) : null}

            {savedSimulations.length > 0 ? (
              <div className="space-y-2 border-t border-[var(--line)] pt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                  Mes scénarios enregistrés ({savedSimulations.length})
                </p>
                <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
                  {savedSimulations.map((sim) => (
                    <div
                      key={sim.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-2.5 text-xs"
                    >
                      <div>
                        <p className="font-semibold text-[var(--ink)]">
                          {sim.label}
                        </p>
                        <p className="text-[0.7rem] text-[var(--ink-soft)]">
                          {sim.section} · MG{" "}
                          <strong className="text-[var(--ink)]">
                            {formatFrDecimal(sim.mg20)}/20
                          </strong>{" "}
                          · FG{" "}
                          <strong className="text-[var(--ink)]">
                            {formatFrDecimal(sim.fgScore)} pts
                          </strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleLoadSavedSimulation(sim)}
                          className="btn btn-ghost btn-sm !px-2.5 !py-1 !text-xs"
                        >
                          Charger
                        </button>
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeleteSimulation(sim.id)}
                          aria-label={`Supprimer la simulation ${sim.label}`}
                          className="btn btn-ghost btn-sm !px-2 !py-1 !text-xs text-[var(--brand)]"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
}
