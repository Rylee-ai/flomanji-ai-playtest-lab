
import { AgentMessage } from "../agent/message";
import { FlomanjiCharacter } from "../characters/character";

export interface SimulationResult {
  id: string;
  timestamp: string;
  scenario: string;
  rounds: number;
  expectedRounds?: number;
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
    missionType?: string;
    secretTraitor?: boolean;
    arcadeModule?: boolean;
    nightmareDifficulty?: boolean;
    competitiveMode?: boolean;
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
  missionOutcome?: string;
  keyEvents?: Array<{
    round?: number;
    description: string;
    impact?: string;
  }>;
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
