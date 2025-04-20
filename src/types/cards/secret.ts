
import { GameCard } from '../cards';

export interface SecretObjectiveCard extends GameCard {
  type: 'secret';
  alignment: 'saboteur' | 'innocent';
  winCondition: string;
}
