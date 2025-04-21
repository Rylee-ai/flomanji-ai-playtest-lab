
export interface FlomanjiCharacter {
  id: string;
  name: string;
  role: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  health: number;
  weirdness: number;
  luck: number;
  position?: string;
  starterGear?: string[];
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

export interface PlayerMessage {
  id: string;
  conversationId: string;
  role: "human" | "ai" | "system";
  content: string;
  timestamp: string;
}

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

export interface AgentMessage {
  role: string;
  content: string;
  timestamp?: string;
  metadata?: Record<string, any>;
  playerIndex?: number;
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

// Add SimulationSummary interface which was missing
export interface SimulationSummary {
  id: string;
  scenario: string;
  result?: string;
  timestamp: string;
  rounds: number;
  notes?: string;
}

// Agent system types
export type AgentRole = "GM" | "Player" | "Critic";

export interface AgentConfig {
  systemPrompt: string;
  temperature: number;
  verbose: boolean;
  personality?: string;
  skillLevel?: string;
  meta?: boolean;
  focus?: string;
  detail?: string;
  suggestions?: boolean;
}

// Auth related types
export type UserRole = 'admin' | 'player' | 'moderator' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
}
