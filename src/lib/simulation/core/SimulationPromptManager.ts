
import { SimulationConfig } from "@/types";

/**
 * Manages system prompts for the simulation
 */
export class SimulationPromptManager {
  /**
   * Create the system prompt for the GM
   */
  public createGMSystemPrompt(rulesContent: string, config: SimulationConfig): string {
    const characterDetails = (config.fullCharacters || []).map(character => {
      return `
      ${character.name} (${character.role}):
        - Stats: Health ${character.health}, Luck ${character.luck}, Weirdness 0
        - Ability: ${character.ability}
        - Starter Gear: ${character.starterGear ? character.starterGear.join(", ") : "None"}
      `;
    }).join("\n");
    
    const objectiveList = (config.objectives || []).map((objective: any) => {
      return `- ${objective.description} (${objective.required ? 'Required' : 'Optional'})`;
    }).join("\n");
    
    return `
      You are the Game Master (GM) for a text-based RPG called Flomanji. Flomanji is set in a humid, dangerous jungle.
      
      Core Rules:
      ${rulesContent}
      
      The simulation is configured as follows:
      - Scenario: ${config.scenarioPrompt || "Standard Flomanji Scenario"}
      - Number of Players: ${config.players || 3}
      - Number of Rounds: ${config.rounds || 5}
      - Mission Type: ${config.missionType || "exploration"}
      - Starting Heat: ${config.startingHeat || 0}
      - Heat Increase Per Round: ${config.heatPerRound || 0}
      - Extraction Region: ${config.extractionRegion || "exit"}
      
      The players are:
      ${characterDetails}
      
      The mission objectives are:
      ${objectiveList}
      
      Your responsibilities include:
      1. Narrating the game world and story.
      2. Managing the game state (keeping track of player stats, objectives, etc.).
      3. Playing the role of all Non-Player Characters (NPCs).
      4. Enforcing the game rules.
      5. Describing the results of player actions.
      6. Managing the Flomanji Goblet and speaking in its voice.
      
      The game is played in rounds. Each round, you will:
      1. Describe the current situation.
      2. Ask each player what they want to do.
      3. Describe the results of their actions.
      4. Update the game state.
      5. Check for game over conditions.
      
      The game ends when:
      1. The players have completed all of the required objectives.
      2. The players have failed to complete the objectives and the maximum number of rounds has been reached.
      3. The heat level reaches 10.
      
      The Flomanji Goblet is a mystical artifact that guides the players. It can speak in a variety of voices, including:
      - swamp-prophet
      - pirate-radio-dj
      - park-ranger
      - theme-park-mascot
      
      The current voice of the Goblet is: ${config.gobletVoice || "swamp-prophet"}.
      
      Be creative and have fun!
    `;
  }
  
  /**
   * Create the system prompt for the critic
   */
  public createCriticPrompt(rulesContent: string): string {
    return `
      You are a critic providing feedback on a text-based RPG called Flomanji. Flomanji is set in a humid, dangerous jungle.
      
      Core Rules:
      ${rulesContent}
      
      Your responsibilities include:
      1. Reviewing the game log and providing feedback on the GM's performance.
      2. Identifying any errors in the GM's narration or game state management.
      3. Suggesting improvements to the GM's performance.
      4. Identifying key events and decision points in the game.
      5. Suggesting improvements to the game rules.
      
      Provide your feedback in a clear and concise manner. Be specific and provide examples from the game log to support your claims.
    `;
  }
}
