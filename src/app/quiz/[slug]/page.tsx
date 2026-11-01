import Link from "next/link";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz-player";
import { PageShell } from "@/components/ui";
import { getLesson, getQuiz, getSubject, listQuizzes } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuiz(slug);
  if (!quiz) notFound();

  const [subject, lesson, others] = await Promise.all([
    getSubject(quiz.subjectSlug),
    quiz.lessonSlug ? getLesson(quiz.lessonSlug) : Promise.resolve(null),
    listQuizzes(quiz.subjectSlug),
  ]);

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
        <Link href="/quiz" className="hover:text-[var(--brand)]">Quiz</Link>
        <span aria-hidden>›</span>
        <Link href={`/matieres/${quiz.subjectSlug}`} className="hover:text-[var(--brand)]">
          {subject?.name ?? quiz.subjectSlug}
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="mb-5">
            <p className="eyebrow">{quiz.level}</p>
            <h1 className="display mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-[2rem]">{quiz.title}</h1>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{quiz.description}</p>
          </div>
          <QuizPlayer
            quizSlug={quiz.slug}
            subjectSlug={quiz.subjectSlug}
            subjectName={subject?.name ?? quiz.subjectSlug}
            questions={quiz.questions}
          />
        </div>

        <aside className="space-y-5">
          <section className="card p-5">
            <p className="eyebrow">Comment ça marche</p>
            <ol className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              <li>1. Lis chaque question et choisis une seule réponse.</li>
              <li>2. Valide : l&apos;explication s&apos;affiche immédiatement.</li>
              <li>3. À la fin, ton score est enregistré dans ton tableau de niveau.</li>
              <li>4. Un score inférieur à 50 % ? Relis la fiche puis refais le quiz.</li>
            </ol>
          </section>

          {lesson ? (
            <section className="card p-5">
              <p className="eyebrow">Fiche associée</p>
              <p className="mt-1.5 text-sm font-semibold text-[var(--ink)]">{lesson.title}</p>
              <p className="mt-1 line-clamp-3 text-xs text-[var(--ink-soft)]">{lesson.summary}</p>
              <Link href={`/cours/${lesson.slug}`} className="btn btn-ghost btn-sm mt-3">
                Relire le cours
              </Link>
            </section>
          ) : null}

          <section className="card p-5">
            <p className="eyebrow">Autres quiz</p>
            <div className="mt-2.5 space-y-2">
              {others
                .filter((item) => item.slug !== quiz.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/quiz/${item.slug}`}
                    className="block rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
