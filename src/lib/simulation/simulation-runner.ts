
import { SimulationConfig, AgentMessage, SimulationResult, FlomanjiCharacter } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult } from "@/lib/storage";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { createChatCompletion } from "@/lib/openrouterChat"; // Add this import

import { 
  simulateDiceRoll, 
  drawRandomCard 
} from "./dice-utils";

import { 
  getGMResponse, 
  getPlayerResponse, 
  getCriticFeedback 
} from "./agent-communication";

import {
  processPlayerAction,
  detectItemUsage,
  createFormattedTranscript,
  createSimulationMetadata
} from "./game-events";

/**
 * Initializes the game state for a simulation
 */
function initializeGameState(config: SimulationConfig) {
  const gameState = {
    currentRound: 0,
    heat: config.startingHeat || 0,
    completedObjectives: [] as string[],
    playerInventories: {} as Record<number, {
      gear: string[],
      treasures: string[],
      health: number,
      weirdness: number,
      luck: number
    }>,
    regions: [] as string[],
    currentRegion: "start",
    activeHazards: [] as string[],
    rolls: [] as {player: number, type: string, value: number, stat: string, result: string}[]
  };
  
  // Initialize player inventories
  if (config.fullCharacters) {
    config.fullCharacters.forEach((char, idx) => {
      gameState.playerInventories[idx] = {
        gear: char.starterGear || [],
        treasures: [],
        health: char.health || 5,
        weirdness: char.weirdness || 0,
        luck: char.luck || 3
      };
    });
  }
  
  return gameState;
}

