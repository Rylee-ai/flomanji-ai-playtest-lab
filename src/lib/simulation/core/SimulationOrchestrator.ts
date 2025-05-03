
import { SimulationConfig, SimulationResult, AgentMessage } from "@/types";
import { RoundManager } from "./RoundManager";
import { PlayerManager } from "./PlayerManager";
import { GameSetupManager } from "./GameSetupManager";
import { SimulationPromptManager } from "./SimulationPromptManager";
import { SimulationIntroManager } from "./SimulationIntroManager";
import { SimulationOutcomeManager } from "./SimulationOutcomeManager";
import { GameStateSetupManager } from "./GameStateSetupManager";

/**
 * Orchestrates the overall simulation process
 */
export class SimulationOrchestrator {
  private roundManager: RoundManager;
  private playerManager: PlayerManager;
  private gameSetupManager: GameSetupManager;
  private promptManager: SimulationPromptManager;
  private introManager: SimulationIntroManager;
  private outcomeManager: SimulationOutcomeManager;
  private gameStateSetupManager: GameStateSetupManager;
  
  constructor() {
    this.roundManager = new RoundManager();
    this.playerManager = new PlayerManager();
    this.gameSetupManager = new GameSetupManager();
    this.promptManager = new SimulationPromptManager();
    this.introManager = new SimulationIntroManager();
    this.outcomeManager = new SimulationOutcomeManager();
    this.gameStateSetupManager = new GameStateSetupManager(this.gameSetupManager);
  }
  
  /**
   * Run a complete simulation with the given configuration
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    console.log("Starting simulation with config:", config);
    
    // Generate a unique simulation ID
    const simulationId = crypto.randomUUID();
    
    // Initialize conversation log
    const conversationLog: AgentMessage[] = [];
    
    // Create system prompts
    const systemPrompts = {
      gmSystemPrompt: this.promptManager.createGMSystemPrompt(rulesContent, config),
      criticPrompt: this.promptManager.createCriticPrompt(rulesContent)
    };
    
    // Setup the game state
    const gameState = await this.gameStateSetupManager.setupGameState(config);
    
    // Initialize player system prompts
    const playerSystemPrompts = await this.playerManager.initializePlayerProfiles(
      config,
      gameState,
      systemPrompts.gmSystemPrompt
    );
    
    // Generate intro narration and add to conversation log
    const introMessage = await this.introManager.createIntroMessage(
      config,
      gameState,
      systemPrompts.gmSystemPrompt
    );
    conversationLog.push(introMessage);
    
    // Run the rounds
    await this.roundManager.runAllRounds(
      config,
      gameState,
      conversationLog,
      systemPrompts,
      playerSystemPrompts
    );
    
    // Generate final narration
    const finalNarration = await this.outcomeManager.generateFinalNarration(
      config,
      gameState,
      conversationLog,
      systemPrompts.gmSystemPrompt
    );
    
    // Add final narration to conversation log
    conversationLog.push({
      role: 'GM',
      content: finalNarration,
      timestamp: new Date().toISOString(),
      metadata: {
        phase: "conclusion",
        gameState: {...gameState}
      }
    });
    
    // Generate critic feedback if enabled
    let criticFeedback = "";
    if (config.enableCritic) {
      criticFeedback = await this.outcomeManager.generateCriticFeedback(
        conversationLog,
        systemPrompts.criticPrompt
      );
    }
    
    // Extract key events
    const keyEvents = this.outcomeManager.extractKeyEvents(gameState, conversationLog);
    
    // Create the result
    const result: SimulationResult = {
      id: simulationId,
      timestamp: new Date().toISOString(),
      scenario: config.scenarioPrompt || "Standard Flomanji Scenario",
      rounds: config.rounds || 5,
      playerCount: config.players || 3,
      log: conversationLog,
      criticFeedback,
      annotations: "",
      config: {
        scenario: config.scenarioPrompt || "Standard Flomanji Scenario",
        rounds: config.rounds || 5,
        playerCount: config.players || 3,
        characters: gameState.selectedCharacters,
        enableCritic: config.enableCritic || false,
        outputMode: config.outputMode || "standard",
        startingHeat: gameState.heat || 0,
        heatPerRound: config.heatPerRound || 0,
        extractionRegion: config.extractionRegion || "exit",
        objectives: gameState.objectives || [],
        missionType: config.missionType || "exploration",
        secretTraitor: config.secretTraitor || false,
        arcadeModule: config.arcadeModule || false,
        nightmareDifficulty: config.nightmareDifficulty || false,
        competitiveMode: config.competitiveMode || false,
        gobletVoice: gameState.gobletVoice || "swamp-prophet"
      },
      gameState: {
        currentRound: gameState.currentRound || 0,
        heat: gameState.heat || 0,
        completedObjectives: gameState.completedObjectives || [],
        playerInventories: gameState.playerInventories || {},
        regions: gameState.regions?.map((r: any) => r.name) || [],
        currentRegion: gameState.currentRegion || "start",
        activeHazards: gameState.activeHazards || [],
        activeChaosEffects: gameState.activeChaosEffects || [],
        discoveredTreasures: gameState.discoveredTreasures || [],
        rolls: gameState.rolls || [],
        currentGobletHolder: gameState.currentGobletHolder || 0,
        gobletVoice: gameState.gobletVoice || "swamp-prophet",
        gobletMood: gameState.gobletMood || "neutral"
      },
      characters: gameState.selectedCharacters || [],
      missionOutcome: gameState.missionOutcome,
      keyEvents: keyEvents
    };
    
    return result;
  }
}
