
import { SimulationConfig, SimulationResult } from "@/types";
import { SimulationLifecycleManager } from "./SimulationLifecycleManager";
import { RoundManager } from "./RoundManager";
import { SystemPromptManager } from "./SystemPromptManager";
import { TrainingDataGenerator } from "../training/TrainingDataGenerator";
import { saveSimulationResult } from "@/lib/storage";

/**
 * Main orchestrator class that coordinates the simulation process
 * This replaces the original monolithic SimulationRunner
 */
export class SimulationOrchestrator {
  private lifecycleManager: SimulationLifecycleManager;
  private roundManager: RoundManager;
  private systemPromptManager: SystemPromptManager;
  private trainingDataGenerator: TrainingDataGenerator;

  constructor() {
    this.lifecycleManager = new SimulationLifecycleManager();
    this.roundManager = new RoundManager();
    this.systemPromptManager = new SystemPromptManager();
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
    const { simulationId, timestamp, gameState, conversationLog } = 
      this.lifecycleManager.initializeSimulation(config);

    try {
      // Initialize scenario and prepare system prompts
      const { systemPrompts, playerSystemPrompts } = 
        await this.systemPromptManager.prepareScenario(rulesContent, config, gameState);
      
      // Generate introduction by the Goblet
      const introductionMessage = await this.systemPromptManager.generateIntroduction(
        config, 
        gameState,
        systemPrompts
      );
      
      // Add introduction to the log
      conversationLog.push(introductionMessage);

      // Run all rounds
      await this.roundManager.runAllRounds(
        config,
        gameState, 
        conversationLog,
        systemPrompts,
        playerSystemPrompts
      );
      
      // Create the final simulation result
      const result: SimulationResult = this.lifecycleManager.createSimulationResult(
        simulationId,
        timestamp,
        config,
        gameState,
        conversationLog
      );
      
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
