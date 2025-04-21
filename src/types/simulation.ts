
import type { FlomanjiCharacter } from "./character";
import type { AgentMessage } from "./agent";

export interface SimulationResult {
  id: string;
  scenario: string;
  result: string;
  keyEvents?: string[];
  timestamp: string;
  log: AgentMessage[];
  rounds: number;
  missionOutcome?: string;
  config?: SimulationConfig;
  characters?: FlomanjiCharacter[];
  annotations?: string;
  criticFeedback?: string;
  gameState?: any;
}

export interface SimulationConfig {
  scenarioPrompt?: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: "full" | "summary";
  startingHeat?: number;
  heatPerRound?: number;
  missionId?: string;
  missionType?: string;
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  extractionRegion?: string;
  objectives?: any[];
  nightmareDifficulty?: boolean;
  arcadeModule?: boolean;
  competitiveMode?: boolean;
  secretTraitor?: boolean;
}

export interface SimulationSummary {
  id: string;
  scenario: string;
  result?: string;
  timestamp: string;
  rounds: number;
  notes?: string;
}
