"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

function subscribeOnlineStatus(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}

function getServerOnlineSnapshot() {
  return true;
}

const DISMISS_STORAGE_KEY = "bac-coach-pwa-dismissed";

export function PwaBanner() {
  const isOnline = useSyncExternalStore(
    subscribeOnlineStatus,
    getOnlineSnapshot,
    getServerOnlineSnapshot,
  );

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone));

    if (isStandalone || window.localStorage.getItem(DISMISS_STORAGE_KEY) === "1") {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      // Ignore si le stockage privé bloque localStorage.
    }
  };

  return (
    <>
      {!isOnline ? (
        <div
          role="status"
          aria-live="polite"
          className="no-print border-b border-[#e8cfa0] bg-[var(--gold-soft)] px-4 py-2 text-xs text-[#6e4e00]"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--gold)]" aria-hidden />
              Mode hors-ligne actif · Tes fiches de cours enregistrées restent accessibles sans connexion.
            </span>
            <Link href="/cours" className="font-bold underline underline-offset-2">
              Voir les cours →
            </Link>
          </div>
        </div>
      ) : null}

      {installPrompt && !dismissed ? (
        <div className="no-print fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-md">
          <div className="card flex items-center justify-between gap-3 border-[var(--brand)]/25 bg-[var(--paper)] p-3.5 shadow-[var(--shadow-md)]">
            <div className="min-w-0">
              <p className="text-xs font-bold text-[var(--ink)]">Installer Bac Coach Tunisie</p>
              <p className="mt-0.5 text-[0.75rem] leading-snug text-[var(--ink-soft)]">
                Ajoute l&apos;application sur ton écran d&apos;accueil pour réviser tes fiches hors-ligne.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button type="button" onClick={handleDismiss} className="btn btn-ghost btn-sm">
                Plus tard
              </button>
              <button type="button" onClick={handleInstall} className="btn btn-primary btn-sm">
                Installer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
