import Link from "next/link";
import { resetStudentProgress, updateStudentProfile } from "@/app/actions";
import {
  getDashboard,
  getStudent,
  levelFromMastery,
  listCorrections,
  listQuizzes,
} from "@/lib/data";
import { LevelPill, PageHeader, PageShell, ProgressBar, StatCard, SubjectGlyph } from "@/components/ui";
import { SECTIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function EvaluationPage() {
  const [dashboard, corrections, quizzes, student] = await Promise.all([
    getDashboard(),
    listCorrections(),
    listQuizzes(),
    getStudent(),
  ]);

  const quizTitles = new Map(quizzes.map((quiz) => [quiz.slug, quiz.title]));
  const rows = [...dashboard.tracked].sort((a, b) => a.mastery - b.mastery);
  const nextQuizSlug = dashboard.nextQuiz?.slug ?? quizzes[0]?.slug ?? "";
  const nextLesson = dashboard.weakest
    ? `/matieres/${dashboard.weakest.subject.slug}`
    : "/matieres";

  return (
    <PageShell>
      <PageHeader
        eyebrow="Tableau d'évaluation de niveau"
        title="Où en es-tu, matière par matière ?"
        description={
          <p>
            Ce tableau combine les quiz passés, les fiches marquées comme comprises, les exercices travaillés et les
            séries faites. Il te donne un niveau par matière et l&apos;étape la plus utile à faire maintenant.
          </p>
        }
        actions={
          <>
            {nextQuizSlug ? (
              <Link href={`/quiz/${nextQuizSlug}`} className="btn btn-primary btn-sm">
                Améliorer mon niveau
              </Link>
            ) : null}
            <Link href="/correction" className="btn btn-ghost btn-sm">
              Corriger un PDF
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Maîtrise globale"
          value={`${dashboard.overallMastery}%`}
          hint={dashboard.overallLevel.label}
          tone="var(--brand)"
        />
        <StatCard
          label="Fiches comprises"
          value={dashboard.stats.lessonsDone}
          hint="sur l'ensemble du programme disponible"
        />
        <StatCard
          label="Réussite aux quiz"
          value={dashboard.stats.quizSuccess === null ? "—" : `${dashboard.stats.quizSuccess}%`}
          hint={`${dashboard.stats.quizCount} tentative(s) enregistrée(s)`}
          tone="var(--green)"
        />
        <StatCard
          label="Exercices travaillés"
          value={dashboard.stats.exercisesDone}
          hint={`${dashboard.stats.examsDone} série(s) · ${dashboard.stats.corrections} correction(s) PDF`}
        />
      </div>

      <section className="card mt-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
          <div>
            <p className="eyebrow">Évaluation détaillée</p>
            <h2 className="display text-xl font-semibold text-[var(--ink)]">Tableau de niveau par matière</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[levelFromMastery(85), levelFromMastery(70), levelFromMastery(50), levelFromMastery(30), levelFromMastery(5)].map(
              (level) => (
                <LevelPill key={level.label} level={level} />
              ),
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f8f4ec] text-[0.7rem] uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                <th className="px-5 py-3 font-bold">Matière</th>
                <th className="px-3 py-3 font-bold">Fiches</th>
                <th className="px-3 py-3 font-bold">Exercices</th>
                <th className="px-3 py-3 font-bold">Séries</th>
                <th className="px-3 py-3 font-bold">Quiz</th>
                <th className="px-3 py-3 font-bold">Maîtrise</th>
                <th className="px-3 py-3 font-bold">Niveau</th>
                <th className="px-5 py-3 font-bold">Étape suivante</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.subject.slug} className="border-t border-[var(--line)] align-middle">
                  <td className="px-5 py-3">
                    <Link href={`/matieres/${row.subject.slug}`} className="flex items-center gap-2.5">
                      <SubjectGlyph subject={row.subject} size={32} />
                      <span>
                        <span className="block font-semibold text-[var(--ink)]">{row.subject.name}</span>
                        <span className="block text-[0.68rem] text-[var(--ink-soft)]">{row.subject.family}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-[var(--ink-soft)]">
                    {row.lessonsDone}/{row.lessonsTotal}
                  </td>
                  <td className="px-3 py-3 text-[var(--ink-soft)]">
                    {row.exercisesDone}/{row.exercisesTotal}
                  </td>
                  <td className="px-3 py-3 text-[var(--ink-soft)]">
                    {row.examsDone}/{row.examsTotal}
                  </td>
                  <td className="px-3 py-3 text-[var(--ink-soft)]">
                    {row.quizAverage === null ? "—" : `${row.quizAverage}%`}
                    <span className="block text-[0.65rem]">{row.quizCount} essai(s)</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="w-28">
                      <ProgressBar value={row.mastery} tone={row.subject.accent} />
                    </div>
                    <span className="mt-1 block text-[0.68rem] font-semibold text-[var(--ink)]">{row.mastery}%</span>
                  </td>
                  <td className="px-3 py-3">
                    <LevelPill level={row.level} />
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/matieres/${row.subject.slug}`}
                      className="text-[0.75rem] font-semibold text-[var(--brand)]"
                    >
                      {row.lessonsTotal === 0
                        ? "Contenu à venir"
                        : row.mastery < 45
                          ? "Reprendre le cours"
                          : row.mastery < 65
                            ? "S'entraîner"
                            : "Consolider par un sujet"}
                      {" →"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <p className="eyebrow">Priorité du moment</p>
          {dashboard.weakest ? (
            <>
              <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">
                {dashboard.weakest.subject.name}
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                C&apos;est ta matière la plus fragile ({dashboard.weakest.mastery}%). Commence par une fiche courte,
                puis un quiz de 4 questions.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={nextLesson} className="btn btn-primary btn-sm">
                  Ouvrir la matière
                </Link>
                {dashboard.nextQuiz ? (
                  <Link href={`/quiz/${dashboard.nextQuiz.slug}`} className="btn btn-ghost btn-sm">
                    Quiz rapide
                  </Link>
                ) : null}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-[var(--ink-soft)]">Passe un premier quiz pour obtenir une priorité.</p>
          )}
        </section>

        <section className="card p-5">
          <p className="eyebrow">Points forts</p>
          {dashboard.strongest ? (
            <>
              <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">
                {dashboard.strongest.subject.name} · {dashboard.strongest.mastery}%
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Continue avec un sujet type bac ou un exercice de difficulté supérieure pour sécuriser les points.
              </p>
              <Link href={`/matieres/${dashboard.strongest.subject.slug}`} className="btn btn-ghost btn-sm mt-3">
                Aller plus loin
              </Link>
            </>
          ) : null}
        </section>

        <section className="card p-5">
          <p className="eyebrow">Matières non commencées</p>
          <p className="display mt-1 text-lg font-semibold text-[var(--ink)]">
            {dashboard.notStarted.length} matière(s)
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {dashboard.notStarted.slice(0, 6).map((row) => (
              <Link key={row.subject.slug} href={`/matieres/${row.subject.slug}`} className="chip">
                {row.subject.shortName}
              </Link>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">
            Ne néglige pas les matières à coefficient élevé ni les matières communes.
          </p>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="card p-5">
          <p className="eyebrow">Historique récent</p>
          <h2 className="display text-lg font-semibold text-[var(--ink)]">Derniers quiz</h2>
          {dashboard.recentAttempts.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--ink-soft)]">Aucune tentative enregistrée pour le moment.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {dashboard.recentAttempts.map((attempt) => {
                const percent = Math.round((attempt.score / Math.max(attempt.total, 1)) * 100);
                return (
                  <li
                    key={attempt.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--ink)]">
                        {quizTitles.get(attempt.quizSlug) ?? attempt.quizSlug}
                      </p>
                      <p className="text-[0.68rem] text-[var(--ink-soft)]">
                        {new Date(attempt.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className="badge"
                      style={{
                        background: percent >= 75 ? "var(--green-soft)" : percent >= 50 ? "var(--sky-soft)" : "#fdeaed",
                        color: percent >= 75 ? "var(--green)" : percent >= 50 ? "#1b45b8" : "var(--brand-dark)",
                      }}
                    >
                      {attempt.score}/{attempt.total} · {percent}%
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="card p-5">
          <p className="eyebrow">Mon profil</p>
          <h2 className="display text-lg font-semibold text-[var(--ink)]">Préférences d&apos;évaluation</h2>
          <p className="mt-1 text-xs text-[var(--ink-soft)]">
            Le profil est de démonstration : change le prénom et la section pour adapter le tableau à ton programme.
          </p>
          <form action={updateStudentProfile} className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr]">
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Prénom</span>
              <input className="input" name="name" defaultValue={student.name} maxLength={80} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Section</span>
              <select className="select" name="section" defaultValue={student.section}>
                {SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="btn btn-dark btn-sm">
                Enregistrer mon profil
              </button>
            </div>
          </form>

          <form action={resetStudentProgress} className="mt-4 border-t border-[var(--line)] pt-3">
            <button type="submit" className="text-xs font-semibold text-[var(--brand-dark)] underline">
              Réinitialiser mes progrès (quiz, fiches, exercices, corrections)
            </button>
          </form>
        </section>
      </div>

      <section className="card mt-6 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Corrections PDF</p>
            <h2 className="display text-lg font-semibold text-[var(--ink)]">Mes corrigés guidés</h2>
          </div>
          <Link href="/correction" className="btn btn-primary btn-sm">
            Nouveau PDF
          </Link>
        </div>
        {corrections.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Aucun PDF corrigé pour l&apos;instant. Joins une feuille d&apos;exercices pour obtenir un guide de
            correction.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {corrections.map((correction) => (
              <li key={correction.id}>
                <Link
                  href={`/correction/${correction.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-3 py-2.5 transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[var(--ink)]">
                      {correction.fileName ?? "Énoncé collé"}
                    </span>
                    <span className="block text-[0.68rem] text-[var(--ink-soft)]">
                      {correction.subjectSlug} ·{" "}
                      {new Date(correction.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </span>
                  <span className="badge badge-green">{correction.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
