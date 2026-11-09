import Link from "next/link";
import { getBestQuizScores, getDashboard, listQuizzes, listSubjects } from "@/lib/data";
import { PageHeader, PageShell, SubjectGlyph } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function QuizzesPage() {
  const [quizzes, subjects, dashboard] = await Promise.all([listQuizzes(), listSubjects(), getDashboard()]);
  const best = await getBestQuizScores(dashboard.student.id);
  const subjectBySlug = new Map(subjects.map((subject) => [subject.slug, subject]));

  return (
    <PageShell>
      <PageHeader
        eyebrow="S'entraîner"
        title="Quiz"
        description={
          <p>Des quiz courts avec correction immédiate : chaque score alimente ton tableau de niveau.</p>
        }
        actions={
          <Link href="/evaluation" className="btn btn-ghost btn-sm">
            Voir mon tableau de niveau
          </Link>
        }
      />

      <div className="mb-6 rounded-2xl border border-[var(--line)] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[var(--ink-soft)]">
            <strong className="text-[var(--ink)]">{dashboard.stats.quizCount}</strong> quiz passés · taux de réussite
            moyen{" "}
            <strong className="text-[var(--ink)]">
              {dashboard.stats.quizSuccess === null ? "—" : `${dashboard.stats.quizSuccess}%`}
            </strong>
          </p>
          <p className="badge badge-green">Chaque tentative met à jour ton niveau</p>
        </div>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const subject = subjectBySlug.get(quiz.subjectSlug);
          const result = best.get(quiz.slug);
          return (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="card card-hover flex flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                {subject ? <SubjectGlyph subject={subject} size={34} /> : <span />}
                {result ? (
                  <span
                    className="badge"
                    style={{
                      background: result.best >= 75 ? "var(--green-soft)" : result.best >= 50 ? "var(--sky-soft)" : "#fdeaed",
                      color: result.best >= 75 ? "var(--green)" : result.best >= 50 ? "#1b45b8" : "var(--brand-dark)",
                    }}
                  >
                    meilleur score {result.best}%
                  </span>
                ) : (
                  <span className="badge badge-slate">pas encore passé</span>
                )}
              </div>
              <p className="mt-3 text-[0.98rem] font-semibold leading-snug text-[var(--ink)]">{quiz.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{quiz.description}</p>
              <div className="mt-3 flex items-center justify-between text-[0.72rem] text-[var(--ink-soft)]">
                <span>{quiz.questions.length} questions · {quiz.durationMin} min</span>
                <span className="font-semibold text-[var(--brand)]">{result ? "Refaire →" : "Commencer →"}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
