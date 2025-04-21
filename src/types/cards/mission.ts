import { GameCard } from '../cards';

export interface MissionObjective {
  description: string;
  required: boolean;
  reward?: string;
  completionCheck?: string; // Logic for how to check completion
  difficultyLevel?: number; // Scale of 1-5 for balancing
  regionId?: string; // Region where the objective must be completed
  requiredItems?: string[]; // Items required to complete the objective
}

export interface MissionChallenge {
  description: string;
  frequency: 'once' | 'recurring' | 'triggered';
  trigger?: string;
  heatEffect?: number;
  weirdnessEffect?: number;
}

export interface MissionPhase {
  name: string;
  description: string;
  objectives: MissionObjective[];
  timeLimit?: number; // In rounds
}

export interface MissionSheet extends GameCard {
  type: 'mission';
  hook: string;
  mapLayout: string;
  startingHeat: number;
  objectives: MissionObjective[];
  extractionRegion: string;
  specialRules: string[];
  challenges?: MissionChallenge[]; // New field for specific mission challenges
  phases?: MissionPhase[]; // For multi-phase missions
  scaling: {
    small: string;
    large: string;
  };
  // Game balance and simulation metrics
  recommendedPlayerCount?: number[];
  estimatedDuration?: number; // In rounds
  difficultyRating?: number; // 1-10 scale
  simulationResults?: {
    totalRuns: number;
    successRate: number;
    averageCompletionTime: number;
    commonFailurePoints: string[];
  };
}

// Mission analytics tracking
export interface MissionAnalytics {
  missionId: string;
  runs: MissionRunData[];
  aggregateStats: {
    successRate: number;
    averageCompletionRounds: number;
    objectiveCompletionRates: Record<string, number>;
    characterPerformance: Record<string, {
      successRate: number;
      averageHeatAtEnd: number;
      averageWeirdnessAtEnd: number;
    }>;
    averageHeatProgression: number[];
    commonFailureCauses: string[];
  };
}

export interface MissionRunData {
  id: string;
  timestamp: string;
  missionId: string;
  completed: boolean;
  objectivesCompleted: string[];
  rounds: number;
  characters: string[];
  finalHeatLevel: number;
  keyEvents: {
    round: number;
    event: string;
    impact: string;
  }[];
}
