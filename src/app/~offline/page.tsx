"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/ui";

type CachedCourseItem = {
  url: string;
  slug: string;
  label: string;
};

function formatSlugLabel(slug: string): string {
  const decoded = decodeURIComponent(slug).replace(/-/g, " ");
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

export default function OfflinePage() {
  const [cachedCourses, setCachedCourses] = useState<CachedCourseItem[]>([]);
  const [hasCourseIndex, setHasCourseIndex] = useState(false);

  useEffect(() => {
    async function loadCachedPages() {
      if (typeof window === "undefined" || !("caches" in window)) return;

      try {
        const cacheNames = ["cours-pages", "pages"];
        const seen = new Set<string>();
        const found: CachedCourseItem[] = [];
        let indexFound = false;

        for (const name of cacheNames) {
          const exists = await window.caches.has(name);
          if (!exists) continue;
          const cache = await window.caches.open(name);
          const requests = await cache.keys();

          for (const request of requests) {
            const parsed = new URL(request.url);
            if (parsed.pathname === "/cours") {
              indexFound = true;
            } else if (parsed.pathname.startsWith("/cours/")) {
              const slug = parsed.pathname.replace("/cours/", "");
              if (slug && !seen.has(slug)) {
                seen.add(slug);
                found.push({
                  url: parsed.pathname,
                  slug,
                  label: formatSlugLabel(slug),
                });
              }
            }
          }
        }

        setHasCourseIndex(indexFound);
        setCachedCourses(found.sort((a, b) => a.label.localeCompare(b.label, "fr")));
      } catch {
        // Ignore si Cache Storage est indisponible.
      }
    }

    loadCachedPages();
  }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl">
        <div className="card p-6 sm:p-8">
          <span className="badge badge-gold">Mode hors-ligne</span>
          <h1 className="display mt-3 text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Tu es actuellement hors connexion
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            Cette page n&apos;a pas encore été enregistrée dans le cache de ton appareil. Pas de panique : toutes les
            fiches de cours que tu as déjà consultées ou téléchargées restent disponibles pour réviser sans Internet.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {hasCourseIndex ? (
              <Link href="/cours" prefetch={false} className="btn btn-primary btn-sm">
                Ouvrir les fiches de cours
              </Link>
            ) : (
              <Link href="/" prefetch={false} className="btn btn-primary btn-sm">
                Retour à l&apos;accueil
              </Link>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-ghost btn-sm"
            >
              Réessayer la connexion
            </button>
          </div>
        </div>

        <section className="card mt-5 p-6">
          <p className="eyebrow">Fiches enregistrées sur cet appareil</p>
          {cachedCourses.length > 0 ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {cachedCourses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={course.url}
                    prefetch={false}
                    className="flex items-center justify-between gap-2 rounded-xl border border-[var(--line)] px-3.5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[#cdbfa8] hover:bg-[#fcfaf5]"
                  >
                    <span className="truncate">{course.label}</span>
                    <span aria-hidden className="text-[var(--brand)]">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              Aucune fiche de cours n&apos;est encore enregistrée localement. Dès que tu es connecté, ouvre la page{" "}
              <strong className="text-[var(--ink)]">Cours</strong> et clique sur{" "}
              <strong className="text-[var(--ink)]">« Télécharger hors-ligne »</strong> pour conserver toutes les
              fiches sur ton téléphone.
            </p>
          )}
        </section>
      </div>
    </PageShell>
  );
}
