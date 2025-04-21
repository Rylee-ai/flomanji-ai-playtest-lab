
import { SimulationConfig, AgentMessage, SimulationResult } from "@/types";
import { simulateRandomId } from "@/lib/utils";
import { createChatCompletion } from "@/lib/openrouterChat";
import { getGMSystemPrompt, getPlayerSystemPrompt, getCriticSystemPrompt } from "@/lib/prompts";
import { saveSimulationResult } from "@/lib/storage";
import { getExampleRules } from "./rules-loader";

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
    characters = []
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

  // Prepare system prompts
  const gmSystemPrompt = getGMSystemPrompt(rulesContent, scenarioPrompt);
  
  // Create player system prompts for each character
  const playerSystemPrompts = Array(actualPlayerCount)
    .fill(0)
    .map((_, i) => getPlayerSystemPrompt(rulesContent, i, 
      config.fullCharacters && config.fullCharacters[i] ? config.fullCharacters[i] : undefined));

  console.log(`Starting simulation with ${actualPlayerCount} players and ${rounds} rounds`);

  try {
    // Start with GM introduction
    const gmIntroMessage = await createChatCompletion(
      gmSystemPrompt,
      [{ role: "user", content: "Introduce the scenario and set the scene for the players." }]
    );

    conversationLog.push({
      role: 'GM',
      content: gmIntroMessage,
      timestamp: new Date().toISOString()
    });

    // Simulation loop
    for (let round = 0; round < rounds; round++) {
      console.log(`Starting round ${round + 1}`);
      
      // Each player takes their turn in this round
      for (let playerIdx = 0; playerIdx < actualPlayerCount; playerIdx++) {
        console.log(`Processing player ${playerIdx + 1}'s turn`);
        
        // Convert the conversation log to messages format for this player
        const playerMessages = conversationLog.map(entry => ({
          role: entry.role === 'Player' ? 'assistant' : 'user',
          content: `${entry.role}: ${entry.content}`
        }));

        // Get player's action
        const playerResponse = await createChatCompletion(
          playerSystemPrompts[playerIdx],
          playerMessages
        );

        conversationLog.push({
          role: 'Player',
          content: playerResponse,
          playerIndex: playerIdx, // Track which player this is
          timestamp: new Date().toISOString()
        });

        // GM responds to this player
        const gmMessages = conversationLog.map(entry => ({
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: `${entry.role}${entry.playerIndex !== undefined ? ` ${entry.playerIndex + 1}` : ''}: ${entry.content}`
        }));

        const gmResponse = await createChatCompletion(
          gmSystemPrompt,
          gmMessages
        );

        conversationLog.push({
          role: 'GM',
          content: gmResponse,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Generate critic feedback if enabled
    let criticFeedback = "";
    if (enableCritic) {
      const criticSystemPrompt = getCriticSystemPrompt(rulesContent);
      const fullTranscript = conversationLog.map(entry =>
        `${entry.role}${entry.playerIndex !== undefined ? ` ${entry.playerIndex + 1}` : ''}: ${entry.content}`
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
      playerCount: actualPlayerCount,
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
