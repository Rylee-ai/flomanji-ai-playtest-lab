
import { GameCard, CardType } from '@/types/cards';
import { CardLibraryService } from '@/services/CardLibraryService';
import { FileBasedCardAdapter } from './FileBasedCardAdapter';

/**
 * Export cards of a specific type to a downloadable JSON file
 */
export const exportCardsToFile = async (
  cardType: CardType,
  fileName?: string
): Promise<void> => {
  try {
    // Get cards from the library service
    const cards = await CardLibraryService.getCardsByType(cardType);
    
    if (!cards || cards.length === 0) {
      console.warn(`No ${cardType} cards found to export`);
      return;
    }
    
    // Generate file name if not provided
    const exportFileName = fileName || FileBasedCardAdapter.generateExportFileName(cardType);
    
    // Convert cards to JSON blob
    const blob = FileBasedCardAdapter.prepareExportFile(cards);
    
    // Create a download link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
    
    console.log(`Successfully exported ${cards.length} ${cardType} cards to ${exportFileName}`);
  } catch (error) {
    console.error(`Error exporting ${cardType} cards:`, error);
    throw error;
  }
};
