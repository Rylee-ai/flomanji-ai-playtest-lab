
import { CardType, GameCard } from '../cards';

export type BiomeTag = '🐊' | '🏖️' | '🏙️' | '🛣️' | '🌳' | '☀️' | '🕳️';

export interface RegionCard extends GameCard {
  type: 'region';
  biomeTags: BiomeTag[];
  onEnter: string;
  action?: string;
  rest?: string;
  bonusZone?: string;
}
