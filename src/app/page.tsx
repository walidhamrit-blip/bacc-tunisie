import Link from "next/link";
import { getDashboard, listLessons, listSubjects } from "@/lib/data";
import { LevelPill, ProgressBar, SectionHeading } from "@/components/ui";
import { NAV_GROUPS } from "@/lib/navigation";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    title: "Comprendre",
    text: "Lis la fiche de cours de la notion : l'essentiel, un exemple et les erreurs à éviter.",
    href: "/cours",
    action: "Voir les cours",
  },
  {
    title: "S'entraîner",
    text: "Applique la méthode sur un exercice corrigé étape par étape, puis sur un sujet type bac.",
    href: "/exercices",
    action: "Faire un exercice",
  },
  {
    title: "Vérifier",
    text: "Réponds à un quiz court : chaque réponse est expliquée et ton score alimente ton niveau.",
    href: "/quiz",
    action: "Passer un quiz",
  },
];

export default async function HomePage() {
  const [dashboard, subjects, lessons] = await Promise.all([getDashboard(), listSubjects(), listLessons()]);
  const sectionSubjects = subjects.filter((subject) => subject.sections.includes(dashboard.student.section));
  const visibleSubjects = (sectionSubjects.length > 0 ? sectionSubjects : subjects).slice(0, 7);
  /* On propose d'abord des fiches de la matière la plus fragile, sinon les premières. */
  const prioritySubject = dashboard.weakest?.subject ?? dashboard.notStarted[0]?.subject ?? null;
  const priorityLessons = prioritySubject
    ? lessons.filter((lesson) => lesson.subjectSlug === prioritySubject.slug)
    : [];
  const featuredLessons = [...priorityLessons, ...lessons.filter((lesson) => !priorityLessons.includes(lesson))].slice(0, 3);
  const { mentionPrediction, student, overallLevel, overallMastery, stats } = dashboard;

  return (
    <>
      <section className="home-hero">
        <div className="page-container home-hero-grid">
          <div className="fade-up">
            <p className="eyebrow">Programme officiel tunisien</p>
            <h1 className="display home-hero-title">Le bac, étape par étape.</h1>
            <p className="home-hero-lead">
              Fiches de cours, exercices corrigés et quiz, rangés par matière. Suis ta progression et avance à ton rythme.
            </p>
            <div className="home-hero-actions">
              <Link href="/cours" className="btn btn-primary">
                Commencer à réviser
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/evaluation" className="btn btn-ghost">
                Voir ma progression
              </Link>
            </div>
            <p className="home-hero-note">Toutes les matières · cours accessibles hors-ligne</p>
          </div>

          <aside className="card home-progress" aria-label="Résumé de ma progression">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="eyebrow">Ma progression</p>
                <p className="display mt-1 truncate text-xl font-semibold text-[var(--ink)]">{student.name}</p>
                <p className="truncate text-xs text-[var(--ink-soft)]">{student.section}</p>
              </div>
              <LevelPill level={overallLevel} />
            </div>

            <div className="home-progress-score">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                Moyenne projetée au bac
              </p>
              <p className="display mt-1 text-3xl font-semibold text-[var(--ink)]">
                {mentionPrediction.projectedAverage20.toFixed(2).replace(".", ",")}/20
              </p>
              {mentionPrediction.mostLikelyMention ? (
                <span className={`mt-2 inline-flex badge ${mentionPrediction.mostLikelyMention.badgeClass}`}>
                  Mention {mentionPrediction.mostLikelyMention.label} ·{" "}
                  {mentionPrediction.mostLikelyMention.bracketProbabilityPct}%
                </span>
              ) : null}
            </div>

            <ProgressBar value={overallMastery} label="Maîtrise globale" />
            <p className="mt-3 text-xs text-[var(--ink-soft)]">
              {stats.lessonsDone} fiches · {stats.quizCount} quiz · {stats.exercisesDone} exercices
            </p>
            <Link href="/evaluation" className="home-progress-link">
              Détail de mon niveau <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </section>

      <div className="page-container home-content">
        <section className="home-section">
          <SectionHeading eyebrow="Par où commencer" title="Une méthode simple, en 3 étapes" />
          <div className="home-steps">
            {STEPS.map((step, index) => (
              <Link key={step.title} href={step.href} className="card card-hover home-step">
                <span className="home-step-number" aria-hidden>{index + 1}</span>
                <h3 className="display text-lg font-semibold text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{step.text}</p>
                <span className="home-step-action">{step.action} <span aria-hidden>→</span></span>
              </Link>
            ))}
          </div>

          <div className="home-subjects">
            <p className="text-sm font-semibold text-[var(--ink)]">Ou choisis une matière</p>
            <div className="home-subject-list">
              {visibleSubjects.map((subject) => (
                <Link key={subject.slug} href={`/matieres/${subject.slug}`} className="chip">
                  {subject.shortName}
                </Link>
              ))}
              <Link href="/matieres" className="home-subject-all">
                Toutes les matières →
              </Link>
            </div>
          </div>
        </section>

        <section id="ressources" className="home-section">
          <SectionHeading
            eyebrow="Plan du site"
            title="Toutes les ressources au même endroit"
          />
          <div className="home-resources">
            {NAV_GROUPS.map((group) => (
              <div key={group.id} className="card home-resource-group">
                <p className="home-resource-title">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden>
                    <path
                      d={group.icon}
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {group.label}
                </p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        {item.label}
                        <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <SectionHeading
            eyebrow="Pour continuer"
            title="Fiches à revoir"
            action={{ href: "/cours", label: "Toutes les fiches" }}
          />
          {prioritySubject ? (
            <p className="-mt-2 mb-4 text-sm text-[var(--ink-soft)]">
              Priorité à ta matière la plus fragile :{" "}
              <strong className="text-[var(--ink)]">{prioritySubject.name}</strong>.
            </p>
          ) : null}
          <div className="card home-lessons">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.slug} href={`/cours/${lesson.slug}`} className="home-lesson">
                <span className="min-w-0">
                  <span className="block truncate text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                    {lesson.chapter}
                  </span>
                  <span className="display mt-0.5 block truncate text-[1.05rem] font-semibold text-[var(--ink)]">
                    {lesson.title}
                  </span>
                </span>
                <span className="home-lesson-meta">
                  {lesson.durationMin} min <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
