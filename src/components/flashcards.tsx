"use client";

import { useState } from "react";
import type { Flashcard } from "@/db/schema";

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return null;
  const card = cards[index];

  return (
    <div>
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        className="flex min-h-[130px] w-full flex-col justify-center rounded-2xl border border-[#d9c9a4] bg-[#fdf6e7] p-5 text-left transition hover:border-[var(--gold)]"
        aria-label="Retourner la carte"
      >
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#8a6200]">
          {flipped ? "Réponse" : `Carte ${index + 1} / ${cards.length} · question`}
        </span>
        <span className="display mt-2 text-[1.02rem] font-semibold leading-snug text-[var(--ink)]">
          {flipped ? card.answer : card.question}
        </span>
        <span className="mt-2 text-[0.7rem] text-[var(--ink-soft)]">
          {flipped ? "Cliquer pour revoir la question" : "Cliquer pour révéler la réponse"}
        </span>
      </button>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setIndex((value) => (value - 1 + cards.length) % cards.length);
            setFlipped(false);
          }}
          className="btn btn-ghost btn-sm"
        >
          ← Précédente
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex((value) => (value + 1) % cards.length);
            setFlipped(false);
          }}
          className="btn btn-dark btn-sm"
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}
