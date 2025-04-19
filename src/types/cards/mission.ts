
import { GameCard } from '../cards';

export interface MissionObjective {
  description: string;
  required: boolean;
  reward?: string;
}

export interface MissionSheet extends GameCard {
  type: 'mission';
  hook: string;
  mapLayout: string;
  startingHeat: number;
  objectives: MissionObjective[];
  extractionRegion: string;
  specialRules: string[];
  scaling: {
    small: string;
    large: string;
  };
}
