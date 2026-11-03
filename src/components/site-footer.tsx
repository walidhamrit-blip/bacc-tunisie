import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[var(--footer-bg)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-xl font-semibold text-[var(--ink)]">Bac Coach Tunisie</p>
          <p className="mt-3 max-w-sm text-sm text-[var(--ink-soft)]">
            Un accompagnement pédagogique pour les élèves de baccalauréat : fiches de cours, séries et examens
            corrigés, quiz et évaluation de niveau matière par matière.
          </p>
          <p className="mt-4 text-xs text-[var(--ink-soft)]">
            Programme officiel tunisien · Sections Mathématiques, Sciences expérimentales, Sciences techniques,
            Économie &amp; Gestion, Lettres, Informatique et Sport.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Apprendre</p>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li><Link className="hover:text-[var(--brand)]" href="/matieres">Toutes les matières</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/cours">Fiches de cours</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/flashcards">Cartes mémos (Flashcards)</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/exercices">Exercices corrigés</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/examens">Examens &amp; séries</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">S&apos;entraîner</p>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li><Link className="hover:text-[var(--brand)]" href="/bac-blanc">Simulateur Bac Blanc (chrono)</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/quiz">Quiz interactifs</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/correction">Corriger un PDF d&apos;exercices</Link></li>
            <li><Link className="hover:text-[var(--brand)]" href="/evaluation">Tableau de niveau</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-4 py-5 text-center text-xs text-[var(--ink-soft)] sm:px-6">
        Conçu pour réviser autrement · Les corrigés sont des aides pédagogiques : vérifie toujours avec ton professeur.
      </div>
    </footer>
  );
}
