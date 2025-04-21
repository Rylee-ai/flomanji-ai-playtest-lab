import { MissionSheet } from "./cards/mission";
import { PlayerCharacterSheet } from "./cards/player-character";

export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: string;
  missionId?: string;
  characters?: string[];
  startingHeat?: number;
  missionType?: string;
  extractionRegion?: string;
  fullCharacters?: FlomanjiCharacter[];
  objectives?: any[];
}

export interface AgentMessage {
  role: string;
  content: string;
  timestamp: string;
  playerIndex?: number; // Added to track which player this message belongs to
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  playerCount?: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
  missionOutcome?: string;
  keyEvents?: any[];
}

export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
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
