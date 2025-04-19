
// Agent types
export type AgentRole = 'GM' | 'Player' | 'Critic';

export interface AgentMessage {
  role: AgentRole;
  message: string;
  timestamp?: string;
}

// Simulation types
export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: 'full' | 'narrative-only' | 'minimal';
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  log: AgentMessage[];
  criticFeedback?: string;
  annotations?: string;
}

export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  result?: string;
  notes?: string;
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
  type: 'hazard' | 'treasure' | 'event';
  description: string;
  effects: string;
}

// CMS types
export interface MarkdownContent {
  path: string;
  content: string;
}
