
import { useState, useCallback } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { log } from "@/utils/logging";
import { toast } from "sonner";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Load cards based on the active tab
  const loadCards = useCallback(async (): Promise<GameCard[]> => {
    setLoading(true);
    log.debug(`Loading cards for type: ${activeTab}`);

    try {
      // Ensure collections are loaded first
      await CardCollectionLoader.loadAllCardCollections();
      
      // For treasure tab specifically, we need special handling
      if (activeTab === "treasure") {
        // Get combined treasure cards directly from CardCollectionLoader
        const combinedCards = CardCollectionLoader.getCardCollection("treasure");
        
        log.debug(`Retrieved ${combinedCards.length} total treasure cards (including artifacts)`);
        setCards(combinedCards);
        setLoading(false);
        return combinedCards;
      } 
      else {
        // For other card types, proceed normally
        const fetchedCards = await CardService.getCardsByType(activeTab);
        if (fetchedCards.length === 0) {
          log.warn(`No ${activeTab} cards found in file-based library`);
        } else {
          log.debug(`Retrieved ${fetchedCards.length} cards of type ${activeTab}`);
        }
        setCards(fetchedCards);
        setLoading(false);
        return fetchedCards;
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : String(error);
      
      log.error(`Failed to load ${activeTab} cards`, { error: errorMessage });
      toast.error(`Failed to load ${activeTab} cards. Please try refreshing.`);
      setLoading(false);
      return [];
    }
  }, [activeTab]);

  const getCardById = useCallback(
    (id: string): GameCard | undefined => {
      return cards.find((card) => card.id === id);
    },
    [cards]
  );

  const getActiveCards = useCallback((): GameCard[] => {
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
