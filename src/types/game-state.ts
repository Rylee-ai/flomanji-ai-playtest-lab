
import { FlomanjiCharacter, CharacterStats } from "@/types";

/**
 * Represents the status of a character in the game
 */
export type CharacterStatus = "disabled" | "active" | "transformed" | "dead";

/**
 * Represents a character's state during the game
 */
export interface CharacterState {
  id: string;
  name: string;
  health: number;
  weirdness: number;
  luck: number;
  position: string;
  gear: any[]; // Gear items the character has
  treasures: any[]; // Treasures the character has found
  status: CharacterStatus;
}

/**
 * Types of actions a player can take during their turn
 */
export type ActionType = "move" | "use-gear" | "interact" | "team-up" | "rest" | "mission";

/**
 * Represents an action a player can take
 */
export interface PlayerAction {
  characterId: string;
  type: ActionType;
  targetId?: string; // ID of the target (region, character, item, etc.)
  parameters?: Record<string, any>; // Additional parameters for the action
}

/**
 * Represents a used action in the turn
 */
export interface UsedAction {
  characterId: string;
  actionType: ActionType;
  timestamp: string;
}

/**
 * Types of game events that can occur
 */
export type EventType = 
  "character-move" | 
  "character-use-gear" | 
  "character-interact" | 
  "character-team-up" | 
  "character-rest" | 
  "character-mission" | 
  "heat-increase" | 
  "heat-decrease" | 
  "weirdness-increase" | 
  "weirdness-decrease" | 
  "hazard-encountered" |
  "hazard-resolved" |
  "treasure-found" |
  "objective-completed" |
  "character-status-change";

/**
 * Represents a game event
 */
export interface GameEvent {
  type: EventType;
  description: string;
  timestamp: string;
  characterId?: string;
  regionId?: string;
  hazardId?: string;
  objectiveId?: string;
  details?: Record<string, any>;
}

/**
 * Represents a turn in the game
 */
export interface GameTurn {
  turnNumber: number;
  actionsUsed: UsedAction[];
  events: GameEvent[];
  completed: boolean;
  timestamp: string;
}

/**
 * Represents a mission objective
 */
export interface Objective {
  id: string;
  description: string;
  required: boolean;
  completed?: boolean;
  regionId?: string; // Region where the objective must be completed (if applicable)
  requiredItems?: string[]; // Items required to complete the objective (if applicable)
  reward?: string; // Reward for completing the objective
  difficultyLevel?: number; // Difficulty level of the objective
  completionCheck?: string; // Logic for checking completion
}

/**
 * Represents the result of validating an action
 */
export interface ActionValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Represents the possible outcomes of a mission
 */
export type MissionOutcome = "success" | "partial" | "failure";

/**
 * Represents the complete state of a Flomanji game
 */
export interface GameState {
  id: string;
  timestamp: string;
  missionId: string;
  missionType: string;
  characters: CharacterState[];
  regions: any[]; // Regions on the map
  currentTurn: GameTurn;
  turns: GameTurn[];
  heat: number;
  heatIncreasePerTurn: number;
  maxRounds: number;
  extractionRegion: string;
  objectives: Objective[];
  completedObjectives: string[];
  gameOver: boolean;
  missionOutcome?: MissionOutcome;
  gameOverReason?: string;
}

/**
 * Initialize a new character state from a character template
 */
export const initializeCharacterState = (character: FlomanjiCharacter): CharacterState => {
  return {
    id: character.id,
    name: character.name,
    health: character.health,
    weirdness: character.weirdness,
    luck: character.luck,
    position: character.position || "start",
    gear: [...(character.starterGear || [])],
    treasures: [],
    status: "active" as CharacterStatus
  };
};

/**
 * Initialize a new game state for a mission
 */
export const initializeGameState = (
  missionId: string,
  missionType: string,
  characters: FlomanjiCharacter[],
  startingHeat: number,
  objectives: Objective[],
  maxRounds: number,
  extractionRegion: string
): GameState => {
  const gameId = `game-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  return {
    id: gameId,
    timestamp: new Date().toISOString(),
    missionId,
    missionType,
    characters: characters.map(initializeCharacterState),
    regions: [], // To be populated with region data
    currentTurn: {
      turnNumber: 1,
      actionsUsed: [],
      events: [],
      completed: false,
      timestamp: new Date().toISOString()
    },
    turns: [],
    heat: startingHeat,
    heatIncreasePerTurn: 0,
    maxRounds,
    extractionRegion,
    objectives,
    completedObjectives: [],
    gameOver: false
  };
};
