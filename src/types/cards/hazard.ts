
import { GameCard } from '../cards';

export interface HazardCard extends GameCard {
  type: 'hazard';
  difficultyClasses: {
    fight?: number;
    flee?: number;
    negotiate?: number;
    outsmart?: number;
  };
  onFailure: string;
  bossHazard?: boolean;
}
