import { SimulationConfig, SimulationResult, AgentMessage } from "@/types";
import { RoundManager } from "./RoundManager";
import { createChatCompletion } from "@/lib/openrouterChat";
import { PlayerManager } from "./PlayerManager";
import { GameSetupManager } from "./GameSetupManager";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { v4 as uuidv4 } from "uuid";
import { drawRandomCard } from "../game-mechanics";

/**
 * Orchestrates the overall simulation process
 */
export class SimulationOrchestrator {
  private roundManager: RoundManager;
  private playerManager: PlayerManager;
  private gameSetupManager: GameSetupManager;
  
  constructor() {
    this.roundManager = new RoundManager();
    this.playerManager = new PlayerManager();
    this.gameSetupManager = new GameSetupManager();
  }
  
  /**
   * Run a complete simulation with the given configuration
   */
  public async runSimulation(
    config: SimulationConfig,
    rulesContent: string
  ): Promise<SimulationResult> {
    console.log("Starting simulation with config:", config);
    
    // Generate a unique simulation ID
    const simulationId = uuidv4();
    
    // Initialize conversation log
    const conversationLog: AgentMessage[] = [];
    
    // Create system prompts
    const systemPrompts = {
      gmSystemPrompt: this.createGMSystemPrompt(rulesContent, config),
      criticPrompt: this.createCriticPrompt(rulesContent)
    };
    
    // Setup the game state
    const gameState = await this.setupGameState(config);
    
    // Initialize player system prompts
    const playerSystemPrompts = await this.playerManager.initializePlayerProfiles(
      config,
      gameState,
      systemPrompts.gmSystemPrompt
    );
    
    // Generate intro narration
    const introNarration = await this.generateIntroNarration(
      config,
      gameState,
      systemPrompts.gmSystemPrompt
    );
    
    // Add intro to conversation log
    conversationLog.push({
      role: 'GM',
      content: introNarration,
      timestamp: new Date().toISOString(),
      metadata: {
        phase: "intro",
        gameState: {...gameState}
      }
    });
    
    // Run the rounds
    await this.roundManager.runAllRounds(
      config,
      gameState,
      conversationLog,
      systemPrompts,
      playerSystemPrompts
    );
    
    // Generate final narration
    const finalNarration = await this.generateFinalNarration(
      config,
      gameState,
      conversationLog,
      systemPrompts.gmSystemPrompt
    );
    
    // Add final narration to conversation log
    conversationLog.push({
      role: 'GM',
      content: finalNarration,
      timestamp: new Date().toISOString(),
      metadata: {
        phase: "conclusion",
        gameState: {...gameState}
      }
    });
    
    // Generate critic feedback if enabled
    let criticFeedback = "";
    if (config.enableCritic) {
      criticFeedback = await this.generateCriticFeedback(
        conversationLog,
        systemPrompts.criticPrompt
      );
    }
    
    // Create the result
    const result: SimulationResult = {
      id: simulationId,
      timestamp: new Date().toISOString(),
      scenario: config.scenarioPrompt || "Standard Flomanji Scenario",
      rounds: config.rounds || 5,
      playerCount: config.players || 3,
      log: conversationLog,
      criticFeedback,
      annotations: "",
      config: {
        scenario: config.scenarioPrompt || "Standard Flomanji Scenario",
        rounds: config.rounds || 5,
        playerCount: config.players || 3,
        characters: gameState.selectedCharacters,
        enableCritic: config.enableCritic || false,
        outputMode: config.outputMode || "standard",
        startingHeat: gameState.heat || 0,
        heatPerRound: config.heatPerRound || 0,
        extractionRegion: config.extractionRegion || "exit",
        objectives: gameState.objectives || [],
        missionType: config.missionType || "exploration",
        secretTraitor: config.secretTraitor || false,
        arcadeModule: config.arcadeModule || false,
        nightmareDifficulty: config.nightmareDifficulty || false,
        competitiveMode: config.competitiveMode || false,
        gobletVoice: gameState.gobletVoice || "swamp-prophet"
      },
      gameState: {
        currentRound: gameState.currentRound || 0,
        heat: gameState.heat || 0,
        completedObjectives: gameState.completedObjectives || [],
        playerInventories: gameState.playerInventories || {},
        regions: gameState.regions?.map((r: any) => r.name) || [],
        currentRegion: gameState.currentRegion || "start",
        activeHazards: gameState.activeHazards || [],
        activeChaosEffects: gameState.activeChaosEffects || [],
        discoveredTreasures: gameState.discoveredTreasures || [],
        rolls: gameState.rolls || [],
        currentGobletHolder: gameState.currentGobletHolder || 0,
        gobletVoice: gameState.gobletVoice || "swamp-prophet",
        gobletMood: gameState.gobletMood || "neutral"
      },
      characters: gameState.selectedCharacters || [],
      missionOutcome: gameState.missionOutcome,
      keyEvents: this.extractKeyEvents(gameState, conversationLog)
    };
    
    return result;
  }
  
