"use client";

import Link from "next/link";
import { useState } from "react";
import { recordManualScore } from "@/app/actions";
import type { MentionPredictionResult, ScoreHistoryRow } from "@/lib/mention-probability";

export type MentionGamificationCardProps = {
  prediction: MentionPredictionResult;
  history: ScoreHistoryRow[];
};

type ActiveTab = "badges" | "coefficients" | "add-grade";

function formatScore20(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

function formatScore20OneDecimal(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function MentionGamificationCard({ prediction, history }: MentionGamificationCardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("badges");

  const { rank, streakDays, badges, unlockedCount } = prediction.gamification;
  const topMention = prediction.mostLikelyMention;

  return (
    <section className="card overflow-hidden p-5 sm:p-7">
      {/* EN-TÊTE GAMIFICATION : RANG XP, SÉRIE & CONFIANCE */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-brand">
              🏆 Niveau {rank.level} · {rank.title}
            </span>
            <span className="badge badge-gold">
              🔥 Série : {streakDays} jour{streakDays > 1 ? "s" : ""}
            </span>
            <span className="badge badge-slate">
              🎖️ {unlockedCount} / {badges.length} badges
            </span>
          </div>
          <h2 className="display mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Probabilité de Mention au Baccalauréat
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
            Projection pondérée par les{" "}
            <strong className="text-[var(--ink)]">coefficients officiels ({prediction.section})</strong> à partir de ton
            historique de scores (quiz, Bac Blanc, devoirs) et de ta couverture du programme.
          </p>
        </div>

        {/* Jauge d'expérience XP */}
        <div className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5 sm:w-64">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
              Expérience (XP)
            </span>
            <strong className="font-mono text-sm text-[var(--ink)]">{rank.currentXp} XP</strong>
          </div>
          <div className="progress-track mt-2">
            <div
              className="progress-fill"
              style={{ width: `${rank.progressPct}%`, background: "var(--brand)" }}
            />
          </div>
          <p className="mt-1.5 text-[0.68rem] text-[var(--ink-soft)]">
            {rank.nextLevelXp !== null
              ? `Encore ${rank.xpToNext} XP avant le niveau ${rank.level + 1}`
              : "Rang maximal atteint · Major de Promotion !"}
          </p>
        </div>
      </div>

      {/* SYNTHÈSE PROJECTION MOYENNE /20 + PROBABILITÉS DES 4 MENTIONS */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        {/* Colonne gauche : Moyenne projetée sur 20 & levier prioritaire */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="eyebrow">Moyenne pondérée projetée</span>
              <span className="badge badge-slate">
                Fiabilité {prediction.confidencePct}% (±{prediction.uncertaintySigma.toFixed(1).replace(".", ",")} pt)
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="display text-4xl font-semibold text-[var(--ink)] sm:text-5xl">
                {formatScore20(prediction.projectedAverage20)}
              </span>
              <span className="text-lg font-semibold text-[var(--ink-soft)]">/ 20</span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-green">
                Chances d&apos;admission (≥ 10/20) : {prediction.admissionProbabilityPct}%
              </span>
              {topMention && prediction.projectedAverage20 >= 10 ? (
                <span className={`badge ${topMention.badgeClass}`}>
                  Tendance : {topMention.label}
                </span>
              ) : null}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
              Somme des coefficients de ta filière :{" "}
              <strong className="text-[var(--ink)]">×{prediction.totalCoefficientSum}</strong> ·{" "}
              <strong className="text-[var(--ink)]">{history.length}</strong> score{history.length > 1 ? "s" : ""}{" "}
              pris en compte dans le modèle.
            </p>
          </div>

          {prediction.priorityLeverage ? (
            <div
              className="mt-5 rounded-xl border p-3.5 text-xs"
              style={{
                background: "var(--callout-info-bg)",
                borderColor: "var(--callout-info-border)",
              }}
            >
              <p
                className="font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--callout-info-ink)" }}
              >
                🎯 Levier n°1 pour monter de mention
              </p>
              <p className="mt-1.5 leading-relaxed text-[var(--ink-soft)]">
                {prediction.priorityLeverage.advice}
              </p>
              <Link
                href={`/matieres/${prediction.priorityLeverage.subjectSlug}`}
                className="mt-2 inline-block font-semibold text-[var(--brand)]"
              >
                Travailler {prediction.priorityLeverage.subjectName} →
              </Link>
            </div>
          ) : null}
        </div>

        {/* Colonne droite : Les 4 Mentions officielles (Passable, Assez Bien, Bien, Très Bien) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Probabilité par mention officielle</p>
            {prediction.underTenProbabilityPct > 0 ? (
              <span className="text-[0.7rem] font-semibold text-[var(--ink-soft)]">
                Risque &lt; 10/20 : {prediction.underTenProbabilityPct}%
              </span>
            ) : null}
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {prediction.tiers.map((tier) => {
              const isMostLikely =
                prediction.projectedAverage20 >= 10 && topMention?.key === tier.key;
              return (
                <div
                  key={tier.key}
                  className="rounded-2xl border p-4 transition"
                  style={{
                    borderColor: isMostLikely ? "var(--brand)" : "var(--line)",
                    background: isMostLikely ? "var(--brand-soft)" : "var(--paper)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`badge ${tier.badgeClass}`}>{tier.label}</span>
                      <p className="mt-1 text-[0.68rem] font-medium text-[var(--ink-soft)]">
                        Moyenne {tier.rangeLabel}
                      </p>
                    </div>
                    <span className="display text-2xl font-semibold text-[var(--ink)]">
                      {tier.bracketProbabilityPct}%
                    </span>
                  </div>

                  <div className="progress-track mt-3">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${tier.bracketProbabilityPct}%`,
                        background: tier.accentColor,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[0.68rem] text-[var(--ink-soft)]">
                    <span>Probabilité de cette tranche</span>
                    <strong className="text-[var(--ink)]">
                      Atteindre ≥ {tier.minScore20}/20 : {tier.atLeastProbabilityPct}%
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ONGLETS : BADGES / SIMULATION PAR MATIÈRE / AJOUTER UNE NOTE DE DEVOIR */}
      <div className="mt-6 border-t border-[var(--line)] pt-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("badges")}
            className={`chip cursor-pointer ${activeTab === "badges" ? "chip-active" : ""}`}
          >
            🎖️ Badges ({unlockedCount}/{badges.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("coefficients")}
            className={`chip cursor-pointer ${activeTab === "coefficients" ? "chip-active" : ""}`}
          >
            ⚖️ Détail par coefficient ({prediction.subjectProjections.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("add-grade")}
            className={`chip cursor-pointer ${activeTab === "add-grade" ? "chip-active" : ""}`}
          >
            ➕ Ajouter une note de devoir (/20)
          </button>
        </div>

        {activeTab === "badges" ? (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-start gap-3 rounded-2xl border p-3.5 transition"
                style={{
                  borderColor: badge.unlocked ? "var(--green-border)" : "var(--line)",
                  background: badge.unlocked ? "var(--green-soft)" : "var(--surface-subtle)",
                  opacity: badge.unlocked ? 1 : 0.72,
                }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-[var(--paper)] text-lg"
                  aria-hidden
                >
                  {badge.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-[var(--ink)]">{badge.title}</p>
                    <span className={`badge ${badge.unlocked ? "badge-green" : "badge-slate"}`}>
                      {badge.unlocked ? "Débloqué" : "À débloquer"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "coefficients" ? (
          <div className="overflow-x-auto rounded-2xl border border-[var(--line)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-[var(--surface-subtle)] uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                  <th className="px-4 py-2.5 font-bold">Matière</th>
                  <th className="px-3 py-2.5 font-bold">Coef.</th>
                  <th className="px-3 py-2.5 font-bold">Scores enregistrés</th>
                  <th className="px-3 py-2.5 font-bold">Couverture</th>
                  <th className="px-3 py-2.5 font-bold">Note estimée /20</th>
                  <th className="px-4 py-2.5 font-bold">Impact de +2 pts</th>
                </tr>
              </thead>
              <tbody>
                {prediction.subjectProjections.map((sub) => (
                  <tr key={sub.subjectSlug} className="border-t border-[var(--line)]">
                    <td className="px-4 py-2.5 font-semibold text-[var(--ink)]">
                      <Link href={`/matieres/${sub.subjectSlug}`} className="hover:text-[var(--brand)]">
                        {sub.subjectName}
                      </Link>
                      {sub.isSpecialty ? (
                        <span className="ml-1.5 badge badge-gold">Spécialité</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold text-[var(--ink)]">
                      {sub.coefficientLabel}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--ink-soft)]">
                      {sub.historyAvg20 !== null
                        ? `${formatScore20OneDecimal(sub.historyAvg20)}/20 (${sub.attemptsCount})`
                        : "Aucun score"}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--ink-soft)]">{sub.coveragePct}%</td>
                    <td className="px-3 py-2.5 font-mono font-bold text-[var(--ink)]">
                      {formatScore20OneDecimal(sub.estimatedNote20)} / 20
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-[var(--green)]">
                      +{sub.gainForPlus2Pts.toFixed(2).replace(".", ",")} pt au Bac
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {activeTab === "add-grade" ? (
          <form
            action={recordManualScore}
            className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4 sm:grid-cols-[1fr_1.1fr_0.6fr_auto] sm:items-end"
          >
            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Matière</span>
              <select name="subjectSlug" required className="select !py-2 !text-xs">
                {prediction.subjectProjections.map((sub) => (
                  <option key={sub.subjectSlug} value={sub.subjectSlug}>
                    {sub.subjectName} ({sub.coefficientLabel})
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Intitulé du devoir</span>
              <input
                type="text"
                name="label"
                placeholder="Ex. : Devoir de synthèse N°1"
                maxLength={80}
                className="input !py-2 !text-xs"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Note / 20</span>
              <input
                type="number"
                name="note20"
                required
                min={0}
                max={20}
                step={0.25}
                placeholder="14.5"
                className="input !py-2 !text-xs"
              />
            </label>

            <button type="submit" className="btn btn-primary btn-sm">
              Enregistrer (+30 XP)
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
