
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CardPreviewModal } from "./CardPreviewModal";
import { CardForm } from "./CardForm";
import { useCardManagement } from "./hooks/useCardManagement";
import { CardType } from "@/types/cards";
import { log } from "@/utils/logging";
import { ContentManagerHeader } from "./cards/ContentManagerHeader";
import { CharacterCards, ItemsAndEncounterCards, GameStructureCards } from "./cards/CardCategories";
import { CardContentDisplay } from "./cards/CardContentDisplay";
import { calculateCardCounts } from "./utils/cardCountUtils";

const GameContentManager = () => {
  const {
    selectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    versionHistory,
    setActiveTab,
    setIsFormOpen,
    setSelectedCard,
    getCardById,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
    handleDeleteCard,
    getActiveCards,
    loadCards,
    handleImport,
    loading,
    cards
  } = useCardManagement();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Force refresh of card data
  const handleRefreshCards = async () => {
    log.info("Manual refresh of cards requested", { cardType: activeTab });
    setIsRefreshing(true);
    try {
      await loadCards();
      log.info("Cards refreshed successfully", { cardType: activeTab });
    } catch (error) {
      console.error("Failed to refresh cards:", error);
      log.error("Failed to refresh cards", { error, cardType: activeTab });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle import completion
  const handleCardImport = (cards, results) => {
    log.info("Card import completed", { 
      count: cards.length,
      cardType: activeTab,
      results
    });
    handleImport(cards, results);
  };

  const card = selectedCard ? getCardById(selectedCard) : null;
  const activeCards = getActiveCards();
  
  // Calculate card counts from the full cards array
  const cardCounts = calculateCardCounts(cards);
  
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <ContentManagerHeader 
          onAddNew={handleAddNew}
          onRefresh={handleRefreshCards}
          isRefreshing={isRefreshing}
          onImport={handleCardImport}
          activeTab={activeTab}
        />
        
        <Tabs value={activeTab} onValueChange={value => setActiveTab(value as CardType)} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <CharacterCards 
              activeTab={activeTab} 
              cardCounts={cardCounts} 
            />

            <ItemsAndEncounterCards 
              activeTab={activeTab} 
              cardCounts={cardCounts} 
            />

            <GameStructureCards 
              activeTab={activeTab}
              cardCounts={cardCounts} 
            />
          </div>

          <CardContentDisplay
            activeTab={activeTab}
            loading={loading}
            cards={activeCards}
            onViewCard={handleViewCard}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
          />
        </Tabs>

        {card && (
          <CardPreviewModal 
            card={card} 
            onClose={() => setSelectedCard(null)} 
            onEdit={() => handleEditCard(card)} 
          />
        )}

        <CardForm 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleFormSubmit} 
          initialData={editingCard} 
          activeTab={activeTab}
          versionHistory={versionHistory}
        />
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
