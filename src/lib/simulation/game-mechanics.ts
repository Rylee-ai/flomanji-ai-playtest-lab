
import { GameCard } from "@/types/cards";

/**
 * Draw a random card from a deck
 * @param deck Array of cards to draw from
 * @returns A randomly selected card or undefined if deck is empty
 */
export const drawRandomCard = <T extends GameCard>(deck: T[]): T | undefined => {
  if (!deck || deck.length === 0) {
    console.warn("Attempted to draw from empty deck");
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
};

/**
 * Draw multiple random cards from a deck
 * @param deck Array of cards to draw from
 * @param count Number of cards to draw
 * @param unique Whether to draw unique cards (no duplicates)
 * @returns Array of randomly selected cards
 */
export const drawRandomCards = <T extends GameCard>(
  deck: T[], 
  count: number, 
  unique: boolean = true
): T[] => {
  if (!deck || deck.length === 0) {
    console.warn("Attempted to draw from empty deck");
    return [];
  }
  
  if (unique && count > deck.length) {
    console.warn(`Attempted to draw ${count} unique cards from deck of ${deck.length}`);
    count = deck.length;
  }
  
  if (unique) {
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } else {
    const result: T[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      result.push(deck[randomIndex]);
    }
    return result;
  }
};

/**
 * Draw a specific card by ID from a deck
 * @param deck Array of cards to search
 * @param id ID of the card to draw
 * @returns The matching card or undefined if not found
 */
export const drawCardById = <T extends GameCard>(deck: T[], id: string): T | undefined => {
  if (!deck || deck.length === 0) {
    console.warn("Attempted to draw from empty deck");
    return undefined;
  }
  
  return deck.find(card => card.id === id);
};

/**
 * Simulate a dice roll
 * @param sides Number of sides on the dice (default: 10)
 * @param modifier Modifier to add to the result
 * @returns The dice roll result
 */
export const rollDice = (sides: number = 10, modifier: number = 0): number => {
  const roll = Math.floor(Math.random() * sides) + 1;
  return roll + modifier;
};

/**
 * Check if a dice roll succeeds based on Flomanji rules
 * @param roll The dice roll result
 * @returns Success level: "failure", "partial", or "success"
 */
export const checkSuccess = (roll: number): "failure" | "partial" | "success" => {
  if (roll <= 3) return "failure";
  if (roll <= 7) return "partial";
  return "success";
};
