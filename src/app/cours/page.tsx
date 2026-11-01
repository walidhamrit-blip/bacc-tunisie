import Link from "next/link";
import { getDashboard, getStudentLessonSlugs, listLessons, listSubjects } from "@/lib/data";
import { PageHeader, PageShell, ProgressBar, SubjectGlyph } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string }>;
}) {
  const params = await searchParams;
  const [subjects, lessons, dashboard] = await Promise.all([listSubjects(), listLessons(), getDashboard()]);
  const doneLessons = await getStudentLessonSlugs(dashboard.student.id);
  const activeSubject = params.matiere;
  const filtered = activeSubject ? lessons.filter((lesson) => lesson.subjectSlug === activeSubject) : lessons;
  const grouped = subjects
    .map((subject) => ({
      subject,
      lessons: filtered.filter((lesson) => lesson.subjectSlug === subject.slug),
    }))
    .filter((group) => group.lessons.length > 0);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Cours pédagogiques"
        title="Les fiches de cours, matière par matière"
        description={
          <p>
            Chaque fiche contient les objectifs, les notions expliquées simplement, les formules utiles, les erreurs
            fréquentes et des cartes de révision. Le niveau indiqué correspond au programme officiel tunisien.
          </p>
        }
        actions={
          <Link href="/quiz" className="btn btn-ghost btn-sm">
            Aller aux quiz
          </Link>
        }
      />

      <div className="no-scrollbar mb-7 flex gap-2 overflow-x-auto pb-1">
        <Link href="/cours" className={`chip whitespace-nowrap ${!activeSubject ? "chip-active" : ""}`}>
          Toutes les matières
        </Link>
        {subjects
          .filter((subject) => lessons.some((lesson) => lesson.subjectSlug === subject.slug))
          .map((subject) => (
            <Link
              key={subject.slug}
              href={`/cours?matiere=${subject.slug}`}
              className={`chip whitespace-nowrap ${activeSubject === subject.slug ? "chip-active" : ""}`}
            >
              {subject.shortName}
            </Link>
          ))}
      </div>

      <div className="space-y-6">
        {grouped.map(({ subject, lessons: subjectLessons }) => {
          const level = dashboard.subjectLevels.find((row) => row.subject.slug === subject.slug);
          return (
            <section key={subject.slug} className="card p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <SubjectGlyph subject={subject} size={40} />
                  <div>
                    <p className="text-[0.98rem] font-semibold text-[var(--ink)]">{subject.name}</p>
                    <p className="text-xs text-[var(--ink-soft)]">
                      {subjectLessons.length} fiche{subjectLessons.length > 1 ? "s" : ""} · {subject.family}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32">
                    <ProgressBar value={level?.mastery ?? 0} tone={subject.accent} label="maîtrise" />
                  </div>
                  <Link href={`/matieres/${subject.slug}`} className="btn btn-ghost btn-sm">
                    Matière
                  </Link>
                </div>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {subjectLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/cours/${lesson.slug}`}
                    className="rounded-xl border border-[var(--line)] p-4 transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                        {lesson.chapter}
                      </p>
                      {doneLessons.has(lesson.slug) ? <span className="badge badge-green">compris</span> : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold leading-snug text-[var(--ink)]">{lesson.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{lesson.summary}</p>
                    <p className="mt-2 text-[0.7rem] font-semibold" style={{ color: subject.accent }}>
                      {lesson.durationMin} min · {lesson.objectives.length} objectifs →
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      {grouped.length === 0 ? (
        <div className="card p-8 text-center text-sm text-[var(--ink-soft)]">
          Aucune fiche pour ce filtre.{" "}
          <Link href="/cours" className="font-semibold text-[var(--brand)]">
            Voir toutes les fiches
          </Link>
        </div>
      ) : null}
    </PageShell>
  );
}
