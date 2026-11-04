"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useMemo, useState, useTransition } from "react";
import {
  addManualErrorCard,
  deleteErrorCard,
  reviewErrorCard,
  type ManualErrorCardState,
} from "@/app/actions";
import { SECTION_INFO, type SectionName } from "@/lib/sections";
import {
  ERROR_CATEGORY_META,
  LEITNER_BOX_META,
  computeSrsOverviewStats,
  formatDueRelativeLabel,
  previewAllRatingIntervals,
  type ErrorCardSource,
  type ErrorCategory,
  type SrsRating,
} from "@/lib/srs-engine";

export type SerializedErrorCard = {
  id: number;
  subjectSlug: string;
  subjectName: string;
  subjectIcon: string;
  subjectAccent: string;
  sourceType: ErrorCardSource;
  sourceSlug: string;
  sourceTitle: string;
  prompt: string;
  wrongAnswer: string;
  correctAnswer: string;
  explanation: string;
  errorCategory: ErrorCategory;
  boxLevel: number;
  easeFactorPermille: number;
  intervalDays: number;
  repetitions: number;
  lapsesCount: number;
  mastered: boolean;
  nextReviewAtIso: string;
};

export type AllowedSubjectOption = {
  slug: string;
  name: string;
  icon: string;
};

type ErrorNotebookClientProps = {
  initialCards: SerializedErrorCard[];
  allowedSubjects: AllowedSubjectOption[];
  studentName: string;
  activeSection: SectionName;
  isLocked: boolean;
  serverNowIso: string;
};

type ActiveTab = "session" | "all" | "create";

const INITIAL_MANUAL_STATE: ManualErrorCardState = {
  ok: false,
  errors: [],
  message: "",
};

const SOURCE_LABELS: Record<ErrorCardSource, string> = {
  quiz: "Quiz interactif",
  "bac-blanc": "Bac Blanc chrono",
  manuel: "Devoir / Ajout perso",
};

