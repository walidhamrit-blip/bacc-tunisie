"use client";

import { useState } from "react";

export type FlashcardStatus = "known" | "review";

export type FlashcardCardProps = {
  question: string;
  answer: string;
  category?: string;
  subtitle?: string;
  cardNumber?: number;
  totalCards?: number;
  status?: FlashcardStatus;
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
};

export function FlashcardCard({
  question,
  answer,
  category,
  subtitle,
  cardNumber,
  totalCards,
  status,
  flipped: controlledFlipped,
  onFlipChange,
}: FlashcardCardProps) {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const isControlled = controlledFlipped !== undefined;
  const isFlipped = isControlled ? controlledFlipped : internalFlipped;

  const handleToggle = () => {
    const next = !isFlipped;
    if (!isControlled) {
      setInternalFlipped(next);
    }
    onFlipChange?.(next);
  };

  const positionLabel =
    cardNumber !== undefined && totalCards !== undefined
      ? `Carte ${cardNumber} / ${totalCards}`
      : null;

  return (
    <div className="flashcard-scene w-full">
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isFlipped}
        aria-label={
          isFlipped
            ? "Verso affiché (réponse). Cliquer pour revenir à la question."
            : "Recto affiché (question). Cliquer pour révéler la réponse."
        }
        className="group block w-full cursor-pointer rounded-[var(--radius)] border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
      >
        <div className={`flashcard-inner ${isFlipped ? "flashcard-inner-flipped" : ""}`}>
          {/* RECTO : Question */}
          <div className="flashcard-face flashcard-front flex min-h-[210px] flex-col justify-between border border-[var(--callout-warn-border)] bg-[var(--callout-warn-bg)] p-5 shadow-[var(--shadow-sm)] transition group-hover:border-[var(--gold)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="badge badge-gold">Recto · Question</span>
                {category ? <span className="badge badge-slate">{category}</span> : null}
              </div>
              <div className="flex items-center gap-1.5">
                {status === "known" ? (
                  <span className="badge badge-green">Maîtrisée</span>
                ) : status === "review" ? (
                  <span className="badge badge-brand">À revoir</span>
                ) : null}
                {positionLabel ? (
                  <span className="text-[0.7rem] font-semibold text-[var(--ink-soft)]">
                    {positionLabel}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="my-4">
              {subtitle ? (
                <p className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                  {subtitle}
                </p>
              ) : null}
              <p
                dir="auto"
                className="display text-[1.08rem] font-semibold leading-snug text-[var(--ink)] sm:text-[1.18rem]"
              >
                {question}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-[var(--callout-warn-border)] pt-2.5 text-[0.72rem] font-medium text-[var(--ink-soft)]">
              <span>Formule ta réponse puis retourne la carte</span>
              <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[var(--gold-ink)]">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
                  <path
                    d="M3 12a9 9 0 0 1 15.4-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.4 6.4L3 16m0 5v-5h5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Retourner
              </span>
            </div>
          </div>

          {/* VERSO : Réponse */}
          <div className="flashcard-face flashcard-back flex min-h-[210px] flex-col justify-between border border-[var(--green-border)] bg-[var(--green-soft)] p-5 shadow-[var(--shadow-sm)] transition group-hover:border-[var(--green)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="badge badge-green">Verso · Réponse</span>
                {category ? <span className="badge badge-slate">{category}</span> : null}
              </div>
              {positionLabel ? (
                <span className="text-[0.7rem] font-semibold text-[var(--ink-soft)]">
                  {positionLabel}
                </span>
              ) : null}
            </div>

            <div className="my-4">
              <p
                dir="auto"
                className="text-[0.98rem] font-medium leading-relaxed text-[var(--green-ink)] sm:text-[1.05rem]"
              >
                {answer}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-[var(--green-border)] pt-2.5 text-[0.72rem] font-medium text-[var(--green-note)]">
              <span>Compare honnêtement avec ta réponse</span>
              <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[var(--green)]">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
                  <path
                    d="M3 12a9 9 0 0 1 15.4-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.4 6.4L3 16m0 5v-5h5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Question
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
