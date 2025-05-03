
import { SimulationConfig, SimulationResult, AgentMessage } from "@/types";
import { GameStateManager } from "./GameStateManager";

/**
 * Manages the lifecycle of a simulation including initialization and result creation
 */
export class SimulationLifecycleManager {
  private gameStateManager: GameStateManager;
  
  constructor() {
    this.gameStateManager = new GameStateManager();
  }
  
  /**
   * Initialize a new simulation
   */
  public initializeSimulation(config: SimulationConfig) {
    // Generate a unique simulation ID
    const simulationId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // Setup game state using the manager
    const gameState = this.gameStateManager.initializeGameState(config);
    const conversationLog: AgentMessage[] = [];
    
    return { simulationId, timestamp, gameState, conversationLog };
  }
  
  /**
   * Create the final simulation result object
   */
  public createSimulationResult(
    simulationId: string,
    timestamp: string,
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[]
  ): SimulationResult {
    return {
      id: simulationId,
      timestamp,
      scenario: config.scenarioPrompt || "",
      rounds: config.rounds || 5,
      playerCount: this.getPlayerCount(config),
      log: conversationLog,
      criticFeedback: "",
      annotations: "",
      config: {
        scenario: config.scenarioPrompt,
        rounds: config.rounds,
        playerCount: this.getPlayerCount(config),
        characters: config.fullCharacters || [],
        enableCritic: config.enableCritic,
        outputMode: config.outputMode,
        startingHeat: config.startingHeat,
        heatPerRound: config.heatPerRound,
        extractionRegion: config.extractionRegion,
        objectives: config.objectives || [],
        gobletVoice: gameState.gobletVoice,
        secretTraitor: config.secretTraitor,
        nightmareDifficulty: config.nightmareDifficulty,
        competitiveMode: config.competitiveMode,
      },
      gameState,
      characters: config.fullCharacters || [],
      missionOutcome: "pending"
    };
  }
  
  /**
   * Get the player count from config
   */
  private getPlayerCount(config: SimulationConfig): number {
    if (config.players) {
      return config.players;
    }
    
    if (config.characters) {
      return config.characters.length;
    }
    
    return 1; // Default to 1 player
  }
}