export function ErrorNotebookClient({
  initialCards,
  allowedSubjects,
  studentName,
  activeSection,
  isLocked,
  serverNowIso,
}: ErrorNotebookClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("session");
  const [revealed, setRevealed] = useState<boolean>(false);
  const [earlyPracticeMode, setEarlyPracticeMode] = useState<boolean>(false);
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);
  const [sessionReviewedCount, setSessionReviewedCount] = useState<number>(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  // Mises à jour optimistes locales fusionnées avec les cartes serveur
  const [optimisticMap, setOptimisticMap] = useState<
    Record<number, Partial<SerializedErrorCard>>
  >({});
  const [deletedIds, setDeletedIds] = useState<Record<number, boolean>>({});
  const [requeuedIds, setRequeuedIds] = useState<number[]>([]);

  // Filtres de l'explorateur
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [boxFilter, setBoxFilter] = useState<number | "all">("all");

  const [isReviewing, startReviewTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [manualState, manualFormAction, isCreating] = useActionState(
    addManualErrorCard,
    INITIAL_MANUAL_STATE,
  );

  const referenceNow = useMemo(() => new Date(serverNowIso), [serverNowIso]);

  const cards = useMemo(
    () =>
      initialCards
        .filter((card) => !deletedIds[card.id])
        .map((card) => ({
          ...card,
          ...(optimisticMap[card.id] ?? {}),
        })),
    [deletedIds, initialCards, optimisticMap],
  );

  const stats = useMemo(
    () =>
      computeSrsOverviewStats(
        cards.map((c) => ({
          boxLevel: c.boxLevel,
          easeFactorPermille: c.easeFactorPermille,
          intervalDays: c.intervalDays,
          repetitions: c.repetitions,
          lapsesCount: c.lapsesCount,
          mastered: c.mastered,
          nextReviewAt: new Date(c.nextReviewAtIso),
        })),
        referenceNow,
      ),
    [cards, referenceNow],
  );

  // Construction de la file SRS active
  const sessionQueue = useMemo(() => {
    const dueCards = cards.filter((card) => {
      if (requeuedIds.includes(card.id)) return false;
      if (earlyPracticeMode) return !card.mastered;
      return new Date(card.nextReviewAtIso).getTime() <= referenceNow.getTime();
    });

    const requeuedCards = requeuedIds
      .map((id) => cards.find((c) => c.id === id))
      .filter((c): c is SerializedErrorCard => Boolean(c));

    return [...dueCards, ...requeuedCards];
  }, [cards, earlyPracticeMode, referenceNow, requeuedIds]);

  const currentCard = sessionQueue[0] ?? null;

  const filteredCards = useMemo(
    () =>
      cards.filter((card) => {
        if (subjectFilter !== "all" && card.subjectSlug !== subjectFilter) return false;
        if (categoryFilter !== "all" && card.errorCategory !== categoryFilter) return false;
        if (boxFilter !== "all" && card.boxLevel !== boxFilter) return false;
        return true;
      }),
    [boxFilter, cards, categoryFilter, subjectFilter],
  );

  function handleRateCurrentCard(rating: SrsRating) {
    if (!currentCard || isReviewing) return;
    const targetCard = currentCard;

    setRevealed(false);

    startReviewTransition(async () => {
      const response = await reviewErrorCard(targetCard.id, rating);
      if (response && response.ok) {
        setOptimisticMap((prev) => ({
          ...prev,
          [targetCard.id]: {
            boxLevel: response.boxLevel,
            intervalDays: response.intervalDays,
            lapsesCount: response.lapsesCount,
            mastered: response.mastered,
            nextReviewAtIso: response.nextReviewAtIso,
          },
        }));

        if (rating === "again") {
          setRequeuedIds((prev) => [
            ...prev.filter((id) => id !== targetCard.id),
            targetCard.id,
          ]);
          setLastFeedback(
            `Carte replacée en fin de séance (+${response.xpEarned} XP) · Prochaine échéance : ${response.intervalLabel}.`,
          );
        } else {
          setRequeuedIds((prev) => prev.filter((id) => id !== targetCard.id));
          setSessionReviewedCount((count) => count + 1);
          setLastFeedback(
            `Bien joué ! Carte promue en Boîte ${response.boxLevel} (+${response.xpEarned} XP) · Prochain rappel dans ${response.intervalLabel}.`,
          );
        }

        setSessionXpEarned((xp) => xp + response.xpEarned);
        router.refresh();
      }
    });
  }

  function handleDeleteCard(cardId: number) {
    setDeletedIds((prev) => ({ ...prev, [cardId]: true }));
    setRequeuedIds((prev) => prev.filter((id) => id !== cardId));
    startDeleteTransition(async () => {
      await deleteErrorCard(cardId);
      router.refresh();
    });
  }

  function handleSelectLeitnerBox(box: number) {
    setBoxFilter((prev) => (prev === box ? "all" : box));
    setActiveTab("all");
  }

  const nextIntervals = currentCard
    ? previewAllRatingIntervals(currentCard)
    : null;

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
              🔒 Carnet d&apos;erreurs personnel verrouillé : {activeSection}
            </p>
            <p className="text-xs text-[var(--ink-soft)]">
              Abonnement individuel de <strong className="text-[var(--ink)]">{studentName}</strong>{" "}
              · Seules les matières officielles de ta section alimentent ton planificateur SRS.
            </p>
          </div>
          <span className="badge badge-green">
            {SECTION_INFO[activeSection].short} · Anti-partage actif
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
            <strong>Mode démonstration :</strong> tes révisions SRS sont partagées sur le profil de
            démonstration. Crée gratuitement ton <strong>abonnement mono-section</strong> pour
            isoler ton Carnet d&apos;Erreurs personnel sur téléphone et ordinateur.
          </p>
          <Link href="/mon-compte" className="btn btn-primary btn-sm shrink-0">
            🔒 Créer mon compte (1 section) →
          </Link>
        </div>
      )}

      {/* INDICATEURS CLÉS SRS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            À réviser aujourd&apos;hui
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--brand)]">
            {stats.dueNowCount} carte{stats.dueNowCount > 1 ? "s" : ""}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            +{stats.dueNext24hCount} dans les prochaines 24 h
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Pièges récurrents
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--gold-ink)]">
            {stats.recurringTrapsCount}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            Erreurs commises ≥ 2 fois à sécuriser
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Indice de rétention SRS
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--blue)]">
            {stats.retentionIndexPct} %
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            Progression pondérée sur les 5 boîtes
          </p>
        </div>

        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Erreurs consolidées
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--green)]">
            {stats.masteredCount} / {stats.totalCards}
          </p>
          <p className="mt-1 text-[0.75rem] text-[var(--ink-soft)]">
            {sessionXpEarned > 0
              ? `+${sessionXpEarned} XP gagnés durant cette séance`
              : "Boîte 5 · Mémoire à long terme"}
          </p>
        </div>
      </div>

      {/* BARRE DES 5 BOÎTES DE LEITNER */}
      <section className="card p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="eyebrow">Système Leitner × Algorithme SM-2</p>
            <h2 className="display text-lg font-semibold text-[var(--ink)]">
              Répartition de tes erreurs par niveau d&apos;ancrage mémoriel
            </h2>
          </div>
          <span className="text-xs text-[var(--ink-soft)]">
            Clique sur une boîte pour inspecter ses cartes
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-5">
          {LEITNER_BOX_META.map((meta) => {
            const count = stats.boxCounts[meta.box as 1 | 2 | 3 | 4 | 5] ?? 0;
            const share =
              stats.totalCards > 0 ? Math.round((count / stats.totalCards) * 100) : 0;
            const selected = activeTab === "all" && boxFilter === meta.box;

            return (
              <button
                key={meta.box}
                type="button"
                onClick={() => handleSelectLeitnerBox(meta.box)}
                className={`cursor-pointer rounded-2xl border p-3 text-left transition ${
                  selected
                    ? "border-[var(--ink)] bg-[var(--surface-muted)]"
                    : "border-[var(--line)] bg-[var(--surface-subtle)] hover:border-[var(--line-strong)]"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[var(--ink)]">
                    {meta.title}
                  </span>
                  <span
                    className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.68rem] font-bold text-white"
                    style={{ background: meta.tone }}
                  >
                    {count}
                  </span>
                </div>
                <p className="mt-0.5 text-[0.68rem] text-[var(--ink-soft)]">
                  {meta.cadence}
                </p>
                <div className="progress-track mt-2 !h-1.5">
                  <div
                    className="progress-fill"
                    style={{ width: `${share}%`, background: meta.tone }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ONGLETS PRINCIPAUX */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("session")}
            className={`btn btn-sm ${
              activeTab === "session" ? "btn-primary" : "btn-ghost"
            }`}
          >
            🧠 Session SRS du jour ({sessionQueue.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`btn btn-sm ${
              activeTab === "all" ? "btn-dark" : "btn-ghost"
            }`}
          >
            📓 Toutes mes erreurs ({cards.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`btn btn-sm ${
              activeTab === "create" ? "btn-dark" : "btn-ghost"
            }`}
          >
            ➕ Ajouter une erreur de devoir
          </button>
        </div>

        {lastFeedback ? (
          <p className="text-xs font-semibold text-[var(--green)]">{lastFeedback}</p>
        ) : null}
      </div>

      {/* ONGLET 1 : LECTEUR INTERACTIF DE RÉVISION ESPACÉE (SRS) */}
      {activeTab === "session" ? (
        currentCard && nextIntervals ? (
          <section className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] bg-[var(--surface-subtle)] px-5 py-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold"
                  style={{
                    background: `${currentCard.subjectAccent}22`,
                    color: currentCard.subjectAccent,
                  }}
                >
                  {currentCard.subjectIcon}
                </span>
                <span className="text-sm font-semibold text-[var(--ink)]">
                  {currentCard.subjectName}
                </span>
                <span className="badge badge-slate">
                  {SOURCE_LABELS[currentCard.sourceType]}
                </span>
                <span
                  className={`badge ${
                    ERROR_CATEGORY_META[currentCard.errorCategory]?.badgeClass ??
                    "badge-slate"
                  }`}
                >
                  {ERROR_CATEGORY_META[currentCard.errorCategory]?.short ?? "Notion"}
                </span>
                {currentCard.lapsesCount >= 2 ? (
                  <span className="badge badge-brand">
                    ⚠️ Piège tombé {currentCard.lapsesCount}×
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
                <span>Boîte {currentCard.boxLevel}/5</span>
                <span>·</span>
                <span>{sessionQueue.length} restante(s)</span>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-7">
              {currentCard.sourceTitle ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                  Origine : {currentCard.sourceTitle}
                </p>
              ) : null}

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                  Question / Piège à déjouer
                </p>
                <p className="mt-2 text-lg font-semibold leading-relaxed text-[var(--ink)]">
                  {currentCard.prompt}
                </p>
              </div>

              {currentCard.wrongAnswer ? (
                <div
                  className="rounded-xl border p-3.5 text-sm"
                  style={{
                    background: "var(--danger-soft)",
                    borderColor: "var(--danger-border)",
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">
                    ✗ Ton erreur enregistrée à ne plus reproduire
                  </p>
                  <p className="mt-1 text-[var(--ink)]">{currentCard.wrongAnswer}</p>
                </div>
              ) : null}

              {!revealed ? (
                <div className="pt-2">
                  <p className="mb-3 text-xs text-[var(--ink-soft)]">
                    Formule d&apos;abord mentalement (ou au brouillon) la correction exacte avant de
                    retourner la carte : l&apos;effort de rappel actif multiplie la mémorisation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    👁️ Révéler la correction &amp; la méthode
                  </button>
                </div>
              ) : (
                <div className="space-y-5 border-t border-[var(--line)] pt-5">
                  <div
                    className="rounded-2xl border p-4"
                    style={{
                      background: "var(--green-soft)",
                      borderColor: "var(--green-border)",
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--green)]">
                      ✓ Réponse &amp; formulation exacte attendue au Bac
                    </p>
                    <p className="mt-1.5 text-base font-semibold text-[var(--ink)]">
                      {currentCard.correctAnswer}
                    </p>
                    {currentCard.explanation ? (
                      <p className="mt-2 text-sm text-[var(--ink-soft)]">
                        <strong>Règle / Méthode :</strong> {currentCard.explanation}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]">
                      Comment as-tu retrouvé la bonne réponse ? (Planification SM-2)
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-4">
                      <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => handleRateCurrentCard("again")}
                        className="cursor-pointer rounded-2xl border p-3 text-left transition hover:opacity-90"
                        style={{
                          background: "var(--danger-soft)",
                          borderColor: "var(--danger-border)",
                        }}
                      >
                        <p className="text-sm font-bold text-[var(--brand)]">
                          1 · À revoir
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                          Oublié · Rappel {nextIntervals.again} (+5 XP)
                        </p>
                      </button>

                      <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => handleRateCurrentCard("hard")}
                        className="cursor-pointer rounded-2xl border p-3 text-left transition hover:opacity-90"
                        style={{
                          background: "var(--callout-warn-bg)",
                          borderColor: "var(--callout-warn-border)",
                        }}
                      >
                        <p className="text-sm font-bold text-[var(--gold-ink)]">
                          2 · Difficile
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                          Hésitation · {nextIntervals.hard} (+10 XP)
                        </p>
                      </button>

                      <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => handleRateCurrentCard("good")}
                        className="cursor-pointer rounded-2xl border p-3 text-left transition hover:opacity-90"
                        style={{
                          background: "var(--callout-info-bg)",
                          borderColor: "var(--callout-info-border)",
                        }}
                      >
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--callout-info-ink)" }}
                        >
                          3 · Bien retenu
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                          Solide · {nextIntervals.good} (+15 XP)
                        </p>
                      </button>

                      <button
                        type="button"
                        disabled={isReviewing}
                        onClick={() => handleRateCurrentCard("easy")}
                        className="cursor-pointer rounded-2xl border p-3 text-left transition hover:opacity-90"
                        style={{
                          background: "var(--green-soft)",
                          borderColor: "var(--green-border)",
                        }}
                      >
                        <p className="text-sm font-bold text-[var(--green)]">
                          4 · Parfait
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                          Automatique · {nextIntervals.easy} (+20 XP)
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="card grid-pattern space-y-4 p-8 text-center">
            <p className="text-3xl" aria-hidden>
              🎉
            </p>
            <h3 className="display text-2xl font-semibold text-[var(--ink)]">
              {cards.length === 0
                ? "Ton Carnet d'Erreurs est encore vierge !"
                : "Séance SRS à jour — zéro révision en retard !"}
            </h3>
            <p className="mx-auto max-w-lg text-sm text-[var(--ink-soft)]">
              {cards.length === 0
                ? "Fais un Quiz interactif pour capturer automatiquement tes erreurs, ou ajoute manuellement une erreur rencontrée dans un devoir de synthèse."
                : `Tu as consolidé ${sessionReviewedCount} carte(s) lors de cette séance. Le planificateur SM-2 te représentera chaque piège juste avant l'oubli.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {cards.some((c) => !c.mastered) && !earlyPracticeMode ? (
                <button
                  type="button"
                  onClick={() => setEarlyPracticeMode(true)}
                  className="btn btn-dark btn-sm"
                >
                  ⚡ Lancer une révision anticipée
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setActiveTab("create")}
                className="btn btn-primary btn-sm"
              >
                ➕ Noter une erreur de devoir
              </button>
              <Link href="/quiz" className="btn btn-ghost btn-sm">
                S&apos;entraîner aux Quiz →
              </Link>
            </div>
          </section>
        )
      ) : null}

      {/* ONGLET 2 : EXPLORATEUR DE TOUTES LES ERREURS */}
      {activeTab === "all" ? (
        <section className="space-y-4">
          <div className="card flex flex-wrap items-center gap-3 p-4">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              aria-label="Filtrer par matière"
              className="select !w-auto py-1.5 text-sm"
            >
              <option value="all">Toutes mes matières ({allowedSubjects.length})</option>
              {allowedSubjects.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.name}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filtrer par type d'erreur"
              className="select !w-auto py-1.5 text-sm"
            >
              <option value="all">Toutes les catégories de pièges</option>
              {(Object.keys(ERROR_CATEGORY_META) as ErrorCategory[]).map((cat) => (
                <option key={cat} value={cat}>
                  {ERROR_CATEGORY_META[cat].label}
                </option>
              ))}
            </select>

            <select
              value={String(boxFilter)}
              onChange={(e) =>
                setBoxFilter(e.target.value === "all" ? "all" : Number(e.target.value))
              }
              aria-label="Filtrer par boîte de Leitner"
              className="select !w-auto py-1.5 text-sm"
            >
              <option value="all">Toutes les boîtes (1 à 5)</option>
              {LEITNER_BOX_META.map((b) => (
                <option key={b.box} value={b.box}>
                  {b.title}
                </option>
              ))}
            </select>

            {(subjectFilter !== "all" ||
              categoryFilter !== "all" ||
              boxFilter !== "all") ? (
              <button
                type="button"
                onClick={() => {
                  setSubjectFilter("all");
                  setCategoryFilter("all");
                  setBoxFilter("all");
                }}
                className="btn btn-ghost btn-sm"
              >
                Réinitialiser les filtres
              </button>
            ) : null}
          </div>

          {filteredCards.length === 0 ? (
            <div className="card p-8 text-center text-sm text-[var(--ink-soft)]">
              Aucune fiche d&apos;erreur ne correspond à ces filtres.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCards.map((card) => {
                const dueInfo = formatDueRelativeLabel(
                  new Date(card.nextReviewAtIso),
                  referenceNow,
                );
                const catMeta =
                  ERROR_CATEGORY_META[card.errorCategory] ??
                  ERROR_CATEGORY_META.comprehension;

                return (
                  <article key={card.id} className="card flex flex-col justify-between p-5">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="badge badge-slate">{card.subjectName}</span>
                          <span className={`badge ${catMeta.badgeClass}`}>
                            {catMeta.short}
                          </span>
                          <span className="badge badge-slate">
                            Boîte {card.boxLevel}/5
                          </span>
                        </div>

                        <span
                          className={`badge ${
                            dueInfo.isDue ? "badge-brand" : "badge-green"
                          }`}
                        >
                          {dueInfo.label}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-[var(--ink)]">
                        {card.prompt}
                      </p>

                      {card.wrongAnswer ? (
                        <p className="text-xs text-[var(--brand)]">
                          <strong>Piège évité :</strong> {card.wrongAnswer}
                        </p>
                      ) : null}

                      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-xs">
                        <p className="font-semibold text-[var(--green)]">
                          ✓ {card.correctAnswer}
                        </p>
                        {card.explanation ? (
                          <p className="mt-1 text-[var(--ink-soft)]">
                            {card.explanation}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 text-xs text-[var(--ink-soft)]">
                      <span>
                        {SOURCE_LABELS[card.sourceType]} · Rechutes : {card.lapsesCount}
                      </span>
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => handleDeleteCard(card.id)}
                        className="cursor-pointer font-semibold text-[var(--brand)] hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      ) : null}

      {/* ONGLET 3 : AJOUTER MANUELLEMENT UNE ERREUR DE DEVOIR */}
      {activeTab === "create" ? (
        <section className="card max-w-3xl space-y-5 p-6">
          <div>
            <p className="eyebrow">Consigner une erreur sur copie (+15 XP)</p>
            <h3 className="display mt-1 text-xl font-semibold text-[var(--ink)]">
              Ajouter un piège rencontré en Devoir de contrôle ou de synthèse
            </h3>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Note chaque erreur de tes copies corrigées en classe : le planificateur SRS te fera
              réviser la règle exacte à J+1, J+3, J+7 puis J+21 jusqu&apos;au Bac.
            </p>
          </div>

          <form action={manualFormAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="manual-subject"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                >
                  Matière ({activeSection})
                </label>
                <select
                  id="manual-subject"
                  name="subjectSlug"
                  required
                  defaultValue={allowedSubjects[0]?.slug ?? ""}
                  className="select"
                >
                  {allowedSubjects.map((sub) => (
                    <option key={sub.slug} value={sub.slug}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="manual-category"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                >
                  Nature du piège
                </label>
                <select
                  id="manual-category"
                  name="errorCategory"
                  defaultValue="methode"
                  className="select"
                >
                  {(Object.keys(ERROR_CATEGORY_META) as ErrorCategory[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {ERROR_CATEGORY_META[cat].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="manual-source"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
              >
                Origine (optionnel)
              </label>
              <input
                id="manual-source"
                type="text"
                name="sourceTitle"
                maxLength={90}
                placeholder="Ex. Devoir de synthèse N°2 · Exercice 3 (Intégrales)"
                className="input"
              />
            </div>

            <div>
              <label
                htmlFor="manual-prompt"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
              >
                Question posée ou situation problème *
              </label>
              <textarea
                id="manual-prompt"
                name="prompt"
                required
                rows={3}
                maxLength={500}
                placeholder="Ex. Comment justifier la dérivabilité de f(x) = √(u(x)) sur un intervalle I ?"
                className="textarea !min-h-[90px]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="manual-wrong"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--brand)]"
                >
                  Mon erreur sur la copie (optionnel)
                </label>
                <textarea
                  id="manual-wrong"
                  name="wrongAnswer"
                  rows={3}
                  maxLength={400}
                  placeholder="Ex. J'ai seulement vérifié u(x) ≥ 0 au lieu de u(x) strictement positif."
                  className="textarea !min-h-[90px]"
                />
              </div>

              <div>
                <label
                  htmlFor="manual-correct"
                  className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--green)]"
                >
                  Correction exacte à retenir *
                </label>
                <textarea
                  id="manual-correct"
                  name="correctAnswer"
                  required
                  rows={3}
                  maxLength={400}
                  placeholder="Ex. u doit être dérivable ET strictement positive (u(x) > 0) sur I."
                  className="textarea !min-h-[90px]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="manual-explanation"
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)]"
              >
                Astuce méthodologique anti-récidive (optionnel)
              </label>
              <input
                id="manual-explanation"
                type="text"
                name="explanation"
                maxLength={600}
                placeholder="Ex. En un point où u(x0) = 0, étudier séparément la limite du taux d'accroissement."
                className="input"
              />
            </div>

            {manualState.errors.length > 0 ? (
              <div
                className="rounded-xl border p-3 text-xs text-[var(--brand)]"
                style={{
                  background: "var(--danger-soft)",
                  borderColor: "var(--danger-border)",
                }}
              >
                {manualState.errors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            ) : null}

            {manualState.ok && manualState.message ? (
              <div
                className="rounded-xl border p-3 text-xs font-semibold text-[var(--green)]"
                style={{
                  background: "var(--green-soft)",
                  borderColor: "var(--green-border)",
                }}
              >
                {manualState.message}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isCreating}
                className="btn btn-primary"
              >
                {isCreating
                  ? "Enregistrement..."
                  : "💾 Enregistrer dans mon Carnet SRS"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("session")}
                className="btn btn-ghost btn-sm"
              >
                Retour à la session du jour
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
