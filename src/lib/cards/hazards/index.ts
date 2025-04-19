
import { HazardCard } from '@/types/cards/hazard';
import { ENVIRONMENTAL_HAZARDS } from './environmental-hazards';
import { CREATURE_HAZARDS } from './creature-hazards';
import { SOCIAL_VEHICLE_HAZARDS } from './social-vehicle-hazards';
import { WEIRD_RARE_HAZARDS } from './weird-rare-hazards';

// Combine all hazard categories
export const HAZARD_CARDS: HazardCard[] = [
  ...ENVIRONMENTAL_HAZARDS,
  ...CREATURE_HAZARDS,
  ...SOCIAL_VEHICLE_HAZARDS,
  ...WEIRD_RARE_HAZARDS
];
