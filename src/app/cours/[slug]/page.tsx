import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonBlocks } from "@/components/lesson-blocks";
import { Flashcards } from "@/components/flashcards";
import { ToggleComplete } from "@/components/toggle-complete";
import { PageShell, SubjectGlyph } from "@/components/ui";
import {
  getDashboard,
  getLesson,
  getStudentLessonSlugs,
  getSubject,
  listExercises,
  listLessons,
  listQuizzes,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getLesson(slug);
  if (!lesson) notFound();

  const [subject, subjectLessons, exercises, quizzes, dashboard] = await Promise.all([
    getSubject(lesson.subjectSlug),
    listLessons(lesson.subjectSlug),
    listExercises(lesson.subjectSlug),
    listQuizzes(lesson.subjectSlug),
    getDashboard(),
  ]);
  const doneLessons = await getStudentLessonSlugs(dashboard.student.id);

  const index = subjectLessons.findIndex((item) => item.slug === lesson.slug);
  const previous = index > 0 ? subjectLessons[index - 1] : null;
  const next = index >= 0 && index < subjectLessons.length - 1 ? subjectLessons[index + 1] : null;
  const quiz = quizzes.find((item) => item.lessonSlug === lesson.slug) ?? quizzes[0] ?? null;
  const exercise = exercises.find((item) => item.lessonSlug === lesson.slug) ?? exercises[0] ?? null;

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
        <Link href="/cours" className="hover:text-[var(--brand)]">Cours</Link>
        <span aria-hidden>›</span>
        <Link href={`/matieres/${lesson.subjectSlug}`} className="hover:text-[var(--brand)]">
          {subject?.name ?? lesson.subjectSlug}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-[var(--ink)]">{lesson.chapter}</span>
      </div>

      <div className="card p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            {subject ? <SubjectGlyph subject={subject} size={50} /> : null}
            <div className="min-w-0">
              <p className="eyebrow">{lesson.level}</p>
              <h1 className="display mt-1 text-2xl font-semibold leading-tight text-[var(--ink)] sm:text-[2.1rem]">
                {lesson.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)]">
                <span className="badge badge-slate">{lesson.chapter}</span>
                <span>{lesson.durationMin} min de lecture</span>
                <span aria-hidden>·</span>
                <span>{lesson.objectives.length} objectifs</span>
              </div>
            </div>
          </div>
          <ToggleComplete
            kind="lesson"
            slug={lesson.slug}
            subjectSlug={lesson.subjectSlug}
            done={doneLessons.has(lesson.slug)}
          />
        </div>
        <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--ink-soft)]">{lesson.summary}</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {lesson.objectives.map((objective, objectiveIndex) => (
            <div key={objectiveIndex} className="flex items-start gap-2 rounded-xl bg-[#faf7f0] px-3 py-2">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-[0.62rem] font-bold text-white">
                {objectiveIndex + 1}
              </span>
              <span className="text-[0.84rem] text-[var(--ink-soft)]">À la fin, tu sauras : {objective}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <article className="card p-5 sm:p-6">
          <LessonBlocks blocks={lesson.blocks} />
        </article>

        <aside className="space-y-5">
          <section className="card p-5">
            <p className="eyebrow">À retenir absolument</p>
            <ul className="mt-2.5 space-y-2">
              {lesson.keyPoints.map((point, pointIndex) => (
                <li key={pointIndex} className="flex gap-2 text-[0.86rem] text-[var(--ink-soft)]">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--green)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card border-[#f0d6c0] bg-[#fff8f1] p-5">
            <p className="eyebrow !text-[#8a4b12]">Erreurs fréquentes</p>
            <ul className="mt-2.5 space-y-2">
              {lesson.pitfalls.map((pitfall, pitfallIndex) => (
                <li key={pitfallIndex} className="flex gap-2 text-[0.86rem] text-[#6b4a2a]">
                  <span aria-hidden>⚠</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5">
            <p className="eyebrow">Cartes de révision</p>
            <p className="mt-1 mb-3 text-[0.8rem] text-[var(--ink-soft)]">
              Teste-toi sans regarder : révèle la réponse seulement après avoir formulé la tienne.
            </p>
            <Flashcards cards={lesson.flashcards} />
          </section>

          <section className="card p-5">
            <p className="eyebrow">Passer à la pratique</p>
            <div className="mt-3 space-y-2">
              {quiz ? (
                <Link href={`/quiz/${quiz.slug}`} className="btn btn-primary btn-sm w-full justify-between">
                  Quiz de la notion
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
              {exercise ? (
                <Link href={`/exercices/${exercise.slug}`} className="btn btn-ghost btn-sm w-full justify-between">
                  Exercice corrigé associé
                  <span aria-hidden>→</span>
                </Link>
              ) : null}
              <Link
                href={`/correction?matiere=${lesson.subjectSlug}`}
                className="btn btn-ghost btn-sm w-full justify-between"
              >
                Faire corriger un PDF
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <section className="card p-5">
            <p className="eyebrow">Ton niveau dans la matière</p>
            {dashboard.subjectLevels.find((row) => row.subject.slug === lesson.subjectSlug) ? (
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Maîtrise estimée :{" "}
                <strong className="text-[var(--ink)]">
                  {dashboard.subjectLevels.find((row) => row.subject.slug === lesson.subjectSlug)?.mastery}%
                </strong>{" "}
                ·{" "}
                {dashboard.subjectLevels.find((row) => row.subject.slug === lesson.subjectSlug)?.level.label}
              </p>
            ) : (
              <p className="mt-2 text-sm text-[var(--ink-soft)]">Passe un quiz pour estimer ton niveau.</p>
            )}
            <Link href="/evaluation" className="mt-2 inline-block text-xs font-semibold text-[var(--brand)]">
              Voir le tableau de niveau →
            </Link>
          </section>
        </aside>
      </div>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link href={`/cours/${previous.slug}`} className="card card-hover p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              ← Fiche précédente
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{previous.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/cours/${next.slug}`} className="card card-hover p-4 sm:text-right">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
              Fiche suivante →
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </PageShell>
  );
}
