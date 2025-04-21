
export interface AgentMessage {
  role: string;
  content: string;
  timestamp?: string;
  metadata?: Record<string, any>;
  playerIndex?: number;
}

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
