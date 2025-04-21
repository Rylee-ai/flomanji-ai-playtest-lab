
// Simulation-related types
export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: 'full' | 'summary' | 'narrative-only' | 'minimal';
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
  log: AgentMessage[];
  criticFeedback?: string;
  annotations?: string;
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

export interface CharacterAbility {
  name: string;
  description: string;
}

// Add the CharacterGear interface to match what's used in characters.ts
export interface CharacterGear {
  name: string;
  type: string;
  effect: string;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role?: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  health: number;
  weirdness: number;
  luck: number;
  position?: string;
  starterGear?: CharacterGear[]; // Update to use CharacterGear[] instead of string[]
}

// Simulation list related types
export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  missionType?: string;
  missionOutcome?: string;
  result?: string;
  notes?: string;
}

export interface AgentMessage {
  role: string;
  content: string; // This is the standard property name for message content
  timestamp?: string;
}
