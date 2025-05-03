
import { useState, useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { showErrorToast } from "@/lib/toast";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cards when activeTab changes
  useEffect(() => {
    loadCards();
  }, [activeTab]);

  const loadCards = async () => {
    setLoading(true);
    try {
      const loadedCards = await CardService.getCardsByType(activeTab);
      setCards(loadedCards);
    } catch (error) {
      console.error("Error loading cards:", error);
      showErrorToast("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  const getCardById = (id: string): GameCard | undefined => {
    return cards.find(card => card.id === id);
  };

  const getActiveCards = () => {
    return cards.filter(card => card.type === activeTab);
  };

  return {
    cards,
    loading,
    loadCards,
    getCardById,
    getActiveCards
  };
};
