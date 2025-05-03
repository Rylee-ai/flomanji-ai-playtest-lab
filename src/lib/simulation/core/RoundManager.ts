
import { SimulationConfig, AgentMessage } from "@/types";
import { PlayerManager } from "./PlayerManager";
import { NarrationManager } from "./NarrationManager";
import { HazardManager } from "./HazardManager";

/**
 * Manages the execution and progression of rounds in a simulation
 */
export class RoundManager {
  private playerManager: PlayerManager;
  private narrationManager: NarrationManager;
  private hazardManager: HazardManager;
  
  constructor() {
    this.playerManager = new PlayerManager();
    this.narrationManager = new NarrationManager();
    this.hazardManager = new HazardManager();
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
    // Run all rounds
    for (let round = 0; round < config.rounds; round++) {
      gameState.currentRound = round + 1;
      console.log(`Starting round ${round + 1}`);
      
      await this.runSingleRound(
        round,
        config,
        gameState,
        conversationLog,
        systemPrompts,
        playerSystemPrompts
      );
      
      // Check game over conditions
      const gameOverMessages = this.checkGameOverConditions(gameState);
      if (gameOverMessages.length > 0) {
        conversationLog.push(...gameOverMessages);
        break;
      }
    }
  }
  
  /**
   * Run a single round of the simulation
   */
  private async runSingleRound(
    round: number,
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompts: any,
    playerSystemPrompts: any
  ): Promise<void> {
    // Update heat if needed
    if (config.heatPerRound > 0 && round > 0) {
      gameState.heat += config.heatPerRound;
      
      conversationLog.push({
        role: 'GM',
        content: `[System] Heat increases to ${gameState.heat} at the start of round ${round+1}.`,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: round + 1,
          phase: "heat-update",
          heat: gameState.heat,
          gameState: {...gameState}
        }
      });
    }
    
    // Generate hazard encounter
    const hazardMessages = await this.hazardManager.generateHazardEncounter(
      gameState,
      conversationLog,
      systemPrompts
    );
    
    // Add hazard messages to log
    conversationLog.push(...hazardMessages);
    
    // Process each player's turn
    const playerResponses = await this.playerManager.processPlayerTurns(
      config,
      gameState,
      conversationLog,
      playerSystemPrompts
    );
    
    // Add player responses to log
    conversationLog.push(...playerResponses);
    
    // Generate GM response to all player actions
    const gmResponse = await this.narrationManager.generateActionResults(
      gameState,
      conversationLog,
      systemPrompts
    );
    
    // Add GM response to log
    conversationLog.push({
      role: 'GM',
      content: gmResponse,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: round + 1,
        phase: "gm-response",
        heat: gameState.heat,
        gameState: {...gameState}
      }
    });
    
    // Generate round summary
    const roundSummary = await this.narrationManager.generateRoundSummary(
      round + 1,
      gameState,
      conversationLog,
      systemPrompts
    );
    
    // Add round summary to log
    conversationLog.push({
      role: 'GM',
      content: roundSummary,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: round + 1,
        phase: "round-summary",
        heat: gameState.heat,
        activeHazards: gameState.activeHazards,
        completedObjectives: gameState.completedObjectives,
        gameState: {...gameState}
      }
    });
  }
  
  /**
   * Check game over conditions
   */
  private checkGameOverConditions(gameState: any): AgentMessage[] {
    const messages: AgentMessage[] = [];
    
    // Check if game is over
    if (gameState.heat >= 10) {
      gameState.gameOver = true;
      gameState.missionOutcome = "failure";
      gameState.gameOverReason = "Heat level reached maximum";
      
      messages.push({
        role: 'GM',
        content: `[Game Over] Heat has reached critical levels (${gameState.heat}/10). The mission has failed.`,
        timestamp: new Date().toISOString(),
        metadata: {
          phase: "game-over",
          heat: gameState.heat,
          gameState: {...gameState}
        }
      });
    }
    
    // Check if all objectives completed
    const allRequiredObjectivesCompleted = (gameState.objectives || [])
      .filter((obj: any) => obj.required)
      .every((obj: any) => (gameState.completedObjectives || []).includes(obj.id));
      
    if (allRequiredObjectivesCompleted && gameState.currentRound >= 1) {
      gameState.gameOver = true;
      gameState.missionOutcome = "success";
      gameState.gameOverReason = "All required objectives completed";
      
      messages.push({
        role: 'GM',
        content: `[Game Over] All required objectives have been completed. The mission is a success!`,
        timestamp: new Date().toISOString(),
        metadata: {
          phase: "game-over",
          gameState: {...gameState}
        }
      });
    }
    
    return messages;
  }
}
