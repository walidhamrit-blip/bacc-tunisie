import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ToggleComplete } from "@/components/toggle-complete";
import { PageShell } from "@/components/ui";
import { getDashboard, getExam, getStudentExamSlugs, getSubject } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ExamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exam = await getExam(slug);
  if (!exam) notFound();

  const [subject, dashboard] = await Promise.all([getSubject(exam.subjectSlug), getDashboard()]);
  const done = await getStudentExamSlugs(dashboard.student.id);
  const totalPoints = exam.parts.reduce(
    (sum, part) => sum + part.questions.reduce((partSum, question) => partSum + question.points, 0),
    0,
  );

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
        <Link href="/examens" className="hover:text-[var(--brand)]">Examens & séries</Link>
        <span aria-hidden>›</span>
        <Link href={`/matieres/${exam.subjectSlug}`} className="hover:text-[var(--brand)]">
          {subject?.name ?? exam.subjectSlug}
        </Link>
      </div>

      <div className="card p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-brand">{exam.kind === "serie" ? "Série d'exercices" : "Sujet de session"}</span>
              <span className="badge badge-slate">{exam.section}</span>
              <span className="badge badge-gold">{exam.year}</span>
            </div>
            <h1 className="display mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-[2rem]">{exam.title}</h1>
            <p className="mt-2 max-w-2xl text-[0.94rem] text-[var(--ink-soft)]">{exam.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--ink-soft)]">
              <span>⏱ Durée conseillée : {exam.durationMin} min</span>
              <span>·</span>
              <span>{exam.parts.length} partie(s)</span>
              <span>·</span>
              <span>≈ {totalPoints} points</span>
              <span>·</span>
              <span>Difficulté {exam.difficulty}/3</span>
            </div>
          </div>
          <ToggleComplete
            kind="exam"
            slug={exam.slug}
            subjectSlug={exam.subjectSlug}
            done={done.has(exam.slug)}
            labels={{ done: "Travaillé ✓", todo: "Marquer comme travaillé" }}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          {exam.parts.map((part, partIndex) => (
            <section key={partIndex} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="display text-xl font-semibold text-[var(--ink)]">{part.title}</h2>
                <span className="badge badge-blue">
                  {part.questions.reduce((sum, question) => sum + question.points, 0)} points
                </span>
              </div>
              {part.intro ? (
                <p className="mt-2 whitespace-pre-line rounded-xl bg-[#fcfaf5] p-3 text-[0.9rem] text-[var(--ink-soft)]">
                  {part.intro}
                </p>
              ) : null}

              <ol className="mt-4 space-y-4">
                {part.questions.map((question, questionIndex) => (
                  <li key={questionIndex} className="border-t border-[var(--line)] pt-4 first:border-0 first:pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.94rem] font-semibold leading-relaxed text-[var(--ink)]">
                        {questionIndex + 1}. {question.prompt}
                      </p>
                      <span className="shrink-0 text-[0.7rem] font-bold text-[var(--ink-soft)]">
                        {question.points} pts
                      </span>
                    </div>
                    <div className="mt-2">
                      <Reveal label="Corrigé et méthode" tone="ghost" icon="eye">
                        <div className="space-y-2">
                          {question.method ? (
                            <div className="rounded-xl border border-[#cfdcff] bg-[#f3f7ff] p-3">
                              <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#1b3f9a]">
                                Méthode attendue
                              </p>
                              <p className="mt-1 text-sm text-[var(--ink-soft)]">{question.method}</p>
                            </div>
                          ) : null}
                          <div className="rounded-xl border border-[#cbe2d2] bg-[var(--green-soft)] p-3">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--green)]">
                              Corrigé
                            </p>
                            <p className="mt-1 whitespace-pre-line text-sm text-[#204a37]">{question.answer}</p>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className="space-y-5">
          <section className="card border-[#d9c9a4] bg-[#fdf6e7] p-5">
            <p className="eyebrow">Conseils de l&apos;examinateur</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              {exam.advice.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b07d0c]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5">
            <p className="eyebrow">Notes de correction</p>
            <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              {exam.correctionNotes.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5">
            <p className="eyebrow">Après le sujet</p>
            <div className="mt-2.5 space-y-2">
              <Link href={`/matieres/${exam.subjectSlug}`} className="btn btn-ghost btn-sm w-full justify-between">
                Fiches et exercices de la matière
                <span aria-hidden>→</span>
              </Link>
              <Link href={`/correction?matiere=${exam.subjectSlug}`} className="btn btn-primary btn-sm w-full justify-between">
                Faire corriger ma copie (PDF)
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="mt-3 text-xs text-[var(--ink-soft)]">
              Astuce : refais les questions sans regarder le corrigé, puis note les points que tu as réellement
              justifiés.
            </p>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
