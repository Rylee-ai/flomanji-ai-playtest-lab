
import { CardType, GameCard } from "@/types/cards";
import { log } from "@/utils/logging";

// Create a complete set of card types for consistent counting
const ALL_CARD_TYPES: CardType[] = [
  "player-character",
  "npc",
  "flomanjified",
  "treasure",
  "artifact", 
  "gear",
  "hazard",
  "chaos",
  "region",
  "mission",
  "secret",
  "automa",
  "exploration",
  "escape",
  "escort",
  "collection",
  "boss",
  "solo"
];

/**
 * Calculate card counts for each card type with improved performance
 */
export const calculateCardCounts = (cards: GameCard[]): Record<CardType | string, number> => {
  // Initialize counts with all known card types set to 0
  const initialCounts: Record<CardType | string, number> = ALL_CARD_TYPES.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as Record<CardType | string, number>);

  if (!cards || cards.length === 0) {
    log.debug("No cards provided to calculateCardCounts");
    return initialCounts;
  }

  log.debug("Calculating card counts for cards array", { 
    totalCards: cards.length,
    types: [...new Set(cards.map(c => c.type))]
  });

  // Use a more efficient reduce operation
  const counts = cards.reduce((counts, card) => {
    if (!card || !card.type) {
      return counts;
    }
    
    const type = card.type;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, initialCounts);
  
  // Log the counts for debugging
  log.debug("Card counts calculated", { counts });
  
  return counts;
};

/**
 * Get count for a specific card type
 */
export const getCardCount = (counts: Record<CardType | string, number>, type: CardType): number => {
  return counts[type] || 0;
};

/**
 * Merge multiple card count objects
 */
export const mergeCardCounts = (...countObjects: Record<CardType | string, number>[]): Record<CardType | string, number> => {
  const result = ALL_CARD_TYPES.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as Record<CardType | string, number>);
  
  countObjects.forEach(countObj => {
    Object.entries(countObj).forEach(([type, count]) => {
      result[type] = (result[type] || 0) + count;
    });
  });
  
  return result;
};
