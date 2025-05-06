
import { useCallback, useState, useEffect, useRef } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";
import { log } from "@/utils/logging";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";

export const useCardLoading = (activeTab: CardType) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [loading, setLoading] = useState(false);
  const initialLoadCompleted = useRef(false);
  const activeRequest = useRef<AbortController | null>(null);

  // Load cards whenever activeTab changes
  useEffect(() => {
    loadCards().catch(error => {
      log.error("Failed to load cards in useEffect", { 
        error: error instanceof Error ? error.message : String(error),
        activeTab
      });
    });
    
    return () => {
      // Cancel any in-flight requests when the tab changes
      if (activeRequest.current) {
        activeRequest.current.abort();
        activeRequest.current = null;
      }
    };
  }, [activeTab]);

  const loadCards = useCallback(async (): Promise<GameCard[]> => {
    log.info("Loading cards", { cardType: activeTab, timestamp: new Date().toISOString() });
    
    // Cancel any in-flight requests
    if (activeRequest.current) {
      activeRequest.current.abort();
    }
    
    // Create a new abort controller for this request
    activeRequest.current = new AbortController();
    
    setLoading(true);
    
    try {
      // Ensure the CardCollectionLoader is initialized
      if (!CardCollectionLoader.isLoaded()) {
        log.info("Initializing CardCollectionLoader before loading cards", { cardType: activeTab });
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      // Load cards from CardService which uses CardLibraryService
      const startTime = performance.now();
      const loadedCards = await CardService.getCardsByType(activeTab);
      const endTime = performance.now();
      
      // Check if the request was aborted during loading
      if (activeRequest.current?.signal.aborted) {
        log.info(`Card loading for ${activeTab} was aborted`);
        return [];
      }
      
      log.info(`Loaded ${loadedCards.length} ${activeTab} cards in ${Math.round(endTime - startTime)}ms`);
      
      if (loadedCards.length === 0) {
        log.warn(`No ${activeTab} cards found in file-based library`);
        
        // Only show warning toast if we know there should be cards for this type
        // and only on initial load, not on refreshes
        const shouldHaveCards = ['gear', 'treasure', 'hazard', 'npc', 'player-character', 'mission'].includes(activeTab);
        if (shouldHaveCards && !initialLoadCompleted.current) {
          toast.warning(`No ${activeTab} cards found. Check your card collections.`);
        }
      }
      
      // Set the loaded cards and mark initial load as completed
      setCards(loadedCards);
      initialLoadCompleted.current = true;
      
      return loadedCards;
    } catch (error) {
      // If the error is due to the request being aborted, don't log it as an error
      if (error instanceof DOMException && error.name === 'AbortError') {
        log.info(`Card loading for ${activeTab} was aborted by user`);
        return [];
      }
      
      console.error("Error loading cards:", error);
      log.error("Failed to load cards", { 
        error: error instanceof Error ? error.message : String(error),
        cardType: activeTab,
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Show error toast for failed loads except on initial page load
      if (initialLoadCompleted.current) {
        toast.error(`Failed to load ${activeTab} cards. Try refreshing.`);
      }
      
      return [];
    } finally {
      // Only clear loading state if this is still the active request
      if (!activeRequest.current?.signal.aborted) {
        setLoading(false);
        activeRequest.current = null;
      }
    }
  }, [activeTab]);

  // Get a specific card by ID
  const getCardById = useCallback((id: string) => {
    return cards.find(card => card.id === id);
  }, [cards]);

  // Get the currently active cards (filtered by tab)
  const getActiveCards = useCallback(() => {
    return cards;
  }, [cards]);

  return {
    cards,
    loading,
    loadCards,
    getCardById,
    getActiveCards,
  };
};
