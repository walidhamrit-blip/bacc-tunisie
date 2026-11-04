import Link from "next/link";
import { getDashboard, listExams, listExercises, listLessons, listQuizzes, listSubjects } from "@/lib/data";
import { LevelPill, PageHeader, PageShell, ProgressBar, SubjectGlyph } from "@/components/ui";
import { SECTIONS } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";
import { programSectionSubjects } from "@/db/content/program";

export const dynamic = "force-dynamic";

export default async function SubjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const params = await searchParams;
  const dashboard = await getDashboard();
  const locked = isLockedStudent(dashboard.student);

  const section = locked
    ? dashboard.student.section
    : params.section && SECTIONS.includes(params.section as (typeof SECTIONS)[number])
      ? params.section
      : "Toutes les sections";

  const [subjects, lessons, exercises, exams, quizzes] = await Promise.all([
    listSubjects(section),
    listLessons(),
    listExercises(),
    listExams(),
    listQuizzes(),
  ]);

  const levelBySlug = new Map(dashboard.subjectLevels.map((row) => [row.subject.slug, row]));
  /* Les matières réellement au programme de la filière choisie. */
  const programSlugs = section !== "Toutes les sections" ? new Set(programSectionSubjects(section)) : null;
  const visibleSubjects = programSlugs
    ? subjects.filter((subject) => programSlugs.has(subject.slug))
    : subjects;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Programme officiel tunisien"
        title={locked ? `Matières de ta section · ${section}` : "Toutes les matières du baccalauréat"}
        description={
          <p>
            Choisis ta matière pour accéder aux fiches de cours, aux exercices corrigés, aux séries et examens ainsi
            qu&apos;aux quiz.{" "}
            {locked
              ? "Ton abonnement individuel est verrouillé sur ton unique section officielle."
              : "Filtre par section pour ne voir que ton programme."}
          </p>
        }
        actions={
          <Link href="/evaluation" className="btn btn-ghost btn-sm">
            Mon tableau de niveau
          </Link>
        }
      />

      {locked ? (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-xs">
          <span className="font-semibold text-[var(--ink)]">
            🔒 Section verrouillée : <strong>{section}</strong> ({visibleSubjects.length} matières au programme)
          </span>
          <Link
            href={`/programme?section=${encodeURIComponent(section)}`}
            className="font-semibold text-[var(--brand)]"
          >
            Voir mon programme complet (chapitres + trimestres) →
          </Link>
        </div>
      ) : (
        <>
          <div className="no-scrollbar mb-7 flex gap-2 overflow-x-auto pb-1">
            <Link href="/matieres" className={`chip ${section === "Toutes les sections" ? "chip-active" : ""}`}>
              Toutes les sections
            </Link>
            {SECTIONS.map((item) => (
              <Link
                key={item}
                href={`/matieres?section=${encodeURIComponent(item)}`}
                className={`chip whitespace-nowrap ${section === item ? "chip-active" : ""}`}
              >
                {item}
              </Link>
            ))}
          </div>

          {section !== "Toutes les sections" ? (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)]">
              <span className="badge badge-slate">{visibleSubjects.length} matières dans cette filière</span>
              <Link
                href={`/programme?section=${encodeURIComponent(section)}`}
                className="font-semibold text-[var(--brand)]"
              >
                Voir le programme complet de la filière (chapitres + trimestres) →
              </Link>
            </div>
          ) : null}
        </>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSubjects.map((subject) => {
          const lessonCount = lessons.filter((lesson) => lesson.subjectSlug === subject.slug).length;
          const exerciseCount = exercises.filter((exercise) => exercise.subjectSlug === subject.slug).length;
          const examCount = exams.filter((exam) => exam.subjectSlug === subject.slug).length;
          const quizCount = quizzes.filter((quiz) => quiz.subjectSlug === subject.slug).length;
          const level = levelBySlug.get(subject.slug);

          return (
            <Link
              key={subject.slug}
              href={`/matieres/${subject.slug}`}
              className="card card-hover flex flex-col p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <SubjectGlyph subject={subject} size={46} />
                {level ? <LevelPill level={level.level} /> : <span className="badge badge-slate">{subject.family}</span>}
              </div>
              <p className="display mt-3 text-xl font-semibold text-[var(--ink)]">{subject.name}</p>
              <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[var(--ink-soft)]">{subject.description}</p>

              <div className="mt-4 grid grid-cols-4 gap-1 text-center">
                {[
                  [lessonCount, "fiches"],
                  [exerciseCount, "exos"],
                  [examCount, "séries"],
                  [quizCount, "quiz"],
                ].map(([value, label]) => (
                  <div key={String(label)} className="rounded-lg bg-[var(--surface-subtle)] py-1.5">
                    <p className="text-sm font-bold text-[var(--ink)]">{value}</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.06em] text-[var(--ink-soft)]">{label}</p>
                  </div>
                ))}
              </div>

              {level ? (
                <div className="mt-4">
                  <ProgressBar value={level.mastery} tone={subject.accent} label="Maîtrise estimée" />
                </div>
              ) : null}

              <span className="mt-4 text-xs font-semibold" style={{ color: subject.accent }}>
                Ouvrir la matière →
              </span>
            </Link>
          );
        })}
      </div>

      {subjects.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="display text-lg font-semibold">Aucune matière pour cette section.</p>
          <Link href="/matieres" className="btn btn-primary btn-sm mt-4">
            Voir toutes les matières
          </Link>
        </div>
      ) : null}
    </PageShell>
  );
}
