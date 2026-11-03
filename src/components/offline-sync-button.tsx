"use client";

import { useCallback, useEffect, useState } from "react";

type OfflineSyncButtonProps = {
  lessonSlugs: string[];
};

const COURSE_CACHE_NAMES = ["cours-pages", "pages"] as const;

async function countCachedLessons(slugs: string[]): Promise<number> {
  if (typeof window === "undefined" || !("caches" in window) || slugs.length === 0) {
    return 0;
  }

  try {
    const cachesList = await Promise.all(
      COURSE_CACHE_NAMES.map((name) => window.caches.open(name)),
    );
    let count = 0;

    for (const slug of slugs) {
      const url = `/cours/${slug}`;
      let found = false;
      for (const cache of cachesList) {
        const match = await cache.match(url, { ignoreSearch: true });
        if (match) {
          found = true;
          break;
        }
      }
      if (found) count += 1;
    }

    return count;
  } catch {
    return 0;
  }
}

export function OfflineSyncButton({ lessonSlugs }: OfflineSyncButtonProps) {
  const [cachedCount, setCachedCount] = useState<number>(0);
  const [syncing, setSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const total = lessonSlugs.length;

  useEffect(() => {
    let active = true;
    countCachedLessons(lessonSlugs).then((count) => {
      if (active) setCachedCount(count);
    });
    return () => {
      active = false;
    };
  }, [lessonSlugs]);

  const handleSync = useCallback(async () => {
    if (syncing || total === 0) return;
    if (typeof window === "undefined" || !("caches" in window)) {
      setError("Le cache hors-ligne n'est pas supporté par ce navigateur.");
      return;
    }
    if (!navigator.onLine) {
      setError("Reconnecte-toi à Internet pour télécharger toutes les fiches.");
      return;
    }

    setSyncing(true);
    setError(null);
    setProgress(0);

    try {
      const courseCache = await window.caches.open("cours-pages");
      const urls = ["/cours", ...lessonSlugs.map((slug) => `/cours/${slug}`)];
      let completed = 0;

      // Téléchargement par petits lots pour rester fluide sur mobile
      const batchSize = 4;
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (url) => {
            const response = await fetch(url, {
              credentials: "same-origin",
              headers: { Accept: "text/html" },
            });
            if (response.ok) {
              await courseCache.put(url, response.clone());
            }
            if (url !== "/cours") {
              completed += 1;
              setProgress(completed);
            }
          }),
        );
      }

      const updatedCount = await countCachedLessons(lessonSlugs);
      setCachedCount(updatedCount);
    } catch {
      setError("Téléchargement interrompu. Vérifie ta connexion et réessaie.");
    } finally {
      setSyncing(false);
    }
  }, [lessonSlugs, syncing, total]);

  if (total === 0) return null;

  const allCached = cachedCount >= total;

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        type="button"
        onClick={handleSync}
        disabled={syncing}
        className={`btn btn-sm ${allCached ? "btn-ghost" : "btn-dark"}`}
        title="Enregistrer toutes les fiches de cours sur cet appareil pour réviser sans Internet"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden>
          {allCached && !syncing ? (
            <path
              d="M20 6 9 17l-5-5"
              stroke="var(--green)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
        {syncing
          ? `Mise en cache… ${progress}/${total}`
          : allCached
            ? `${cachedCount}/${total} fiches hors-ligne`
            : cachedCount > 0
              ? `Hors-ligne (${cachedCount}/${total})`
              : "Télécharger hors-ligne"}
      </button>
      {error ? <p className="text-[0.7rem] font-medium text-[var(--brand)]">{error}</p> : null}
    </div>
  );
}
