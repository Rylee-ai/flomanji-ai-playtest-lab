
// Simulation-related types
export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: 'full' | 'summary';
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
