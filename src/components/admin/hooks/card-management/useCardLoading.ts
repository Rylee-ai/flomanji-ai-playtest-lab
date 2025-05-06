
import { useCallback, useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";
import { log } from "@/utils/logging";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCards = useCallback(async (): Promise<GameCard[]> => {
    log.info("Loading cards", { cardType: activeTab, timestamp: new Date().toISOString() });
    setLoading(true);
    
    try {
      // Load cards from CardService which now uses CardLibraryService
      const startTime = performance.now();
      const loadedCards = await CardService.getCardsByType(activeTab);
      const endTime = performance.now();
      
      if (loadedCards.length === 0) {
        log.info(`No ${activeTab} cards found in file-based library`);
      } else {
        log.info(`Loaded ${loadedCards.length} ${activeTab} cards from file-based library`, {
          timeMs: Math.round(endTime - startTime)
        });
      }
      
      setCards(loadedCards);
      return loadedCards;
    } catch (error) {
      console.error("Error loading cards:", error);
      log.error("Failed to load cards", { 
        error: error instanceof Error ? error.message : String(error),
        cardType: activeTab
      });
      
      // Show error toast for failed loads except on initial page load
      if (cards.length > 0) {
        toast.error(`Failed to load ${activeTab} cards. Try refreshing.`);
      }
      
      return [];
    } finally {
      setLoading(false);
    }
  }, [activeTab, cards.length]);

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
