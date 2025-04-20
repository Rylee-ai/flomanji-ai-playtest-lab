
import { FlomanjiCharacter, CharacterPerformanceMetrics } from "@/types";
import { MissionSheet, MissionRunData } from "@/types/cards/mission";
import { HazardCard } from "@/types/cards/hazard";
import { RegionCard } from "@/types/cards/region";
import { TreasureCard } from "@/types/cards/treasure";
import { GearCard } from "@/types/cards/gear";

/**
 * Represents the current state of a game simulation
 */
export interface GameState {
  missionId: string;
  currentRound: number;
  maxRounds: number;
  heatLevel: number;
  regions: {
    id: string;
    explored: boolean;
    characters: string[];
  }[];
  characters: {
    id: string;
    health: number;
    weirdness: number;
    luck: number;
    position: string; // Region ID
    gear: string[]; // Gear IDs
    treasures: string[]; // Treasure IDs
    status: 'active' | 'disabled' | 'transformed' | 'dead';
  }[];
  objectivesCompleted: string[];
  pendingHazards: string[]; // Hazard IDs
  gameStatus: 'in-progress' | 'success' | 'failure';
  eventLog: {
    round: number;
    event: string;
    impact: string;
  }[];
}

/**
 * Interface for game action handlers
 */
export interface GameAction {
  type: string;
  payload: any;
}

/**
 * Creates a new game state for a mission
 */
export const createInitialGameState = (
  mission: MissionSheet,
  characters: FlomanjiCharacter[],
  regions: RegionCard[]
): GameState => {
  // Start with an initial state
  const initialState: GameState = {
    missionId: mission.id,
    currentRound: 1,
    maxRounds: mission.estimatedDuration || 8,
    heatLevel: mission.startingHeat,
    regions: regions.map(region => ({
      id: region.id,
      explored: false,
      characters: []
    })),
    characters: characters.map(character => ({
      id: character.id,
      health: character.health,
      weirdness: character.weirdness,
      luck: character.luck,
      position: regions[0].id, // All start at first region
      gear: character.starterGear.map(g => g.name),
      treasures: [],
      status: 'active'
    })),
    objectivesCompleted: [],
    pendingHazards: [],
    gameStatus: 'in-progress',
    eventLog: [
      {
        round: 0,
        event: "Mission Start",
        impact: `Mission ${mission.name} begins with Heat ${mission.startingHeat}`
      }
    ]
  };

  // Place all characters in starting region
  initialState.regions[0].characters = characters.map(c => c.id);

  return initialState;
};

/**
 * Processes a game action and returns the new state
 */
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MOVE_CHARACTER':
      return handleMoveCharacter(state, action.payload);
    case 'COMPLETE_OBJECTIVE':
      return handleCompleteObjective(state, action.payload);
    case 'RESOLVE_HAZARD':
      return handleResolveHazard(state, action.payload);
    case 'CHARACTER_TAKES_DAMAGE':
      return handleCharacterDamage(state, action.payload);
    case 'INCREASE_HEAT':
      return handleHeatIncrease(state, action.payload);
    case 'INCREASE_WEIRDNESS':
      return handleWeirdnessIncrease(state, action.payload);
    case 'GAIN_TREASURE':
      return handleGainTreasure(state, action.payload);
    case 'USE_GEAR':
      return handleUseGear(state, action.payload);
    case 'ADVANCE_ROUND':
      return handleAdvanceRound(state);
    case 'END_GAME':
      return {
        ...state,
        gameStatus: action.payload.success ? 'success' : 'failure',
        eventLog: [
          ...state.eventLog,
          {
            round: state.currentRound,
            event: "Mission End",
            impact: action.payload.success 
              ? "Mission completed successfully" 
              : `Mission failed: ${action.payload.reason}`
          }
        ]
      };
    default:
      return state;
  }
};

// Handler functions for each action type
const handleMoveCharacter = (state: GameState, payload: { characterId: string, regionId: string }): GameState => {
  const { characterId, regionId } = payload;
  
  // Find the character's current region
  const currentRegionIndex = state.regions.findIndex(r => 
    r.characters.includes(characterId)
  );
  
  // Find the target region
  const targetRegionIndex = state.regions.findIndex(r => r.id === regionId);
  
  if (currentRegionIndex === -1 || targetRegionIndex === -1) {
    return state;
  }
  
  // Remove character from current region
  const currentRegion = { ...state.regions[currentRegionIndex] };
  currentRegion.characters = currentRegion.characters.filter(id => id !== characterId);
  
  // Add character to target region
  const targetRegion = { ...state.regions[targetRegionIndex] };
  targetRegion.characters = [...targetRegion.characters, characterId];
  targetRegion.explored = true;
  
  // Update character position
  const characterIndex = state.characters.findIndex(c => c.id === characterId);
  const updatedCharacter = {
    ...state.characters[characterIndex],
    position: regionId
  };
  
  // Create new state
  const updatedRegions = [...state.regions];
  updatedRegions[currentRegionIndex] = currentRegion;
  updatedRegions[targetRegionIndex] = targetRegion;
  
  const updatedCharacters = [...state.characters];
  updatedCharacters[characterIndex] = updatedCharacter;
  
  return {
    ...state,
    regions: updatedRegions,
    characters: updatedCharacters,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Character Movement",
        impact: `${characterId} moved to ${regionId}`
      }
    ]
  };
};

