"use client";

import { useState, type ReactNode } from "react";

export function Reveal({
  label,
  children,
  tone = "dark",
  icon = "eye",
}: {
  label: string;
  children: ReactNode;
  tone?: "dark" | "ghost" | "primary";
  icon?: "eye" | "lock" | "spark";
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`btn ${tone === "primary" ? "btn-primary" : tone === "dark" ? "btn-dark" : "btn-ghost"}`}
        aria-expanded={open}
      >
        {icon === "spark" ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            {icon === "eye" ? (
              <>
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
              </>
            ) : (
              <>
                <rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        )}
        {open ? "Masquer" : label}
      </button>
      {open ? <div className="fade-up mt-4">{children}</div> : null}
    </div>
  );
}
