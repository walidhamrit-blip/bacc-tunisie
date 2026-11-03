import Link from "next/link";
import { PageHeader, PageShell, SubjectGlyph } from "@/components/ui";
import { PROGRAM, getProgramSection, programChapters } from "@/db/content/program";
import { getDashboard, getStudentLessonSlugs, listLessons, listQuizzes, listSubjects } from "@/lib/data";
import { PERIODS, SECTIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function ProgramPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; matiere?: string; vue?: string; trimestre?: string }>;
}) {
  const params = await searchParams;
  const section = SECTIONS.includes(params.section as (typeof SECTIONS)[number]) ? params.section! : null;
  const vue = params.vue === "devoirs" ? "devoirs" : "matieres";
  const focusPeriod = PERIODS.find((period) => period.id === params.trimestre)?.id ?? "T1";

  const [subjects, lessons, quizzes, dashboard] = await Promise.all([
    listSubjects(),
    listLessons(),
    listQuizzes(),
    getDashboard(),
  ]);
  const doneLessons = await getStudentLessonSlugs(dashboard.student.id);
  const subjectBySlug = new Map(subjects.map((subject) => [subject.slug, subject]));
  const lessonBySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));

  const activeSection = section ?? dashboard.student.section;
  const program = getProgramSection(activeSection) ?? PROGRAM[0];

  /* Sans filière choisie : on présente les 7 filières du bac. */
  if (!section) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Programme officiel · 4ème année"
          title="Le plan des cours, filière par filière"
          description={
            <p>
              Chaque filière du baccalauréat tunisien a son propre programme : des matières obligatoires, des
              coefficients, et des chapitres répartis sur les trois trimestres de l&apos;année. Choisis ta filière pour
              voir ton année complète, chapitre par chapitre, avec les devoirs de synthèse de chaque trimestre.
            </p>
          }
          actions={
            <Link href="/matieres" className="btn btn-ghost btn-sm">
              Voir les matières
            </Link>
          }
        />
        <div className="grid gap-3.5 sm:grid-cols-2">
          {PROGRAM.map((entry) => {
            const chapterCount = entry.subjects.reduce(
              (total, subject) => total + subject.themes.reduce((sum, theme) => sum + theme.chapters.length, 0),
              0,
            );
            return (
              <Link
                key={entry.section}
                href={`/programme?section=${encodeURIComponent(entry.section)}`}
                className="card card-hover p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="display text-lg font-semibold text-[var(--ink)]">{entry.section}</p>
                  <span className="badge badge-slate">{entry.subjects.length} matières</span>
                </div>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-[var(--ink-soft)]">{entry.motto}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem] font-semibold">
                  <span className="badge badge-slate">{chapterCount} chapitres</span>
                  <span className="badge badge-slate">{entry.subjects[0]?.name}</span>
                  {entry.subjects[0]?.coefficient ? (
                    <span className="badge badge-slate">coef. {entry.subjects[0].coefficient}</span>
                  ) : null}
                </div>
                <p className="mt-3 flex items-center justify-between text-sm font-semibold text-[var(--brand)]">
                  Voir le programme
                  <span aria-hidden>→</span>
                </p>
              </Link>
            );
          })}
        </div>
      </PageShell>
    );
  }

  const chapters = programChapters(activeSection);
  const periodStats = PERIODS.map((period) => ({
    ...period,
    chapters: chapters.filter((row) => row.chapter.period === period.id),
  }));
  const linkedChapters = chapters.filter((row) => row.chapter.lessonSlug).length;
  const totalChapters = chapters.length;
  const doneChapters = chapters.filter(
    (row) => row.chapter.lessonSlug && doneLessons.has(row.chapter.lessonSlug),
  ).length;
  const quizCount = chapters.filter((row) => row.chapter.quizSlug).length;
  const activeSubject = params.matiere && program.subjects.some((s) => s.slug === params.matiere)
    ? params.matiere
    : null;

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Programme officiel · ${activeSection}`}
        title="Ton année de bac, trimestre par trimestre"
        description={<p>{program.rhythm}</p>}
        actions={
          <>
            <Link href="/cours" className="btn btn-ghost btn-sm">
              Fiches de cours
            </Link>
            <Link href="/evaluation" className="btn btn-primary btn-sm">
              Mon niveau
            </Link>
          </>
        }
      />

      <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
        {PROGRAM.map((entry) => (
          <Link
            key={entry.section}
            href={`/programme?section=${encodeURIComponent(entry.section)}`}
            className={`chip whitespace-nowrap ${activeSection === entry.section ? "chip-active" : ""}`}
          >
            {entry.section}
          </Link>
        ))}
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Matières</p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">{program.subjects.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Chapitres</p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--ink)]">{totalChapters}</p>
        </div>
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            Chapitres avec fiche
          </p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--brand)]">
            {linkedChapters}
            <span className="text-sm text-[var(--ink-soft)]"> / {totalChapters}</span>
          </p>
        </div>
        <div className="card p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Déjà révisés</p>
          <p className="display mt-1 text-2xl font-semibold text-[var(--green)]">
            {doneChapters}
            <span className="text-sm text-[var(--ink-soft)]"> / {linkedChapters}</span>
          </p>
        </div>
      </div>

      {/* Frise de l'année : les 4 périodes du bac */}
      <section className="card mb-7 overflow-hidden p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">Frise de l&apos;année</p>
            <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">
              Septembre → juin, avec les devoirs de synthèse
            </p>
          </div>
          <Link href="/examens" className="btn btn-ghost btn-sm">
            Sujets d&apos;examen
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {periodStats.map((period) => (
            <a
              key={period.id}
              href={`#${period.id.toLowerCase()}`}
              className="rounded-2xl border border-[var(--line)] bg-[#fcfaf5] p-4 transition hover:border-[var(--brand)]/40"
            >
              <div className="flex items-center justify-between">
                <span className="badge badge-slate">{period.short}</span>
                <span className="text-[0.7rem] font-semibold text-[var(--ink-soft)]">{period.months}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{period.label}</p>
              <p className="text-[0.75rem] text-[var(--ink-soft)]">{period.exam}</p>
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--brand)]">
                {period.chapters.length} chapitres
              </p>
            </a>
          ))}
        </div>
      </section>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Link
          href={`/programme?section=${encodeURIComponent(activeSection)}${activeSubject ? `&matiere=${activeSubject}` : ""}`}
          className={`chip ${vue === "matieres" ? "chip-active" : ""}`}
        >
          Par matière
        </Link>
        <Link
          href={`/programme?section=${encodeURIComponent(activeSection)}&vue=devoirs`}
          className={`chip ${vue === "devoirs" ? "chip-active" : ""}`}
        >
          Par devoir de synthèse
        </Link>
        <span className="text-xs text-[var(--ink-soft)]">
          {vue === "devoirs"
            ? "Tout ce qui est évalué à chaque DS, matière par matière."
            : "Le plan complet, thème par thème."}
        </span>
      </div>

      {vue === "devoirs" ? (
        <section className="space-y-5">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {PERIODS.map((period) => (
              <Link
                key={period.id}
                href={`/programme?section=${encodeURIComponent(activeSection)}&vue=devoirs&trimestre=${period.id}`}
                className={`chip whitespace-nowrap ${focusPeriod === period.id ? "chip-active" : ""}`}
              >
                {period.id === "REV" ? "Révision (juin)" : `${period.short} · ${period.label}`}
              </Link>
            ))}
          </div>

          {(() => {
            const period = PERIODS.find((item) => item.id === focusPeriod)!;
            return (
              <div className="card p-5">
                <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[var(--line)] pb-3">
                  <div>
                    <p className="eyebrow">{period.label}</p>
                    <p className="display text-xl font-semibold text-[var(--ink)]">{period.exam}</p>
                    <p className="text-xs text-[var(--ink-soft)]">
                      {period.months} · {period.id === "REV" ? "révision générale et épreuves du bac" : "chapitres évalués"}
                    </p>
                  </div>
                  <Link href="/examens" className="btn btn-ghost btn-sm">
                    Sujets d&apos;examen
                  </Link>
                </div>
                <p className="mt-3 text-[0.85rem] text-[var(--ink-soft)]">
                  Ce devoir porte sur les chapitres ci-dessous. Commence par les matières à fort coefficient, puis
                  vérifie chaque chapitre avec sa fiche et son quiz.
                </p>
              </div>
            );
          })()}

          <div className="space-y-4">
            {program.subjects.map((subject) => {
              const rows = subject.themes
                .flatMap((theme) => theme.chapters.map((chapter) => ({ theme, chapter })))
                .filter((row) => row.chapter.period === focusPeriod);
              if (rows.length === 0) return null;
              return (
                <section key={subject.slug} className="card p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[0.95rem] font-semibold text-[var(--ink)]">
                      {subject.name}{" "}
                      <span className="ml-1 text-[0.7rem] font-semibold text-[var(--ink-soft)]">
                        coefficient {subject.coefficient}
                      </span>
                    </p>
                    <span className="badge badge-slate">
                      {rows.length} chapitre{rows.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {rows.map(({ theme, chapter }) => {
                      const lesson = chapter.lessonSlug ? lessonBySlug.get(chapter.lessonSlug) : null;
                      const quiz = chapter.quizSlug ? quizzes.find((item) => item.slug === chapter.quizSlug) : null;
                      return (
                        <li
                          key={`${theme.slug}-${chapter.slug}`}
                          className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl px-2 py-1.5 hover:bg-[#faf7f0]"
                        >
                          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-[var(--ink-soft)]">
                            {theme.title}
                          </span>
                          <span className="text-[var(--ink-soft)]" aria-hidden>
                            ›
                          </span>
                          <span className="min-w-0 flex-1 text-[0.86rem] text-[var(--ink)]">
                            {lesson ? (
                              <Link href={`/cours/${lesson.slug}`} className="font-semibold hover:text-[var(--brand)]">
                                {chapter.title}
                              </Link>
                            ) : (
                              chapter.title
                            )}
                          </span>
                          {lesson ? (
                            <Link href={`/cours/${lesson.slug}`} className="btn btn-ghost btn-sm !px-2.5 !py-1 !text-xs">
                              Cours
                            </Link>
                          ) : null}
                          {quiz ? (
                            <Link href={`/quiz/${quiz.slug}`} className="btn btn-ghost btn-sm !px-2.5 !py-1 !text-xs">
                              Quiz
                            </Link>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </section>
      ) : (
      <>
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        <Link
          href={`/programme?section=${encodeURIComponent(activeSection)}`}
          className={`chip whitespace-nowrap ${!activeSubject ? "chip-active" : ""}`}
        >
          Toutes les matières
        </Link>
        {program.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/programme?section=${encodeURIComponent(activeSection)}&matiere=${subject.slug}`}
            className={`chip whitespace-nowrap ${activeSubject === subject.slug ? "chip-active" : ""}`}
          >
            {subject.name}
          </Link>
        ))}
      </div>

      <div className="space-y-5">
        {program.subjects
          .filter((subject) => !activeSubject || subject.slug === activeSubject)
          .map((subject) => {
            const subjectRecord = subjectBySlug.get(subject.slug);
            const subjectChapters = subject.themes.flatMap((theme) => theme.chapters);
            const subjectDone = subjectChapters.filter(
              (chapter) => chapter.lessonSlug && doneLessons.has(chapter.lessonSlug),
            ).length;
            const subjectLinked = subjectChapters.filter((chapter) => chapter.lessonSlug).length;
            return (
              <section key={subject.slug} className="card p-5">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] pb-4">
                  <div className="flex min-w-0 items-start gap-3">
                    {subjectRecord ? <SubjectGlyph subject={subjectRecord} size={42} /> : null}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="display text-lg font-semibold text-[var(--ink)]">{subject.name}</p>
                        <span className="badge badge-slate">coefficient {subject.coefficient}</span>
                        {subject.specialty ? (
                          <span className="badge" style={{ background: "var(--gold-soft)", color: "#8a6200" }}>
                            Spécialité
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-[var(--ink-soft)]">
                        {subject.themes.length} thème{subject.themes.length > 1 ? "s" : ""} · {subjectChapters.length}{" "}
                        chapitres · {subjectLinked} fiche{subjectLinked > 1 ? "s" : ""} disponible
                        {subjectLinked > 1 ? "s" : ""} · {subjectDone} révisé{subjectDone > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <Link href={`/matieres/${subject.slug}`} className="btn btn-ghost btn-sm">
                    Ressources
                  </Link>
                </div>

                <div className="space-y-4">
                  {subject.themes.map((theme) => (
                    <div key={theme.slug}>
                      <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                        {theme.title}
                      </p>
                      <ul className="space-y-1.5">
                        {theme.chapters.map((chapter) => {
                          const lesson = chapter.lessonSlug ? lessonBySlug.get(chapter.lessonSlug) : null;
                          const quiz = chapter.quizSlug
                            ? quizzes.find((item) => item.slug === chapter.quizSlug)
                            : null;
                          const done = chapter.lessonSlug ? doneLessons.has(chapter.lessonSlug) : false;
                          const period = PERIODS.find((item) => item.id === chapter.period);
                          return (
                            <li
                              key={`${subject.slug}-${chapter.slug}`}
                              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl px-2 py-1.5 transition hover:bg-[#faf7f0]"
                            >
                              <span
                                className="inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-full text-[0.62rem] font-bold"
                                style={{
                                  background: chapter.period === "T1" ? "#eef2ff" : chapter.period === "T2" ? "#ecfdf5" : chapter.period === "T3" ? "#fff7ed" : "#f5f3ff",
                                  color: chapter.period === "T1" ? "#1b45b8" : chapter.period === "T2" ? "#0E9F6E" : chapter.period === "T3" ? "#8a4b12" : "#5b21b6",
                                }}
                                title={`${period?.label} · ${period?.exam}`}
                              >
                                {period?.short}
                              </span>
                              <span className="min-w-0 flex-1 text-[0.88rem] text-[var(--ink)]">
                                {lesson ? (
                                  <Link href={`/cours/${lesson.slug}`} className="font-semibold hover:text-[var(--brand)]">
                                    {chapter.title}
                                  </Link>
                                ) : (
                                  chapter.title
                                )}
                                {lesson && !done ? (
                                  <span className="ml-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[var(--green)]">
                                    fiche prête
                                  </span>
                                ) : null}
                                {done ? (
                                  <span className="ml-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                                    ✓ révisé
                                  </span>
                                ) : null}
                              </span>
                              <span className="flex shrink-0 items-center gap-1.5">
                                {lesson ? (
                                  <Link href={`/cours/${lesson.slug}`} className="btn btn-ghost btn-sm !px-2.5 !py-1 !text-xs">
                                    Cours
                                  </Link>
                                ) : (
                                  <span className="text-[0.68rem] text-[var(--ink-soft)]">fiche à venir</span>
                                )}
                                {quiz ? (
                                  <Link href={`/quiz/${quiz.slug}`} className="btn btn-ghost btn-sm !px-2.5 !py-1 !text-xs">
                                    Quiz
                                  </Link>
                                ) : null}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>

      </>
      )}

      <section className="card mt-7 p-5">
        <p className="eyebrow">Comment lire ce programme</p>
        <div className="mt-3 grid gap-3 text-[0.85rem] text-[var(--ink-soft)] sm:grid-cols-2">
          <p>
            <strong className="text-[var(--ink)]">T1, T2, T3</strong> : le trimestre où le chapitre est enseigné et
            évalué. Le devoir de synthèse N°1 porte sur les chapitres T1, le N°2 sur T2, le N°3 sur T3.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Rév.</strong> : la période de juin, consacrée à la révision générale et
            à l&apos;examen du baccalauréat.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Coefficient</strong> : le poids officiel de la matière dans la moyenne
            du bac pour cette filière.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Fiche à venir</strong> : le chapitre figure au programme officiel mais
            n&apos;a pas encore de fiche de cours détaillée dans l&apos;application — utilise en attendant les quiz et
            les examens de la matière.
          </p>
        </div>
        <p className="mt-4 text-[0.75rem] text-[var(--ink-soft)]">
          Quiz disponibles dans cette filière : <strong className="text-[var(--ink)]">{quizCount}</strong> chapitres
          disposent d&apos;un quiz de vérification.
        </p>
      </section>
    </PageShell>
  );
}