const handleCompleteObjective = (state: GameState, payload: { objectiveId: string }): GameState => {
  const { objectiveId } = payload;
  
  // Check if the objective is already completed
  if (state.objectivesCompleted.includes(objectiveId)) {
    return state;
  }
  
  return {
    ...state,
    objectivesCompleted: [...state.objectivesCompleted, objectiveId],
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Objective Completed",
        impact: `Completed objective: ${objectiveId}`
      }
    ]
  };
};

const handleResolveHazard = (state: GameState, payload: { 
  hazardId: string, 
  resolvedBy: string,
  approach: string,
  success: boolean,
  consequence?: string
}): GameState => {
  const { hazardId, resolvedBy, approach, success, consequence } = payload;
  
  // Remove the hazard from pending hazards
  const updatedHazards = state.pendingHazards.filter(id => id !== hazardId);
  
  return {
    ...state,
    pendingHazards: updatedHazards,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Hazard Encounter",
        impact: `${resolvedBy} ${success ? 'successfully' : 'failed to'} resolve hazard ${hazardId} using ${approach}${consequence ? `. Consequence: ${consequence}` : ''}`
      }
    ]
  };
};

const handleCharacterDamage = (state: GameState, payload: {
  characterId: string,
  amount: number,
  source: string
}): GameState => {
  const { characterId, amount, source } = payload;
  
  // Find character
  const characterIndex = state.characters.findIndex(c => c.id === characterId);
  if (characterIndex === -1) return state;
  
  const character = state.characters[characterIndex];
  const newHealth = Math.max(0, character.health - amount);
  
  // Check if character died
  const newStatus = newHealth <= 0 ? 'dead' : character.status;
  
  const updatedCharacter = {
    ...character,
    health: newHealth,
    status: newStatus
  };
  
  const updatedCharacters = [...state.characters];
  updatedCharacters[characterIndex] = updatedCharacter;
  
  return {
    ...state,
    characters: updatedCharacters,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Character Damage",
        impact: `${characterId} took ${amount} damage from ${source}${newStatus === 'dead' ? ' and died' : ''}`
      }
    ]
  };
};

const handleHeatIncrease = (state: GameState, payload: {
  amount: number,
  source: string
}): GameState => {
  const { amount, source } = payload;
  
  const newHeat = Math.min(10, state.heatLevel + amount);
  const heatReachedMax = state.heatLevel < 10 && newHeat >= 10;
  
  const updatedState = {
    ...state,
    heatLevel: newHeat,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Heat Increase",
        impact: `Heat increased by ${amount} from ${source} to ${newHeat}`
      }
    ]
  };
  
  // If heat reached max, end the game
  if (heatReachedMax) {
    return {
      ...updatedState,
      gameStatus: 'failure',
      eventLog: [
        ...updatedState.eventLog,
        {
          round: state.currentRound,
          event: "Mission Failure",
          impact: "Heat reached maximum level (10)"
        }
      ]
    };
  }
  
  return updatedState;
};

const handleWeirdnessIncrease = (state: GameState, payload: {
  characterId: string,
  amount: number,
  source: string
}): GameState => {
  const { characterId, amount, source } = payload;
  
  // Find character
  const characterIndex = state.characters.findIndex(c => c.id === characterId);
  if (characterIndex === -1) return state;
  
  const character = state.characters[characterIndex];
  const newWeirdness = Math.min(10, character.weirdness + amount);
  
  // Check if character transformed
  const wasTransformed = character.weirdness < 10 && newWeirdness >= 10;
  const newStatus = wasTransformed ? 'transformed' : character.status;
  
  const updatedCharacter = {
    ...character,
    weirdness: newWeirdness,
    status: newStatus
  };
  
  const updatedCharacters = [...state.characters];
  updatedCharacters[characterIndex] = updatedCharacter;
  
  return {
    ...state,
    characters: updatedCharacters,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Weirdness Increase",
        impact: `${characterId}'s weirdness increased by ${amount} from ${source} to ${newWeirdness}${wasTransformed ? '. Character has been transformed!' : ''}`
      }
    ]
  };
};

const handleGainTreasure = (state: GameState, payload: {
  characterId: string,
  treasureId: string
}): GameState => {
  const { characterId, treasureId } = payload;
  
  // Find character
  const characterIndex = state.characters.findIndex(c => c.id === characterId);
  if (characterIndex === -1) return state;
  
  const character = state.characters[characterIndex];
  
  const updatedCharacter = {
    ...character,
    treasures: [...character.treasures, treasureId]
  };
  
  const updatedCharacters = [...state.characters];
  updatedCharacters[characterIndex] = updatedCharacter;
  
  return {
    ...state,
    characters: updatedCharacters,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Treasure Found",
        impact: `${characterId} found treasure: ${treasureId}`
      }
    ]
  };
};

