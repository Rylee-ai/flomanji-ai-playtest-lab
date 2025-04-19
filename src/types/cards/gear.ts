
import { GameCard } from '../cards';

export interface GearUse {
  cost: number;
  effect: string;
}

export interface GearCard extends GameCard {
  type: 'gear';
  actionCost?: number;
  consumable?: boolean;
  uses?: number;
  category: 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply';
  statBonus?: {
    stat: 'brawn' | 'moxie' | 'charm' | 'grit' | 'weirdSense';
    value: number;
  };
  passive?: string;
}

