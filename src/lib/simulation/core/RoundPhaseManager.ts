
import { SimulationConfig, AgentMessage } from "@/types";
import { PlayerManager } from "./PlayerManager";
import { NarrationManager } from "./NarrationManager";
import { HazardManager } from "./HazardManager";
import { ChaosManager } from "./ChaosManager";
import { TreasureManager } from "./TreasureManager";

/**
 * Manages the execution of all phases within a single round
 */
export class RoundPhaseManager {
  private playerManager: PlayerManager;
  private narrationManager: NarrationManager;
  private hazardManager: HazardManager;
  private chaosManager: ChaosManager;
  private treasureManager: TreasureManager;
  
  constructor() {
    this.playerManager = new PlayerManager();
    this.narrationManager = new NarrationManager();
    this.hazardManager = new HazardManager();
    this.chaosManager = new ChaosManager();
    this.treasureManager = new TreasureManager();
  }
  
  /**
   * Execute a single round of the simulation
   */
  public async executeRound(
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
    
    // Check if we should draw a Chaos Card this round
    // Draw on round 1, then every 2-3 rounds depending on heat level
    const shouldDrawChaosCard = round === 0 || 
      ((round + 1) % (gameState.heat >= 7 ? 2 : 3) === 0);
    
    if (shouldDrawChaosCard) {
      const chaosMessages = await this.chaosManager.drawChaosCard(
        gameState, 
        conversationLog,
        systemPrompts
      );
      
      // Add chaos messages to log
      conversationLog.push(...chaosMessages);
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
    
    // Check for treasure discoveries based on player actions
    const treasureMessages = await this.treasureManager.checkForTreasureDiscovery(
      gameState,
      conversationLog,
      playerResponses,
      systemPrompts
    );
    
    // Add treasure discovery messages to log if any
    if (treasureMessages.length > 0) {
      conversationLog.push(...treasureMessages);
    }
    
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
        gameState: {...gameState}
      }
    });
  }
}
