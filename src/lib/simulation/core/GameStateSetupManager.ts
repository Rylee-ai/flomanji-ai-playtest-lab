
import { SimulationConfig } from "@/types";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { drawRandomCard } from "../game-mechanics";

/**
 * Manages game state setup and initialization
 */
export class GameStateSetupManager {
  private gameSetupManager: any;
  
  constructor(gameSetupManager: any) {
    this.gameSetupManager = gameSetupManager;
  }
  
  /**
   * Setup the game state based on configuration
   */
  public async setupGameState(config: SimulationConfig): Promise<any> {
    // Set up game state
    const gameState = {
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
}
