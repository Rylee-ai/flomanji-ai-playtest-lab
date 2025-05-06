
import { useState, useEffect, useMemo } from "react";
import { CardType } from "@/types/cards";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";
import { calculateCardCounts } from "../utils/cardCountUtils";
import { log } from "@/utils/logging";
import { toast } from "sonner";

/**
 * Hook to provide persistent card counts across all collections,
 * regardless of which tab is currently active
 */
export const useAllCardCounts = () => {
  const [cardCounts, setCardCounts] = useState<Record<CardType | string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadAllCardCounts = async () => {
      setLoading(true);
      log.info("Loading all card counts");
      
      try {
        // Ensure the CardCollectionLoader is initialized
        if (!CardCollectionLoader.isLoaded()) {
          await CardCollectionLoader.loadAllCardCollections();
        }
        
        // Get all cards from all collections
        const collections = CardCollectionLoader.getCardCollections();
        const allCards = Object.values(collections).flat();
        
        // Calculate counts using the existing utility
        const counts = calculateCardCounts(allCards);
        
        // Combine treasure and artifact counts for the UI
        if (counts["treasure"] && counts["artifact"]) {
          counts["treasure"] = counts["treasure"] + counts["artifact"];
        }
        
        log.info("All card counts loaded", { 
          totalCards: allCards.length,
          counts 
        });
        
        setCardCounts(counts);
        setLastUpdated(new Date());
      } catch (error) {
        log.error("Failed to load all card counts", { 
          error: error instanceof Error ? error.message : String(error) 
        });
        toast.error("Failed to load card counts. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    loadAllCardCounts();
    
    // Set up refresh interval
    const refreshInterval = setInterval(() => {
      log.debug("Auto-refreshing all card counts");
      loadAllCardCounts();
    }, 180000); // 3 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);

  /**
   * Manually trigger a refresh of all card counts
   */
  const refreshCardCounts = async () => {
    setLoading(true);
    log.info("Manually refreshing all card counts");
    
    try {
      // Force re-initialization of card collections
      await CardCollectionLoader.loadAllCardCollections();
      
      // Get updated collections
      const collections = CardCollectionLoader.getCardCollections();
      const allCards = Object.values(collections).flat();
      
      // Calculate updated counts
      const counts = calculateCardCounts(allCards);
      
      // Combine treasure and artifact counts for the UI
      if (counts["treasure"] && counts["artifact"]) {
        counts["treasure"] = counts["treasure"] + counts["artifact"];
      }
      
      log.info("All card counts refreshed", { 
        totalCards: allCards.length,
        counts 
      });
      
      setCardCounts(counts);
      setLastUpdated(new Date());
      return true;
    } catch (error) {
      log.error("Failed to refresh all card counts", { 
        error: error instanceof Error ? error.message : String(error) 
      });
      toast.error("Failed to refresh card counts. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Memoized card counts to prevent unnecessary re-renders
  const memoizedCardCounts = useMemo(() => cardCounts, [cardCounts]);

  return {
    cardCounts: memoizedCardCounts,
    loading,
    refreshCardCounts,
    lastUpdated
  };
};
