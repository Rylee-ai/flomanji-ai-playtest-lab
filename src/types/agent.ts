
export type AgentRole = "GM" | "Player" | "Critic";

export interface AgentMessage {
  role: AgentRole;
  content: string;
  timestamp: string;
  playerIndex?: number;
  metadata?: {
    roundNumber?: number;
    phase?: string;
    playerNumber?: number;
    playerName?: string;
    roll?: {
      stat: string;
      value: number;
      modifier: number;
      total: number;
      result: string;
    };
    heat?: number;
    hazard?: string;
    activeHazards?: string[];
    completedObjectives?: string[];
    inventory?: any;
    gameState?: any;
    reason?: string;
    outcome?: string;
    gobletVoice?: string;
    gobletMood?: string;
    isGobletHolder?: boolean;
  };
}

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
