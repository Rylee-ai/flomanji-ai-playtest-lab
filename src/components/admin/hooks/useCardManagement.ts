
import { useState, useCallback, useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { useCardLoading } from "./card-management/useCardLoading";
import { useCardSelection } from "./card-management/useCardSelection";
import { useCardEditActions } from "./card-management/useCardEditActions";
import { useCardImport } from "./card-management/useCardImport";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";

export const useCardManagement = () => {
  const [activeTab, setActiveTab] = useState<CardType>("treasure");
  
  // Card loading functionality
  const {
    cards,
    loading,
    loadCards,
    getCardById,
    getActiveCards
  } = useCardLoading(activeTab);

  // Card selection functionality
  const {
    selectedCard,
    editingCard,
    isFormOpen,
    versionHistory,
    setSelectedCard,
    setEditingCard,
    setIsFormOpen,
    setVersionHistory,
    handleViewCard
  } = useCardSelection();

  // Card editing functionality
  const {
    handleAddNew,
    handleEditCard: editCard,
    handleFormSubmit,
    handleDeleteCard
  } = useCardEditActions(loadCards, setIsFormOpen, setEditingCard);

  // Card import functionality
  const { handleImport } = useCardImport(loadCards);

  // Initialize with a loadCards call
  useEffect(() => {
    loadCards().catch(error => {
      console.error("Initial card loading error:", error);
      toast.error("Failed to load cards. Please refresh the page.");
    });
    
    // Refresh cards every minute
    const refreshInterval = setInterval(() => {
      loadCards().catch(err => {
        console.error("Refresh cards error:", err);
      });
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, [loadCards]);

  // Extended version of handleEditCard that also sets activeTab and loads version history
  const handleEditCard = async (card: GameCard) => {
    setActiveTab(card.type as CardType);
    const history = await editCard(card);
    setVersionHistory(history);
    setIsFormOpen(true);
  };

  return {
    selectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    versionHistory,
    setSelectedCard,
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
    loadCards,
  };
};
