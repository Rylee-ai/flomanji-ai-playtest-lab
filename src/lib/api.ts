
import { SimulationConfig, SimulationResult } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { createChatCompletion } from "@/lib/openrouter";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult, getSimulationSummaries, getSimulationById, updateSimulationAnnotations } from "@/lib/storage";

// Example rules and cards for testing (would be loaded from Markdown in production)
export const getExampleRules = (): string => {
  return `# Flomanji Rules Guide

## Core Game Concept
Flomanji is a semi-cooperative card-and-dice adventure for 2-6 players set in a heightened 1987 Florida. It blends survival-horror tension with tongue-in-cheek 'Florida Man' absurdity. Players must complete mission objectives and reach extraction before the Heat timer reaches 10.

## Core Loop
Each round follows this sequence:
1. Draw Trouble - Reveal a card from the Trouble deck (Gear, Hazard, NPC, or Event)
2. Take Two Actions - Move, use equipment, rest, team-up, or advance the Mission
3. Chaos Strikes - Reveal and resolve one Chaos card
4. Advance Timers - Global Heat ticks upward; personal Weirdness may spike
5. Repeat until victory or defeat

## Key Stats & Mechanics
- **Five Core Stats**: Brawn, Moxie, Charm, Grit, Weird Sense (range 0-5)
- **Check Formula**: 2d6 + Stat + Modifiers ≥ DC → Success
- **Difficulty Classes**: Easy (7), Standard (9), Hard (11), Heroic (13)
- **Health**: Track on d6 (start at 5, incapacitated at 0)
- **Weirdness**: Track on d10 (start at 0, Flomanjified at 10)
- **Luck Tokens**: Start with half your total Stats (rounded up)

## The Twin Timers
- **Heat**: Global danger meter. Increases by +1 each round (+2 if 4-6 players). Game ends in defeat at Heat 10.
- **Weirdness**: Individual sanity meter. Gain pips from weird events; at Weirdness 10, flip to a Flomanjified Role.
  - 3 pips: Attuned (+1 on Weird checks)
  - 5 pips: Hallucinating (draw extra Gear on success; -1 Charm)
  - 7 pips: Paranoid (cannot Team-Up; -1 Action per turn)
  - 10 pips: Flomanjified (flip to a Flomanjified Role card)

## Action Catalog
Each turn players get 2 Actions from:
- **Move**: Shift to an adjacent Region
- **Use Gear**: Activate a card's ability
- **Interact**: Engage with NPCs or features
- **Team-Up**: Grant +1 to an ally's check or trade Gear
- **Rest**: Heal 1 Health or reduce 1 Weirdness (safe Regions only)
- **Mission**: Advance mission objectives

## Combat & Hazards
When facing a Hazard, players choose one response and make a group check:
1. **Fight**: Roll 2d6 + Brawn + bonuses ≥ Fight DC
2. **Flee**: Roll 2d6 + Moxie + bonuses ≥ Flee DC
3. **Negotiate**: Roll 2d6 + Charm + bonuses ≥ Negotiate DC
4. **Outsmart**: Roll 2d6 + Weird Sense + bonuses ≥ Outsmart DC

## Map & Regions
The game uses Region cards laid out in a pattern. Each Region has:
- On Enter effect (triggered when flipped)
- Optional Action ability
- Rest benefit
- Bonus Zone (one-off special use)

## Victory & Defeat
- **Victory**: Complete all Primary Objectives and reach Extraction before Heat 10
- **Defeat**: Heat reaches 10, or all un-Flomanjified Survivors are eliminated

## Optional Modules
- **Competitive Florida Man Mode**: Race for Treasure with player vs player elements
- **Nightmare Difficulty**: Start Heat 3; passive Chaos effect; Rest adds Weirdness
- **Secret Traitor Variant**: Some players work against the group
- **Solo Automa**: AI deck simulates a partner`;
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
