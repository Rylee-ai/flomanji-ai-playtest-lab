
import { SimulationConfig } from "@/types";

/**
 * Initializes the game state for a simulation
 */
export function initializeGameState(config: SimulationConfig) {
  const gameState = {
    currentRound: 0,
    heat: config.startingHeat || 0,
    completedObjectives: [] as string[],
    playerInventories: {} as Record<number, {
      gear: string[],
      treasures: string[],
      health: number,
      weirdness: number,
      luck: number
    }>,
    regions: [] as string[],
    currentRegion: "start",
    activeHazards: [] as string[],
    rolls: [] as {player: number, type: string, value: number, stat: string, result: string}[]
  };
  
  // Initialize player inventories
  if (config.fullCharacters) {
    config.fullCharacters.forEach((char, idx) => {
      gameState.playerInventories[idx] = {
        gear: char.starterGear || [],
        treasures: [],
        health: char.health || 5,
        weirdness: char.weirdness || 0,
        luck: char.luck || 3
      };
    });
  }
  
  return gameState;
}

/**
 * Updates a game state property
 */
export function updateGameState(gameState: any, key: string, value: any) {
  return {
    ...gameState,
    [key]: value
  };
}

/**
 * Adds a completed objective to the game state
 */
export function completeObjective(gameState: any, objectiveId: string) {
  if (!gameState.completedObjectives.includes(objectiveId)) {
    return {
      ...gameState,
      completedObjectives: [...gameState.completedObjectives, objectiveId]
    };
  }
  return gameState;
}

/**
 * Changes the current region in the game state
 */
export function changeRegion(gameState: any, newRegion: string) {
  return {
    ...gameState,
    currentRegion: newRegion,
    // Add to visited regions if not already there
    regions: gameState.regions.includes(newRegion) 
      ? gameState.regions 
      : [...gameState.regions, newRegion]
  };
}
