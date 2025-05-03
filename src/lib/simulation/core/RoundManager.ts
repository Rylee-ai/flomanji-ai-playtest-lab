
import { SimulationConfig, AgentMessage } from "@/types";
import { RoundPhaseManager } from "./RoundPhaseManager";
import { GameOverConditionManager } from "./GameOverConditionManager";

/**
 * Manages the execution and progression of rounds in a simulation
 */
export class RoundManager {
  private roundPhaseManager: RoundPhaseManager;
  private gameOverConditionManager: GameOverConditionManager;
  
  constructor() {
    this.roundPhaseManager = new RoundPhaseManager();
    this.gameOverConditionManager = new GameOverConditionManager();
  }

  /**
   * Run all rounds in the simulation
   */
  public async runAllRounds(
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompts: any,
    playerSystemPrompts: any
  ): Promise<void> {
    // Initialize active cards tracking if not present
    gameState.activeHazards = gameState.activeHazards || [];
    gameState.activeChaosEffects = gameState.activeChaosEffects || [];
    gameState.discoveredTreasures = gameState.discoveredTreasures || [];
    
    // Run all rounds
    for (let round = 0; round < config.rounds; round++) {
      gameState.currentRound = round + 1;
      console.log(`Starting round ${round + 1}`);
      
      // Execute this round
      await this.roundPhaseManager.executeRound(
        round,
        config,
        gameState,
        conversationLog,
        systemPrompts,
        playerSystemPrompts
      );
      
      // Check game over conditions
      const gameOverMessages = this.gameOverConditionManager.checkGameOverConditions(gameState);
      if (gameOverMessages.length > 0) {
        conversationLog.push(...gameOverMessages);
        break;
      }
    }
  }
}