const handleUseGear = (state: GameState, payload: {
  characterId: string,
  gearId: string,
  effect: string
}): GameState => {
  const { characterId, gearId, effect } = payload;
  
  return {
    ...state,
    eventLog: [
      ...state.eventLog,
      {
        round: state.currentRound,
        event: "Gear Used",
        impact: `${characterId} used ${gearId}. Effect: ${effect}`
      }
    ]
  };
};

const handleAdvanceRound = (state: GameState): GameState => {
  const newRound = state.currentRound + 1;
  
  // Check if max rounds have been reached
  const reachedMaxRounds = newRound > state.maxRounds;
  
  let updatedState = {
    ...state,
    currentRound: newRound,
    eventLog: [
      ...state.eventLog,
      {
        round: newRound,
        event: "Round Start",
        impact: `Starting round ${newRound}`
      }
    ]
  };
  
  // If round limit reached, end the game
  if (reachedMaxRounds) {
    updatedState = {
      ...updatedState,
      gameStatus: 'failure',
      eventLog: [
        ...updatedState.eventLog,
        {
          round: newRound,
          event: "Mission Failure",
          impact: "Maximum rounds reached"
        }
      ]
    };
  }
  
  // If heat is 9+, apply weirdness to all characters
  if (state.heatLevel >= 9) {
    const updatedCharacters = state.characters.map(character => {
      if (character.status !== 'active') return character;
      
      const newWeirdness = Math.min(10, character.weirdness + 1);
      const wasTransformed = character.weirdness < 10 && newWeirdness >= 10;
      
      return {
        ...character,
        weirdness: newWeirdness,
        status: wasTransformed ? 'transformed' : character.status
      };
    });
    
    updatedState = {
      ...updatedState,
      characters: updatedCharacters,
      eventLog: [
        ...updatedState.eventLog,
        {
          round: newRound,
          event: "Critical Heat Effect",
          impact: "All active characters gained 1 Weirdness due to Heat level 9+"
        }
      ]
    };
  }
  
  return updatedState;
};

/**
 * Converts a game state into mission run data for analytics
 */
export const generateMissionRunData = (
  gameState: GameState,
  startTime: string
): MissionRunData => {
  return {
    id: `run-${Date.now()}`,
    timestamp: new Date().toISOString(),
    missionId: gameState.missionId,
    completed: gameState.gameStatus === 'success',
    objectivesCompleted: gameState.objectivesCompleted,
    rounds: gameState.currentRound,
    characters: gameState.characters.map(c => c.id),
    finalHeatLevel: gameState.heatLevel,
    keyEvents: gameState.eventLog.map(event => ({
      round: event.round,
      event: event.event,
      impact: event.impact
    }))
  };
};

/**
 * Generates performance metrics for characters in a simulation
 */
export const generateCharacterMetrics = (
  gameState: GameState,
  characters: FlomanjiCharacter[]
): CharacterPerformanceMetrics[] => {
  return gameState.characters.map(charState => {
    const character = characters.find(c => c.id === charState.id);
    if (!character) return null;
    
    // Count actions from eventLog
    const actionsUsed = gameState.eventLog.filter(
      event => event.impact.startsWith(charState.id)
    ).length;
    
    // Count hazard resolution attempts
    const hazardEvents = gameState.eventLog.filter(
      event => event.event === "Hazard Encounter" && event.impact.startsWith(charState.id)
    );
    
    // Build basic metrics
    const metrics: CharacterPerformanceMetrics = {
      characterId: charState.id,
      characterName: character.name,
      actionsUsed,
      statChecks: {
        brawn: { attempts: 0, successes: 0 },
        moxie: { attempts: 0, successes: 0 },
        charm: { attempts: 0, successes: 0 },
        grit: { attempts: 0, successes: 0 },
        weirdSense: { attempts: 0, successes: 0 }
      },
      damageTaken: character.health - charState.health,
      damageCaused: 0, // Would need more data to accurately track
      heatIncreases: 0, // Would need more data to accurately track
      abilityUses: 0, // Would need to track this in events
      regionsExplored: state.regions.filter(
        r => r.explored && r.characters.includes(charState.id)
      ).length,
      gearUsed: [],
      finalHealth: charState.health,
      finalWeirdness: charState.weirdness,
      finalLuck: charState.luck
    };
    
    // Process gear usage
    const gearEvents = gameState.eventLog.filter(
      event => event.event === "Gear Used" && event.impact.startsWith(charState.id)
    );
    
    metrics.gearUsed = gearEvents.map(event => {
      const match = event.impact.match(/used (.+?)\./);
      return match ? match[1] : "";
    }).filter(Boolean);
    
    return metrics;
  }).filter(Boolean) as CharacterPerformanceMetrics[];
};
