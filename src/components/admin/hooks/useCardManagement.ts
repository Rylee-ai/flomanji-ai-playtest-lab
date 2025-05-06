import { useState, useCallback, useEffect } from "react";
import { CardType, GameCard } from "@/types/cards";
import { useCardLoading } from "./card-management/useCardLoading";
import { useCardSelection } from "./card-management/useCardSelection";
import { useCardEditActions } from "./card-management/useCardEditActions";
import { useCardImport } from "./card-management/useCardImport";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";
import { log } from "@/utils/logging";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { analyzeCardCounts } from "@/utils/diagnostics/cardCountDiagnostics";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";

export const useCardManagement = () => {
  const [activeTab, setActiveTab] = useState<CardType>("treasure");
  
  // Ensure CardCollectionLoader is initialized on mount
  useEffect(() => {
    if (!CardCollectionLoader.isLoaded()) {
      log.info("Initializing card collections on useCardManagement mount");
      CardCollectionLoader.loadAllCardCollections().catch(error => {
        log.error("Failed to initialize card collections", { error });
      });
    }
  }, []);
  
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

  // Initialize with a loadCards call and log the result
  useEffect(() => {
    log.info("Loading cards for tab", { activeTab });
    
    loadCards()
      .then(loadedCards => {
        log.info("Successfully loaded cards", { 
          cardType: activeTab,
          count: loadedCards.length 
        });
        
        // Run diagnostics after successful load
        setTimeout(() => {
          analyzeCardCounts();
        }, 500);
      })
      .catch(error => {
        console.error("Initial card loading error:", error);
        log.error("Failed to load cards", { error, cardType: activeTab });
        toast.error("Failed to load cards. Please refresh the page.");
      });
    
    // Refresh cards every 2 minutes
    const refreshInterval = setInterval(() => {
      log.debug("Auto-refreshing cards", { cardType: activeTab });
      loadCards().catch(err => {
        log.error("Auto-refresh cards error:", { error: err, cardType: activeTab });
      });
    }, 120000); // 2 minutes
    
    return () => {
      clearInterval(refreshInterval);
      log.debug("Cleaned up card refresh interval", { cardType: activeTab });
    };
  }, [loadCards, activeTab]);

  // Reload cards when activeTab changes AND force re-init of CardCollectionLoader
  useEffect(() => {
    log.info("Active tab changed, reloading cards", { newTab: activeTab });
    
    // Force re-initialization of card collections to ensure all are loaded
    CardCollectionLoader.loadAllCardCollections()
      .then(() => {
        log.info("Card collections reloaded after tab change");
        loadCards().catch(error => {
          log.error("Failed to load cards after tab change", { error, cardType: activeTab });
        });
      })
      .catch(error => {
        log.error("Failed to reload card collections after tab change", { error });
      });
      
  }, [activeTab, loadCards]);

  // Extended version of handleEditCard that also sets activeTab and loads version history
  const handleEditCard = async (card: GameCard) => {
    log.info("Editing card", { id: card.id, name: card.name, type: card.type });
    setActiveTab(card.type as CardType);
    const history = await editCard(card);
    setVersionHistory(history);
    setIsFormOpen(true);
  };

  // Enhanced import handler with better logging
  const enhancedImportHandler = (cards: CardFormValues[], results: CardImportResult) => {
    log.info("Importing cards", { 
      count: cards.length, 
      type: activeTab,
      success: results.imported || 0,
      failed: results.failed || 0
    });
    
    return handleImport(cards, results);
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
    handleImport: enhancedImportHandler,
    loading,
    cards,
    loadCards,
  };
};
