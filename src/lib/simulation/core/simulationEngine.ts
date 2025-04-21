
import { SimulationConfig, AgentMessage, SimulationResult, FlomanjiCharacter } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult } from "@/lib/storage";
import { initializeGameState } from "../state/gameStateManager";
import { processRound } from "./roundProcessor";
import { generateConclusionAndFeedback } from "./simulationOutcome";
import { createChatCompletion } from "@/lib/openrouterChat";

/**
 * Runs a simulation based on the provided configuration and rules.
 * Acts as the main entry point and orchestrator for the simulation process.
 */
export const startSimulation = async (
  config: SimulationConfig,
  rulesContent: string
): Promise<SimulationResult> => {
  const {
    scenarioPrompt,
    rounds = 5,
    players = 1,
    enableCritic = true,
    outputMode = 'full',
    startingHeat = 0,
    heatPerRound = 0,
    extractionRegion = 'exit'
  } = config;

  // Use the length of selected characters if available, otherwise use the players config
  const actualPlayerCount = config.characters ? config.characters.length : players;
  
  // Ensure we have at least one player
  if (actualPlayerCount < 1) {
    throw new Error("At least one player character must be selected");
  }

  const simulationId = simulateRandomId();
  const timestamp = new Date().toISOString();

  // Initialize conversation log
  const conversationLog: AgentMessage[] = [];
  
  // Initialize simulation metadata for summary
  const simulationMeta = {
    id: simulationId,
    timestamp,
    config: {
      scenario: scenarioPrompt,
      rounds,
      playerCount: actualPlayerCount,
      characters: config.fullCharacters || [],
      enableCritic,
      outputMode,
      startingHeat,
      heatPerRound,
      extractionRegion,
      objectives: config.objectives || []
    },
    gameState: initializeGameState(config)
  };
  
  // Prepare system prompts
  const gmSystemPrompt = getGMSystemPrompt(rulesContent, scenarioPrompt);
  
  // Create player system prompts for each character with correct player indices
  const playerSystemPrompts = Array(actualPlayerCount)
    .fill(0)
    .map((_, i) => getPlayerSystemPrompt(rulesContent, i, 
      config.fullCharacters && config.fullCharacters[i] ? config.fullCharacters[i] : undefined));

  console.log(`Starting simulation with ${actualPlayerCount} players and ${rounds} rounds`);

  try {
    // Start with GM introduction and game setup
    let initPrompt = "Introduce the scenario and set the scene for the players. Describe the starting region, current Heat level, and initial objectives. Each player should make a roll at the start to determine if they notice any important details.";
    
    // Add details about objectives if they exist
    if (config.objectives && config.objectives.length > 0) {
      initPrompt += " The mission objectives are:";
      config.objectives.forEach((obj, idx) => {
        initPrompt += `\n${idx+1}. ${obj.description} ${obj.required ? '(Required)' : '(Optional)'}`;
      });
    }
    
    // Add details about characters if they exist
    if (config.fullCharacters && config.fullCharacters.length > 0) {
      initPrompt += "\n\nThe player characters are:";
      config.fullCharacters.forEach((char, idx) => {
        initPrompt += `\nPlayer ${idx+1}: ${char.name} (${char.role}) - Brawn ${char.stats.brawn}, Moxie ${char.stats.moxie}, Charm ${char.stats.charm}, Grit ${char.stats.grit}, Weird Sense ${char.stats.weirdSense}. Special ability: ${char.ability.name}`;
      });
    }
    
    // Add initial gear information
    initPrompt += "\n\nPlayers start with the following gear:";
    if (config.fullCharacters) {
      config.fullCharacters.forEach((char, idx) => {
        initPrompt += `\nPlayer ${idx+1}: ${(char.starterGear || []).join(", ")}`;
      });
    }
    
    // Add heat level info
    initPrompt += `\n\nStarting Heat Level: ${startingHeat}`;
    if (heatPerRound > 0) {
      initPrompt += `\nHeat increases by ${heatPerRound} each round.`;
    }

    // Get GM's introduction
    const gmIntroMessage = await createChatCompletion(
      gmSystemPrompt,
      [{ role: "user", content: initPrompt }]
    );

    conversationLog.push({
      role: 'GM',
      content: gmIntroMessage,
      timestamp: new Date().toISOString(),
      metadata: {
        roundNumber: 0,
        phase: "introduction",
        heat: simulationMeta.gameState.heat,
        gameState: {...simulationMeta.gameState}
      }
    });

    // Process each round
    for (let round = 0; round < rounds; round++) {
      const shouldContinue = await processRound(
        round,
        conversationLog,
        simulationMeta,
        gmSystemPrompt,
        playerSystemPrompts,
        config
      );
      
      // Check if game should end early
      if (!shouldContinue) {
        break;
      }
    }

    // Generate conclusion and feedback
    const criticFeedback = enableCritic 
      ? await generateConclusionAndFeedback(conversationLog, config, rulesContent)
      : "";

    // Create the simulation result with all metadata
    const result: SimulationResult = {
      id: simulationId,
      timestamp,
      scenario: scenarioPrompt || "",
      rounds,
      log: conversationLog,
      result: "", // Empty result string to be populated later
      criticFeedback,
      annotations: "",
      config: {
        ...config,
        // Convert full character objects to just string IDs for config.characters
        characters: config.characters || [],
        fullCharacters: config.fullCharacters
      },
      characters: config.fullCharacters || [],
      gameState: simulationMeta.gameState,
    };

    // Save to local storage
    saveSimulationResult(result);

    return result;
  } catch (error) {
    console.error("Error during simulation:", error);
    throw new Error(`Simulation failed: ${error}`);
  }
};
