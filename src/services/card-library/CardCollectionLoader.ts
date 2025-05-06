
import { GameCard, CardType } from "@/types/cards";
import { log } from "@/utils/logging";
import { toast } from "sonner";

/**
 * Service responsible for loading and caching card collections
 */
export class CardCollectionLoader {
  private static collections: Record<CardType, GameCard[]> = {} as Record<CardType, GameCard[]>;
  private static isLoadingCards = false;
  private static hasLoadedCards = false;
  private static loadError: Error | null = null;

  /**
   * Check if card collections have been loaded
   */
  public static isLoaded(): boolean {
    return CardCollectionLoader.hasLoadedCards;
  }

  /**
   * Check if card collections are currently being loaded
   */
  public static isCurrentlyLoading(): boolean {
    return CardCollectionLoader.isLoadingCards;
  }

  /**
   * Get all card collections
   */
  public static getCardCollections(): Record<CardType, GameCard[]> {
    if (!CardCollectionLoader.hasLoadedCards) {
      log.warn("Attempting to access card collections before they've been loaded");
    }
    return CardCollectionLoader.collections;
  }

  /**
   * Get a specific card collection by type
   */
  public static getCardCollection(type: CardType): GameCard[] {
    if (!CardCollectionLoader.hasLoadedCards) {
      log.warn(`Attempting to access ${type} card collection before it's been loaded`);
      return [];
    }
    return CardCollectionLoader.collections[type] || [];
  }

  /**
   * Load all card collections from various sources
   */
  public static async loadAllCardCollections(): Promise<void> {
    // Prevent concurrent loads
    if (CardCollectionLoader.isLoadingCards) {
      log.debug("Card collections are already being loaded");
      return;
    }

    try {
      CardCollectionLoader.isLoadingCards = true;
      CardCollectionLoader.loadError = null;
      
      log.info("Loading card collections");
      
      // Initialize empty collections for each card type
      const cardTypes: CardType[] = [
        "player-character",
        "npc",
        "flomanjified",
        "treasure",
        "artifact",
        "gear",
        "hazard",
        "chaos",
        "region",
        "mission",
        "secret",
        "automa",
        "exploration",
        "escape",
        "escort",
        "collection",
        "boss",
        "solo"
      ];
      
      // Initialize each collection as empty
      cardTypes.forEach(type => {
        CardCollectionLoader.collections[type] = [];
      });

      log.info("Card collections initialized as empty", { 
        collectionCount: Object.keys(CardCollectionLoader.collections).length 
      });
      
      CardCollectionLoader.hasLoadedCards = true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log.error("Failed to load card collections", { error: errorMessage });
      CardCollectionLoader.loadError = error instanceof Error ? error : new Error(String(error));
      toast.error("Failed to load card library. Please try refreshing.");
      throw error;
    } finally {
      CardCollectionLoader.isLoadingCards = false;
    }
  }

  /**
   * Get the loading error if one occurred
   */
  public static getLoadError(): Error | null {
    return CardCollectionLoader.loadError;
  }

  /**
   * Reset the card collections (useful for testing or when reloading)
   */
  public static resetCollections(): void {
    CardCollectionLoader.collections = {} as Record<CardType, GameCard[]>;
    CardCollectionLoader.hasLoadedCards = false;
    CardCollectionLoader.loadError = null;
  }
}
