
import { GameCard } from '../cards';

export interface ChaosCard extends GameCard {
  type: 'chaos';
  heatEffect?: number;
  globalEffect: string;
  duration?: 'immediate' | 'ongoing' | 'end-of-round';
}
