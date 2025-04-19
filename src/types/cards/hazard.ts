
import { GameCard } from '../cards';

export type HazardSubType = 'environmental' | 'creature' | 'social' | 'weird';

export interface HazardCard extends GameCard {
  type: 'hazard';
  subType: HazardSubType;
  difficultyClasses: {
    fight?: number;
    flee?: number;
    negotiate?: number;
    outsmart?: number;
    grit?: number;
    moxie?: number;
    charm?: number;
    weirdSense?: number;
  };
  onFailure: string;
  onSuccess?: string;
  bossHazard?: boolean;
  gearBonuses?: {
    itemName: string;
    effect: 'autoSuccess' | 'bonus';
    bonusValue?: number;
  }[];
}
