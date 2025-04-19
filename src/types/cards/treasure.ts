
import { GameCard } from '../cards';

export interface TreasureCard extends GameCard {
  type: 'treasure' | 'artifact';
  consumable?: boolean;
  value?: number;
  passiveEffect?: string;
  useEffect?: string;
}
