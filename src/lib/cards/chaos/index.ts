
import { ChaosCard } from '@/types/cards/chaos';
import { ENVIRONMENTAL_CHAOS } from './environmental-chaos';
import { SOCIAL_CHAOS } from './social-chaos';
import { CREATURE_CHAOS } from './creature-chaos';
import { WEIRD_CHAOS } from './weird-chaos';

// Combine all chaos categories
export const CHAOS_CARDS: ChaosCard[] = [
  ...ENVIRONMENTAL_CHAOS,
  ...SOCIAL_CHAOS,
  ...CREATURE_CHAOS,
  ...WEIRD_CHAOS
];
