
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
    outputMode = 'full'
  } = config;

  const simulationId = simulateRandomId();
  const timestamp = new Date().toISOString();

  // Initialize conversation log
  const conversationLog: AgentMessage[] = [];

  // Prepare system prompts
  const gmSystemPrompt = getGMSystemPrompt(rulesContent, scenarioPrompt);
  const playerSystemPrompts = Array(players)
    .fill(0)
    .map((_, i) => getPlayerSystemPrompt(rulesContent, i));

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
      for (let playerIdx = 0; playerIdx < players; playerIdx++) {
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
          timestamp: new Date().toISOString()
        });

        // GM responds to this player
        const gmMessages = conversationLog.map(entry => ({
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: `${entry.role}: ${entry.content}`
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
        `${entry.role}: ${entry.content}`
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
