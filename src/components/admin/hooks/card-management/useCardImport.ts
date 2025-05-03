
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { CardService } from "@/services/CardService";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { GameCard } from "@/types/cards";

export const useCardImport = (loadCards: () => Promise<void>) => {
  const handleImport = async (importedCards: CardFormValues[], results: CardImportResult) => {
    try {
      // Transform imported cards to GameCard format with unique IDs
      const cardsToSave = importedCards.map(card => ({
        ...card,
        id: card.id || `${card.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // Ensure icons is not optional to satisfy GameCard type
        icons: card.icons || [],
        // Ensure keywords is not optional
        keywords: card.keywords || []
      })) as GameCard[];
      
      // Save cards to database
      const { success, count } = await CardService.saveCards(cardsToSave);
      
      if (success) {
        showSuccessToast(`Successfully imported ${count} cards`);
        // Reload cards
        await loadCards();
      }
    } catch (error) {
      console.error("Error importing cards:", error);
      showErrorToast("Failed to import cards");
    }
  };

  return { handleImport };
};
