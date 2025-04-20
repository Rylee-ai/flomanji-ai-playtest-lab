
import { RegionCard } from '@/types/cards/region';
import { loadCardsByType } from './loadMarkdownCards';

// Load region cards from markdown files
export const REGION_CARDS: RegionCard[] = loadCardsByType<RegionCard>('region');
