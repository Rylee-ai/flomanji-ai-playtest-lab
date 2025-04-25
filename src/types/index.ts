
import { MissionSheet } from "./cards/mission";

export interface SimulationConfig {
  scenarioPrompt?: string;
  rounds?: number;
  players?: number;
  enableCritic?: boolean;
  outputMode?: string;
  characters?: string[];
  fullCharacters?: FlomanjiCharacter[];
  startingHeat?: number;
  heatPerRound?: number;
  missionId?: string;
  objectives?: any[];
  extractionRegion?: string;
  secretTraitor?: boolean;
  arcadeModule?: boolean;
  nightmareDifficulty?: boolean;
  competitiveMode?: boolean;
  gobletVoice?: 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';
  missionType?: string; // Adding the missing missionType property
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
    gobletVoice?: string; // Adding the missing gobletVoice property
    gobletMood?: string; // Adding gobletMood for completeness
    isGobletHolder?: boolean; // Adding the missing isGobletHolder property
  };
}

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  playerCount: number;
  log: AgentMessage[];
  criticFeedback: string;
  annotations: string;
  config?: {
    scenario: string;
    rounds: number;
    playerCount: number;
    characters: FlomanjiCharacter[];
    enableCritic: boolean;
    outputMode: string;
    startingHeat: number;
    heatPerRound: number;
    extractionRegion: string;
    objectives: any[];
    missionType?: string;
    secretTraitor?: boolean;
    arcadeModule?: boolean;
    nightmareDifficulty?: boolean;
    competitiveMode?: boolean;
  };
  gameState?: {
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
    rolls: {player: number, type: string, value: number, stat: string, result: string}[];
  };
  characters?: FlomanjiCharacter[];
  missionOutcome?: string;
  keyEvents?: string[];
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
