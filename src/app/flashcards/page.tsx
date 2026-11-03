import Link from "next/link";
import { Flashcards, type FlashcardItemData } from "@/components/flashcards";
import { EmptyState, PageHeader, PageShell } from "@/components/ui";
import { listLessons, listSubjects } from "@/lib/data";
import { SECTIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function FlashcardsPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string; section?: string }>;
}) {
  const params = await searchParams;
  const [subjects, lessons] = await Promise.all([listSubjects(), listLessons()]);

  const activeSubject = params.matiere ?? null;
  const activeSection =
    params.section && SECTIONS.includes(params.section as (typeof SECTIONS)[number])
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
    const section = next.section === undefined ? activeSection : next.section;
    if (section) search.set("section", section);
    if (matiere) search.set("matiere", matiere);
    const query = search.toString();
    return query ? `/flashcards?${query}` : "/flashcards";
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Mémorisation active · Recto / Verso"
        title="Cartes mémos (Flashcards)"
        description={
          <p>
            Entraîne ta mémoire active : lis la question au recto, formule ta réponse à voix haute ou sur brouillon,
            retourne la carte pour vérifier, puis classe-la en <strong>Maîtrisée</strong> ou <strong>À revoir</strong>.
          </p>
        }
        actions={
          <Link href="/cours" className="btn btn-ghost btn-sm">
            Fiches de cours
          </Link>
        }
      />

      <div className="mb-6 grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3.5 sm:grid-cols-[auto_1fr] sm:items-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Filière</p>
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

      {deckCards.length === 0 ? (
        <EmptyState
          title="Aucune carte mémo pour ce filtre"
          text="Essaie une autre matière ou affiche toutes les filières pour réviser l'ensemble des cartes."
          action={{ href: "/flashcards", label: "Voir toutes les cartes" }}
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
