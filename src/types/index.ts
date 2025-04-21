import { MissionSheet } from "./cards/mission";

export interface SimulationConfig {
  scenarioPrompt: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: "full" | "summary";
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  missionId?: string;
  extractionRegion?: string;
  startingHeat?: number;
  heatPerRound?: number;
  objectives?: any[];
  missionType?: string;
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
}

export interface AgentMessage {
  role: "GM" | "Player" | "Critic";
  content: string;
  timestamp: string;
  playerIndex?: number; // For Player role only
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

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  expectedRounds?: number; // Added to track the originally requested number of rounds
  playerCount: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
  config: {
    scenario: string;
    rounds: number;
    playerCount: number;
    characters: any[];
    enableCritic: boolean;
    outputMode: string;
    startingHeat: number;
    heatPerRound: number;
    extractionRegion: string;
    objectives: any[];
  };
  gameState: {
    currentRound: number;
    heat: number;
    completedObjectives: string[];
    playerInventories: Record<number, {
      gear: string[];
      treasures: string[];
      health: number;
      weirdness: number;
      luck: number;
    }>;
    regions: string[];
    currentRegion: string;
    activeHazards: string[];
    rolls: any[];
  };
  characters: any[];
  missionOutcome?: string; // Added to explicitly track final outcome
}

export interface SimulationSummary {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  result?: string;
  notes?: string;
}

export interface StoredSimulation {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
}

export interface Settings {
  openAiApiKey?: string;
  openRouterApiKey?: string;
}

export interface FlomanjiCharacter {
  id: string;
  name: string;
  role: string;
  stats: CharacterStats;
  ability: CharacterAbility;
  health: number;
  weirdness: number;
  luck: number;
  starterGear?: string[];
  position?: string;
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

export type AgentRole = "GM" | "Player" | "Critic";

export type UserRole = "admin" | "player";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MailingAddress {
  id: string;
  userId: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerDetails {
  id: string;
  userId: string;
  waitlistId: string;
  shippingStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: PlayerMessage[];
}

export interface PlayerMessage {
  id: string;
  conversationId: string;
  role: "human" | "ai";
  content: string;
  timestamp: string;
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
