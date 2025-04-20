
// Agent types
export type AgentRole = 'GM' | 'Player' | 'Critic';

export interface AgentMessage {
  role: AgentRole;
  message: string;
  timestamp?: string;
  characterId?: string; // Added to track messages from specific characters
}

// Character types
export interface CharacterStats {
  brawn: number;
  moxie: number;
  charm: number;
  grit: number;
  weirdSense: number;
}

export interface CharacterGear {
  name: string;
  type: string;
  effect: string;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role: string;
  stats: CharacterStats;
  ability: {
    name: string;
    description: string;
  };
  health: number;
  weirdness: number;
  luck: number;
  starterGear: CharacterGear[];
}

// Character performance metrics in simulation
export interface CharacterPerformanceMetrics {
  characterId: string;
  characterName: string;
  actionsUsed: number;
  statChecks: {
    brawn: { attempts: number, successes: number },
    moxie: { attempts: number, successes: number },
    charm: { attempts: number, successes: number },
    grit: { attempts: number, successes: number },
    weirdSense: { attempts: number, successes: number },
  };
  damageTaken: number;
  damageCaused: number;
  heatIncreases: number;
  abilityUses: number;
  regionsExplored: number;
  gearUsed: string[];
  finalHealth: number;
  finalWeirdness: number;
  finalLuck: number;
}

// Simulation types
export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: 'full' | 'narrative-only' | 'minimal';
  // Flomanji specific options
  startingHeat?: number;
  missionType?: 'exploration' | 'escape' | 'escort' | 'collection' | 'boss';
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
  characters?: FlomanjiCharacter[];
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  log: AgentMessage[];
  criticFeedback?: string;
  annotations?: string;
  characterMetrics?: CharacterPerformanceMetrics[]; // New field for character performance
  missionOutcome?: 'success' | 'partial' | 'failure';
  missionType?: string;
  keyEvents?: { round: number, description: string }[];
}

export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  result?: string;
  notes?: string;
  missionOutcome?: 'success' | 'partial' | 'failure';
  characters?: { id: string, name: string }[];
}

// Game content types
export interface GameRule {
  id: string;
  title: string;
  content: string;
}

export interface Card {
  id: string;
  name: string;
  type: 'hazard' | 'treasure' | 'event' | 'gear' | 'npc' | 'region' | 'chaos';
  description: string;
  effects: string;
  biome?: string[];
  stats?: {
    fightDC?: number;
    fleeDC?: number;
    negotiateDC?: number;
    outsmartDC?: number;
  };
}

// CMS types
export interface MarkdownContent {
  path: string;
  content: string;
}
