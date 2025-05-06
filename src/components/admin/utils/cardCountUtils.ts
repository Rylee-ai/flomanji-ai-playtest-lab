
import { CardType, GameCard } from "@/types/cards";

/**
 * Calculate card counts for each card type
 */
export const calculateCardCounts = (cards: GameCard[]): Record<CardType, number> => {
  const initialCounts: Partial<Record<CardType, number>> = {
    "player-character": 0,
    "npc": 0,
    "flomanjified": 0,
    "treasure": 0,
    "gear": 0,
    "hazard": 0,
    "chaos": 0,
    "region": 0,
    "mission": 0,
    "secret": 0,
    "automa": 0
  };

  return cards.reduce((counts, card) => {
    const type = card.type as CardType;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, initialCounts) as Record<CardType, number>;
};
