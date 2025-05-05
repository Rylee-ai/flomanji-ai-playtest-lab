
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { FileBasedCardAdapter } from "@/utils/file-based/FileBasedCardAdapter";
import { toast } from "sonner";
import { logCardOperation } from "@/utils/error-handling/cardErrorHandler";

export const useCardImport = (loadCards: () => Promise<any>) => {
  /**
   * Handle importing cards in a file-based system
   */
  const handleImport = async (
    cards: CardFormValues[], 
    results: CardImportResult
  ): Promise<void> => {
    if (!cards || cards.length === 0) {
      toast.error("No cards to import");
      return;
    }
    
    logCardOperation("Starting import in file-based mode", { cardCount: cards.length });
    
    try {
      // Group cards by type for more organized handling
      const cardsByType = cards.reduce((acc, card) => {
        const type = card.type as CardType;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(card);
        return acc;
      }, {} as Record<CardType, CardFormValues[]>);
      
      // In file-based mode, we would handle this differently
      // Here we're just showing what would happen
      let successCount = 0;
      let failureCount = 0;
      
      for (const [type, typeCards] of Object.entries(cardsByType)) {
        toast.info(`Processing ${typeCards.length} ${type} cards...`);
        
        // Use the adapter to simulate import
        const importResult = await FileBasedCardAdapter.importCards(
          typeCards, 
          type as CardType
        );
        
        if (importResult.success) {
          successCount += typeCards.length;
          toast.success(`${type}: ${importResult.created || 0} would be created, ${importResult.updated || 0} would be updated`);
        } else {
          failureCount += typeCards.length;
          toast.error(`${type}: Import would have issues - ${importResult.errors.map(e => e.error).join(", ")}`);
        }
      }
      
      // Show final results
      toast.info(
        `File-based import simulation complete: ${successCount} cards would be imported, ${failureCount} would fail`
      );
      
      // Reload cards to reflect any changes
      // In a real implementation, we would need to update the source files
      await loadCards();
      
    } catch (error) {
      console.error("Error during import simulation:", error);
      toast.error(`Failed to simulate import: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return {
    handleImport
  };
};
