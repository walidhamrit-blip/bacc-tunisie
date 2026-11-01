import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { PageShell } from "@/components/ui";
import { getCorrection, getSubject, listExercises, listLessons } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CorrectionResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const correction = await getCorrection(numericId);
  if (!correction) notFound();

  const [subject, lessons, exercises] = await Promise.all([
    getSubject(correction.subjectSlug),
    listLessons(correction.subjectSlug),
    listExercises(correction.subjectSlug),
  ]);

  const analysis = correction.analysis;
  if (!analysis) {
    return (
      <PageShell>
        <div className="card p-6">
          <p className="display text-xl font-semibold">Correction en cours d&apos;analyse</p>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">Reviens dans quelques instants.</p>
        </div>
      </PageShell>
    );
  }

  const relatedLessons = lessons.filter((lesson) => analysis.relatedLessonSlugs.includes(lesson.slug));
  const relatedExercises = exercises.filter((exercise) => analysis.relatedExerciseSlugs.includes(exercise.slug));
  const allQuestions = analysis.exercises.reduce((sum, exercise) => sum + exercise.questions.length, 0);

  return (
    <PageShell>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
        <Link href="/correction" className="hover:text-[var(--brand)]">Correction PDF</Link>
        <span aria-hidden>›</span>
        <span className="text-[var(--ink)]">{subject?.name ?? correction.subjectSlug}</span>
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-brand">Corrigé guidé</span>
              <span className="badge badge-slate">{subject?.name ?? correction.subjectSlug}</span>
              {correction.section ? <span className="badge badge-slate">{correction.section}</span> : null}
              <span className="badge badge-green">
                {analysis.engine === "assistant-ia" ? "assistant pédagogique" : "moteur pédagogique"}
              </span>
            </div>
            <h1 className="display mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-[2rem]">
              {correction.fileName ?? "Énoncé collé"}
            </h1>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              {correction.pageCount > 0 ? `${correction.pageCount} page(s) · ` : ""}
              {analysis.exercises.length} exercice(s) · {allQuestions} question(s) repérée(s) ·{" "}
              {new Date(correction.createdAt).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/correction" className="btn btn-ghost btn-sm no-print">
              Nouveau PDF
            </Link>
            <Link href={`/matieres/${correction.subjectSlug}`} className="btn btn-primary btn-sm no-print">
              Réviser la matière
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--line)] bg-[#fcfaf5] p-5 sm:p-6">
          <p className="eyebrow">Lecture pédagogique</p>
          <p className="mt-1.5 text-[0.94rem] leading-relaxed text-[var(--ink)]">{analysis.summary}</p>
          {analysis.detectedNotions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {analysis.detectedNotions.map((notion) => (
                <span key={notion} className="badge badge-blue">
                  {notion}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {analysis.warnings.length > 0 ? (
        <div className="mt-4 rounded-2xl border border-[#f3ddb5] bg-[#fff6e9] p-4">
          <p className="text-sm font-bold text-[#7a4b04]">À savoir sur cette analyse</p>
          <ul className="mt-1.5 space-y-1 text-sm text-[#6b4a2a]">
            {analysis.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          {analysis.exercises.map((exercise, index) => (
            <section key={index} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="eyebrow">Exercice {index + 1}</p>
                  <h2 className="display mt-0.5 text-xl font-semibold text-[var(--ink)]">{exercise.label}</h2>
                </div>
                <span className="badge badge-gold">≈ {exercise.bareme} points</span>
              </div>

              {exercise.excerpt ? (
                <p className="mt-3 rounded-xl border border-[var(--line)] bg-[#fcfaf5] p-3 text-[0.84rem] italic text-[var(--ink-soft)]">
                  « {exercise.excerpt}… »
                </p>
              ) : null}

              <div className="mt-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  Questions repérées
                </p>
                <ol className="mt-1.5 space-y-1.5">
                  {exercise.questions.map((question, questionIndex) => (
                    <li key={questionIndex} className="flex gap-2 text-[0.88rem] text-[var(--ink-soft)]">
                      <span className="font-bold text-[var(--ink)]">{questionIndex + 1}.</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-[#cfdcff] bg-[#f3f7ff] p-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#1b3f9a]">
                    Méthode de correction
                  </p>
                  <ol className="mt-2 space-y-2">
                    {exercise.methode.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex gap-2 text-[0.88rem] text-[var(--ink-soft)]">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1b3f9a] text-[0.62rem] font-bold text-white">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {exercise.rappels.length > 0 ? (
                  <div className="rounded-2xl border border-[#cbe2d2] bg-[var(--green-soft)] p-4">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--green)]">
                      Rappels de cours à utiliser
                    </p>
                    <ul className="mt-2 space-y-2">
                      {exercise.rappels.map((rappel, rappelIndex) => (
                        <li key={rappelIndex} className="text-[0.88rem] text-[#204a37]">
                          <strong>{rappel.title} :</strong> {rappel.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {exercise.vigilance.length > 0 ? (
                  <div className="rounded-2xl border border-[#f3ddb5] bg-[#fff6e9] p-4">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#7a4b04]">
                      Points de vigilance
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {exercise.vigilance.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-2 text-[0.88rem] text-[#6b4a2a]">
                          <span aria-hidden>⚠</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="rounded-2xl border border-[var(--line)] p-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                    Notions mobilisées
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {exercise.notions.map((notion) => (
                      <span key={notion} className="chip">
                        {notion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          <details className="card p-5">
            <summary className="cursor-pointer text-sm font-semibold text-[var(--ink)]">
              Voir le texte analysé ({correction.sourceText.length} caractères)
            </summary>
            <pre className="mt-3 max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-[#faf7f0] p-3 text-[0.8rem] leading-relaxed text-[var(--ink-soft)]">
              {correction.sourceText}
            </pre>
          </details>
        </div>

        <aside className="space-y-5">
          <section className="card border-[#d9c9a4] bg-[#fdf6e7] p-5">
            <p className="eyebrow">Prochaines étapes</p>
            <ol className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
              {analysis.nextSteps.map((step, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-bold text-[#8a6200]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {relatedLessons.length > 0 ? (
            <section className="card p-5">
              <p className="eyebrow">Fiches à relire</p>
              <div className="mt-2.5 space-y-2">
                {relatedLessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/cours/${lesson.slug}`}
                    className="block rounded-xl border border-[var(--line)] p-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    {lesson.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedExercises.length > 0 ? (
            <section className="card p-5">
              <p className="eyebrow">Exercices corrigés similaires</p>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">
                Même type de questions : lis le corrigé type avant de reprendre ta feuille.
              </p>
              <div className="mt-2.5 space-y-2">
                {relatedExercises.map((exercise) => (
                  <div key={exercise.slug} className="rounded-xl border border-[var(--line)] p-3">
                    <Link href={`/exercices/${exercise.slug}`} className="text-sm font-semibold text-[var(--ink)]">
                      {exercise.title}
                    </Link>
                    <p className="mt-1 text-xs text-[var(--ink-soft)]">{exercise.theme}</p>
                    <div className="mt-2">
                      <Reveal label="Voir le corrigé type" tone="ghost" icon="eye">
                        <div className="space-y-2">
                          {exercise.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="rounded-lg bg-[#faf7f0] p-2.5">
                              <p className="text-[0.78rem] font-semibold text-[var(--ink)]">
                                {stepIndex + 1}. {step.title}
                              </p>
                              <p className="mt-0.5 whitespace-pre-line text-[0.78rem] text-[var(--ink-soft)]">
                                {step.content}
                              </p>
                            </div>
                          ))}
                          <div className="rounded-lg border border-[#cbe2d2] bg-[var(--green-soft)] p-2.5 text-[0.78rem] text-[#204a37]">
                            <strong>Réponse :</strong> {exercise.answer}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {correction.instruction ? (
            <section className="card p-5">
              <p className="eyebrow">Ta consigne</p>
              <p className="mt-1.5 text-sm text-[var(--ink-soft)]">« {correction.instruction} »</p>
            </section>
          ) : null}

          <section className="card p-5">
            <p className="eyebrow">Garde le bon réflexe</p>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
              Refais l&apos;exercice seul, sans regarder ce guide, puis compare ta rédaction aux étapes. Ce qui compte au
              bac, c&apos;est la justification, pas seulement le résultat.
            </p>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
