
import { useState, useCallback, useEffect, useMemo } from "react";
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
  
  // Ensure CardCollectionLoader is initialized on mount - but only do this once
  useEffect(() => {
    const ensureCollectionsLoaded = async () => {
      if (!CardCollectionLoader.isLoaded() && !CardCollectionLoader.isCurrentlyLoading()) {
        log.info("Initializing card collections on useCardManagement mount");
        try {
          await CardCollectionLoader.loadAllCardCollections();
          log.info("Card collections loaded in useCardManagement");
        } catch (error) {
          log.error("Failed to initialize card collections", { error });
          toast.error("Failed to load cards. Please try refreshing the page.");
        }
      }
    };
    
    ensureCollectionsLoaded();
  }, []);
  
  // Card loading functionality with the active tab
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
  // Use a debounced version to prevent excessive calls
  useEffect(() => {
    log.info("Loading cards for tab", { activeTab });
    
    let isMounted = true;
    
    const loadCardsAndLog = async () => {
      try {
        const loadedCards = await loadCards();
        
        if (isMounted) {
          log.info("Successfully loaded cards", { 
            cardType: activeTab,
            count: loadedCards.length 
          });
        }
      } catch (error) {
        if (isMounted) {
          console.error("Initial card loading error:", error);
          log.error("Failed to load cards", { error, cardType: activeTab });
          toast.error("Failed to load cards. Please refresh the page.");
        }
      }
    };
    
    loadCardsAndLog();
    
    // Only set up refresh interval if no global refresh is happening
    const refreshInterval = setInterval(() => {
      if (isMounted) {
        log.debug("Auto-refreshing cards", { cardType: activeTab });
        loadCards().catch(err => {
          if (isMounted) {
            log.error("Auto-refresh cards error:", { error: err, cardType: activeTab });
          }
        });
      }
    }, 180000); // 3 minutes
    
    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
      log.debug("Cleaned up card refresh interval", { cardType: activeTab });
    };
  }, [activeTab, loadCards]);

  // Extended version of handleEditCard that also sets activeTab and loads version history
  const handleEditCard = useCallback(async (card: GameCard) => {
    log.info("Editing card", { id: card.id, name: card.name, type: card.type });
    setActiveTab(card.type as CardType);
    const history = await editCard(card);
    setVersionHistory(history);
    setIsFormOpen(true);
  }, [editCard, setActiveTab, setIsFormOpen, setVersionHistory]);

  // Enhanced import handler with better logging
  const enhancedImportHandler = useCallback((cards: CardFormValues[], results: CardImportResult) => {
    log.info("Importing cards", { 
      count: cards.length, 
      type: activeTab,
      success: results.imported || 0,
      failed: results.failed || 0
    });
    
    return handleImport(cards, results);
  }, [activeTab, handleImport]);

  // Handle tab change with minimal performance impact
  const handleTabChange = useCallback((newTab: CardType) => {
    if (newTab === activeTab) return;
    
    log.info("Changing active tab", { from: activeTab, to: newTab });
    setActiveTab(newTab);
  }, [activeTab]);

  return {
    selectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    versionHistory,
    setSelectedCard,
    setActiveTab: handleTabChange,
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
