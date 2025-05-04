
import { useCallback, useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCards = useCallback(async () => {
    setLoading(true);
    try {
      const loadedCards = await CardService.getCardsByType(activeTab);
      setCards(loadedCards);
      return loadedCards;
    } catch (error) {
      console.error("Error loading cards:", error);
      // Don't show error toast on initial load to avoid UI clutter
      // We'll let the parent component handle error messaging
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
