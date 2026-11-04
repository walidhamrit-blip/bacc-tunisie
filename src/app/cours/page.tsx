import Link from "next/link";
import { getDashboard, getStudentLessonSlugs, listLessons, listSubjects } from "@/lib/data";
import { lessonDisplayPeriod, lessonPeriodsForFilter } from "@/db/content/program";
import { OfflineSyncButton } from "@/components/offline-sync-button";
import { PageHeader, PageShell, ProgressBar, SubjectGlyph } from "@/components/ui";
import { PERIOD_BY_ID, PERIODS, SECTIONS, type PeriodId } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string; section?: string; trimestre?: string }>;
}) {
  const params = await searchParams;
  const [subjects, lessons, dashboard] = await Promise.all([listSubjects(), listLessons(), getDashboard()]);
  const doneLessons = await getStudentLessonSlugs(dashboard.student.id);
  const locked = isLockedStudent(dashboard.student);

  const activeSubject = params.matiere;
  const activeSection = locked
    ? dashboard.student.section
    : params.section && SECTIONS.includes(params.section as (typeof SECTIONS)[number])
      ? params.section
      : null;
  const activePeriod = params.trimestre && PERIOD_BY_ID[params.trimestre as keyof typeof PERIOD_BY_ID]
    ? (params.trimestre as PeriodId)
    : null;

  const filtered = lessons
    .filter((lesson) => (activeSubject ? lesson.subjectSlug === activeSubject : true))
    /* Une fiche sans filière renseignée est considérée comme valable partout. */
    .filter((lesson) =>
      activeSection ? lesson.sections.length === 0 || lesson.sections.includes(activeSection) : true,
    )
    .filter((lesson) =>
      activePeriod
        ? lessonPeriodsForFilter(lesson.slug, activeSection, lesson.period).includes(activePeriod)
        : true,
    );

  const grouped = subjects
    .map((subject) => ({
      subject,
      lessons: filtered.filter((lesson) => lesson.subjectSlug === subject.slug),
    }))
    .filter((group) => group.lessons.length > 0);

  /* Les fiches sont ordonnées par trimestre (dans la filière choisie) dans chaque matière. */
  const periodRank: Record<string, number> = { T1: 1, T2: 2, T3: 3, REV: 4 };
  for (const group of grouped) {
    group.lessons = [...group.lessons].sort((a, b) => {
      const periodA = lessonDisplayPeriod(a.slug, activeSection, a.period);
      const periodB = lessonDisplayPeriod(b.slug, activeSection, b.period);
      return (periodRank[periodA] ?? 9) - (periodRank[periodB] ?? 9) || a.orderIndex - b.orderIndex;
    });
  }

  const filterHref = (next: { section?: string | null; trimestre?: string | null; matiere?: string | null }) => {
    const search = new URLSearchParams();
    const section = locked
      ? dashboard.student.section
      : next.section === undefined
        ? activeSection
        : next.section;
    const trimestre = next.trimestre === undefined ? activePeriod : next.trimestre;
    const matiere = next.matiere === undefined ? activeSubject : next.matiere;
    if (section && !locked) search.set("section", section);
    if (trimestre) search.set("trimestre", trimestre);
    if (matiere) search.set("matiere", matiere);
    const query = search.toString();
    return query ? `/cours?${query}` : "/cours";
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Cours pédagogiques"
        title="Les fiches de cours, matière par matière"
        description={
          <p>
            Chaque fiche contient les objectifs, les notions expliquées simplement, les formules utiles, les erreurs
            fréquentes et des cartes de révision. Chaque fiche est rattachée à sa filière et à son trimestre du
            programme officiel tunisien : filtre pour ne voir que ce qui est évalué à ton prochain devoir de synthèse.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <OfflineSyncButton lessonSlugs={lessons.map((lesson) => lesson.slug)} />
            <Link href="/quiz" className="btn btn-ghost btn-sm">
              Aller aux quiz
            </Link>
          </div>
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

      <div className="mb-5 grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Filière</p>
        {locked ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-active">🔒 {dashboard.student.section}</span>
            <span className="text-xs text-[var(--ink-soft)]">
              Abonnement individuel verrouillé sur cette unique section
            </span>
          </div>
        ) : (
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
            <Link
              href={filterHref({ section: null })}
              className={`chip whitespace-nowrap ${!activeSection ? "chip-active" : ""}`}
            >
              Toutes
            </Link>
            {SECTIONS.map((item) => (
              <Link
                key={item}
                href={filterHref({ section: item })}
                className={`chip whitespace-nowrap ${activeSection === item ? "chip-active" : ""}`}
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Trimestre</p>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          <Link
            href={filterHref({ trimestre: null })}
            className={`chip whitespace-nowrap ${!activePeriod ? "chip-active" : ""}`}
          >
            Toute l&apos;année
          </Link>
          {PERIODS.map((period) => (
            <Link
              key={period.id}
              href={filterHref({ trimestre: period.id })}
              className={`chip whitespace-nowrap ${activePeriod === period.id ? "chip-active" : ""}`}
              title={`${period.label} · ${period.exam}`}
            >
              {period.label}
            </Link>
          ))}
        </div>
        {activeSection ? (
          <div className="sm:col-span-2">
            <Link
              href={`/programme?section=${encodeURIComponent(activeSection)}`}
              className="text-xs font-semibold text-[var(--brand)]"
            >
              Voir le programme complet de la filière {activeSection} →
            </Link>
          </div>
        ) : null}
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
                {subjectLessons.map((lesson) => {
                  const displayPeriod = activePeriod
                    ? activePeriod
                    : lessonDisplayPeriod(lesson.slug, activeSection, lesson.period);
                  const periodInfo = PERIOD_BY_ID[displayPeriod];
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/cours/${lesson.slug}`}
                      className="rounded-xl border border-[var(--line)] p-4 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                          {lesson.chapter}
                        </p>
                        <span className="flex shrink-0 items-center gap-1.5">
                          <span
                            className="badge badge-slate"
                            title={`${periodInfo?.label ?? displayPeriod} · ${periodInfo?.exam ?? ""}`}
                          >
                            {periodInfo?.short ?? displayPeriod}
                          </span>
                          {doneLessons.has(lesson.slug) ? <span className="badge badge-green">compris</span> : null}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold leading-snug text-[var(--ink)]">{lesson.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{lesson.summary}</p>
                      <p className="mt-2 text-[0.7rem] font-semibold" style={{ color: subject.accent }}>
                        {lesson.durationMin} min · {lesson.objectives.length} objectifs →
                      </p>
                    </Link>
                  );
                })}
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
