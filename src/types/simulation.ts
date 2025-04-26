
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
    rolls: {player: number, type: string, value: number, stat: string, result: string}[];
    currentGobletHolder: number;
    gobletVoice: 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';
    gobletMood: string;
  };
  characters?: FlomanjiCharacter[];
  missionOutcome?: string;
  keyEvents?: string[];
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
