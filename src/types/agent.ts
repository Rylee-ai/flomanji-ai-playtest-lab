
// Add the following properties to the existing metadata type in the AgentMessage interface
// This is assuming the file already exists and we're just adding these properties

export interface AgentMessageMetadata {
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
  gameState?: any;
  scenarioType?: string;
  objectiveId?: string;
  objectiveDescription?: string;
  playerIndex?: number;
  isGobletHolder?: boolean;
  // Add the missing properties
  drawnChaosCard?: string;
  discoveredTreasure?: string;
  finderPlayerIndex?: number;
  treasureCard?: string;
  chaosCard?: string;
}

export interface AgentMessage {
  role: AgentRole;
  content: string;
  timestamp: string;
  playerIndex?: number;
  metadata?: AgentMessageMetadata;
}

export type AgentRole = 'user' | 'assistant' | 'system' | 'GM' | 'Player 1' | 'Player 2' | 'Player 3' | 'Player 4' | 'Player 5' | 'Player 6';
