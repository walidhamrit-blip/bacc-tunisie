"use client";

import { useRouter } from "next/navigation";
import { useActionState, useMemo, useOptimistic, useState, useTransition } from "react";
import {
  moderateCommunitySheet,
  submitCommunitySheet,
  toggleCommunitySheetLike,
  type CommunitySubmissionState,
} from "@/app/actions";
import type { CommunitySheet } from "@/lib/data";
import { PERIODS, PERIOD_BY_ID, SECTIONS, type PeriodId } from "@/lib/sections";

export type CommunitySubjectInfo = {
  slug: string;
  name: string;
  shortName: string;
  accent: string;
};

export type CommunitySheetsBoardProps = {
  approvedSheets: CommunitySheet[];
  pendingSheets: CommunitySheet[];
  likedSheetIds: number[];
  subjects: CommunitySubjectInfo[];
  defaultAuthorName: string;
  defaultSection: string;
};

const INITIAL_SUBMISSION_STATE: CommunitySubmissionState = {
  ok: false,
  errors: [],
  message: "",
};

function SheetLikeButton({
  sheetId,
  initialLiked,
  initialCount,
}: {
  sheetId: number;
  initialLiked: boolean;
  initialCount: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimistic, triggerOptimisticToggle] = useOptimistic(
    { liked: initialLiked, count: initialCount },
    (state) => ({
      liked: !state.liked,
      count: state.liked ? Math.max(0, state.count - 1) : state.count + 1,
    }),
  );

  const handleClick = () => {
    startTransition(async () => {
      triggerOptimisticToggle(null);
      await toggleCommunitySheetLike(sheetId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={optimistic.liked}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition active:scale-95"
      style={{
        borderColor: optimistic.liked ? "var(--brand)" : "var(--line)",
        background: optimistic.liked ? "var(--brand-soft)" : "var(--surface-subtle)",
        color: optimistic.liked ? "var(--brand)" : "var(--ink)",
      }}
      title={optimistic.liked ? "Retirer ma mention J'aime" : "J'aime cette fiche"}
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill={optimistic.liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>J&apos;aime</span>
      <span className="rounded-full bg-[var(--paper)] px-1.5 py-0.5 font-mono text-[0.7rem]">
        {optimistic.count}
      </span>
    </button>
  );
}

function PendingModerationRow({
  sheet,
  subjectInfo,
}: {
  sheet: CommunitySheet;
  subjectInfo: CommunitySubjectInfo | undefined;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDecision = (decision: "approved" | "rejected") => {
    startTransition(async () => {
      await moderateCommunitySheet(sheet.id, decision);
      router.refresh();
    });
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="badge badge-gold">En attente de validation</span>
          <span className="badge badge-slate">
            {subjectInfo?.shortName ?? sheet.subjectSlug} · {sheet.period}
          </span>
          <span className="text-xs text-[var(--ink-soft)]">
            par <strong className="text-[var(--ink)]">{sheet.authorName}</strong> ({sheet.section})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleDecision("approved")}
            className="btn btn-primary btn-sm"
          >
            ✓ Valider &amp; publier
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleDecision("rejected")}
            className="btn btn-ghost btn-sm"
          >
            ✕ Écarter
          </button>
        </div>
      </div>

      <h3 dir="auto" className="display mt-2.5 text-lg font-semibold text-[var(--ink)]">
        {sheet.title}
      </h3>
      <p dir="auto" className="mt-1 text-xs font-medium text-[var(--ink-soft)]">
        {sheet.summary}
      </p>
      <div
        dir="auto"
        className="mt-2.5 whitespace-pre-line rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-xs leading-relaxed text-[var(--ink)]"
      >
        {sheet.content}
      </div>
      {sheet.keyFormula ? (
        <p
          dir="auto"
          className="formula mt-2 rounded-xl border border-[var(--green-border)] bg-[var(--green-soft)] px-3 py-2 text-xs font-semibold text-[var(--green-ink)]"
        >
          ★ À retenir : {sheet.keyFormula}
        </p>
      ) : null}
      {sheet.moderationNote ? (
        <p className="mt-2 text-[0.7rem] text-[var(--ink-soft)]">🛡️ {sheet.moderationNote}</p>
      ) : null}
    </div>
  );
}

export function CommunitySheetsBoard({
  approvedSheets,
  pendingSheets,
  likedSheetIds,
  subjects,
  defaultAuthorName,
  defaultSection,
}: CommunitySheetsBoardProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "recent">("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

  const [submissionState, formAction, isSubmitting] = useActionState(
    submitCommunitySheet,
    INITIAL_SUBMISSION_STATE,
  );

  const subjectMap = useMemo(
    () => new Map(subjects.map((item) => [item.slug, item])),
    [subjects],
  );
  const likedSet = useMemo(() => new Set(likedSheetIds), [likedSheetIds]);

  const totalLikes = useMemo(
    () => approvedSheets.reduce((sum, item) => sum + item.likesCount, 0),
    [approvedSheets],
  );

  const filteredSheets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matching = approvedSheets.filter((sheet) => {
      if (selectedSubject !== "all" && sheet.subjectSlug !== selectedSubject) {
        return false;
      }
      if (selectedSection !== "all" && sheet.section !== selectedSection) {
        return false;
      }
      if (!query) return true;
      return (
        sheet.title.toLowerCase().includes(query) ||
        sheet.summary.toLowerCase().includes(query) ||
        sheet.content.toLowerCase().includes(query) ||
        sheet.authorName.toLowerCase().includes(query) ||
        sheet.tags.some((t) => t.toLowerCase().includes(query))
      );
    });

    return [...matching].sort((a, b) => {
      if (sortBy === "popular") {
        if (b.likesCount !== a.likesCount) return b.likesCount - a.likesCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [approvedSheets, searchQuery, selectedSection, selectedSubject, sortBy]);

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* BANDEAU DE SYNTHÈSE & BOUTON PARTAGER UNE FICHE */}
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            Fiches validées
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">
            {approvedSheets.length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            Mentions « J&apos;aime »
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--brand)]">{totalLikes}</p>
        </div>
        <div className="card p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
            En validation simple
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--gold-ink)]">
            {pendingSheets.length}
          </p>
        </div>
        <div className="card flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setShowForm((open) => !open)}
            className="btn btn-primary w-full text-sm"
          >
            {showForm ? "Fermer le formulaire" : "✍️ Proposer une fiche (+15 XP)"}
          </button>
        </div>
      </div>

      {/* MESSAGE DE CONFIRMATION APRÈS SOUMISSION */}
      {submissionState.ok && submissionState.message ? (
        <div
          role="status"
          className="rounded-2xl border p-4 text-sm font-medium"
          style={{
            background: "var(--green-soft)",
            borderColor: "var(--green-border)",
            color: "var(--green-ink)",
          }}
        >
          ✅ {submissionState.message}
        </div>
      ) : null}

      {/* FORMULAIRE DE SOUMISSION D'UNE FICHE COURTE */}
      {showForm ? (
        <section className="card p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div>
              <span className="badge badge-brand">Entraide Bac Tunisie</span>
              <h2 className="display mt-2 text-xl font-semibold text-[var(--ink)] sm:text-2xl">
                Partager une fiche courte de révision
              </h2>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">
                Rédige un mémo synthétique (méthode type, pièges classiques, formule clé). Un contrôle automatique
                vérifie le format et l&apos;absence de spam avant la validation finale en un clic.
              </p>
            </div>
          </div>

          {submissionState.errors.length > 0 ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border p-3.5 text-xs"
              style={{
                background: "var(--danger-soft)",
                borderColor: "var(--danger-border)",
                color: "var(--brand)",
              }}
            >
              <p className="font-bold">Veuillez corriger les points suivants :</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {submissionState.errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form
            key={submissionState.submittedAt ?? 0}
            action={formAction}
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Ton prénom / pseudo *</span>
              <input
                name="authorName"
                type="text"
                required
                minLength={2}
                maxLength={60}
                defaultValue={defaultAuthorName}
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Filière concernée *</span>
              <select
                name="section"
                defaultValue={defaultSection}
                className="select !py-2 !text-sm"
              >
                {SECTIONS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Matière *</span>
              <select name="subjectSlug" required className="select !py-2 !text-sm">
                {subjects.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Trimestre *</span>
              <select name="period" defaultValue="T1" className="select !py-2 !text-sm">
                {PERIODS.map((per) => (
                  <option key={per.id} value={per.id}>
                    {per.short} · {per.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Titre clair de la fiche (8 à 110 caractères) *
              </span>
              <input
                name="title"
                type="text"
                required
                minLength={8}
                maxLength={110}
                placeholder="Ex. : Nombres complexes — passer de la forme algébrique à l'exponentielle"
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Résumé en une phrase (15 à 240 caractères) *
              </span>
              <input
                name="summary"
                type="text"
                required
                minLength={15}
                maxLength={240}
                placeholder="Ex. : Les 3 étapes sûres pour calculer le module |z| et l'argument sans erreur de signe."
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Points essentiels de la fiche courte (40 à 1 800 caractères, sans lien externe) *
              </span>
              <textarea
                name="content"
                required
                minLength={40}
                maxLength={1800}
                placeholder={`1. Calculer le module r = √(a² + b²).\n2. Identifier cos(θ) = a/r et sin(θ) = b/r.\n3. Attention au quadrant avant de conclure sur θ !`}
                className="textarea !min-h-[130px] !text-sm"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Formule ou règle d&apos;or à encadrer (optionnel)
              </span>
              <input
                name="keyFormula"
                type="text"
                maxLength={260}
                placeholder="Ex. : z = r · e^(iθ) avec r = |z| > 0"
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Mots-clés séparés par des virgules (optionnel)
              </span>
              <input
                name="tagsRaw"
                type="text"
                maxLength={120}
                placeholder="Ex. : complexes, module, argument"
                className="input !py-2 !text-sm"
              />
            </label>

            <div className="flex flex-wrap items-center justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-ghost btn-sm"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-sm disabled:opacity-50"
              >
                {isSubmitting ? "Vérification en cours…" : "Soumettre à la validation →"}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {/* FILE DE VALIDATION SIMPLE DES FICHES EN ATTENTE */}
      {pendingSheets.length > 0 ? (
        <section
          className="rounded-2xl border p-5"
          style={{
            background: "var(--callout-warn-bg)",
            borderColor: "var(--callout-warn-border)",
          }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.12em]"
                style={{ color: "var(--callout-warn-ink)" }}
              >
                🛡️ Validation simple des fiches soumises ({pendingSheets.length})
              </p>
              <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                Vérifie la clarté pédagogique de la fiche avant de la publier dans la liste commune (+20 XP).
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingSheets.map((sheet) => (
              <PendingModerationRow
                key={sheet.id}
                sheet={sheet}
                subjectInfo={subjectMap.get(sheet.subjectSlug)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* BARRE DE FILTRES, RECHERCHE & TRI */}
      <section className="card p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une notion, une formule, un auteur…"
            className="input !py-2 !text-sm"
            aria-label="Rechercher parmi les fiches communautaires"
          />

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="select !py-2 !text-xs sm:w-52"
            aria-label="Filtrer par filière"
          >
            <option value="all">Toutes les filières</option>
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSortBy("popular")}
              className={`chip cursor-pointer ${sortBy === "popular" ? "chip-active" : ""}`}
            >
              🔥 Plus aimées
            </button>
            <button
              type="button"
              onClick={() => setSortBy("recent")}
              className={`chip cursor-pointer ${sortBy === "recent" ? "chip-active" : ""}`}
            >
              🕒 Plus récentes
            </button>
          </div>
        </div>

        <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedSubject("all")}
            className={`chip cursor-pointer whitespace-nowrap ${
              selectedSubject === "all" ? "chip-active" : ""
            }`}
          >
            Toutes les matières ({approvedSheets.length})
          </button>
          {subjects
            .filter((sub) => approvedSheets.some((sheet) => sheet.subjectSlug === sub.slug))
            .map((sub) => (
              <button
                key={sub.slug}
                type="button"
                onClick={() => setSelectedSubject(sub.slug)}
                className={`chip cursor-pointer whitespace-nowrap ${
                  selectedSubject === sub.slug ? "chip-active" : ""
                }`}
              >
                {sub.shortName}
              </button>
            ))}
        </div>
      </section>

      {/* LISTE DES FICHES COURTS VALIDÉES AVEC BOUTON « J'AIME » */}
      {filteredSheets.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="display text-lg font-semibold text-[var(--ink)]">
            Aucune fiche ne correspond à ce filtre
          </p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Réinitialise les filtres ou partage la première fiche courte sur ce chapitre !
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject("all");
              setSelectedSection("all");
              setSearchQuery("");
            }}
            className="btn btn-ghost btn-sm mt-4"
          >
            Voir toutes les fiches
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSheets.map((sheet) => {
            const sub = subjectMap.get(sheet.subjectSlug);
            const periodInfo =
              sheet.period in PERIOD_BY_ID
                ? PERIOD_BY_ID[sheet.period as PeriodId]
                : PERIOD_BY_ID.T1;
            const isExpanded = Boolean(expandedIds[sheet.id]);
            const isLongContent = sheet.content.length > 260;

            return (
              <article
                key={sheet.id}
                className="card flex flex-col justify-between p-5 transition"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className="badge"
                        style={{
                          background: sub ? `${sub.accent}18` : "var(--brand-soft)",
                          color: sub ? sub.accent : "var(--brand)",
                        }}
                      >
                        {sub?.name ?? sheet.subjectSlug}
                      </span>
                      <span className="badge badge-slate" title={periodInfo.label}>
                        {periodInfo.short}
                      </span>
                      <span className="badge badge-green">✓ Validée</span>
                    </div>

                    <span className="text-[0.7rem] font-semibold text-[var(--ink-soft)]">
                      {sheet.section}
                    </span>
                  </div>

                  <h2
                    dir="auto"
                    className="display mt-3 text-lg font-semibold leading-snug text-[var(--ink)] sm:text-xl"
                  >
                    {sheet.title}
                  </h2>

                  <p dir="auto" className="mt-1.5 text-xs font-medium text-[var(--ink-soft)]">
                    {sheet.summary}
                  </p>

                  <div
                    dir="auto"
                    className={`mt-3 whitespace-pre-line rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5 text-xs leading-relaxed text-[var(--ink)] ${
                      !isExpanded && isLongContent ? "line-clamp-5" : ""
                    }`}
                  >
                    {sheet.content}
                  </div>

                  {isLongContent ? (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(sheet.id)}
                      className="mt-1.5 cursor-pointer text-xs font-semibold text-[var(--brand)] hover:underline"
                    >
                      {isExpanded ? "Réduire la fiche ↑" : "Lire toute la fiche ↓"}
                    </button>
                  ) : null}

                  {sheet.keyFormula ? (
                    <div
                      dir="auto"
                      className="formula mt-3 rounded-xl border border-[var(--green-border)] bg-[var(--green-soft)] px-3.5 py-2.5 text-xs font-semibold text-[var(--green-ink)]"
                    >
                      <span className="mr-1 uppercase tracking-wider opacity-80">À retenir :</span>
                      {sheet.keyFormula}
                    </div>
                  ) : null}

                  {sheet.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {sheet.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--line)] bg-[var(--surface-subtle)] px-2.5 py-0.5 text-[0.68rem] font-medium text-[var(--ink-soft)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3.5">
                  <div className="min-w-0 text-xs text-[var(--ink-soft)]">
                    <span className="truncate font-semibold text-[var(--ink)]">
                      {sheet.authorName}
                    </span>
                    <span className="mx-1.5" aria-hidden>
                      ·
                    </span>
                    <span>
                      {new Date(sheet.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <SheetLikeButton
                    sheetId={sheet.id}
                    initialLiked={likedSet.has(sheet.id)}
                    initialCount={sheet.likesCount}
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
