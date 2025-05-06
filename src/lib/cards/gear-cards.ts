
import { GearCard } from '@/types/cards/gear';
import { ALL_GEAR_CARDS } from './gear';

// Export the combined gear cards for consistency with other card type files
// This should already have all gear cards properly combined from various sources
export const GEAR_CARDS: GearCard[] = ALL_GEAR_CARDS;

// Log how many cards we have for debugging
console.log(`Loaded ${ALL_GEAR_CARDS.length} gear cards from all sources`);
