import Link from "next/link";
import { getDashboard, getStudentExerciseSlugs, listExercises, listSubjects } from "@/lib/data";
import { DifficultyDots, PageHeader, PageShell } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string }>;
}) {
  const params = await searchParams;
  const [subjects, exercises, dashboard] = await Promise.all([listSubjects(), listExercises(), getDashboard()]);
  const done = await getStudentExerciseSlugs(dashboard.student.id);
  const active = params.matiere ?? "";
  const filtered = active ? exercises.filter((exercise) => exercise.subjectSlug === active) : exercises;
  const nameOf = new Map(subjects.map((subject) => [subject.slug, subject.name]));

  return (
    <PageShell>
      <PageHeader
        eyebrow="S'entraîner"
        title="Exercices corrigés"
        description={
          <p>Des indices pour démarrer, un corrigé étape par étape, et un suivi dans ton tableau de niveau.</p>
        }
        actions={
          <Link href="/correction" className="btn btn-primary btn-sm">
            Corriger mon PDF
          </Link>
        }
      />

      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
        <Link href="/exercices" className={`chip whitespace-nowrap ${!active ? "chip-active" : ""}`}>
          Tous
        </Link>
        {subjects
          .filter((subject) => exercises.some((exercise) => exercise.subjectSlug === subject.slug))
          .map((subject) => (
            <Link
              key={subject.slug}
              href={`/exercices?matiere=${subject.slug}`}
              className={`chip whitespace-nowrap ${active === subject.slug ? "chip-active" : ""}`}
            >
              {subject.shortName}
            </Link>
          ))}
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        {filtered.map((exercise) => (
          <Link
            key={exercise.slug}
            href={`/exercices/${exercise.slug}`}
            className="card card-hover flex flex-col p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="badge badge-blue">{nameOf.get(exercise.subjectSlug) ?? exercise.subjectSlug}</span>
              <div className="flex items-center gap-2">
                {done.has(exercise.slug) ? <span className="badge badge-green">compris</span> : null}
                <DifficultyDots level={exercise.difficulty} />
              </div>
            </div>
            <p className="display mt-3 text-lg font-semibold leading-snug text-[var(--ink)]">{exercise.title}</p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
              {exercise.theme}
            </p>
            <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-[var(--ink-soft)]">
              {exercise.statement}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--ink-soft)]">
              <span>{exercise.durationMin} min · {exercise.steps.length} étapes corrigées</span>
              <span className="font-semibold text-[var(--brand)]">Ouvrir →</span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
