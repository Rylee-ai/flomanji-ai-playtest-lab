
export * from './simulation';
export * from './agent';
export * from './character';
export * from './user';
export * from './game-state';
export * from './cards/mission';
export * from './cards/treasure';
export * from './cards/hazard';
export * from './cards/region';
export * from './cards/npc';
export * from './cards/player-character';
export * from './cards/chaos';
export * from './cards/flomanjified';
export * from './cards/gear';

// Define the AgentConfig interface
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

// Explicitly handle any potential naming conflicts
import { AgentMessage as SimulationAgentMessage } from './agent';
export type { SimulationAgentMessage };
