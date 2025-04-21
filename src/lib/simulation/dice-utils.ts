
/**
 * Utility functions related to dice rolling and randomness
 */

/**
 * Simulates a dice roll - returns a value between 1-10 to simulate 2d6
 * @param stat - The stat modifier to add to the roll
 * @returns Object containing the roll value and result string
 */
export function simulateDiceRoll(stat: number = 0): {value: number, result: string} {
  const roll = Math.floor(Math.random() * 10) + 1;
  const total = roll + stat;
  
  let result = "failure";
  if (total >= 8) result = "success";
  else if (total >= 4) result = "partial success";
  
  return {value: roll, result};
}

/**
 * Draw a random card from a deck
 * @param deck - Array of card objects
 * @returns A randomly selected card or null if deck is empty
 */
export function drawRandomCard(deck: any[]): any {
  if (deck.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
}
