
import { TreasureCard } from '@/types/cards/treasure';

// Import from the existing file which might have a different name
import { TREASURE_CARDS as ImportedTreasureCards } from './treasures';

// Export the treasure cards for consistency with other card type files
export const TREASURE_CARDS: TreasureCard[] = ImportedTreasureCards;
