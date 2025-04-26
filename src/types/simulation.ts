import { FlomanjiCharacter } from "./character";
import { MissionSheet } from "./cards/mission";
import { AgentRole } from "./agent";

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

export interface AgentMessage {
  role: AgentRole;
  content: string;
  timestamp: string;
  playerIndex?: number;
  metadata?: {
    roundNumber?: number;
    phase?: string;
    playerNumber?: number;
    playerName?: string;
    roll?: {
      stat: string;
      value: number;
      modifier: number;
      total: number;
      result: string;
    };
    heat?: number;
    hazard?: string;
    activeHazards?: string[];
    completedObjectives?: string[];
    inventory?: any;
    gameState?: any;
    reason?: string;
    outcome?: string;
    gobletVoice?: string;
    gobletMood?: string;
    isGobletHolder?: boolean;
  };
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
