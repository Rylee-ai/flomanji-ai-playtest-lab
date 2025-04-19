
import { GameCard } from '../cards';

export interface FlomanjifiedRoleCard extends GameCard {
  type: 'flomanjified';
  originalRole?: string;
  chaosAction: string;
  specialAbility?: string;
}
