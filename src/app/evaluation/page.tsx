import Link from "next/link";
import { resetStudentProgress, updateStudentProfile } from "@/app/actions";
import { MentionGamificationCard } from "@/components/mention-gamification-card";
import { LevelPill, PageHeader, PageShell, ProgressBar, StatCard, SubjectGlyph } from "@/components/ui";
import {
  getDashboard,
  getStudent,
  levelFromMastery,
  listCorrections,
  listQuizzes,
} from "@/lib/data";
import { SECTIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function EvaluationPage() {
  const [dashboard, corrections, quizzes, student] = await Promise.all([
    getDashboard(),
    listCorrections(),
    listQuizzes(),
    getStudent(),
  ]);

  const rows = [...dashboard.tracked].sort((a, b) => a.mastery - b.mastery);
  const nextQuizSlug = dashboard.nextQuiz?.slug ?? quizzes[0]?.slug ?? "";
  const nextLesson = dashboard.weakest
    ? `/matieres/${dashboard.weakest.subject.slug}`
    : "/matieres";

  return (
    <PageShell>
      <PageHeader
        eyebrow="Tableau d'évaluation de niveau & Gamification"
        title="Où en es-tu, et quelle mention peux-tu viser ?"
        description={
          <p>
            Ce tableau combine ton historique de scores (quiz, Bac Blanc chronométrés, notes de devoirs), les fiches
            comprises et les coefficients officiels de ta filière pour estimer ta{" "}
            <strong className="text-[var(--ink)]">Probabilité de Mention</strong> au Baccalauréat.
          </p>
        }
        actions={
          <>
            {nextQuizSlug ? (
              <Link href={`/quiz/${nextQuizSlug}`} className="btn btn-primary btn-sm">
                Améliorer mon niveau
              </Link>
            ) : null}
            <Link href="/bac-blanc" className="btn btn-ghost btn-sm">
              Bac Blanc chrono
            </Link>
            <Link href="/correction" className="btn btn-ghost btn-sm">
              Corriger un PDF
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Moyenne projetée"
          value={`${dashboard.mentionPrediction.projectedAverage20.toFixed(2).replace(".", ",")}/20`}
          hint={
            dashboard.mentionPrediction.mostLikelyMention
              ? `Cap : Mention ${dashboard.mentionPrediction.mostLikelyMention.label}`
              : dashboard.overallLevel.label
          }
          tone="var(--brand)"
        />
        <StatCard
          label="Expérience & Rang"
          value={`${dashboard.mentionPrediction.gamification.rank.currentXp} XP`}
          hint={`Niv. ${dashboard.mentionPrediction.gamification.rank.level} · ${dashboard.mentionPrediction.gamification.rank.title}`}
          tone="var(--gold)"
        />
        <StatCard
          label="Réussite aux quiz"
          value={dashboard.stats.quizSuccess === null ? "—" : `${dashboard.stats.quizSuccess}%`}
          hint={`${dashboard.stats.quizCount} score(s) dans l'historique`}
          tone="var(--green)"
        />
        <StatCard
          label="Progression cours"
          value={dashboard.stats.lessonsDone}
          hint={`${dashboard.stats.exercisesDone} exercice(s) · ${dashboard.stats.examsDone} série(s)`}
        />
      </div>

      {/* SECTION ÉTAPE 6 : GAMIFICATION & PROBABILITÉ DE MENTION */}
      <div className="mt-6">
        <MentionGamificationCard
          prediction={dashboard.mentionPrediction}
          history={dashboard.scoreHistory}
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
                <th className="px-3 py-3 font-bold">Scores</th>
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
                    <span className="block text-[0.65rem]">{row.quizCount} score(s)</span>
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
          <p className="eyebrow">Historique des scores (`score_history`)</p>
          <h2 className="display text-lg font-semibold text-[var(--ink)]">
            Derniers quiz, Bac Blanc &amp; devoirs
          </h2>
          {dashboard.scoreHistory.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--ink-soft)]">Aucun score enregistré pour le moment.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {dashboard.scoreHistory.map((entry) => {
                const note20 =
                  entry.noteOn20Tenths > 0
                    ? entry.noteOn20Tenths / 10
                    : (entry.score / Math.max(entry.total, 1)) * 20;
                const typeLabel =
                  entry.activityType === "bac-blanc"
                    ? "Bac Blanc"
                    : entry.activityType === "devoir"
                      ? "Devoir"
                      : "Quiz";
                return (
                  <li
                    key={entry.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--ink)]">
                        {entry.activityTitle || entry.activitySlug}
                      </p>
                      <p className="text-[0.68rem] text-[var(--ink-soft)]">
                        {typeLabel} ·{" "}
                        {new Date(entry.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        {entry.xpEarned > 0 ? ` · +${entry.xpEarned} XP` : ""}
                      </p>
                    </div>
                    <span
                      className={`badge shrink-0 ${
                        note20 >= 14 ? "badge-green" : note20 >= 10 ? "badge-blue" : "badge-brand"
                      }`}
                    >
                      {note20.toFixed(1).replace(".", ",")}/20
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
            Le profil est de démonstration : change le prénom et la section pour recalculer immédiatement tes
            coefficients et ta probabilité de mention.
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
              Réinitialiser mes progrès (historique de scores, XP, fiches, exercices, corrections)
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
