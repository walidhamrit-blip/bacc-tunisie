"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/programme", label: "Programme" },
  { href: "/matieres", label: "Matières" },
  { href: "/cours", label: "Cours" },
  { href: "/communaute", label: "Communauté" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/exercices", label: "Exercices" },
  { href: "/examens", label: "Examens" },
  { href: "/bac-blanc", label: "Bac Blanc" },
  { href: "/quiz", label: "Quiz" },
  { href: "/organisation", label: "Organisation" },
  { href: "/correction", label: "Corriger PDF" },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[var(--brand)] text-lg text-white shadow-[0_8px_18px_-10px_rgba(200,16,46,0.9)]">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden>
              <path d="M12 2.5 14.3 9h6.7l-5.4 4 2 6.5-5.6-3.9L6.4 19.5l2-6.5L3 9h6.7L12 2.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="display block text-[1.05rem] font-semibold text-[var(--ink)]">Bac Coach</span>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              Tunisie · programme officiel
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2 py-1.5 text-[0.76rem] font-semibold transition ${
                isActive(item.href)
                  ? "bg-[var(--ink)] text-[var(--cream)]"
                  : "text-[var(--ink-soft)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link
            href="/evaluation"
            className={`btn btn-sm hidden sm:inline-flex ${
              isActive("/evaluation") ? "btn-primary" : "btn-ghost"
            }`}
            aria-label="Tableau d'évaluation de mon niveau"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
              <path d="M4 20V10m5 10V4m5 16v-7m5 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Mon niveau</span>
          </Link>
          <Link
            href="/mon-compte"
            className={`btn btn-sm ${
              isActive("/mon-compte") ? "btn-dark" : "btn-primary"
            }`}
            aria-label="Mon compte élève et inscription mono-section"
          >
            <span aria-hidden>🔒</span>
            <span>Mon compte</span>
          </Link>
        </div>
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-[var(--line)] px-4 py-2 xl:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-semibold ${
              isActive(item.href)
                ? "bg-[var(--ink)] text-[var(--cream)]"
                : "bg-[var(--paper)] text-[var(--ink-soft)]"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/evaluation"
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] font-semibold ${
            isActive("/evaluation")
              ? "bg-[var(--ink)] text-[var(--cream)]"
              : "bg-[var(--paper)] text-[var(--ink-soft)]"
          }`}
        >
          Mon niveau
        </Link>
      </div>
    </header>
  );
}
