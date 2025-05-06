
import { useCallback, useState, useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";
import { log } from "@/utils/logging";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cards whenever activeTab changes
  useEffect(() => {
    loadCards().catch(error => {
      log.error("Failed to load cards in useEffect", { 
        error: error instanceof Error ? error.message : String(error),
        activeTab
      });
    });
  }, [activeTab]);

  const loadCards = useCallback(async (): Promise<GameCard[]> => {
    log.info("Loading cards", { cardType: activeTab, timestamp: new Date().toISOString() });
    setLoading(true);
    
    try {
      // Ensure the CardCollectionLoader is initialized
      if (!CardCollectionLoader.isLoaded()) {
        log.info("Initializing CardCollectionLoader before loading cards", { cardType: activeTab });
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      // Load cards from CardService which uses CardLibraryService
      const startTime = performance.now();
      const loadedCards = await CardService.getCardsByType(activeTab);
      const endTime = performance.now();
      
      log.info(`Loaded ${loadedCards.length} ${activeTab} cards in ${Math.round(endTime - startTime)}ms`);
      
      if (loadedCards.length === 0) {
        log.warn(`No ${activeTab} cards found in file-based library`);
        
        // Only show warning toast if we know there should be cards for this type
        const shouldHaveCards = ['gear', 'treasure', 'hazard', 'npc', 'player-character', 'mission'].includes(activeTab);
        if (shouldHaveCards) {
          toast.warning(`No ${activeTab} cards found. Check your card collections.`);
        }
      }
      
      setCards(loadedCards);
      return loadedCards;
    } catch (error) {
      console.error("Error loading cards:", error);
      log.error("Failed to load cards", { 
        error: error instanceof Error ? error.message : String(error),
        cardType: activeTab,
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Show error toast for failed loads except on initial page load
      if (cards.length > 0) {
        toast.error(`Failed to load ${activeTab} cards. Try refreshing.`);
      }
      
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
