
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

/**
 * Select a goblet voice based on configuration or randomly
 * @param config Configuration with optional gobletVoice
 * @returns The selected goblet voice
 */
export const selectGobletVoice = (config: any): string => {
  const voices = ['swamp-prophet', 'pirate-radio-dj', 'park-ranger', 'theme-park-mascot'];
  
  if (config.gobletVoice && voices.includes(config.gobletVoice)) {
    return config.gobletVoice;
  }
  
  // Return a random voice
  return voices[Math.floor(Math.random() * voices.length)];
};

/**
 * Initialize player inventories based on configuration and characters
 * @param config The simulation configuration
 * @param gameState The current game state
 * @returns The game state with initialized player inventories
 */
export const initializePlayerInventories = (config: any, gameState: any): any => {
  const playerCount = config.players || 3;
  
  gameState.playerInventories = {};
  
  for (let i = 0; i < playerCount; i++) {
    const character = gameState.selectedCharacters?.[i];
    
    gameState.playerInventories[i] = {
      gear: character?.starterGear || [],
      treasures: [],
      health: character?.health || 10,
      weirdness: character?.weirdness || 0,
      luck: character?.luck || 5
    };
  }
  
  return gameState;
};
