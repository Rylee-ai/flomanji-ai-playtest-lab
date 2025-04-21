import { Card } from "@/types";
import { FlomanjiCharacter, SimulationConfig } from "@/types";
import { PLAYER_CHARACTER_CARDS } from "../cards/player-character-cards";

// Define the initial game state
export const initializeGameState = (config: SimulationConfig, rules: string) => {
  const initialHeat = config.startingHeat || 2;
  const initialWeirdness = 0;
  const initialLuck = 5;
  const initialRound = 1;
  const initialPhase = 1;

  // Initialize characters based on config, or default to 2 characters
  const characters = config.characters ? config.characters : PLAYER_CHARACTER_CARDS.slice(0, config.players || 2);

  return {
    mission: {
      id: 'mission-001',
      name: 'Test Mission',
      type: 'mission',
      description: 'A simple test mission',
      objectives: ['Survive'],
      reward: 'Victory',
      startingHeat: initialHeat,
      rules: ['Survive'],
      flavor: 'A test mission',
      imagePrompt: 'A test mission',
      icons: [],
      keywords: []
    },
    rules: rules,
    round: initialRound,
    phase: initialPhase,
    heat: initialHeat,
    weirdness: initialWeirdness,
    luck: initialLuck,
    phaseLog: [],
    log: [],
    availableCards: {
      hazard: [],
      treasure: [],
      event: [],
      gear: [],
      npc: [],
      region: [],
      chaos: []
    },
    activeCards: {
      hazard: [],
      treasure: [],
      event: [],
      gear: [],
      npc: [],
      region: [],
      chaos: []
    },
    characters: characters.map(character => ({
      id: character.id,
      health: character.health,
      weirdness: character.weirdness,
      luck: character.luck,
      position: 'start',
      gear: character.starterGear.map(g => g.name),
      treasures: [],
      status: "active"
    }))
  };
};

// Function to simulate a round of the game
export const simulateRound = (gameState: any) => {
  // Increase heat
  gameState.heat = Math.min(gameState.heat + 1, 8);

  // Simulate each character's turn
  gameState.characters.forEach((character: any) => {
    // Each character explores a new region
    character.position = 'new region';

    // Each character attempts a stat check
    const statCheck = Math.floor(Math.random() * 6) + 1 + character.luck;
    if (statCheck >= 4) {
      gameState.log.push(`${character.name} succeeded on a stat check.`);
    } else {
      gameState.log.push(`${character.name} failed on a stat check.`);
    }

    // Each character encounters a hazard
    const hazard = { name: 'Test Hazard', type: 'hazard', description: 'A test hazard', effects: 'None' };
    gameState.activeCards.hazard.push(hazard);
    gameState.log.push(`${character.name} encountered ${hazard.name}.`);
  });

  // Simulate a game event
  const gameEvent = { name: 'Test Event', type: 'event', description: 'A test event', effects: 'None' };
  gameState.activeCards.event.push(gameEvent);
  gameState.log.push(`A game event occurred: ${gameEvent.name}.`);

  // Check for end-game conditions
  if (gameState.heat >= 8) {
    gameState.log.push('The heat is too high! The game is getting intense!');
  }

  // Increment round counter
  gameState.round++;

  return gameState;
};

// Function to generate a log message
export const generateLogMessage = (role: string, message: string) => {
  return {
    role: role,
    message: message,
    timestamp: new Date().toISOString()
  };
};

// Function to simulate a character action
export const simulateCharacterAction = (character: FlomanjiCharacter, action: string, gameState: any) => {
  let message = '';

  switch (action) {
    case 'move':
      // Simulate character moving to a new region
      const newRegion = 'new region';
      character.position = newRegion;
      message = `${character.name} moved to ${newRegion}.`;
      break;
    case 'attack':
      // Simulate character attacking a hazard
      const hazard = gameState.activeCards.hazard[0];
      message = `${character.name} attacked ${hazard.name}.`;
      break;
    case 'useAbility':
      // Simulate character using their ability
      message = `${character.name} used their ability.`;
      break;
    default:
      message = `${character.name} did nothing.`;
  }

  gameState.log.push(message);
  return gameState;
};

// Function to simulate a stat check
export const simulateStatCheck = (character: FlomanjiCharacter, stat: string, difficultyClass: number) => {
  const statValue = character.stats[stat as keyof typeof character.stats];
  const roll = Math.floor(Math.random() * 6) + 1 + statValue;
  const success = roll >= difficultyClass;

  return {
    success: success,
    roll: roll,
    required: difficultyClass
  };
};

// Function to apply the effects of a card
export const applyCardEffects = (card: Card, gameState: any) => {
  gameState.log.push(`Applying effects of ${card.name}.`);

  // Example: If the card increases heat, increase the heat
  if (card.effects.includes('increase heat')) {
    gameState.heat = Math.min(gameState.heat + 1, 8);
    gameState.log.push('The heat increased!');
  }

  return gameState;
};

// Function to determine the mission outcome
export const determineMissionOutcome = (gameState: any) => {
  if (gameState.heat >= 8) {
    return 'failure';
  } else if (gameState.round >= 10) {
    return 'partial';
  } else {
    return 'success';
  }
};
