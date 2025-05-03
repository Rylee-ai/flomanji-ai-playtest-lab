
import { useState, useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardService } from "@/services/CardService";
import { CardVersion, CardImportResult } from "@/types/cards/card-version";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

export const useCardManagement = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CardType>("treasure");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GameCard | undefined>();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [versionHistory, setVersionHistory] = useState<CardVersion[]>([]);

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

  const handleViewCard = (id: string) => {
    setSelectedCard(id);
  };

  const handleEditCard = async (card: GameCard) => {
    setEditingCard(card);
    setActiveTab(card.type as CardType);
    
    // Load version history for the card
    try {
      const history = await CardService.getCardVersionHistory(card.id);
      setVersionHistory(history);
    } catch (error) {
      console.error("Error loading card history:", error);
      // Continue despite history error
    }
    
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(undefined);
    setVersionHistory([]);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CardFormValues) => {
    try {
      if (editingCard) {
        // Update existing card
        const updatedCard = {
          ...editingCard,
          ...data,
        };
        
        await CardService.saveCard(updatedCard);
        showSuccessToast(`${data.name} updated successfully`);
      } else {
        // Create new card with a unique ID
        const newCard = {
          ...data,
          id: data.id || `${activeTab}-${Date.now()}`,
        };
        
        await CardService.saveCard(newCard as GameCard);
        showSuccessToast(`${data.name} created successfully`);
      }
      
      // Reload cards to update the UI
      await loadCards();
      
      setIsFormOpen(false);
      setEditingCard(undefined);
    } catch (error) {
      console.error("Error saving card:", error);
      showErrorToast("Failed to save card");
    }
  };

  const handleDeleteCard = async (card: GameCard) => {
    try {
      await CardService.deleteCard(card.id);
      showSuccessToast(`${card.name} deleted successfully`);
      
      // Reload cards to update the UI
      await loadCards();
    } catch (error) {
      console.error("Error deleting card:", error);
      showErrorToast("Failed to delete card");
    }
  };

  const handleImport = async (importedCards: CardFormValues[], results: CardImportResult) => {
    try {
      // Transform imported cards to GameCard format with unique IDs
      const cardsToSave = importedCards.map(card => ({
        ...card,
        id: card.id || `${card.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  const getActiveCards = () => {
    return cards.filter(card => card.type === activeTab);
  };

  return {
    selectedCard,
    setSelectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    setActiveTab,
    setIsFormOpen,
    getCardById,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
    getActiveCards,
    handleDeleteCard,
    handleImport,
    loading,
    cards,
    versionHistory,
  };
};
