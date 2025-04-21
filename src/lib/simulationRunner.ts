
import { SimulationConfig, AgentMessage, SimulationResult } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { createChatCompletion } from "@/lib/openrouterChat";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult } from "@/lib/storage";
import { getExampleRules } from "./rules-loader";
import { HAZARD_CARDS } from "./cards/hazard-cards";
import { TREASURE_CARDS } from "./cards/treasure-cards";
import { GEAR_CARDS } from "./cards/gear-cards";
import { FLOMANJIFIED_CARDS } from "./cards/flomanjified-cards";

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
    characters = [],
    startingHeat = 0,
    heatPerRound = 0,
    extractionRegion = 'exit'
  } = config;

  // Use the length of selected characters if available, otherwise use the players config
  const actualPlayerCount = characters.length || players;
  
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
    gameState: {
      currentRound: 0,
      heat: startingHeat,
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
    }
  };
  
  // Initialize player inventories
  if (config.fullCharacters) {
    config.fullCharacters.forEach((char, idx) => {
      simulationMeta.gameState.playerInventories[idx] = {
        gear: char.starterGear || [],
        treasures: [],
        health: char.health || 5,
        weirdness: char.weirdness || 0,
        luck: char.luck || 3
      };
    });
  }

  // Prepare system prompts
  const gmSystemPrompt = getGMSystemPrompt(rulesContent, scenarioPrompt);
  
  // Create player system prompts for each character with correct player indices
  const playerSystemPrompts = Array(actualPlayerCount)
    .fill(0)
    .map((_, i) => getPlayerSystemPrompt(rulesContent, i, 
      config.fullCharacters && config.fullCharacters[i] ? config.fullCharacters[i] : undefined));

  console.log(`Starting simulation with ${actualPlayerCount} players and ${rounds} rounds`);

  try {
    // Simulate dice roll - returns a value between 1-10 to simulate 2d6
    const simulateDiceRoll = (stat: number = 0): {value: number, result: string} => {
      const roll = Math.floor(Math.random() * 10) + 1;
      const total = roll + stat;
      
      let result = "failure";
      if (total >= 8) result = "success";
      else if (total >= 4) result = "partial success";
      
      return {value: roll, result};
    };
    
    // Draw a random card from a deck
    const drawRandomCard = (deck: any[]): any => {
      if (deck.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * deck.length);
      return deck[randomIndex];
    };

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
        const gmHazardMessage = await createChatCompletion(
          gmSystemPrompt,
          [...conversationLog.map(entry => {
            const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
            return {
              role: entry.role === 'GM' ? 'assistant' : 'user',
              content: entry.role === 'GM'
                ? `GM: ${cleanContent}`
                : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
            };
          }), { role: "user", content: hazardPrompt }]
        );
        
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
        
        // Format messages properly for the player without role repetition
        const playerMessages = conversationLog.map(entry => {
          // Remove any role prefixes that might already be in the content
          const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
          
          return {
            role: entry.role === 'Player' ? 'assistant' : 'user',
            content: entry.role === 'Player' 
              ? `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
              : `GM: ${cleanContent}`
          };
        });
        
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
        
        playerMessages.push({ 
          role: 'user', 
          content: playerStatePrompt 
        });

        // Get player's action
        const playerResponse = await createChatCompletion(
          playerSystemPrompts[playerIdx],
          playerMessages
        );

        // Remove role prefix if it exists in the response
        const cleanPlayerResponse = playerResponse.replace(/^(Player \d+): /g, '');
        
        // Check if player is making a dice roll and simulate it
        let rollResult = null;
        const rollPatterns = [
          /roll(?:s|ing)?\s+(?:for)?\s*(\w+)/i, // "roll for Brawn" or "rolling Charm"
          /(\w+)\s+(?:check|roll|test)/i,       // "Brawn check" or "Moxie roll"
          /check(?:s|ing)?\s+(?:with)?\s*(\w+)/i, // "checking with Charm"
          /test(?:s|ing)?\s+(?:with)?\s*(\w+)/i  // "testing with Weird Sense"
        ];
        
        let statName = "";
        let statValue = 0;
        
        // Check for dice roll references in player response
        for (const pattern of rollPatterns) {
          const match = cleanPlayerResponse.match(pattern);
          if (match && match[1]) {
            statName = match[1].toLowerCase();
            // Convert stat name to proper form
            if (statName.includes("brawn") || statName === "strength") {
              statName = "brawn";
              statValue = config.fullCharacters?.[playerIdx]?.stats.brawn || 0;
            } else if (statName.includes("moxie") || statName === "agility") {
              statName = "moxie";
              statValue = config.fullCharacters?.[playerIdx]?.stats.moxie || 0;
            } else if (statName.includes("charm") || statName === "social") {
              statName = "charm";
              statValue = config.fullCharacters?.[playerIdx]?.stats.charm || 0;
            } else if (statName.includes("grit") || statName === "endurance") {
              statName = "grit";
              statValue = config.fullCharacters?.[playerIdx]?.stats.grit || 0;
            } else if (statName.includes("weird") || statName === "sense") {
              statName = "weirdSense";
              statValue = config.fullCharacters?.[playerIdx]?.stats.weirdSense || 0;
            }
            
            if (statName) {
              rollResult = simulateDiceRoll(statValue);
              simulationMeta.gameState.rolls.push({
                player: playerIdx + 1,
                type: "action",
                value: rollResult.value,
                stat: statName,
                result: rollResult.result
              });
              break;
            }
          }
        }
        
        // Look for card usage
        const cardUsagePatterns = [
          /use(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i,  // "using my Flashlight"
          /activate(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i, // "activating my Lucky Charm"
          /pull(?:s|ing)? out(?:my)?\s*"?([^.,"]+)"?/i    // "pulls out First Aid Kit"
        ];
        
        for (const pattern of cardUsagePatterns) {
          const match = cleanPlayerResponse.match(pattern);
          if (match && match[1]) {
            const itemName = match[1].trim();
            // Check if player has this item
            const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
            if (playerInventory && 
                (playerInventory.gear.some(g => g.toLowerCase().includes(itemName.toLowerCase())) || 
                 playerInventory.treasures.some(t => t.toLowerCase().includes(itemName.toLowerCase())))) {
              // Item found in inventory, mark as used
              console.log(`Player ${playerIdx+1} used item: ${itemName}`);
            }
          }
        }

        // Add player response to log
        conversationLog.push({
          role: 'Player',
          content: cleanPlayerResponse,
          playerIndex: playerIdx,
          timestamp: new Date().toISOString(),
          metadata: {
            roundNumber: round + 1,
            phase: "player-action",
            playerNumber: playerIdx + 1,
            playerName: config.fullCharacters?.[playerIdx]?.name || `Player ${playerIdx+1}`,
            roll: rollResult ? {
              stat: statName,
              value: rollResult.value,
              modifier: statValue,
              total: rollResult.value + statValue,
              result: rollResult.result
            } : undefined,
            inventory: simulationMeta.gameState.playerInventories[playerIdx],
            gameState: {...simulationMeta.gameState}
          }
        });

        // Format messages properly for the GM without role repetition
        const gmMessages = conversationLog.map(entry => {
          // Remove any role prefixes that might already be in the content
          const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
          
          return {
            role: entry.role === 'GM' ? 'assistant' : 'user',
            content: entry.role === 'GM'
              ? `GM: ${cleanContent}`
              : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
          };
        });
        
        // Add roll information for GM if a roll was made
        let gmPrompt = `Respond to Player ${playerIdx + 1}'s action.`;
        
        if (rollResult) {
          gmPrompt += ` The player rolled for ${statName}: ${rollResult.value} + ${statValue} = ${rollResult.value + statValue}, which is a ${rollResult.result}.`;
          
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

        // Get GM's response
        const gmResponse = await createChatCompletion(
          gmSystemPrompt,
          [...gmMessages, { role: "user", content: gmPrompt }]
        );

        // Remove role prefix if it exists in the response
        const cleanGmResponse = gmResponse.replace(/^GM: /g, '');

        conversationLog.push({
          role: 'GM',
          content: cleanGmResponse,
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
      
      const gmSummaryResponse = await createChatCompletion(
        gmSystemPrompt,
        [...conversationLog.map(entry => {
          const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
          return {
            role: entry.role === 'GM' ? 'assistant' : 'user',
            content: entry.role === 'GM'
              ? `GM: ${cleanContent}`
              : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
          };
        }), { role: "user", content: roundSummaryPrompt }]
      );
      
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
      
      // Clean up the transcript to avoid role repetition
      const formattedTranscript = conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return `${entry.role}${entry.playerIndex !== undefined ? ` ${entry.playerIndex + 1}` : ''}: ${cleanContent}`;
      }).join("\n\n");
      
      // Add simulation metadata to the critic
      const criticPrompt = `
      Here is the full simulation metadata:
      - Scenario: ${scenarioPrompt}
      - Players: ${actualPlayerCount}
      - Rounds: ${rounds}
      - Starting Heat: ${startingHeat}
      - Heat per Round: ${heatPerRound}
      - Characters: ${config.fullCharacters?.map(c => c.name).join(", ") || "Standard characters"}
      - Final Heat Level: ${simulationMeta.gameState.heat}
      - Completed Objectives: ${simulationMeta.gameState.completedObjectives.length}
      
      Here is the transcript of the session:
      
      ${formattedTranscript}
      
      Please provide your analysis focusing on how well the rules were applied, the balance of the game, and the player experience.`;

      criticFeedback = await createChatCompletion(
        criticSystemPrompt,
        [{ role: "user", content: criticPrompt }]
      );
    }

    // Create the simulation result with all metadata
    const result: SimulationResult = {
      id: simulationId,
      timestamp,
      scenario: scenarioPrompt,
      rounds,
      playerCount: actualPlayerCount,
      log: conversationLog,
      criticFeedback,
      annotations: "",
      config: simulationMeta.config,
      gameState: simulationMeta.gameState,
      characters: config.fullCharacters || []
    };

    // Save to local storage
    saveSimulationResult(result);

    return result;
  } catch (error) {
    console.error("Error during simulation:", error);
    throw new Error(`Simulation failed: ${error}`);
  }
};
