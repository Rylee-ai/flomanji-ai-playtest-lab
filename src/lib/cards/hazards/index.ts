
import { HazardCard } from '@/types/cards/hazard';
import { loadCardsByType } from '../loadMarkdownCards';

// Load hazard cards from markdown files
export const HAZARD_CARDS: HazardCard[] = loadCardsByType<HazardCard>('hazard');
