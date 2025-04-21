
// Simulation-related types
export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: 'full' | 'summary' | 'narrative-only' | 'minimal';
  // Missing properties from errors
  missionId?: string;
  missionType?: 'exploration' | 'escape' | 'escort' | 'collection' | 'boss' | 'solo';
  characters?: string[];
  startingHeat?: number;
  extractionRegion?: string;
  // Optional modules
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  log: Array<{
    role: string;
    message: string;
    timestamp: string;
  }>;
  criticFeedback?: string;
  annotations?: string;
  // Additional properties from errors
  missionOutcome?: 'success' | 'partial' | 'failure';
  keyEvents?: Array<{
    round: number;
    description: string;
    impact?: string;
  }>;
}

// Agent-related types
export type AgentRole = "GM" | "Player" | "Critic";

export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  verbose: boolean;
  personality?: string;
  skillLevel?: string;
  focus?: string;
  detail?: string;
  meta?: boolean;
  suggestions?: boolean;
}

// Character-related types
export interface CharacterStats {
  brawn: number;
  moxie: number;
  charm: number;
  grit: number;
  weirdSense: number;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role?: string;
  stats: CharacterStats;
  ability?: string;
  health: number;
  weirdness: number;
  luck: number;
  position?: string;
  starterGear?: string[];
}

// Simulation list related types
export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  missionType?: string;
  missionOutcome?: string;
}

export interface AgentMessage {
  role: string;
  content: string;
  timestamp?: string;
}
