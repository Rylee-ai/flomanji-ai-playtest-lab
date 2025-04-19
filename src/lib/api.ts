import { AgentMessage, AgentRole, SimulationConfig, SimulationResult, SimulationSummary } from "@/types";
import { simulateRandomId } from "@/lib/utils";

// Local storage keys
const SIMULATIONS_STORAGE_KEY = "flomanji:simulations";

// OpenRouter client configuration
const OPENROUTER_API_KEY = localStorage.getItem("openrouter-api-key") || "";

// Agent-specific system prompts
const getGMSystemPrompt = (rules: string, scenario: string): string => {
  return `You are the Game Master for Flomanji, a tabletop role-playing game. 
The following are the game rules and available cards:

${rules}

The scenario is: ${scenario}

Your role is to describe the game world and outcomes, responding to players' actions, 
while ensuring rules are followed. Be creative, engaging, and fair. 
Use dice rolls to determine randomness when needed.`;
};

const getPlayerSystemPrompt = (rules: string, playerIndex: number): string => {
  return `You are Player ${playerIndex + 1} in Flomanji.
You control a character in this scenario.

Here are the game rules:
${rules}

Make decisions as a player trying to win, and respond to the GM. 
Be creative, strategic, and role-play your character. Don't meta-game 
by using knowledge your character wouldn't have.`;
};

const getCriticSystemPrompt = (rules: string): string => {
  return `You are a Critic AI analyzing a game session of Flomanji.

The following are the game rules:
${rules}

Analyze the game session to provide feedback on:
1. Whether rules were followed correctly
2. Game balance (difficulty, randomness, etc.)
3. Player strategies and decision-making
4. Narrative flow and engagement
5. Suggestions for improving the game design

Be specific, constructive, and focus on how the game design could be improved.`;
};

// Chat completion helper function
const createChatCompletion = async (
  systemPrompt: string, 
  messages: {role: string, content: string}[]
): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.href,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-opus',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("Error creating chat completion:", error);
    throw new Error(`Failed to get response from OpenRouter: ${error}`);
  }
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
  const conversationLog: AgentMessage[] = [];
  
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
      // For each player, generate a response
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
    
    // Save to local storage (in production this would be a database)
    saveSimulationResult(result);
    
    return result;
  } catch (error) {
    console.error("Error during simulation:", error);
    throw new Error(`Simulation failed: ${error}`);
  }
};

// Save simulation result to storage
const saveSimulationResult = (result: SimulationResult) => {
  try {
    const existingSimulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    existingSimulations.unshift(result);
    localStorage.setItem(SIMULATIONS_STORAGE_KEY, JSON.stringify(existingSimulations));
  } catch (error) {
    console.error("Failed to save simulation result:", error);
  }
};

// Get simulation summaries
export const getSimulationSummaries = (): SimulationSummary[] => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    return simulations.map((sim: SimulationResult) => ({
      id: sim.id,
      timestamp: sim.timestamp,
      scenario: sim.scenario,
      rounds: sim.rounds,
      result: sim.log.slice(-1)[0]?.message.substring(0, 100) + "...",
      notes: sim.annotations
    }));
  } catch (error) {
    console.error("Failed to get simulation summaries:", error);
    return [];
  }
};

// Get a specific simulation by ID
export const getSimulationById = (id: string): SimulationResult | null => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    const simulation = simulations.find((sim: SimulationResult) => sim.id === id);
    return simulation || null;
  } catch (error) {
    console.error("Failed to get simulation by ID:", error);
    return null;
  }
};

// Update annotations for a simulation
export const updateSimulationAnnotations = (id: string, annotations: string): boolean => {
  try {
    const simulations = JSON.parse(localStorage.getItem(SIMULATIONS_STORAGE_KEY) || "[]");
    const index = simulations.findIndex((sim: SimulationResult) => sim.id === id);
    
    if (index !== -1) {
      simulations[index].annotations = annotations;
      localStorage.setItem(SIMULATIONS_STORAGE_KEY, JSON.stringify(simulations));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Failed to update simulation annotations:", error);
    return false;
  }
};

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