  /**
   * Setup the game state based on configuration
   */
  private async setupGameState(config: SimulationConfig): Promise<any> {
    // Set up game state
    const gameState: any = {
      currentRound: 0,
      heat: config.startingHeat || 0,
      activeHazards: [],
      activeChaosEffects: [],
      discoveredTreasures: [],
      completedObjectives: [],
      rolls: [],
      currentGobletHolder: Math.floor(Math.random() * (config.players || 3)),
      gobletVoice: config.gobletVoice || 'swamp-prophet',
      gobletMood: 'neutral',
      gameOver: false
    };
    
    // Initialize player inventories
    gameState.playerInventories = {};
    for (let i = 0; i < (config.players || 3); i++) {
      gameState.playerInventories[i] = {
        gear: [],
        treasures: [],
        health: 10,
        weirdness: 0,
        luck: 5
      };
    }
    
    // Select mission if not specified
    if (!config.missionId && config.missionType) {
      const availableMissions = MISSION_CARDS.filter(
        mission => mission.type === config.missionType
      );
      
      if (availableMissions.length > 0) {
        const selectedMission = drawRandomCard(availableMissions);
        if (selectedMission) {
          config.missionId = selectedMission.id;
          gameState.missionName = selectedMission.name;
          gameState.missionType = selectedMission.type;
          gameState.objectives = selectedMission.objectives.map((obj: any) => ({
            ...obj,
            completed: false
          }));
        }
      }
    }
    
    // If no mission was selected, set default objectives
    if (!gameState.objectives) {
      gameState.objectives = [
        {
          id: "obj1",
          description: "Explore the central region",
          required: true,
          completed: false
        },
        {
          id: "obj2",
          description: "Find a valuable treasure",
          required: true,
          completed: false
        },
        {
          id: "obj3",
          description: "Defeat the mysterious enemy",
          required: false,
          completed: false
        }
      ];
    }
    
    // Select characters if not specified
    if ((!config.characters || config.characters.length === 0) && 
        (!config.fullCharacters || config.fullCharacters.length === 0)) {
      // Randomly select characters based on player count
      const selectedCharacters = [];
      const availableCharacters = [...PLAYER_CHARACTER_CARDS];
      
      for (let i = 0; i < (config.players || 3); i++) {
        if (availableCharacters.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        selectedCharacters.push(availableCharacters[randomIndex]);
        availableCharacters.splice(randomIndex, 1);
      }
      
      gameState.selectedCharacters = selectedCharacters;
    } else if (config.fullCharacters && config.fullCharacters.length > 0) {
      gameState.selectedCharacters = config.fullCharacters;
    } else if (config.characters && config.characters.length > 0) {
      gameState.selectedCharacters = config.characters.map(id => {
        return PLAYER_CHARACTER_CARDS.find(card => card.id === id) || {
          id,
          name: `Character ${id}`,
          health: 10,
          weirdness: 0,
          luck: 5
        };
      });
    }
    
    // Set up regions based on mission type
    await this.gameSetupManager.setupRegions(gameState, config);
    
    return gameState;
  }
  
  /**
   * Create the system prompt for the GM
   */
  private createGMSystemPrompt(rulesContent: string, config: SimulationConfig): string {
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
  private createCriticPrompt(rulesContent: string): string {
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
  
  /**
   * Generate the intro narration
   */
  private async generateIntroNarration(
    config: SimulationConfig,
    gameState: any,
    systemPrompt: string
  ): Promise<string> {
    const introPrompt = `
      The game is starting. Introduce the game and set the scene.
      
      Include the following information:
      - The name of the game (Flomanji)
      - The setting (a humid, dangerous jungle)
      - The current mission
      - The characters
      - The objectives
      - The Flomanji Goblet and its current voice
      
      Speak in the voice of the Flomanji Goblet.
    `;
    
    const gmIntroMessage = await createChatCompletion(
      systemPrompt,
      [{ role: "user", content: introPrompt }]
    );
    
    return gmIntroMessage;
  }
  
  /**
   * Generate the final narration
   */
  private async generateFinalNarration(
    config: SimulationConfig,
    gameState: any,
    conversationLog: AgentMessage[],
    systemPrompt: string
  ): Promise<string> {
    const finalPrompt = `
      The game is over. Provide a final narration that summarizes the events of the game.
      
      Include the following information:
      - The outcome of the mission
      - The fate of the characters
      - Any key events that occurred during the game
      - The final heat level
      
      Speak in the voice of the Flomanji Goblet.
    `;
    
    const gmFinalMessage = await createChatCompletion(
      systemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: finalPrompt }]
    );
    
    return gmFinalMessage;
  }
  
  /**
   * Generate critic feedback
   */
  private async generateCriticFeedback(
    conversationLog: AgentMessage[],
    systemPrompt: string
  ): Promise<string> {
    const feedbackPrompt = `
      Provide feedback on the GM's performance.
      
      Include the following information:
      - Any errors in the GM's narration or game state management
      - Suggestions for improvements to the GM's performance
      - Key events and decision points in the game
      - Suggestions for improvements to the game rules
      
      Be specific and provide examples from the game log to support your claims.
    `;
    
    const criticMessage = await createChatCompletion(
      systemPrompt,
      [...conversationLog.map(entry => {
        const cleanContent = entry.content.replace(/^(GM|Player \d+): /g, '');
        return {
          role: entry.role === 'GM' ? 'assistant' : 'user',
          content: entry.role === 'GM'
            ? `GM: ${cleanContent}`
            : `Player ${entry.playerIndex !== undefined ? entry.playerIndex + 1 : ''}: ${cleanContent}`
        };
      }), { role: "user", content: feedbackPrompt }]
    );
    
    return criticMessage;
  }
  
  /**
   * Extract key events from the simulation to highlight important moments
   */
  private extractKeyEvents(gameState: any, log: AgentMessage[]): string[] {
    const keyEvents: string[] = [];
    
    // Extract objective completions
    const objectiveEvents = log.filter(entry => 
      entry.metadata?.phase === "objective-completed" || 
      entry.content.includes("objective") && entry.content.includes("complet")
    );
    
    objectiveEvents.forEach(event => {
      keyEvents.push(`Objective Completed: ${event.content.replace(/^\[.*?\]\s*/, '')}`);
    });
    
    // Extract treasure discoveries
    const treasureEvents = log.filter(entry => 
      entry.metadata?.phase === "treasure-discovery"
    );
    
    treasureEvents.forEach(event => {
      keyEvents.push(`Treasure Found: ${event.metadata?.treasureCard}`);
    });
    
    // Extract chaos card events
    const chaosEvents = log.filter(entry =>
      entry.metadata?.phase === "chaos-card"
    );
    
    chaosEvents.forEach(event => {
      keyEvents.push(`Chaos Effect: ${event.metadata?.chaosCard}`);
    });
    
    // Extract major hazard events
    const hazardEvents = log.filter(entry =>
      entry.metadata?.phase === "hazard-introduction"
    );
    
    hazardEvents.forEach(event => {
      keyEvents.push(`Hazard Encountered: ${event.metadata?.hazard}`);
    });
    
    // Add game outcome
    if (gameState.missionOutcome) {
      keyEvents.push(`Mission ${gameState.missionOutcome === 'success' ? 'Success' : 'Failure'}: ${gameState.gameOverReason || 'Mission completed'}`);
    }
    
    return keyEvents;
  }
}
