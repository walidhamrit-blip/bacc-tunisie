import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="display text-lg font-semibold text-[var(--ink)]">Bac Coach Tunisie</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Cours, exercices corrigés et quiz pour le baccalauréat tunisien.
          </p>
        </div>
        <nav className="site-footer-links" aria-label="Liens utiles">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/#ressources">Toutes les rubriques</Link>
        </nav>
      </div>
      <p className="site-footer-note">
        Programme officiel tunisien · Les corrigés sont des aides pédagogiques : vérifie toujours avec ton professeur.
      </p>
    </footer>
  );
}
