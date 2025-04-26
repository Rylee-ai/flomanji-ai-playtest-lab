
import { CharacterState, SimulationConfig } from "@/types";

export interface DiceRollResult {
  value: number;
  result: string;
}

export const simulateDiceRoll = (stat: number = 0): DiceRollResult => {
  const roll = Math.floor(Math.random() * 10) + 1;
  const total = roll + stat;
  
  let result = "failure";
  if (total >= 8) result = "success";
  else if (total >= 4) result = "partial success";
  
  return { value: roll, result };
};

export const drawRandomCard = (deck: any[]): any | null => {
  if (deck.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
};

export const initializePlayerInventories = (config: SimulationConfig): Record<number, CharacterState> => {
  const inventories: Record<number, CharacterState> = {};
  
  if (config.fullCharacters) {
    config.fullCharacters.forEach((char, idx) => {
      inventories[idx] = {
        id: char.id,
        name: char.name,
        gear: char.starterGear || [],
        treasures: [],
        health: char.health || 5,
        weirdness: char.weirdness || 0,
        luck: char.luck || 3,
        position: char.position || "start",
        status: "active"
      };
    });
  }
  
  return inventories;
};
