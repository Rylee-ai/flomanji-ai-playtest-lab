
import { useState } from "react";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { CardService } from "@/services/CardService";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { GameCard } from "@/types/cards";

export const useCardImport = (loadCards: () => Promise<void>) => {
  const [importProgress, setImportProgress] = useState(0);
  
  const handleImport = async (importedCards: CardFormValues[], results: CardImportResult) => {
    if (!importedCards || importedCards.length === 0) {
      showSuccessToast("No cards to import");
      return;
    }
    
    try {
      setImportProgress(0);
      
      // Transform imported cards to GameCard format with unique IDs
      const cardsToSave = importedCards.map(card => ({
        ...card,
        id: card.id || `${card.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // Ensure icons is not optional to satisfy GameCard type
        icons: card.icons || [],
        // Ensure keywords is not optional
        keywords: card.keywords || []
      })) as GameCard[];
      
      // Save cards to database with batch processing
      const { success, count, failed, errors } = await CardService.saveCards(
        cardsToSave, 
        {
          batchSize: 50,
          onProgress: (completed, total) => {
            const progress = Math.round((completed / total) * 100);
            setImportProgress(progress);
          }
        }
      );
      
      if (success) {
        if (failed && failed.length > 0) {
          // Some cards failed but others succeeded
          showSuccessToast(`Imported ${count} cards with ${failed.length} failures`);
        } else {
          // All cards imported successfully
          showSuccessToast(`Successfully imported ${count} cards`);
        }
        
        // Reload cards
        await loadCards();
      } else {
        // All cards failed
        showErrorToast(`Failed to import cards: ${errors?.[0] || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error importing cards:", error);
      showErrorToast("Failed to import cards");
    } finally {
      setImportProgress(0);
    }
  };

  return { handleImport, importProgress };
};
