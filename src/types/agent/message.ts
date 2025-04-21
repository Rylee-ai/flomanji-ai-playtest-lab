
export interface AgentMessage {
  role: "GM" | "Player" | "Critic";
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
  };
}

export type AgentRole = "GM" | "Player" | "Critic";
