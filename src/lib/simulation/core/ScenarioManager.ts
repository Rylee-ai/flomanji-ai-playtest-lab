
import { SimulationConfig } from "@/types";
import { getGMSystemPrompt, getPlayerSystemPrompt } from "@/lib/prompts";

/**
 * Manages scenario setup and system prompts
 */
export class ScenarioManager {
  /**
   * Prepare the scenario and system prompts
   */
  public async prepareScenario(
    rulesContent: string,
    config: SimulationConfig,
    gameState: any
  ): Promise<{
    systemPrompts: {
      gmSystemPrompt: string;
    },
    playerSystemPrompts: string[]
  }> {
    const gmSystemPrompt = getGMSystemPrompt(rulesContent, config.scenarioPrompt);
    
    const actualPlayerCount = gameState.characters.length;
    const playerSystemPrompts = Array(actualPlayerCount)
      .fill(0)
      .map((_, i) => getPlayerSystemPrompt(
        rulesContent, 
        i, 
        gameState.characters[i]
      ));
    
    return {
      systemPrompts: {
        gmSystemPrompt
      },
      playerSystemPrompts
    };
  }
}
