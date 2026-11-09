import Link from "next/link";
import { Flashcards, type FlashcardItemData } from "@/components/flashcards";
import { EmptyState, PageHeader, PageShell } from "@/components/ui";
import { getStudent, listLessons, listSubjects } from "@/lib/data";
import { SECTIONS } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string; section?: string }>;
}) {
  const params = await searchParams;
  const [subjects, lessons, student] = await Promise.all([
    listSubjects(),
    listLessons(),
    getStudent(),
  ]);

  const locked = isLockedStudent(student);
  const activeSubject = params.matiere ?? null;
  const activeSection = locked
    ? student.section
    : params.section && SECTIONS.includes(params.section as (typeof SECTIONS)[number])
      ? params.section
      : null;

  const subjectBySlug = new Map(subjects.map((subject) => [subject.slug, subject]));

  const filteredLessons = lessons
    .filter((lesson) => (activeSubject ? lesson.subjectSlug === activeSubject : true))
    .filter((lesson) =>
      activeSection ? lesson.sections.length === 0 || lesson.sections.includes(activeSection) : true,
    );

  const deckCards: FlashcardItemData[] = filteredLessons.flatMap((lesson) => {
    const subject = subjectBySlug.get(lesson.subjectSlug);
    return lesson.flashcards.map((card, cardIndex) => ({
      id: `${lesson.slug}-${cardIndex}`,
      question: card.question,
      answer: card.answer,
      category: subject?.shortName ?? lesson.subjectSlug,
      subtitle: lesson.title,
    }));
  });

  const buildFilterHref = (next: { matiere?: string | null; section?: string | null }) => {
    const search = new URLSearchParams();
    const matiere = next.matiere === undefined ? activeSubject : next.matiere;
    const section = locked
      ? student.section
      : next.section === undefined
        ? activeSection
        : next.section;
    if (section && !locked) search.set("section", section);
    if (matiere) search.set("matiere", matiere);
    const query = search.toString();
    return query ? `/flashcards?${query}` : "/flashcards";
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Mémorisation"
        title="Flashcards"
        description={
          <p>Retourne la carte pour vérifier ta réponse, puis classe-la en « Maîtrisée » ou « À revoir ».</p>
        }
        actions={
          <Link href="/cours" className="btn btn-ghost btn-sm">
            Fiches de cours
          </Link>
        }
      />

      <details className="filter-details mb-6">
        <summary className="filter-details-summary">
          <span>Filière &amp; matière</span>
          <span className="filter-details-state">
            {locked ? student.section : activeSection ?? "Toutes les filières"} ·{" "}
            {subjects.find((subject) => subject.slug === activeSubject)?.shortName ?? "Toutes les matières"}
          </span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div className="filter-details-body grid gap-2 sm:grid-cols-[auto_1fr] sm:items-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Filière</p>
          {locked ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-active">🔒 {student.section}</span>
              <span className="text-xs text-[var(--ink-soft)]">
                Cartes filtrées sur l&apos;unique section de ton abonnement
              </span>
            </div>
          ) : (
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
              <Link
                href={buildFilterHref({ section: null })}
                className={`chip whitespace-nowrap ${!activeSection ? "chip-active" : ""}`}
              >
                Toutes
              </Link>
              {SECTIONS.map((section) => (
                <Link
                  key={section}
                  href={buildFilterHref({ section })}
                  className={`chip whitespace-nowrap ${activeSection === section ? "chip-active" : ""}`}
                >
                  {section}
                </Link>
              ))}
            </div>
          )}

          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Matière</p>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            <Link
              href={buildFilterHref({ matiere: null })}
              className={`chip whitespace-nowrap ${!activeSubject ? "chip-active" : ""}`}
            >
              Toutes ({lessons.reduce((sum, item) => sum + item.flashcards.length, 0)})
            </Link>
            {subjects
              .filter((subject) => lessons.some((lesson) => lesson.subjectSlug === subject.slug && lesson.flashcards.length > 0))
              .map((subject) => (
                <Link
                  key={subject.slug}
                  href={buildFilterHref({ matiere: subject.slug })}
                  className={`chip whitespace-nowrap ${activeSubject === subject.slug ? "chip-active" : ""}`}
                >
                  {subject.shortName}
                </Link>
              ))}
          </div>
        </div>
      </details>

      {deckCards.length === 0 ? (
        <EmptyState
          title="Aucune carte mémo pour ce filtre"
          text="Essaie une autre matière de ta section pour réviser tes cartes."
          action={{ href: "/flashcards", label: "Voir toutes mes cartes" }}
        />
      ) : (
        <div className="mx-auto max-w-2xl">
          <div className="card p-5 sm:p-7">
            <Flashcards
              key={`${activeSection ?? "all"}-${activeSubject ?? "all"}`}
              cards={deckCards}
            />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--ink-soft)]">
            Astuce clavier : clique sur la carte puis utilise <strong>Espace / Entrée</strong> pour retourner et les
            flèches <strong>← / →</strong> pour naviguer.
          </p>
        </div>
      )}
    </PageShell>
  );
}