/**
 * Runs a simulation based on the provided configuration and rules.
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

    // Simulation loop
    for (let round = 0; round < rounds; round++) {
      simulationMeta.gameState.currentRound = round + 1;
      console.log(`Starting round ${round + 1}`);
      
      // Potentially increase heat at start of round based on config
      if (heatPerRound > 0 && round > 0) {
        simulationMeta.gameState.heat += heatPerRound;
        
        // Log heat increase
        conversationLog.push({
          role: 'GM',
          content: `[System] Heat increases to ${simulationMeta.gameState.heat} at the start of round ${round+1}.`,
          timestamp: new Date().toISOString(),
          metadata: {
            roundNumber: round + 1,
            phase: "heat-update",
            heat: simulationMeta.gameState.heat,
            gameState: {...simulationMeta.gameState}
          }
        });
      }
      
      // Draw hazard card for this round
      const hazard = drawRandomCard(HAZARD_CARDS);
      if (hazard) {
        simulationMeta.gameState.activeHazards.push(hazard.name);
        
        // Update GM about the hazard (as a system message)
        const hazardPrompt = `A new hazard appears: ${hazard.name}. ${hazard.description || ""} 
        The rules for this hazard are: ${hazard.rules ? hazard.rules.join(", ") : "Standard hazard rules apply."}
        
        Introduce this hazard to the players and call for appropriate checks. The players need to decide if they will Fight (Brawn), Flee (Moxie), Negotiate (Charm), or Outsmart (Weird Sense) this hazard.`;
        
        // GM describes the hazard
        const gmHazardMessage = await getGMResponse(gmSystemPrompt, conversationLog, hazardPrompt);
        
        conversationLog.push({
          role: 'GM',
          content: gmHazardMessage,
          timestamp: new Date().toISOString(),
          metadata: {
            roundNumber: round + 1,
            phase: "hazard-introduction",
            hazard: hazard.name,
            heat: simulationMeta.gameState.heat,
            gameState: {...simulationMeta.gameState}
          }
        });
      }
      
      // Each player takes their turn in this round
      for (let playerIdx = 0; playerIdx < actualPlayerCount; playerIdx++) {
        console.log(`Processing player ${playerIdx + 1}'s turn`);
        
        // Add player-specific information about their current state
        const playerStatePrompt = `
        [System Information - Your Current State]
        - Health: ${simulationMeta.gameState.playerInventories[playerIdx]?.health || 5}
        - Weirdness: ${simulationMeta.gameState.playerInventories[playerIdx]?.weirdness || 0}
        - Luck: ${simulationMeta.gameState.playerInventories[playerIdx]?.luck || 3}
        - Gear: ${simulationMeta.gameState.playerInventories[playerIdx]?.gear.join(", ") || "None"}
        - Treasures: ${simulationMeta.gameState.playerInventories[playerIdx]?.treasures.join(", ") || "None"}
        
        It's your turn. You have 2 actions from: Move, Use Gear, Interact, Team-Up, Rest, or Mission.
        If responding to a hazard, clearly state if you choose to Fight, Flee, Negotiate, or Outsmart it.
        Please make your decision and specify which stats you will use for any necessary checks.`;
        
        // Get player's action
        const playerResponse = await getPlayerResponse(
          playerSystemPrompts[playerIdx],
          conversationLog,
          playerIdx,
          playerStatePrompt
        );

        // Check for dice rolls and item usage
        const character = config.fullCharacters?.[playerIdx];
        const rollInfo = processPlayerAction(playerResponse, playerIdx, character);
        const itemUsage = detectItemUsage(
          playerResponse, 
          simulationMeta.gameState.playerInventories[playerIdx] || { gear: [], treasures: [] }
        );
        
        let rollResult = null;
        if (rollInfo.needsRoll) {
          rollResult = simulateDiceRoll(rollInfo.statValue);
          simulationMeta.gameState.rolls.push({
            player: playerIdx + 1,
            type: "action",
            value: rollResult.value,
            stat: rollInfo.statName,
            result: rollResult.result
          });
        }

        // Add player response to log
        conversationLog.push({
          role: 'Player',
          content: playerResponse,
          playerIndex: playerIdx,
          timestamp: new Date().toISOString(),
          metadata: {
            roundNumber: round + 1,
            phase: "player-action",
            playerNumber: playerIdx + 1,
            playerName: config.fullCharacters?.[playerIdx]?.name || `Player ${playerIdx+1}`,
            roll: rollResult ? {
              stat: rollInfo.statName,
              value: rollResult.value,
              modifier: rollInfo.statValue,
              total: rollResult.value + rollInfo.statValue,
              result: rollResult.result
            } : undefined,
            inventory: simulationMeta.gameState.playerInventories[playerIdx],
            gameState: {...simulationMeta.gameState}
          }
        });
        
        // Add roll information for GM if a roll was made
        let gmPrompt = `Respond to Player ${playerIdx + 1}'s action.`;
        
        if (rollResult) {
          gmPrompt += ` The player rolled for ${rollInfo.statName}: ${rollResult.value} + ${rollInfo.statValue} = ${rollResult.value + rollInfo.statValue}, which is a ${rollResult.result}.`;
          
          // If hazard was involved, update heat based on result
          if (hazard && simulationMeta.gameState.activeHazards.length > 0) {
            if (rollResult.result === "failure") {
              simulationMeta.gameState.heat += 2;
              gmPrompt += ` This increases Heat by 2 to ${simulationMeta.gameState.heat}.`;
              
              // Check for potential damage or weirdness increase
              const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
              if (playerInventory) {
                playerInventory.health -= 1;
                gmPrompt += ` The player takes 1 damage (health now ${playerInventory.health}).`;
              }
            } else if (rollResult.result === "partial success") {
              simulationMeta.gameState.heat += 1;
              gmPrompt += ` This increases Heat by 1 to ${simulationMeta.gameState.heat}.`;
            }
            
            // Check if the hazard is resolved
            if (rollResult.result === "success") {
              simulationMeta.gameState.activeHazards = 
                simulationMeta.gameState.activeHazards.filter(h => h !== hazard.name);
              gmPrompt += ` The hazard "${hazard.name}" is fully resolved.`;
              
              // Chance to find treasure after resolving hazard
              if (Math.random() > 0.6) {
                const treasure = drawRandomCard(TREASURE_CARDS);
                if (treasure) {
                  gmPrompt += ` The player finds "${treasure.name}" after resolving the hazard!`;
                  const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
                  if (playerInventory) {
                    playerInventory.treasures.push(treasure.name);
                  }
                }
              }
            }
          }
        }
        
        if (itemUsage.itemUsed) {
          gmPrompt += ` The player is using their "${itemUsage.itemName}" item.`;
        }

        // Get GM's response
        const gmResponse = await getGMResponse(gmSystemPrompt, conversationLog, gmPrompt);

        conversationLog.push({
          role: 'GM',
          content: gmResponse,
          timestamp: new Date().toISOString(),
          metadata: {
            roundNumber: round + 1,
            phase: "gm-response",
            heat: simulationMeta.gameState.heat,
            gameState: {...simulationMeta.gameState}
          }
        });
        
        // Check for game end conditions
        if (simulationMeta.gameState.heat >= 10) {
          conversationLog.push({
            role: 'GM',
            content: `[Game Over] Heat has reached ${simulationMeta.gameState.heat}, exceeding the maximum threshold of 10. The mission has failed.`,
            timestamp: new Date().toISOString(),
            metadata: {
              roundNumber: round + 1,
              phase: "game-over",
              reason: "heat-maximum",
              outcome: "failure",
              heat: simulationMeta.gameState.heat,
              gameState: {...simulationMeta.gameState}
            }
          });
          
          break; // Exit the player loop
        }
        
        // Check if all players have reached high weirdness
        let allPlayersTransformed = true;
        for (let i = 0; i < actualPlayerCount; i++) {
          const playerInventory = simulationMeta.gameState.playerInventories[i];
          if (playerInventory && playerInventory.weirdness < 10) {
            allPlayersTransformed = false;
            break;
          }
        }
        
        if (allPlayersTransformed) {
          conversationLog.push({
            role: 'GM',
            content: `[Game Over] All players have reached maximum Weirdness and have been transformed. The mission has failed.`,
            timestamp: new Date().toISOString(),
            metadata: {
              roundNumber: round + 1,
              phase: "game-over",
              reason: "all-players-transformed",
              outcome: "failure",
              heat: simulationMeta.gameState.heat,
              gameState: {...simulationMeta.gameState}
            }
          });
          
          break; // Exit the player loop
        }
      }
      
      // Check if game ended during this round
      if (conversationLog.some(entry => entry.metadata?.phase === "game-over")) {
        break; // Exit the round loop
      }
      
      // End of round summary by GM
      const roundSummaryPrompt = `Provide a summary of round ${round + 1}. Current Heat level is ${simulationMeta.gameState.heat}. 
      Active hazards: ${simulationMeta.gameState.activeHazards.length > 0 ? simulationMeta.gameState.activeHazards.join(", ") : "None"}. 
      Required Objectives completed: ${simulationMeta.gameState.completedObjectives.length} / ${config.objectives?.filter(o => o.required).length || 0}.`;
      
      const gmSummaryResponse = await getGMResponse(gmSystemPrompt, conversationLog, roundSummaryPrompt);
      
      conversationLog.push({
        role: 'GM',
        content: gmSummaryResponse,
        timestamp: new Date().toISOString(),
        metadata: {
          roundNumber: round + 1,
          phase: "round-summary",
          heat: simulationMeta.gameState.heat,
          activeHazards: simulationMeta.gameState.activeHazards,
          completedObjectives: simulationMeta.gameState.completedObjectives,
          gameState: {...simulationMeta.gameState}
        }
      });
    }

    // Generate critic feedback if enabled
    let criticFeedback = "";
    if (enableCritic) {
      const criticSystemPrompt = getCriticSystemPrompt(rulesContent);
      
      // Create formatted transcript and metadata
      const formattedTranscript = createFormattedTranscript(conversationLog);
      const metadataString = createSimulationMetadata(
        config, 
        simulationMeta.gameState.heat,
        simulationMeta.gameState.completedObjectives
      );
      
      // Get critic feedback
      criticFeedback = await getCriticFeedback(
        criticSystemPrompt,
        formattedTranscript,
        metadataString
      );
    }

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
