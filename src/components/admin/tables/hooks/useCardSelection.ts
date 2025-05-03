
import { useState } from "react";
import { GameCard } from "@/types/cards";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

// Protected brand assets - MUST NOT be modified without explicit permission
const PROTECTED_BRAND_ASSETS = [
  "/lovable-uploads/e5635414-17a2-485e-86cb-feaf926b9af5.png", // Flomanji card back
];

export const useCardSelection = (cards: GameCard[]) => {
  const [cardToDelete, setCardToDelete] = useState<GameCard | null>(null);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState<GameCard[]>([]);

  const handleDeleteCard = (card: GameCard) => {
    // Prevent deletion of cards with protected brand assets
    if (card.imageUrl && PROTECTED_BRAND_ASSETS.includes(card.imageUrl)) {
      showErrorToast('Cannot delete cards with protected brand assets');
      return;
    }
    setCardToDelete(card);
  };

  const handleSelectCard = (card: GameCard, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCards(prev => [...prev, card]);
    } else {
      setSelectedCards(prev => prev.filter(c => c.id !== card.id));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    setSelectAll(isSelected);
    if (isSelected) {
      setSelectedCards([...cards]);
    } else {
      setSelectedCards([]);
    }
  };

  const handleBulkEditComplete = (updatedCards: GameCard[]) => {
    // Clear selection
    setSelectedCards([]);
    setSelectAll(false);
    
    // Show success message
    showSuccessToast(`Updated ${updatedCards.length} cards`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCards([]);
      return;
    }
    
    // Filter cards by name, type, or keywords
    const filtered = cards.filter((card) => 
      card.name.toLowerCase().includes(query.toLowerCase()) || 
      card.type.toLowerCase().includes(query.toLowerCase()) || 
      (card.keywords && card.keywords.some(k => k.toLowerCase().includes(query.toLowerCase())))
    );
    
    setFilteredCards(filtered);
  };

  const handleImageUpload = async (cardId: string, imageUrl: string) => {
    // Brand protection check - prevent modifications to brand assets
    const cardToUpdate = cards.find(card => card.id === cardId);
    if (cardToUpdate && cardToUpdate.imageUrl && PROTECTED_BRAND_ASSETS.includes(cardToUpdate.imageUrl)) {
      showErrorToast('Cannot modify protected brand assets');
      return;
    }
    
    console.log('Image uploaded for card:', cardId, imageUrl);
  };

  return {
    cardToDelete,
    setCardToDelete,
    selectedCards,
    selectAll,
    searchQuery, 
    filteredCards,
    handleDeleteCard,
    handleSelectCard,
    handleSelectAll,
    handleBulkEditComplete,
    handleImageUpload,
    handleSearch
  };
};
