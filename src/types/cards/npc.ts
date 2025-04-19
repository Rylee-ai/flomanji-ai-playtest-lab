
import { GameCard } from '../cards';

export interface NPCCard extends GameCard {
  type: 'npc';
  checkDC?: number;
  actions: {
    description: string;
    cost: number;
    effect: string;
  }[];
}
