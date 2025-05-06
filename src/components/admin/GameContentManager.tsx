
import React, { useState, useEffect } from "react";
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
import { analyzeCardCounts } from "@/utils/diagnostics/cardCountDiagnostics";
import { toast } from "sonner";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";
import { useAllCardCounts } from "./hooks/useAllCardCounts";

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

  // Use our new hook for persistent card counts
  const { cardCounts, loading: countsLoading, refreshCardCounts } = useAllCardCounts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastLoadTime, setLastLoadTime] = useState<Date | null>(null);

  // Force initialization of card collections on first render
  useEffect(() => {
    if (!CardCollectionLoader.isLoaded()) {
      log.info("GameContentManager mounted - initializing card collections");
      CardCollectionLoader.loadAllCardCollections()
        .then(() => {
          log.info("Card collections initialized successfully");
          analyzeCardCounts();
          setLastLoadTime(new Date());
        })
        .catch(error => {
          log.error("Failed to initialize card collections", { error });
          toast.error("Failed to load cards. Please refresh the page.");
        });
    } else {
      log.info("GameContentManager mounted - card collections already loaded");
      setTimeout(() => {
        analyzeCardCounts();
        setLastLoadTime(new Date());
      }, 500);
    }
  }, []);

  // Force refresh of card data
  const handleRefreshCards = async () => {
    log.info("Manual refresh of cards requested", { cardType: activeTab });
    setIsRefreshing(true);
    try {
      // Re-initialize all card collections
      await CardCollectionLoader.loadAllCardCollections();
      // Now load the active tab cards
      await loadCards();
      // Refresh the card counts
      await refreshCardCounts();
      // Run diagnostics after refresh
      analyzeCardCounts();
      setLastLoadTime(new Date());
      log.info("Cards refreshed successfully", { cardType: activeTab });
      toast.success("Cards refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh cards:", error);
      log.error("Failed to refresh cards", { 
        error: error instanceof Error ? error.message : String(error),
        cardType: activeTab
      });
      toast.error("Failed to refresh cards. Please try again.");
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
    // Run diagnostics after import and refresh card counts
    setTimeout(async () => {
      analyzeCardCounts();
      await refreshCardCounts();
    }, 500);
  };

  const card = selectedCard ? getCardById(selectedCard) : null;
  const activeCards = getActiveCards();
  
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
        
        {lastLoadTime && (
          <div className="mb-4 text-xs text-muted-foreground">
            Last updated: {lastLoadTime.toLocaleTimeString()}
          </div>
        )}
        
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
