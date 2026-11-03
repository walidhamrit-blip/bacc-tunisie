import Link from "next/link";
import { getDashboard, listLessons, listSubjects } from "@/lib/data";
import { LevelPill, ProgressBar, SubjectGlyph } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [dashboard, subjects, lessons] = await Promise.all([getDashboard(), listSubjects(), listLessons()]);
  const sectionSubjects = subjects.filter((subject) => subject.sections.includes(dashboard.student.section));
  const visibleSubjects = (sectionSubjects.length > 0 ? sectionSubjects : subjects).slice(0, 8);
  const featuredLessons = lessons.slice(0, 3);
  const topLevels = dashboard.tracked.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--brand)]/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[var(--green)]/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="fade-up">
            <span className="badge badge-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
              Bac tunisien · programme officiel
            </span>
            <h1 className="display mt-4 text-[2.4rem] font-semibold leading-[1.05] text-[var(--ink)] sm:text-[3.4rem]">
              Comprendre le cours,
              <br />
              puis réussir l&apos;épreuve.
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--ink-soft)]">
              Des fiches claires pour <strong className="text-[var(--ink)]">toutes les matières</strong> du
              baccalauréat, des séries et examens corrigés pas à pas, des quiz pour vérifier ta compréhension, et un
              tableau d&apos;évaluation de ton niveau. Tu peux même <strong className="text-[var(--ink)]">joindre un
              PDF d&apos;exercices</strong> : on t&apos;aide à le corriger et à le comprendre.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="/matieres" className="btn btn-primary">
                Explorer les matières
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/programme" className="btn btn-ghost">
                Mon programme de l&apos;année
              </Link>
              <Link href="/correction" className="btn btn-ghost">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Joindre un PDF d&apos;exercices
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-[var(--ink-soft)]">
              <span className="inline-flex items-center gap-1.5">
                <Check /> Fiches pédagogiques
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check /> Corrigés détaillés
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check /> Suivi de niveau
              </span>
            </div>
          </div>

          <div className="card fade-up relative overflow-hidden p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--gold)]/15" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Tableau de niveau</p>
                <p className="display mt-1 text-xl font-semibold text-[var(--ink)]">{dashboard.student.name}</p>
                <p className="text-xs text-[var(--ink-soft)]">{dashboard.student.section}</p>
              </div>
              <LevelPill level={dashboard.overallLevel} />
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[#fcfaf5] p-4">
              <div className="flex items-end justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                  Maîtrise globale
                </p>
                <p className="display text-2xl font-semibold text-[var(--ink)]">{dashboard.overallMastery}%</p>
              </div>
              <div className="mt-2">
                <ProgressBar value={dashboard.overallMastery} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <MiniStat value={dashboard.stats.lessonsDone} label="fiches" />
                <MiniStat value={dashboard.stats.quizCount} label="quiz" />
                <MiniStat value={dashboard.stats.exercisesDone} label="exercices" />
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {topLevels.map((row) => (
                <div key={row.subject.slug} className="flex items-center gap-3">
                  <SubjectGlyph subject={row.subject} size={30} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate font-semibold text-[var(--ink)]">{row.subject.shortName}</span>
                      <span className="text-[var(--ink-soft)]">{row.mastery}%</span>
                    </div>
                    <div className="mt-1">
                      <ProgressBar value={row.mastery} tone={row.subject.accent} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/evaluation" className="mt-5 flex items-center justify-between text-sm font-semibold text-[var(--brand)]">
              Voir le tableau complet
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickCard
            href="/cours"
            title="Fiches de cours"
            text="Notions expliquées simplement, formules et erreurs à éviter."
            color="var(--blue)"
            icon="📘"
          />
          <QuickCard
            href="/exercices"
            title="Exercices corrigés"
            text="Méthode étape par étape, pas seulement la réponse."
            color="var(--green)"
            icon="✍️"
          />
          <QuickCard
            href="/examens"
            title="Examens & séries"
            text="Sujets types bac avec barème et corrigés détaillés."
            color="var(--brand)"
            icon="🗂️"
          />
          <QuickCard
            href="/quiz"
            title="Quiz interactifs"
            text="Correction immédiate et explication de chaque réponse."
            color="var(--gold)"
            icon="⚡"
          />
          <QuickCard
            href="/programme"
            title="Programme officiel"
            text="Tes chapitres par filière, avec le trimestre de chaque devoir de synthèse."
            color="var(--violet)"
            icon="🗺️"
          />
        </div>

        <section className="mt-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Toutes les matières</p>
              <h2 className="display mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Par où veux-tu commencer ?
              </h2>
            </div>
            <Link href="/matieres" className="btn btn-ghost btn-sm">
              Voir les 13 matières
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleSubjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/matieres/${subject.slug}`}
                className="card card-hover flex flex-col p-4"
              >
                <div className="flex items-start justify-between">
                  <SubjectGlyph subject={subject} size={38} />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                    {subject.family}
                  </span>
                </div>
                <p className="mt-3 text-[0.98rem] font-semibold text-[var(--ink)]">{subject.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--ink-soft)]">{subject.description}</p>
                <span className="mt-3 text-[0.75rem] font-semibold" style={{ color: subject.accent }}>
                  Cours, exercices & quiz →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Méthode</p>
                <h2 className="display mt-1 text-2xl font-semibold text-[var(--ink)]">
                  Un parcours en 4 étapes
                </h2>
              </div>
              <span className="badge badge-green">Pédagogie active</span>
            </div>
            <ol className="mt-5 space-y-4">
              {[
                ["Comprendre", "Lis la fiche : objectifs, notions clés, exemple guidé et « à retenir »."],
                ["S'entraîner", "Attaque un exercice corrigé : la solution est découpée en étapes réutilisables."],
                ["Vérifier", "Passe le quiz de la notion : chaque réponse est expliquée immédiatement."],
                ["Progresser", "Ton tableau de niveau identifie la matière la plus fragile et l'étape suivante."],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
                    <p className="text-sm text-[var(--ink-soft)]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card relative overflow-hidden border-[#d9c9a4] bg-[#fdf6e7] p-5 sm:p-6">
            <p className="eyebrow">Nouveau · correction assistée</p>
            <h2 className="display mt-1 text-2xl font-semibold text-[var(--ink)]">
              Joins ton PDF d&apos;exercices
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              Dépose ta feuille d&apos;exercices (PDF) ou colle l&apos;énoncé. Tu reçois un guide de correction :
              données repérées, méthode par question, rappels de cours et points de vigilance.
            </p>
            <div className="mt-4 rounded-xl border border-[#e7d5b0] bg-white/70 p-3 text-xs text-[var(--ink-soft)]">
              <p className="font-semibold text-[var(--ink)]">Exemple de restitution</p>
              <ul className="mt-1.5 space-y-1">
                <li>• Exercice 1 — 4 questions détectées · 6 points indicatifs</li>
                <li>• Méthode : identifier u′uⁿ avant de primitiver</li>
                <li>• Rappel : primitive de u′/u = ln|u|</li>
              </ul>
            </div>
            <Link href="/correction" className="btn btn-primary mt-5">
              Déposer un PDF
            </Link>
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="eyebrow">À lire aujourd&apos;hui</p>
              <h2 className="display mt-1 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                Fiches essentielles
              </h2>
            </div>
            <Link href="/cours" className="text-sm font-semibold text-[var(--brand)]">
              Toutes les fiches →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.slug} href={`/cours/${lesson.slug}`} className="card card-hover p-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                  {lesson.chapter}
                </p>
                <p className="display mt-2 text-lg font-semibold leading-snug text-[var(--ink)]">{lesson.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-[var(--ink-soft)]">{lesson.summary}</p>
                <p className="mt-3 text-xs font-semibold text-[var(--brand)]">
                  {lesson.durationMin} min de lecture →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#e8f1ea" />
      <path d="m8 12.4 2.6 2.6L16 10" stroke="var(--green)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="display text-lg font-semibold text-[var(--ink)]">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.08em] text-[var(--ink-soft)]">{label}</p>
    </div>
  );
}

function QuickCard({
  href,
  title,
  text,
  color,
  icon,
}: {
  href: string;
  title: string;
  text: string;
  color: string;
  icon: string;
}) {
  return (
    <Link href={href} className="card card-hover flex items-start gap-3 p-4">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base"
        style={{ background: `${color}14`, border: `1px solid ${color}26` }}
        aria-hidden
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-[var(--ink)]">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-[var(--ink-soft)]">{text}</span>
      </span>
    </Link>
  );
}
