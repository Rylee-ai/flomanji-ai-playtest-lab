export interface FlomanjiCharacter {
  name: string;
  role: string;
  stats: {
    brawn: number;
    moxie: number;
    charm: number;
    grit: number;
    weirdSense: number;
  };
  ability: {
    name: string;
    description: string;
  };
  health: number;
  weirdness: number;
  luck: number;
  starterGear?: string[];
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
}

export interface AgentMessage {
  role: string;
  content: string;
  timestamp?: string;
}
