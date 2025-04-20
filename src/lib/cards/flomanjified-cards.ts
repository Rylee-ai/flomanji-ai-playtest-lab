
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { loadCardsByType } from './loadMarkdownCards';

// Load flomanjified cards from markdown files
export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = loadCardsByType<FlomanjifiedRoleCard>('flomanjified');
