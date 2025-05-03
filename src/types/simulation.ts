import { FlomanjiCharacter } from "./character";
import { MissionSheet } from "./cards/mission";
import { AgentRole, AgentMessage } from "./agent";

export interface SimulationConfig {
  scenarioPrompt?: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: string;
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  startingHeat?: number;
  heatPerRound?: number;
  missionId?: string;
  objectives?: any[];
  extractionRegion?: string;
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
  gobletVoice?: 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';
  missionType?: string;
  regions?: string[]; // Added this property to fix GameStateManager.ts errors
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  playerCount: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
  config?: {
    scenario: string;
    rounds: number;
    playerCount: number;
    characters: FlomanjiCharacter[];
    enableCritic: boolean;
    outputMode: string;
    startingHeat: number;
    heatPerRound: number;
    extractionRegion: string;
    objectives: any[];
    missionType?: string;
    secretTraitor?: boolean;
    arcadeModule?: boolean;
    nightmareDifficulty?: boolean;
    competitiveMode?: boolean;
    gobletVoice?: string;
  };
  gameState?: {
    currentRound: number;
    heat: number;
    completedObjectives: string[];
    playerInventories: Record<number, {
      gear: string[];
      treasures: string[];
      health: number;
      weirdness: number;
      luck: number;
    }>;
    regions: string[];
    currentRegion: string;
    activeHazards: string[];
    discoveredTreasures: string[]; // Added this explicitly
    rolls: {player: number, type: string, value: number, stat: string, result: string}[];
    currentGobletHolder: number;
    gobletVoice: 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';
    gobletMood: string;
  };
  characters?: FlomanjiCharacter[];
  missionOutcome?: string;
  keyEvents?: string[];
  trainingData?: SimulationTrainingData; // For ML training data
}

// Interface specifically for ML training data
export interface SimulationTrainingData {
  // Core metadata for organization
  simulationId: string;
  timestamp: string;
  missionType: string;
  
  // Training examples derived from the simulation
  examples: TrainingExample[];
  
  // Aggregated statistics for training
  statistics: {
    successRate: number;
    averageRounds: number;
    completedObjectives: string[];
    heatProgression: number[];
    keyDecisionPoints: KeyDecisionPoint[];
  };
}

// Each example represents a potential training pair
export interface TrainingExample {
  id: string;
  type: 'gm-response' | 'player-action' | 'hazard-encounter' | 'objective-completion' | 'game-logic-improvement';
  
  // Input context (what would be fed to the model)
  context: {
    previousMessages: AgentMessage[];
    gameState: any;
    currentRound: number;
    characters: FlomanjiCharacter[];
    heat: number;
  };
  
  // Expected output (what we'd want the model to generate)
  expectedOutput: {
    content: string;
    metadata?: any;
    reasoning?: string; // Optional explanation of why this is the correct response
  };
  
  // For reinforcement learning approaches
  feedbackSignals?: {
    consistency: number; // 0-1, how consistent with rules/lore
    engagement: number; // 0-1, how engaging the response is
    advancement: number; // 0-1, how much it advances the game state
  };
  
  // New field for historical context and rule evolution
  historicalContext?: {
    previousVersions: Array<{
      version: string,
      implementation: string,
      criticFeedback: string
    }>,
    ruleDescription: string,
    changeReasoning: string
  };
}

// Capture important decision points for focused training
export interface KeyDecisionPoint {
  round: number;
  description: string;
  decision: string;
  outcome: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  result?: string;
  notes?: string;
}

export interface StoredSimulation {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
}

// Re-export AgentMessage from agent.ts to ensure it's available
export type { AgentMessage, AgentRole };
