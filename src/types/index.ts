import { MissionSheet } from "./cards/mission";

export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: "full" | "summary";
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  missionId?: string;
  extractionRegion?: string;
  startingHeat?: number;
  heatPerRound?: number;
  objectives?: any[];
  missionType?: string;
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
}

export interface AgentMessage {
  role: "GM" | "Player" | "Critic";
  content: string;
  timestamp: string;
  playerIndex?: number; // For Player role only
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
    outcome?: string; // Added the missing outcome property
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
  };
  characters?: FlomanjiCharacter[];
  missionOutcome?: string; // Added missing property
  keyEvents?: string[]; // Added missing property
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

export interface Settings {
  openAiApiKey?: string;
  openRouterApiKey?: string;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  health: number;
  weirdness: number;
  luck: number;
  starterGear?: string[];
  position?: string;
}

export interface CharacterStats {
  brawn: number;
  moxie: number;
  charm: number;
  grit: number;
  weirdSense: number;
}

export interface CharacterAbility {
  name: string;
  description: string;
}

export type AgentRole = "GM" | "Player" | "Critic";

export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  verbose?: boolean;
  personality?: string;
  skillLevel?: string;
  meta?: boolean;
  focus?: string;
  detail?: string;
  suggestions?: boolean;
}
