
import { GameCard, CardType } from "@/types/cards";
import { log } from "@/utils/logging";
import { toast } from "sonner";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";
import { NPC_CARDS } from "@/lib/cards/npcs";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified";
import { TREASURE_CARDS } from "@/lib/cards/treasures";

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
      
      // Load player character cards
      CardCollectionLoader.collections["player-character"] = [...PLAYER_CHARACTER_CARDS];
      log.info(`Loaded ${PLAYER_CHARACTER_CARDS.length} player character cards`);
      
      // Load NPC cards
      CardCollectionLoader.collections["npc"] = [...NPC_CARDS];
      log.info(`Loaded ${NPC_CARDS.length} NPC cards`);
      
      // Load gear cards
      CardCollectionLoader.collections["gear"] = [...GEAR_CARDS];
      log.info(`Loaded ${GEAR_CARDS.length} gear cards`);
      
      // Load chaos cards
      CardCollectionLoader.collections["chaos"] = [...CHAOS_CARDS];
      log.info(`Loaded ${CHAOS_CARDS.length} chaos cards`);
      
      // Load flomanjified cards
      CardCollectionLoader.collections["flomanjified"] = [...FLOMANJIFIED_CARDS];
      log.info(`Loaded ${FLOMANJIFIED_CARDS.length} flomanjified cards`);
      
      // Load treasure cards and artifact cards separately
      const treasureCards = TREASURE_CARDS.filter(card => card.type === "treasure");
      const artifactCards = TREASURE_CARDS.filter(card => card.type === "artifact");
      
      CardCollectionLoader.collections["treasure"] = treasureCards;
      CardCollectionLoader.collections["artifact"] = artifactCards;
      
      log.info(`Loaded ${treasureCards.length} treasure cards and ${artifactCards.length} artifact cards (${TREASURE_CARDS.length} total)`);
      
      // Additional card types can be loaded here as they're implemented

      log.info("Card collections initialized", { 
        collectionCount: Object.keys(CardCollectionLoader.collections).length,
        playerCharacterCount: CardCollectionLoader.collections["player-character"].length,
        npcCount: CardCollectionLoader.collections["npc"].length,
        flomanjifiedCount: CardCollectionLoader.collections["flomanjified"].length,
        treasureCount: CardCollectionLoader.collections["treasure"].length,
        artifactCount: CardCollectionLoader.collections["artifact"].length
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
