
import { SimulationConfig, AgentMessage } from "@/types";
import { selectGobletVoice } from "../goblet-voice-manager";

/**
 * Manages game state throughout the simulation
 */
export class GameStateManager {
  /**
   * Initialize the game state for a simulation
   */
  public initializeGameState(config: SimulationConfig): any {
    const selectedGobletVoice = selectGobletVoice(config);
    
    const gameState = {
      currentRound: 0,
      heat: config.startingHeat || 0,
      completedObjectives: [] as string[],
      playerInventories: this.initializePlayerInventories(config),
      regions: [] as string[],
      currentRegion: "start",
      activeHazards: [] as string[],
      activeChaosEffects: [] as any[],
      rolls: [] as {player: number, type: string, value: number, stat: string, result: string}[],
      currentGobletHolder: 0,
      gobletVoice: selectedGobletVoice,
      gobletMood: "normal",
      characters: config.fullCharacters || []
    };
    
    return gameState;
  }
  
  /**
   * Initialize player inventories based on configuration and characters
   */
  private initializePlayerInventories(config: SimulationConfig): any {
    const playerCount = config.players || 3;
    const inventories: Record<number, any> = {};
    
    for (let i = 0; i < playerCount; i++) {
      const character = config.fullCharacters?.[i];
      
      inventories[i] = {
        gear: character?.starterGear || [],
        treasures: [],
        health: character?.health || 10,
        weirdness: character?.weirdness || 0,
        luck: character?.luck || 5
      };
    }
    
    return inventories;
  }
  
  /**
   * Check if game over conditions are met
   */
  public checkGameOverConditions(gameState: any): AgentMessage[] {
    const gameOverMessages: AgentMessage[] = [];
    
    // Check for heat level game over condition
    if (gameState.heat >= 10) {
      gameOverMessages.push({
        role: 'GM',
        content: `[Game Over] Heat has reached ${gameState.heat}, exceeding the maximum threshold of 10. The mission has failed.`,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: gameState.currentRound,
          phase: "game-over",
          reason: "heat-maximum",
          outcome: "failure",
          heat: gameState.heat,
          gameState: {...gameState}
        }
      });
      
      return gameOverMessages;
    }
    
    // Check for player transformation game over condition
    let allPlayersTransformed = true;
    const playerCount = gameState.characters.length;
    
    for (let i = 0; i < playerCount; i++) {
      const playerInventory = gameState.playerInventories[i];
      if (playerInventory && playerInventory.weirdness < 10) {
        allPlayersTransformed = false;
        break;
      }
    }
    
    if (allPlayersTransformed) {
      gameOverMessages.push({
        role: 'GM',
        content: `[Game Over] All players have reached maximum Weirdness and have been transformed. The mission has failed.`,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: gameState.currentRound,
          phase: "game-over",
          reason: "all-players-transformed",
          outcome: "failure",
          heat: gameState.heat,
          gameState: {...gameState}
        }
      });
    }
    
    return gameOverMessages;
  }
  
  /**
   * Update the game state based on an action
   */
  public updateGameState(gameState: any, update: Partial<any>): any {
    return {
      ...gameState,
      ...update
    };
  }
}
