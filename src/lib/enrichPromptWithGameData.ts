
import { SimulationResult, AgentMessage } from "@/types";
import { getSimulationSummaries, getSimulationById } from "@/lib/storage";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";

/**
 * Enhances a system prompt with game data from cards, rules, and simulation results
 * to create a rich context for AI responses
 */
export const enrichPromptWithGameData = async (basePrompt: string): Promise<string> => {
  let enhancedPrompt = basePrompt;
  
  try {
    // Add character information
    const characterData = PLAYER_CHARACTER_CARDS.map(card => ({
      name: card.name,
      role: card.role,
      stats: card.stats,
      ability: card.ability.name + ": " + card.ability.description,
      health: card.health,
      weirdness: card.weirdness,
      luck: card.luck,
      starterGear: card.starterGear ? card.starterGear.map(g => 
        typeof g === 'string' ? g : g.name
      ).join(", ") : ""
    }));
    
    // Add key hazard information
    const hazardData = HAZARD_CARDS.slice(0, 10).map(card => ({
      name: card.name,
      subType: card.subType,
      difficulty: card.difficultyClasses,
      onFailure: card.onFailure
    }));
    
    // Add key treasure information
    const treasureData = TREASURE_CARDS.slice(0, 5).map(card => ({
      name: card.name,
      effect: card.passiveEffect || card.useEffect || "Special item"
    }));
    
    // Get simulation summaries to find successful runs
    const simulationSummaries = await getSimulationSummaries();
    let simulationInsights = "No simulation data available.";
    let keyGameplayEvents: string[] = [];
    
    if (simulationSummaries && simulationSummaries.length > 0) {
      // Get the most recent successful simulation
      const successfulSim = simulationSummaries
        .filter(s => s.result && s.result.includes("success"))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      
      if (successfulSim) {
        // Fetch full simulation data
        const fullSimData = await getSimulationById(successfulSim.id);
        
        if (fullSimData) {
          // Extract key GM responses that were particularly informative
          const gmResponses = fullSimData.log
            .filter(msg => msg.role === "GM" && msg.content.length > 100)
            .slice(0, 3)
            .map(msg => msg.content);
          
          // Extract major events from simulation
          keyGameplayEvents = fullSimData.keyEvents || [];
          
          simulationInsights = `
          
SIMULATION INSIGHTS:
Recent Flomanji Gameplay Example: ${fullSimData.scenario}
Key Events: ${keyGameplayEvents.join("; ")}
Game Master Descriptions (example narration style):
${gmResponses.join("\n\n")}`;
        }
      }
    }
    
    // Construct enhanced prompt with game data
    enhancedPrompt = `${basePrompt}

GAME REFERENCE DATA:
Character Information: ${JSON.stringify(characterData)}
Common Hazards: ${JSON.stringify(hazardData)}
Notable Treasure Items: ${JSON.stringify(treasureData)}
${simulationInsights}

Remember to maintain the Flomanji tone: 80s Florida, supernatural horror with moments of dark comedy. The game uses Heat (global danger) and Weirdness (individual corruption) as its core tension mechanics.`;

    return enhancedPrompt;
  } catch (error) {
    console.error("Error enriching prompt with game data:", error);
    // Return the original prompt if enhancement fails
    return basePrompt;
  }
};
