
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { FileBasedCardAdapter } from "@/utils/file-based/FileBasedCardAdapter";
import { toast } from "sonner";
import { logCardOperation } from "@/utils/error-handling/cardErrorHandler";
import { log } from "@/utils/logging";
import { useState } from "react";

export const useCardImport = (loadCards: () => Promise<any>) => {
  const [isImporting, setIsImporting] = useState(false);

  /**
   * Handle importing cards in a file-based system with improved feedback and logging
   */
  const handleImport = async (
    cards: CardFormValues[], 
    results: CardImportResult
  ): Promise<void> => {
    if (!cards || cards.length === 0) {
      toast.error("No cards to import");
      log.warn("Import failed: No cards to import");
      return;
    }
    
    // Log import operation details
    log.info("Starting card import operation", { 
      cardCount: cards.length,
      cardTypes: [...new Set(cards.map(card => card.type))]
    });
    
    // Also use the existing logging mechanism for backward compatibility
    logCardOperation("Starting import in file-based mode", { cardCount: cards.length });
    
    setIsImporting(true);
    
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
      
      // Log the distribution of cards by type
      log.debug("Card import distribution by type", { distribution: Object.fromEntries(
        Object.entries(cardsByType).map(([type, cards]) => [type, cards.length])
      )});
      
      // In file-based mode, we would handle this differently
      let successCount = 0;
      let failureCount = 0;
      
      for (const [type, typeCards] of Object.entries(cardsByType)) {
        toast.info(`Processing ${typeCards.length} ${type} cards...`);
        log.info(`Processing batch of ${type} cards`, { count: typeCards.length });
        
        // Use the adapter to import cards
        const importResult = await FileBasedCardAdapter.importCards(
          typeCards, 
          type as CardType
        );
        
        if (importResult.success) {
          successCount += typeCards.length;
          toast.success(`${type}: ${importResult.created || 0} cards created, ${importResult.updated || 0} updated`);
          log.info(`Successfully imported ${type} cards`, { 
            created: importResult.created,
            updated: importResult.updated
          });
        } else {
          failureCount += typeCards.length;
          toast.error(`${type}: Import failed - ${importResult.errors.map(e => e.error).join(", ")}`);
          log.error(`Failed to import ${type} cards`, { 
            errors: importResult.errors
          });
        }
      }
      
      // Show final results
      if (failureCount > 0) {
        toast.warning(
          `Import completed with issues: ${successCount} cards imported, ${failureCount} failed`
        );
        log.warn("Import completed with issues", {
          success: successCount,
          failure: failureCount
        });
      } else {
        toast.success(
          `Successfully imported ${successCount} cards`
        );
        log.info("Import completed successfully", { count: successCount });
      }
      
      // Reload cards to reflect the changes
      await loadCards();
      
    } catch (error) {
      console.error("Error during import:", error);
      toast.error(`Import failed: ${error instanceof Error ? error.message : String(error)}`);
      log.error("Card import operation failed", { 
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsImporting(false);
    }
  };

  return {
    handleImport,
    isImporting
  };
};
