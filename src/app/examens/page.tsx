import Link from "next/link";
import { getDashboard, getStudentExamSlugs, listExams, listSubjects } from "@/lib/data";
import { DifficultyDots, PageHeader, PageShell } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ExamsPage() {
  const [exams, subjects, dashboard] = await Promise.all([listExams(), listSubjects(), getDashboard()]);
  const done = await getStudentExamSlugs(dashboard.student.id);
  const nameOf = new Map(subjects.map((subject) => [subject.slug, subject.name]));
  const accentOf = new Map(subjects.map((subject) => [subject.slug, subject.accent]));

  return (
    <PageShell>
      <PageHeader
        eyebrow="S'entraîner"
        title="Examens et séries corrigés"
        description={
          <p>Des sujets type bac avec barème et corrigé détaillé, pour t&apos;entraîner en conditions réelles.</p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/bac-blanc" className="btn btn-primary btn-sm">
              ⏱ Lancer un Bac Blanc chronométré
            </Link>
            <Link href="/quiz" className="btn btn-ghost btn-sm">
              Quiz par notion
            </Link>
          </div>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">Sujets disponibles</p>
          <p className="display mt-1 text-2xl font-semibold">{exams.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">Déjà travaillés</p>
          <p className="display mt-1 text-2xl font-semibold">{dashboard.stats.examsDone}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">Matières couvertes</p>
          <p className="display mt-1 text-2xl font-semibold">
            {new Set(exams.map((exam) => exam.subjectSlug)).size}
          </p>
        </div>
      </div>

      <div className="grid gap-3.5 md:grid-cols-2">
        {exams.map((exam) => (
          <Link key={exam.slug} href={`/examens/${exam.slug}`} className="card card-hover flex flex-col p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="badge badge-brand" style={{ background: `${accentOf.get(exam.subjectSlug)}14`, color: accentOf.get(exam.subjectSlug) }}>
                  {nameOf.get(exam.subjectSlug) ?? exam.subjectSlug}
                </span>
                <span className="badge badge-slate">{exam.kind === "serie" ? "Série" : "Session"}</span>
              </div>
              <div className="flex items-center gap-2">
                {done.has(exam.slug) ? <span className="badge badge-green">travaillé</span> : null}
                <DifficultyDots level={exam.difficulty} />
              </div>
            </div>
            <p className="display mt-3 text-lg font-semibold leading-snug text-[var(--ink)]">{exam.title}</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              {exam.section} · {exam.year} · {exam.durationMin} min · {exam.parts.length} partie(s)
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-[var(--ink-soft)]">{exam.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--ink-soft)]">
                {exam.parts.reduce((sum, part) => sum + part.questions.length, 0)} questions corrigées
              </span>
              <span className="text-[var(--brand)]">Ouvrir le sujet →</span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
