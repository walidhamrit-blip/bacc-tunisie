import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ToggleComplete } from "@/components/toggle-complete";
import { DifficultyDots, PageShell } from "@/components/ui";
import {
  getDashboard,
  getExercise,
  getLesson,
  getStudentExerciseSlugs,
  getSubject,
  listExercises,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = await getExercise(slug);
  if (!exercise) notFound();

  const [subject, dashboard, sameSubject] = await Promise.all([
    getSubject(exercise.subjectSlug),
    getDashboard(),
    listExercises(exercise.subjectSlug),
  ]);
  const done = await getStudentExerciseSlugs(dashboard.student.id);
  const lesson = exercise.lessonSlug ? await getLesson(exercise.lessonSlug) : null;
  const others = sameSubject.filter((item) => item.slug !== exercise.slug).slice(0, 3);

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
        <Link href="/exercices" className="hover:text-[var(--brand)]">Exercices</Link>
        <span aria-hidden>›</span>
        <Link href={`/matieres/${exercise.subjectSlug}`} className="hover:text-[var(--brand)]">
          {subject?.name ?? exercise.subjectSlug}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-[var(--ink)]">{exercise.theme}</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{exercise.theme}</p>
                <h1 className="display mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-[1.9rem]">
                  {exercise.title}
                </h1>
                <div className="mt-2 flex items-center gap-3 text-xs text-[var(--ink-soft)]">
                  <DifficultyDots level={exercise.difficulty} />
                  <span>{exercise.durationMin} min</span>
                  <span aria-hidden>·</span>
                  <span>{exercise.steps.length} étapes</span>
                </div>
              </div>
              <ToggleComplete
                kind="exercise"
                slug={exercise.slug}
                subjectSlug={exercise.subjectSlug}
                done={done.has(exercise.slug)}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[#fcfaf5] p-4 sm:p-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">Énoncé</p>
              <p className="mt-2 whitespace-pre-line text-[0.94rem] leading-relaxed text-[var(--ink)]">
                {exercise.statement}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Reveal label="Voir les indices" tone="ghost" icon="spark">
                <div className="rounded-2xl border border-[#d9c9a4] bg-[#fdf6e7] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a6200]">Indices progressifs</p>
                  <ol className="mt-2 space-y-2">
                    {exercise.hints.map((hint, index) => (
                      <li key={index} className="flex gap-2 text-sm text-[#6b4a2a]">
                        <span className="font-bold">{index + 1}.</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
              <Reveal label="Voir le corrigé détaillé" tone="primary" icon="eye">
                <div className="space-y-3">
                  {exercise.steps.map((step, index) => (
                    <div key={index} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--green)] text-[0.7rem] font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="text-sm font-semibold text-[var(--ink)]">{step.title}</p>
                      </div>
                      <p className="mt-2 whitespace-pre-line text-[0.9rem] leading-relaxed text-[var(--ink-soft)]">
                        {step.content}
                      </p>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-[#cbe2d2] bg-[var(--green-soft)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--green)]">Réponse finale</p>
                    <p className="mt-1.5 text-[0.94rem] font-semibold text-[#0d3a26]">{exercise.answer}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="card border-[#d9c9a4] bg-[#fdf6e7] p-5">
            <p className="eyebrow">Pour aller plus loin</p>
            <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">
              Ton exercice n&apos;est pas dans la liste ?
            </p>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
              Joins ton PDF d&apos;exercices ou colle l&apos;énoncé : tu recevras un corrigé guidé adapté à ta matière,
              avec méthode et rappels de cours.
            </p>
            <Link href={`/correction?matiere=${exercise.subjectSlug}`} className="btn btn-primary btn-sm mt-3">
              Faire corriger mon PDF
            </Link>
          </div>
        </div>

        <aside className="space-y-5">
          {lesson ? (
            <section className="card p-5">
              <p className="eyebrow">Notion du cours</p>
              <p className="mt-1.5 text-sm font-semibold text-[var(--ink)]">{lesson.title}</p>
              <p className="mt-1 line-clamp-3 text-xs text-[var(--ink-soft)]">{lesson.summary}</p>
              <Link href={`/cours/${lesson.slug}`} className="btn btn-ghost btn-sm mt-3">
                Relire la fiche
              </Link>
            </section>
          ) : null}

          <section className="card p-5">
            <p className="eyebrow">Méthode de travail</p>
            <ol className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>1. Cherche seul pendant 10 minutes, même sans aboutir.</li>
              <li>2. Ouvre les indices, note l&apos;idée de départ.</li>
              <li>3. Compare ta rédaction au corrigé étape par étape.</li>
              <li>4. Refaire l&apos;exercice à blanc le lendemain.</li>
            </ol>
          </section>

          {others.length > 0 ? (
            <section className="card p-5">
              <p className="eyebrow">Dans la même matière</p>
              <div className="mt-2.5 space-y-2">
                {others.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/exercices/${item.slug}`}
                    className="block rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    {item.title}
                    <span className="mt-1 block text-xs font-normal text-[var(--ink-soft)]">{item.theme}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}
