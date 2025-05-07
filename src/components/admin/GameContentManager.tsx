import React, { useState, useEffect, useCallback } from "react";
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
    loading: cardsLoading,
    cards
  } = useCardManagement();

  // Use our hook for persistent card counts across all tabs
  const { cardCounts, loading: countsLoading, refreshCardCounts, lastUpdated } = useAllCardCounts();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Force initialization of card collections on first render, but only once
  useEffect(() => {
    const initializeCards = async () => {
      log.info("GameContentManager mounted - initializing card collections");
      try {
        // Reset collections to ensure a clean start
        CardCollectionLoader.resetCollections();
        
        // Force re-initialization of card collections to ensure we load the latest data
        await CardCollectionLoader.loadAllCardCollections();
        
        // Log detailed information about treasure cards for debugging
        const treasureCollection = CardCollectionLoader.getCardCollection("treasure");
        
        log.info("Card collections initialized with treasure data", {
          treasureCount: treasureCollection.length,
          allCollections: Object.keys(CardCollectionLoader.getCardCollections())
        });
        
        analyzeCardCounts();
        
        // Also refresh the current active tab's cards 
        await loadCards();
        
        // Refresh card counts to update UI
        await refreshCardCounts();
        
        // Display success message
        toast.success(`Card library loaded with ${treasureCollection.length} treasure & artifact cards`);
      } catch (error) {
        log.error("Failed to initialize card collections", { 
          error: error instanceof Error ? error.message : String(error) 
        });
        toast.error("Failed to load cards. Please refresh the page.");
      }
    };

    initializeCards();
  }, [loadCards, refreshCardCounts]);

  // Force refresh of card data - optimized to avoid race conditions
  const handleRefreshCards = useCallback(async () => {
    if (isRefreshing) return; // Prevent multiple simultaneous refreshes
    
    log.info("Manual refresh of cards requested", { cardType: activeTab });
    setIsRefreshing(true);
    
    try {
      // Reset collections first to ensure a clean reload
      CardCollectionLoader.resetCollections();
      
      // Re-initialize all card collections
      await CardCollectionLoader.loadAllCardCollections();
      
      // Refresh both the active tab cards and all card counts
      await Promise.all([
        loadCards(),
        refreshCardCounts()
      ]);
      
      // Log detailed information about treasure cards for debugging
      if (activeTab === "treasure") {
        const treasureCards = CardCollectionLoader.getCardCollection("treasure");
        const artifactCards = CardCollectionLoader.getCardCollection("artifact");
        
        log.info("Treasure cards refreshed with counts", {
          treasureCount: treasureCards.length,
          artifactCount: artifactCards.length,
          totalTreasureCards: treasureCards.length + artifactCards.length
        });
      }
      
      // Run diagnostics after refresh
      analyzeCardCounts();
      log.info("Cards refreshed successfully", { cardType: activeTab });
      toast.success("Cards refreshed successfully");
    } catch (error) {
      log.error("Failed to refresh cards", { 
        error: error instanceof Error ? error.message : String(error),
        cardType: activeTab
      });
      toast.error("Failed to refresh cards. Please try again.");
    } finally {
      setIsRefreshing(false);
    }
  }, [activeTab, loadCards, refreshCardCounts, isRefreshing]);

  // Handle import completion with optimized refresh
  const handleCardImport = useCallback((cards, results) => {
    log.info("Card import completed", { 
      count: cards.length,
      cardType: activeTab,
      results
    });
    
    // Import the cards first
    handleImport(cards, results);
    
    // Then refresh card counts without reloading everything
    setTimeout(async () => {
      analyzeCardCounts();
      await refreshCardCounts();
    }, 300);
  }, [activeTab, handleImport, refreshCardCounts]);

  const card = selectedCard ? getCardById(selectedCard) : null;
  const activeCards = getActiveCards();
  const loading = cardsLoading || countsLoading;
  
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <ContentManagerHeader 
          onAddNew={handleAddNew}
          onRefresh={handleRefreshCards || (() => {})}
          isRefreshing={isRefreshing}
          onImport={handleImport}
          activeTab={activeTab}
        />
        
        {lastUpdated && (
          <div className="mb-4 text-xs text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
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

export default React.memo(GameContentManager);
