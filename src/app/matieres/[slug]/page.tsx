import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDashboard,
  getStudentExamSlugs,
  getStudentExerciseSlugs,
  getStudentLessonSlugs,
  getSubject,
  listExams,
  listExercises,
  listLessons,
  listQuizzes,
} from "@/lib/data";
import { DifficultyDots, LevelPill, PageShell, ProgressBar, SubjectGlyph } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = await getSubject(slug);
  if (!subject) notFound();

  const [lessons, exercises, exams, quizzes, dashboard] = await Promise.all([
    listLessons(slug),
    listExercises(slug),
    listExams(slug),
    listQuizzes(slug),
    getDashboard(),
  ]);

  const [doneLessons, doneExercises, doneExams] = await Promise.all([
    getStudentLessonSlugs(dashboard.student.id),
    getStudentExerciseSlugs(dashboard.student.id),
    getStudentExamSlugs(dashboard.student.id),
  ]);

  const level = dashboard.subjectLevels.find((row) => row.subject.slug === slug);

  return (
    <PageShell>
      <Link href="/matieres" className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--brand)]">
        ← Toutes les matières
      </Link>

      <div className="card overflow-hidden">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SubjectGlyph subject={subject} size={54} />
              <div>
                <p className="eyebrow">{subject.family}</p>
                <h1 className="display text-3xl font-semibold text-[var(--ink)] sm:text-[2.4rem]">{subject.name}</h1>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">{subject.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {subject.sections.map((section) => (
                <span key={section} className="badge badge-slate">
                  {section}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {lessons[0] ? (
                <Link href={`/cours/${lessons[0].slug}`} className="btn btn-primary btn-sm">
                  Commencer le cours
                </Link>
              ) : null}
              {quizzes[0] ? (
                <Link href={`/quiz/${quizzes[0].slug}`} className="btn btn-dark btn-sm">
                  Tester mon niveau
                </Link>
              ) : null}
              <Link href={`/correction?matiere=${subject.slug}`} className="btn btn-ghost btn-sm">
                Joindre un PDF
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[#fcfaf5] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">Ma maîtrise</p>
              {level ? <LevelPill level={level.level} /> : <span className="badge badge-slate">Pas encore évalué</span>}
            </div>
            <p className="display mt-2 text-4xl font-semibold text-[var(--ink)]">{level?.mastery ?? 0}%</p>
            <div className="mt-2">
              <ProgressBar value={level?.mastery ?? 0} tone={subject.accent} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Metric label="Fiches" done={level?.lessonsDone ?? 0} total={lessons.length} />
              <Metric label="Exercices" done={level?.exercisesDone ?? 0} total={exercises.length} />
              <Metric label="Séries" done={level?.examsDone ?? 0} total={exams.length} />
            </div>
            <div className="mt-3 rounded-lg bg-white px-3 py-2 text-[0.72rem] text-[var(--ink-soft)]">
              {level?.quizAverage !== null && level?.quizAverage !== undefined
                ? `Moyenne aux quiz : ${level.quizAverage}% sur ${level.quizCount} tentative(s).`
                : "Aucun quiz passé dans cette matière : le score repose sur ta couverture du programme."}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-5">
          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">Plan du cours</p>
                <h2 className="display text-xl font-semibold text-[var(--ink)]">Fiches de cours</h2>
              </div>
              <span className="badge badge-slate">{lessons.length} fiches</span>
            </div>
            {lessons.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">Les fiches de cette matière arrivent bientôt.</p>
            ) : (
              <ul className="divide-y divide-[var(--line)]">
                {lessons.map((lesson, index) => {
                  const done = doneLessons.has(lesson.slug);
                  return (
                    <li key={lesson.slug} className="py-3 first:pt-0 last:pb-0">
                      <Link href={`/cours/${lesson.slug}`} className="group flex items-start gap-3">
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold"
                          style={{ background: done ? "var(--green-soft)" : "#f6f1e7", color: done ? "var(--green)" : "var(--ink-soft)" }}
                        >
                          {done ? "✓" : index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.94rem] font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">
                            {lesson.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--ink-soft)]">
                            {lesson.chapter} · {lesson.durationMin} min
                          </span>
                        </span>
                        <span className="text-xs font-semibold text-[var(--ink-soft)]">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">Entraînement</p>
                <h2 className="display text-xl font-semibold text-[var(--ink)]">Exercices corrigés</h2>
              </div>
              <span className="badge badge-slate">{exercises.length}</span>
            </div>
            {exercises.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">Aucun exercice publié pour cette matière pour le moment.</p>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {exercises.map((exercise) => (
                  <Link
                    key={exercise.slug}
                    href={`/exercices/${exercise.slug}`}
                    className="rounded-xl border border-[var(--line)] p-3.5 transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-[var(--ink-soft)]">
                        {exercise.theme}
                      </span>
                      {doneExercises.has(exercise.slug) ? <span className="badge badge-green">fait</span> : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{exercise.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[0.7rem] text-[var(--ink-soft)]">
                      <DifficultyDots level={exercise.difficulty} />
                      <span>{exercise.durationMin} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">Type bac</p>
                <h2 className="display text-xl font-semibold text-[var(--ink)]">Examens & séries corrigés</h2>
              </div>
              <span className="badge badge-slate">{exams.length}</span>
            </div>
            {exams.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">Les sujets de cette matière seront ajoutés prochainement.</p>
            ) : (
              <ul className="space-y-2.5">
                {exams.map((exam) => (
                  <li key={exam.slug}>
                    <Link
                      href={`/examens/${exam.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-[var(--line)] p-3.5 transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                    >
                      <span className="badge badge-gold">{exam.kind === "serie" ? "Série" : "Session"}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-[var(--ink)]">{exam.title}</span>
                        <span className="block text-xs text-[var(--ink-soft)]">
                          {exam.section} · {exam.durationMin} min · {exam.year}
                        </span>
                      </span>
                      {doneExams.has(exam.slug) ? <span className="badge badge-green">travaillé</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="card p-5">
            <p className="eyebrow">Quiz</p>
            <h2 className="display text-xl font-semibold text-[var(--ink)]">Vérifie ta compréhension</h2>
            <div className="mt-3 space-y-2">
              {quizzes.length === 0 ? (
                <p className="text-sm text-[var(--ink-soft)]">Pas encore de quiz pour cette matière.</p>
              ) : (
                quizzes.map((quiz) => (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="block rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    {quiz.title}
                    <span className="mt-1 block text-xs font-normal text-[var(--ink-soft)]">
                      {quiz.questions.length} questions · {quiz.durationMin} min
                    </span>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="card bg-[#fdf6e7] p-5">
            <p className="eyebrow">Correction PDF</p>
            <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">Un exercice te bloque ?</p>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
              Joins la feuille d&apos;exercices en PDF. Tu recevras un corrigé guidé avec rappels de cours et méthode.
            </p>
            <Link href={`/correction?matiere=${subject.slug}`} className="btn btn-primary btn-sm mt-3">
              Joindre mon PDF
            </Link>
          </section>

          <section className="card p-5">
            <p className="eyebrow">Méthode</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>1. Lis la fiche et recopie les points clés.</li>
              <li>2. Fais l&apos;exercice sans regarder le corrigé.</li>
              <li>3. Compare étape par étape, puis refais-le à blanc.</li>
              <li>4. Valide avec le quiz et mets à jour ton niveau.</li>
            </ul>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

function Metric({ label, done, total }: { label: string; done: number; total: number }) {
  return (
    <div className="rounded-lg bg-white px-2 py-2">
      <p className="text-sm font-bold text-[var(--ink)]">
        {done}/{total}
      </p>
      <p className="text-[0.62rem] uppercase tracking-[0.06em] text-[var(--ink-soft)]">{label}</p>
    </div>
  );
}
