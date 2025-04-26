import { SimulationConfig, SimulationResult, AgentMessage } from "@/types";
import { createChatCompletion } from "@/lib/openrouterChat";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult } from "@/lib/storage";
import { getGobletNarration, selectGobletVoice, GobletVoiceType } from "./goblet-voice-manager";
import { simulateDiceRoll, drawRandomCard, initializePlayerInventories } from "./game-mechanics";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";

export const startSimulation = async (
  config: SimulationConfig,
  rulesContent: string
): Promise<SimulationResult> => {
  const simulationId = `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();
  const actualPlayerCount = config.fullCharacters?.length || config.players || 1;
  const selectedGobletVoice = selectGobletVoice(config);
  const conversationLog: AgentMessage[] = [];

  const simulationMeta = {
    id: simulationId,
    timestamp,
    config: {
      scenario: config.scenarioPrompt,
      rounds: config.rounds,
      playerCount: actualPlayerCount,
      characters: config.fullCharacters || [],
      enableCritic: config.enableCritic,
      outputMode: config.outputMode,
      startingHeat: config.startingHeat,
      heatPerRound: config.heatPerRound,
      extractionRegion: config.extractionRegion,
      objectives: config.objectives || [],
      gobletVoice: selectedGobletVoice
    },
    gameState: {
      currentRound: 0,
      heat: config.startingHeat || 0,
      completedObjectives: [] as string[],
      playerInventories: initializePlayerInventories(config),
      regions: [] as string[],
      currentRegion: "start",
      activeHazards: [] as string[],
      rolls: [] as {player: number, type: string, value: number, stat: string, result: string}[],
      currentGobletHolder: 0,
      gobletVoice: selectedGobletVoice,
      gobletMood: "normal"
    }
  };

  try {
    const gmSystemPrompt = getGMSystemPrompt(rulesContent, config.scenarioPrompt);

    const playerSystemPrompts = Array(actualPlayerCount)
      .fill(0)
      .map((_, i) => getPlayerSystemPrompt(rulesContent, i, 
        config.fullCharacters && config.fullCharacters[i] ? config.fullCharacters[i] : undefined));

    console.log(`Starting simulation with ${actualPlayerCount} players, ${config.rounds} rounds, and Goblet voice: ${selectedGobletVoice}`);

    let initPrompt = "Introduce yourself as the Flomanji Goblet and set the scene for the players. Describe the starting region, current Heat level, and initial objectives. Each player should make a roll at the start to determine if they notice any important details. Use your unique Goblet personality voice.";
    
    if (config.objectives && config.objectives.length > 0) {
      initPrompt += " The mission objectives are:";
      config.objectives.forEach((obj, idx) => {
        initPrompt += `\n${idx+1}. ${obj.description} ${obj.required ? '(Required)' : '(Optional)'}`;
      });
    }
    
    if (config.fullCharacters && config.fullCharacters.length > 0) {
      initPrompt += "\n\nThe player characters are:";
      config.fullCharacters.forEach((char, idx) => {
        initPrompt += `\nPlayer ${idx+1}: ${char.name} (${char.role}) - Brawn ${char.stats.brawn}, Moxie ${char.stats.moxie}, Charm ${char.stats.charm}, Grit ${char.stats.grit}, Weird Sense ${char.stats.weirdSense}. Special ability: ${char.ability.name}`;
      });
    }
    
    initPrompt += "\n\nPlayers start with the following gear:";
    if (config.fullCharacters) {
      config.fullCharacters.forEach((char, idx) => {
        initPrompt += `\nPlayer ${idx+1}: ${(char.starterGear || []).join(", ")}`;
      });
    }
    
    initPrompt += `\n\nStarting Heat Level: ${config.startingHeat}`;
    if (config.heatPerRound > 0) {
      initPrompt += `\nHeat increases by ${config.heatPerRound} each round.`;
    }
    
    initPrompt += `\n\n${getGobletNarration('intro', selectedGobletVoice, simulationMeta.gameState.heat)}`;

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
        gameState: {...simulationMeta.gameState},
        gobletVoice: simulationMeta.gameState.gobletVoice,
        gobletMood: simulationMeta.gameState.gobletMood
      }
    });

    for (let round = 0; round < config.rounds; round++) {
      simulationMeta.gameState.currentRound = round + 1;
      console.log(`Starting round ${round + 1}`);
      
      if (config.heatPerRound > 0 && round > 0) {
        simulationMeta.gameState.heat += config.heatPerRound;
        
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
      
      const hazard = drawRandomCard(HAZARD_CARDS);
      if (hazard) {
        simulationMeta.gameState.activeHazards.push(hazard.name);
        
        const hazardPrompt = `A new hazard appears: ${hazard.name}. ${hazard.description || ""} 
        The rules for this hazard are: ${hazard.rules ? hazard.rules.join(", ") : "Standard hazard rules apply."}
        
        As the Flomanji Goblet, dramatically announce this hazard to the players with your unique voice. Describe how the Goblet reacts physically (glowing, trembling, changing temperature). Then call for appropriate checks. The players need to decide if they will Fight (Brawn), Flee (Moxie), Negotiate (Charm), or Outsmart (Weird Sense) this hazard.
        
        ${getGobletNarration('hazard', selectedGobletVoice, simulationMeta.gameState.heat, hazard)}`;
        
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
      
      for (let playerIdx = 0; playerIdx < actualPlayerCount; playerIdx++) {
        console.log(`Processing player ${playerIdx + 1}'s turn`);
        
        simulationMeta.gameState.currentGobletHolder = playerIdx;
        
        const playerMessages = conversationLog.map(entry => {
          const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
          return {
            role: entry.role === 'Player' ? 'assistant' : 'user',
            content: entry.role === 'Player' 
              ? `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
              : `GM: ${cleanContent}`
          };
        });
        
        const playerStatePrompt = `
        [System Information - Your Current State]
        - Health: ${simulationMeta.gameState.playerInventories[playerIdx]?.health || 5}
        - Weirdness: ${simulationMeta.gameState.playerInventories[playerIdx]?.weirdness || 0}
        - Luck: ${simulationMeta.gameState.playerInventories[playerIdx]?.luck || 3}
        - Gear: ${simulationMeta.gameState.playerInventories[playerIdx]?.gear.join(", ") || "None"}
        - Treasures: ${simulationMeta.gameState.playerInventories[playerIdx]?.treasures.join(", ") || "None"}
        
        The Flomanji Goblet has been passed to you - it's your turn! You have 2 actions from: Move, Use Gear, Interact, Team-Up, Rest, or Mission.
        If responding to a hazard, clearly state if you choose to Fight, Flee, Negotiate, or Outsmart it.
        Please make your decision and specify which stats you will use for any necessary checks. To roll dice, say you are "shaking the Goblet" to determine the outcome.`;
        
        playerMessages.push({ 
          role: 'user', 
          content: playerStatePrompt 
        });

        const playerResponse = await createChatCompletion(
          playerSystemPrompts[playerIdx],
          playerMessages
        );

        const cleanPlayerResponse = playerResponse.replace(/^(Player \d+): /g, '');
        
        let rollResult = null;
        const rollPatterns = [
          /roll(?:s|ing)?\s+(?:for)?\s*(\w+)/i,
          /(\w+)\s+(?:check|roll|test)/i,
          /check(?:s|ing)?\s+(?:with)?\s*(\w+)/i,
          /test(?:s|ing)?\s+(?:with)?\s*(\w+)/i
        ];
        
        let statName = "";
        let statValue = 0;
        
        for (const pattern of rollPatterns) {
          const match = cleanPlayerResponse.match(pattern);
          if (match && match[1]) {
            statName = match[1].toLowerCase();
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
        
        const cardUsagePatterns = [
          /use(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i,
          /activate(?:s|ing)?\s+(?:my)?\s*"?([^.,"]+)"?/i,
          /pull(?:s|ing)? out(?:my)?\s*"?([^.,"]+)"?/i
        ];
        
        for (const pattern of cardUsagePatterns) {
          const match = cleanPlayerResponse.match(pattern);
          if (match && match[1]) {
            const itemName = match[1].trim();
            const playerInventory = simulationMeta.gameState.playerInventories[playerIdx];
            if (playerInventory && 
                (playerInventory.gear.some(g => g.toLowerCase().includes(itemName.toLowerCase())) || 
                 playerInventory.treasures.some(t => t.toLowerCase().includes(itemName.toLowerCase())))) {
              console.log(`Player ${playerIdx+1} used item: ${itemName}`);
            }
          }
        }

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
            gameState: {...simulationMeta.gameState},
            isGobletHolder: true
          }
        });
      }
      
      const gmActionSummaryPrompt = `All players have acted this round. 
      
      As the Flomanji Goblet, provide a detailed response to all player actions using your unique voice style. Describe how the Goblet physically reacts to each roll (glowing, bubbling, changing color, etc). Resolve all outcomes and explain the current state of the mission. Include any changes to Heat, health, or objectives.
      
      ${getGobletNarration('result', selectedGobletVoice, simulationMeta.gameState.heat)}`;
      
      const gmResponseMessages = conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      });
      
      const gmCollectiveResponse = await createChatCompletion(
        gmSystemPrompt,
        [...gmResponseMessages, { role: "user", content: gmActionSummaryPrompt }]
      );
      
      const cleanGmResponse = gmCollectiveResponse.replace(/^GM: /g, '');
      
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
        
        break;
      }
      
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
        
        break;
      }
      
      if (conversationLog.some(entry => entry.metadata?.phase === "game-over")) {
        break;
      }
      
      const roundSummaryPrompt = `Provide a summary of round ${round + 1} as the Flomanji Goblet. Current Heat level is ${simulationMeta.gameState.heat}. 
      Active hazards: ${simulationMeta.gameState.activeHazards.length > 0 ? simulationMeta.gameState.activeHazards.join(", ") : "None"}. 
      Required Objectives completed: ${simulationMeta.gameState.completedObjectives.length} / ${config.objectives?.filter(o => o.required).length || 0}.
      
      ${getGobletNarration('round-end', selectedGobletVoice, simulationMeta.gameState.heat)}
      
      Mention that the Goblet will now be passed to the next player for the following round.`;
      
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
    
    const result: SimulationResult = {
      id: simulationId,
      timestamp,
      scenario: config.scenarioPrompt || "",
      rounds: config.rounds || 5,
      playerCount: actualPlayerCount,
      log: conversationLog,
      criticFeedback: "",
      annotations: "",
      config: simulationMeta.config,
      gameState: simulationMeta.gameState,
      characters: config.fullCharacters || [],
      missionOutcome: "pending"
    };

    saveSimulationResult(result);
    return result;

  } catch (error) {
    console.error("Error during simulation:", error);
    throw new Error(`Simulation failed: ${error}`);
  }
};
