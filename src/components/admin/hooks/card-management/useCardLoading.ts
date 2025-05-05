
import { useCallback, useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCards = useCallback(async (): Promise<GameCard[]> => {
    setLoading(true);
    try {
      // Load cards from CardService which now uses CardLibraryService
      const loadedCards = await CardService.getCardsByType(activeTab);
      
      if (loadedCards.length === 0) {
        console.info(`No ${activeTab} cards found in file-based library`);
      } else {
        console.log(`Loaded ${loadedCards.length} ${activeTab} cards from file-based library`);
      }
      
      setCards(loadedCards);
      return loadedCards;
    } catch (error) {
      console.error("Error loading cards:", error);
      // Don't show error toast on initial load to avoid UI clutter
      return [];
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  // Get a specific card by ID
  const getCardById = useCallback((id: string) => {
    return cards.find(card => card.id === id);
  }, [cards]);

  // Get the currently active cards (filtered by tab)
  const getActiveCards = useCallback(() => {
    return cards;
  }, [cards]);

  return {
    cards,
    loading,
    loadCards,
    getCardById,
    getActiveCards,
  };
};
