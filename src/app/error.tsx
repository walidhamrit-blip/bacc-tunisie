"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] erreur non gérée", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--cream)] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--line)] bg-white p-8 shadow-sm">
        <p className="eyebrow mb-2">Bac Coach Tunisie</p>
        <h1 className="text-2xl font-semibold text-[var(--ink)]">Le serveur n&apos;arrive pas à charger cette page</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
          La base de données ne répond pas pour le moment. Réessaie dans quelques secondes :
          si le problème persiste, l&apos;application est déployée sans variable{" "}
          <code className="rounded bg-[var(--cream)] px-1">DATABASE_URL</code>.
        </p>
        {error.digest ? (
          <p className="mt-4 text-xs text-[var(--ink-soft)]">Référence technique : {error.digest}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Réessayer
          </button>
          <Link
            href="/api/health"
            className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--brand)]"
          >
            Voir le diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
