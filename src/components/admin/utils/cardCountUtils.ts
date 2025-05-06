
import { CardType, GameCard } from "@/types/cards";
import { log } from "@/utils/logging";

/**
 * Calculate card counts for each card type
 */
export const calculateCardCounts = (cards: GameCard[]): Record<CardType | string, number> => {
  const initialCounts: Partial<Record<CardType | string, number>> = {
    "player-character": 0,
    "npc": 0,
    "flomanjified": 0,
    "treasure": 0,
    "artifact": 0,
    "gear": 0,
    "hazard": 0,
    "chaos": 0,
    "region": 0,
    "mission": 0,
    "secret": 0,
    "automa": 0,
    "exploration": 0,
    "escape": 0,
    "escort": 0,
    "collection": 0,
    "boss": 0,
    "solo": 0
  };

  if (!cards || cards.length === 0) {
    log.debug("No cards provided to calculateCardCounts");
    return initialCounts as Record<CardType | string, number>;
  }

  log.debug("Calculating card counts for cards array", { 
    totalCards: cards.length,
    types: [...new Set(cards.map(c => c.type))]
  });

  const counts = cards.reduce((counts, card) => {
    if (!card || !card.type) {
      return counts;
    }
    const type = card.type;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, initialCounts) as Record<CardType | string, number>;
  
  // Log the counts for debugging
  log.debug("Card counts calculated", { counts });
  
  return counts;
};
