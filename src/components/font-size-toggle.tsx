"use client";

import { useEffect, useSyncExternalStore } from "react";

export type FontSizeId = "normal" | "large" | "xlarge" | "xxlarge";

export interface FontSizeStep {
  id: FontSizeId;
  scale: number;
  label: string;
}

export const FONT_SIZE_STEPS: readonly FontSizeStep[] = [
  { id: "normal", scale: 100, label: "Taille normale" },
  { id: "large", scale: 115, label: "Grande taille" },
  { id: "xlarge", scale: 130, label: "Très grande taille" },
  { id: "xxlarge", scale: 145, label: "Taille maximale (basse vision)" },
] as const;

const STORAGE_KEY = "bac-coach-font-size";
const CHANGE_EVENT = "bac-coach-font-size-change";

function isValidFontSizeId(value: string | null): value is FontSizeId {
  return FONT_SIZE_STEPS.some((step) => step.id === value);
}

function getClientSnapshot(): FontSizeId {
  if (typeof window === "undefined") return "normal";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isValidFontSizeId(stored) ? stored : "normal";
  } catch {
    return "normal";
  }
}

function getServerSnapshot(): FontSizeId {
  return "normal";
}

function subscribeFontSize(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function applyFontSizeToDocument(step: FontSizeStep) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.fontSize = step.id;
  root.style.fontSize = `${step.scale}%`;
}

export function FontSizeToggle() {
  const currentId = useSyncExternalStore(
    subscribeFontSize,
    getClientSnapshot,
    getServerSnapshot,
  );

  const currentIndex = Math.max(
    0,
    FONT_SIZE_STEPS.findIndex((step) => step.id === currentId),
  );
  const currentStep = FONT_SIZE_STEPS[currentIndex] ?? FONT_SIZE_STEPS[0];

  useEffect(() => {
    applyFontSizeToDocument(currentStep);
  }, [currentStep]);

  const selectStep = (nextStep: FontSizeStep) => {
    applyFontSizeToDocument(nextStep);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextStep.id);
    } catch {
      // Ignore si localStorage est restreint en navigation privée.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const canDecrease = currentIndex > 0;
  const canIncrease = currentIndex < FONT_SIZE_STEPS.length - 1;
  const isEnlarged = currentStep.scale > 100;

  const handleDecrease = () => {
    if (!canDecrease) return;
    selectStep(FONT_SIZE_STEPS[currentIndex - 1]);
  };

  const handleIncrease = () => {
    if (!canIncrease) return;
    selectStep(FONT_SIZE_STEPS[currentIndex + 1]);
  };

  const handleCycle = () => {
    const nextIndex = (currentIndex + 1) % FONT_SIZE_STEPS.length;
    selectStep(FONT_SIZE_STEPS[nextIndex]);
  };

  return (
    <div
      role="group"
      aria-label="Taille de la police (confort basse vision)"
      className={`font-size-control ${isEnlarged ? "font-size-control-active" : ""}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={!canDecrease}
        className="font-size-btn font-size-btn-dec"
        aria-label="Réduire la taille de la police"
        title="Réduire la taille de la police (A−)"
      >
        <span aria-hidden>A−</span>
      </button>

      <button
        type="button"
        onClick={handleCycle}
        className="font-size-status"
        aria-label={`Taille de la police : ${currentStep.label} (${currentStep.scale}%). Cliquer pour agrandir la police`}
        aria-live="polite"
        title={`${currentStep.label} (${currentStep.scale}%) · Cliquer pour agrandir ou réinitialiser`}
      >
        <span className="font-size-value">{currentStep.scale}%</span>
      </button>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={!canIncrease}
        className="font-size-btn font-size-btn-inc"
        aria-label="Agrandir la taille de la police (confort basse vision)"
        title="Agrandir la taille de la police (A+)"
      >
        <span aria-hidden>A+</span>
      </button>
    </div>
  );
}
