
import { SimulationConfig, SimulationResult, AgentMessage } from "@/types";
import { saveSimulationResult } from "@/lib/storage";
import { PlayerManager } from "./PlayerManager";
import { GameStateManager } from "./GameStateManager";
import { NarrationManager } from "./NarrationManager";
import { ScenarioManager } from "./ScenarioManager";
import { HazardManager } from "./HazardManager";
import { TrainingDataGenerator } from "../training/TrainingDataGenerator";

/**
 * Core simulation runner that orchestrates the simulation flow
 */
export class SimulationRunner {
  private playerManager: PlayerManager;
  private gameStateManager: GameStateManager;
  private narrationManager: NarrationManager;
  private scenarioManager: ScenarioManager;
  private hazardManager: HazardManager;
  private trainingDataGenerator: TrainingDataGenerator;

  constructor() {
    this.playerManager = new PlayerManager();
    this.gameStateManager = new GameStateManager();
    this.narrationManager = new NarrationManager();
    this.scenarioManager = new ScenarioManager();
    this.hazardManager = new HazardManager();
    this.trainingDataGenerator = new TrainingDataGenerator();
  }

  /**
   * Runs a complete simulation based on the provided configuration
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    // Initialize the simulation
    const simulationId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // Setup game state using the manager
    const gameState = this.gameStateManager.initializeGameState(config);
    const conversationLog: AgentMessage[] = [];

    try {
      // Initialize scenario and prepare system prompts
      const { systemPrompts, playerSystemPrompts } = 
        await this.scenarioManager.prepareScenario(rulesContent, config, gameState);
      
      // Generate introduction by the Goblet
      const introductionMessage = await this.narrationManager.generateIntroduction(
        config, 
        gameState,
        systemPrompts
      );
      
      // Add introduction to the log
      conversationLog.push({
        role: 'GM',
        content: introductionMessage,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: 0,
          phase: "introduction",
          heat: gameState.heat,
          gameState: {...gameState},
          gobletVoice: gameState.gobletVoice,
          gobletMood: gameState.gobletMood
        }
      });

      // Run all rounds
      for (let round = 0; round < config.rounds; round++) {
        gameState.currentRound = round + 1;
        console.log(`Starting round ${round + 1}`);
        
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
        
        // Check game over conditions
        const gameOverMessages = this.gameStateManager.checkGameOverConditions(gameState);
        if (gameOverMessages.length > 0) {
          conversationLog.push(...gameOverMessages);
          break;
        }
        
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
      
      // Create the final simulation result
      const result: SimulationResult = {
        id: simulationId,
        timestamp,
        scenario: config.scenarioPrompt || "",
        rounds: config.rounds || 5,
        playerCount: this.playerManager.getPlayerCount(config),
        log: conversationLog,
        criticFeedback: "",
        annotations: "",
        config: {
          scenario: config.scenarioPrompt,
          rounds: config.rounds,
          playerCount: this.playerManager.getPlayerCount(config),
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
      
      // Generate training data
      try {
        console.log("Generating training data...");
        result.trainingData = this.trainingDataGenerator.generateTrainingData(result);
        console.log(`Generated ${result.trainingData.examples.length} training examples`);
      } catch (error) {
        console.error("Error generating training data:", error);
      }

      // Save the result
      saveSimulationResult(result);
      return result;
    } catch (error) {
      console.error("Error during simulation:", error);
      throw new Error(`Simulation failed: ${error}`);
    }
  }
}
