
import { MissionSheet } from '@/types/cards/mission';
import { loadCardsByType } from './loadMarkdownCards';

// Load mission cards from markdown files  
export const MISSION_CARDS: MissionSheet[] = loadCardsByType<MissionSheet>('mission');
