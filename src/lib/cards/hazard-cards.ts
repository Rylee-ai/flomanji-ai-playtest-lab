
import { HazardCard } from '@/types/cards/hazard';
import { ENVIRONMENTAL_HAZARDS } from './hazards/environmental-hazards';
import { CREATURE_HAZARDS } from './hazards/creature-hazards';
import { SOCIAL_VEHICLE_HAZARDS } from './hazards/social-vehicle-hazards';
import { WEIRD_RARE_HAZARDS } from './hazards/weird-rare-hazards';

// Combine all hazard categories
export const HAZARD_CARDS: HazardCard[] = [
  ...ENVIRONMENTAL_HAZARDS,
  ...CREATURE_HAZARDS,
  ...SOCIAL_VEHICLE_HAZARDS,
  ...WEIRD_RARE_HAZARDS
];
