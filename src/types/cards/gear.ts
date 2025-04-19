
import { GameCard } from '../cards';

export interface GearCard extends GameCard {
  type: 'gear';
  actionCost?: number;
  consumable?: boolean;
  statBonus?: {
    stat: 'brawn' | 'moxie' | 'charm' | 'grit' | 'weirdSense';
    value: number;
  };
}
