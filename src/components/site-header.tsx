"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_GROUPS, PRIMARY_NAV, isNavActive } from "@/lib/navigation";

/**
 * En-tête simplifié : 4 accès permanents + un menu unique qui rassemble
 * TOUTES les rubriques en 3 groupes. Sur mobile, le même menu remplace
 * l'ancienne double barre de liens défilante.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setOpen(false);
    };
    /* Fermeture également sur retour/avant arrière du navigateur. */
    const handlePopState = () => setOpen(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand" aria-label="Bac Coach Tunisie · Accueil">
            <span className="brand-mark" aria-hidden>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none">
                <path d="M12 2.5 14.3 9h6.7l-5.4 4 2 6.5-5.6-3.9L6.4 19.5l2-6.5L3 9h6.7L12 2.5Z" fill="currentColor" />
              </svg>
            </span>
            <span className="brand-text">
              <strong className="display">Bac Coach</strong>
              <span>Tunisie</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Accès rapides">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Link href="/mon-compte" className="header-account" aria-label="Mon compte">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden>
                <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>Compte</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-trigger"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                )}
              </svg>
              <span>{open ? "Fermer" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="menu-layer">
          <div
            id="site-menu"
            ref={panelRef}
            className="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Toutes les rubriques"
          >
            <div className="menu-panel-head">
              <div>
                <p className="eyebrow">Plan du site</p>
                <p className="display text-lg font-semibold text-[var(--ink)]">Toutes les rubriques</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="btn btn-ghost btn-sm !px-2.5"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Fermer le menu"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="menu-grid">
              {NAV_GROUPS.map((group) => (
                <section key={group.id} className="menu-group">
                  <p className="menu-group-title">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden>
                      <path d={group.icon} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {group.label}
                  </p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
                        >
                          <span className="menu-item-label">{item.label}</span>
                          {item.hint ? <span className="menu-item-hint">{item.hint}</span> : null}
                          <span className="menu-item-arrow" aria-hidden>→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="menu-panel-foot">
              Astuce : les quatre accès rapides (Cours, Exercices, Examens, Quiz) restent toujours visibles en haut de page.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
