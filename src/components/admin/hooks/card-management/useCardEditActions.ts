
import { useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardService } from "@/services/CardService";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

export const useCardEditActions = (
  loadCards: () => Promise<void>,
  setIsFormOpen: (isOpen: boolean) => void,
  setEditingCard: (card?: GameCard) => void
) => {
  const handleAddNew = () => {
    setEditingCard(undefined);
    setIsFormOpen(true);
  };

  const handleEditCard = async (card: GameCard) => {
    setEditingCard(card);
    
    // Load version history for the card
    try {
      const history = await CardService.getCardVersionHistory(card.id);
      return history;
    } catch (error) {
      console.error("Error loading card history:", error);
      // Continue despite history error
      return [];
    }
  };

  const handleFormSubmit = async (data: CardFormValues) => {
    try {
      if (data.id) {
        // Update existing card
        const updatedCard = {
          ...data,
          id: data.id
        };
        
        await CardService.saveCard(updatedCard as GameCard);
        showSuccessToast(`${data.name} updated successfully`);
      } else {
        // Create new card with a unique ID
        const newCard = {
          ...data,
          id: `${data.type}-${Date.now()}`,
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

  return {
    handleAddNew,
    handleEditCard,
    handleFormSubmit,
    handleDeleteCard
  };
};
