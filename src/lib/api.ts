import { SimulationConfig, SimulationResult } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { createChatCompletion } from "@/lib/openrouter";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult, getSimulationSummaries, getSimulationById, updateSimulationAnnotations } from "@/lib/storage";

// Example rules and cards for testing (would be loaded from Markdown in production)
export const getExampleRules = (): string => {
  return `# Flomanji Rules Guide

## Core Mechanics
Flomanji is a cooperative tabletop RPG set in a mysterious jungle. Players explore, overcome hazards, and collect treasures while managing their Heat and Weirdness levels.

## Key Stats
- **Heat**: Represents physical danger. Starts at 0, max 10. At 10, player is eliminated.
- **Weirdness**: Represents supernatural exposure. Starts at 0, max 10. At 10, player transforms.

## Dice Mechanics
- Roll d10 for skill checks
- 1-3: Failure
- 4-7: Partial success
- 8-10: Complete success

## Cards
### Hazard Cards
- Quicksand: Heat +2, requires Strength check to escape
- Poison Dart Trap: Heat +3, requires Dexterity check to avoid
- Wild Beast: Heat +2, requires Animal Handling check to pacify

### Treasure Cards
- Ancient Idol: Weirdness +2, grants one reroll per session
- Jungle Map: Reduces Heat by 1 for navigation checks
- Healing Herb: Can reduce Heat by 2 when used

### Event Cards
- Rainstorm: All players reduce Heat by 1 but terrain becomes slippery
- Strange Lights: Weirdness +1 for all players, grants vision in darkness
- Native Encounter: Roll Charisma check to gain allies or create enemies

## Turn Sequence
1. GM describes the scene
2. Players declare actions
3. GM calls for appropriate checks
4. GM narrates consequences and draws appropriate cards
5. Update Heat and Weirdness trackers

## Success Conditions
Find the Temple of Flomanji and escape with the legendary treasure before any player reaches maximum Heat or Weirdness.`;
};

// Start a simulation
export const startSimulation = async (
  config: SimulationConfig,
  rulesContent: string
): Promise<SimulationResult> => {
  const {
    scenarioPrompt,
    rounds = 5,
    players = 1,
    enableCritic = true,
    outputMode = 'full'
  } = config;
  
  const simulationId = simulateRandomId();
  const timestamp = new Date().toISOString();
  
  // Initialize conversation log
  const conversationLog = [];
  
  // Prepare system prompts
  const gmSystemPrompt = getGMSystemPrompt(rulesContent, scenarioPrompt);
  const playerSystemPrompts = Array(players).fill(0).map((_, i) => 
    getPlayerSystemPrompt(rulesContent, i)
  );
  
  try {
    // Start with GM introduction
    const gmIntroMessage = await createChatCompletion(
      gmSystemPrompt,
      [{ role: "user", content: "Introduce the scenario and set the scene for the players." }]
    );
    
    conversationLog.push({
      role: 'GM',
      message: gmIntroMessage,
      timestamp: new Date().toISOString()
    });
    
    // Simulation loop
    for (let round = 0; round < rounds; round++) {
      for (let playerIdx = 0; playerIdx < players; playerIdx++) {
        // Convert the conversation log to messages format for this player
        const playerMessages = conversationLog.map(entry => ({
          role: entry.role === 'Player' ? 'assistant' : 'user',
          content: `${entry.role}: ${entry.message}`
        }));
        
        // Get player's action
        const playerResponse = await createChatCompletion(
          playerSystemPrompts[playerIdx],
          playerMessages
        );
        
        conversationLog.push({
          role: 'Player',
          message: playerResponse,
          timestamp: new Date().toISOString()
        });
        
        // GM responds to this player
        const gmMessages = conversationLog.map(entry => ({
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: `${entry.role}: ${entry.message}`
        }));
        
        const gmResponse = await createChatCompletion(
          gmSystemPrompt,
          gmMessages
        );
        
        conversationLog.push({
          role: 'GM',
          message: gmResponse,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Generate critic feedback if enabled
    let criticFeedback = "";
    if (enableCritic) {
      const criticSystemPrompt = getCriticSystemPrompt(rulesContent);
      const fullTranscript = conversationLog.map(entry => 
        `${entry.role}: ${entry.message}`
      ).join("\n\n");
      
      criticFeedback = await createChatCompletion(
        criticSystemPrompt,
        [{ role: "user", content: `Here is the transcript of the session:\n\n${fullTranscript}\n\nPlease provide your analysis.` }]
      );
    }
    
    // Create the simulation result
    const result: SimulationResult = {
      id: simulationId,
      timestamp,
      scenario: scenarioPrompt,
      rounds,
      log: conversationLog,
      criticFeedback,
      annotations: ""
    };
    
    // Save to local storage
    saveSimulationResult(result);
    
    return result;
  } catch (error) {
    console.error("Error during simulation:", error);
    throw new Error(`Simulation failed: ${error}`);
  }
};

export { getSimulationSummaries, getSimulationById, updateSimulationAnnotations };
