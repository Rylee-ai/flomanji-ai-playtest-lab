
import { GameCard, CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { formatCardError } from "@/utils/error-handling/cardErrorHandler";
import { CardLibraryService } from "@/services/CardLibraryService";

/**
 * Adapter class to handle import/export operations in a file-based system
 */
export class FileBasedCardAdapter {
  /**
   * Import cards from external data to file-based system
   * In a fully implemented system, this would trigger PR creation or direct commits
   */
  static async importCards(cards: CardFormValues[], cardType: CardType): Promise<CardImportResult> {
    try {
      const importedCount = cards.length;
      const existingCards = await CardLibraryService.getCardsByType(cardType);
      
      // Calculate how many cards would be new vs updates
      const newCards = cards.filter(importCard => 
        !existingCards.some(existingCard => existingCard.id === importCard.id)
      );
      
      const updatedCards = cards.filter(importCard =>
        existingCards.some(existingCard => existingCard.id === importCard.id)
      );
      
      console.log(`Import would create ${newCards.length} new cards and update ${updatedCards.length} existing cards`);
      
      return {
        imported: importedCount,
        created: newCards.length,
        updated: updatedCards.length,
        issues: 0,
        errors: [],
        warnings: ["In file-based mode, these changes would require code modifications"],
        success: true
      };
    } catch (error) {
      const formattedError = formatCardError(error, "import");
      return {
        imported: 0,
        created: 0,
        updated: 0,
        issues: 1,
        errors: [{
          name: "Import Error",
          error: formattedError.message
        }],
        warnings: [],
        success: false
      };
    }
  }
  
  /**
   * Export cards from file-based system
   */
  static async exportCards(cardType: CardType): Promise<GameCard[]> {
    try {
      return await CardLibraryService.getCardsByType(cardType);
    } catch (error) {
      console.error("Error exporting cards:", error);
      return [];
    }
  }
  
  /**
   * Generate a file name for a card type
   */
  static generateExportFileName(cardType: CardType): string {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return `flomanji-${cardType}-cards-${formattedDate}.json`;
  }
  
  /**
   * Convert exported cards to a downloadable format
   */
  static prepareExportFile(cards: GameCard[]): Blob {
    const content = JSON.stringify(cards, null, 2);
    return new Blob([content], { type: "application/json" });
  }
}
