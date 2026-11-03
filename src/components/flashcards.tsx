"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { FlashcardCard, type FlashcardStatus } from "@/components/flashcard-card";

export type FlashcardItemData = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  subtitle?: string;
};

export type FlashcardsProps = {
  cards: FlashcardItemData[];
  showStudyControls?: boolean;
};

type IndexedCard = FlashcardItemData & {
  keyId: string;
};

export function Flashcards({ cards, showStudyControls = true }: FlashcardsProps) {
  const baseCards = useMemo<IndexedCard[]>(
    () =>
      cards.map((card, index) => ({
        ...card,
        keyId: card.id ?? `${index}-${card.question.slice(0, 32)}`,
      })),
    [cards],
  );

  const [order, setOrder] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, FlashcardStatus>>({});
  const [onlyReview, setOnlyReview] = useState(false);

  const orderedCards = useMemo(() => {
    if (!order) return baseCards;
    const byKey = new Map(baseCards.map((card) => [card.keyId, card]));
    const mapped = order
      .map((key) => byKey.get(key))
      .filter((item): item is IndexedCard => Boolean(item));
    return mapped.length === baseCards.length ? mapped : baseCards;
  }, [baseCards, order]);

  const reviewCards = useMemo(
    () => orderedCards.filter((card) => statuses[card.keyId] !== "known"),
    [orderedCards, statuses],
  );

  const activeDeck = onlyReview && reviewCards.length > 0 ? reviewCards : orderedCards;

  if (baseCards.length === 0) return null;

  const safeIndex = activeDeck.length > 0 ? index % activeDeck.length : 0;
  const currentCard = activeDeck[safeIndex];
  const knownCount = baseCards.filter((card) => statuses[card.keyId] === "known").length;
  const reviewCount = baseCards.filter((card) => statuses[card.keyId] === "review").length;
  const masteryPercent = Math.round((knownCount / baseCards.length) * 100);

  const goPrevious = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + activeDeck.length) % activeDeck.length);
  };

  const goNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % activeDeck.length);
  };

  const markCurrentCard = (status: FlashcardStatus) => {
    if (!currentCard) return;
    const nextStatuses: Record<string, FlashcardStatus> = {
      ...statuses,
      [currentCard.keyId]: status,
    };
    setStatuses(nextStatuses);
    setFlipped(false);

    // En mode "À revoir", la carte maîtrisée sort automatiquement de la pile filtrée
    if (onlyReview && status === "known") {
      const remaining = orderedCards.filter((card) => nextStatuses[card.keyId] !== "known");
      if (remaining.length === 0) {
        setOnlyReview(false);
        setIndex(0);
      } else {
        setIndex((prev) => prev % remaining.length);
      }
      return;
    }

    setIndex((prev) => (prev + 1) % activeDeck.length);
  };

  const handleShuffle = () => {
    const shuffled = [...orderedCards];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled.map((card) => card.keyId));
    setIndex(0);
    setFlipped(false);
  };

  const handleReset = () => {
    setOrder(null);
    setStatuses({});
    setOnlyReview(false);
    setIndex(0);
    setFlipped(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="space-y-3">
      {showStudyControls && baseCards.length > 1 ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--ink-soft)]">
            <span>
              Maîtrisées : <strong className="text-[var(--ink)]">{knownCount}</strong> / {baseCards.length}
              {reviewCount > 0 ? ` · ${reviewCount} à revoir` : ""}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {reviewCards.length > 0 && reviewCards.length < baseCards.length ? (
                <button
                  type="button"
                  onClick={() => {
                    setOnlyReview((value) => !value);
                    setIndex(0);
                    setFlipped(false);
                  }}
                  className={`chip !px-2.5 !py-1 !text-[0.7rem] ${onlyReview ? "chip-active" : ""}`}
                >
                  {onlyReview ? `Toutes (${baseCards.length})` : `À revoir (${reviewCards.length})`}
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleShuffle}
                className="chip !px-2.5 !py-1 !text-[0.7rem]"
                title="Mélanger l'ordre des cartes"
              >
                Mélanger
              </button>
              {knownCount > 0 || reviewCount > 0 || order !== null ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="chip !px-2.5 !py-1 !text-[0.7rem]"
                  title="Réinitialiser la session"
                >
                  Réinitialiser
                </button>
              ) : null}
            </div>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${masteryPercent}%`,
                background: masteryPercent === 100 ? "var(--green)" : "var(--gold)",
              }}
            />
          </div>
        </div>
      ) : null}

      <FlashcardCard
        question={currentCard.question}
        answer={currentCard.answer}
        category={currentCard.category}
        subtitle={currentCard.subtitle}
        cardNumber={safeIndex + 1}
        totalCards={activeDeck.length}
        status={statuses[currentCard.keyId]}
        flipped={flipped}
        onFlipChange={setFlipped}
      />

      {/* Boutons d'auto-évaluation active dès que la réponse a été consultée */}
      {flipped ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => markCurrentCard("review")}
            className="btn btn-ghost btn-sm w-full border-[var(--danger-border)] text-[var(--brand)]"
          >
            À revoir
          </button>
          <button
            type="button"
            onClick={() => markCurrentCard("known")}
            className="btn btn-sm w-full border border-[var(--green-border)] bg-[var(--green-soft)] text-[var(--green)] hover:opacity-90"
          >
            Maîtrisée ✓
          </button>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2 pt-0.5">
        <button
          type="button"
          onClick={goPrevious}
          disabled={activeDeck.length <= 1}
          className="btn btn-ghost btn-sm disabled:opacity-40"
        >
          ← Précédente
        </button>
        <span className="text-[0.7rem] font-medium text-[var(--ink-soft)]">
          {safeIndex + 1} / {activeDeck.length}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={activeDeck.length <= 1}
          className="btn btn-dark btn-sm disabled:opacity-40"
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}
