
import { CardType, GameCard } from "@/types/cards";
import { log } from "@/utils/logging";

// Import all card collections
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { NPC_CARDS } from "@/lib/cards/npc-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { AUTOMA_CARDS } from "@/lib/cards/automa-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { FLOMANJI_PLAYER_CHARACTERS } from "@/lib/cards/flomanji-player-characters";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { REGION_CARDS } from "@/lib/cards/region-cards";

/**
 * Responsible for loading and providing access to all card collections
 */
export class CardCollectionLoader {
  private static cardCollections: Record<CardType, GameCard[]> = {} as Record<CardType, number>;
  private static isInitialized: boolean = false;
  
  /**
   * Load all card collections into memory
   */
  public static async loadAllCardCollections(): Promise<void> {
    try {
      log.info("Loading all card collections", { timestamp: new Date().toISOString() });
      
      // Import hazard cards
      this.cardCollections.hazard = HAZARD_CARDS;
      log.debug("Loaded hazard cards", { count: HAZARD_CARDS.length });
      
      // Import NPC cards
      this.cardCollections.npc = NPC_CARDS;
      log.debug("Loaded NPC cards", { count: NPC_CARDS.length });
      
      // Import mission cards
      this.cardCollections.mission = MISSION_CARDS;
      log.debug("Loaded mission cards", { count: MISSION_CARDS.length });
      
      // Import treasure cards
      this.cardCollections.treasure = TREASURE_CARDS;
      log.debug("Loaded treasure cards", { count: TREASURE_CARDS.length });
      
      // Import gear cards
      this.cardCollections.gear = GEAR_CARDS;
      log.debug("Loaded gear cards", { count: GEAR_CARDS.length });
      
      // Import chaos cards
      this.cardCollections.chaos = CHAOS_CARDS;
      log.debug("Loaded chaos cards", { count: CHAOS_CARDS.length });
      
      // Import automa cards
      this.cardCollections.automa = AUTOMA_CARDS;
      log.debug("Loaded automa cards", { count: AUTOMA_CARDS.length });
      
      // Import flomanjified cards
      this.cardCollections.flomanjified = FLOMANJIFIED_CARDS;
      log.debug("Loaded flomanjified cards", { count: FLOMANJIFIED_CARDS.length });
      
      // Import player character cards
      this.cardCollections['player-character'] = FLOMANJI_PLAYER_CHARACTERS;
      log.debug("Loaded player character cards", { count: FLOMANJI_PLAYER_CHARACTERS.length });
      
      // Import secret objective cards
      this.cardCollections.secret = SECRET_OBJECTIVES;
      log.debug("Loaded secret objective cards", { count: SECRET_OBJECTIVES.length });
      
      // Import region cards
      this.cardCollections.region = REGION_CARDS;
      log.debug("Loaded region cards", { count: REGION_CARDS.length });
      
      // Mark as initialized after loading everything
      this.isInitialized = true;
      
      log.info("All card collections loaded", { 
        totalCards: Object.values(this.cardCollections).reduce((total, cards) => total + cards.length, 0),
        collectionSizes: Object.keys(this.cardCollections)
          .map(type => `${type}: ${this.cardCollections[type as CardType]?.length || 0}`)
      });
    } catch (error) {
      this.isInitialized = false;
      log.error("Error loading card collections", { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error("Error loading card collections:", error);
      throw new Error(`Failed to load card collections: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all loaded card collections
   */
  public static getCardCollections(): Record<CardType, GameCard[]> {
    if (!this.isInitialized) {
      log.warn("Attempting to get card collections before initialization");
      // Initialize synchronously if not done yet
      this.loadAllCardCollections().catch(error => {
        console.error("Failed to load card collections:", error);
      });
    }
    return this.cardCollections;
  }

  /**
   * Check if card collections have been loaded
   */
  public static isLoaded(): boolean {
    return this.isInitialized;
  }

  /**
   * Get a specific card collection by type
   */
  public static getCollection<T extends GameCard>(type: CardType): T[] {
    if (!this.isInitialized) {
      log.warn(`Attempting to get ${type} collection before initialization`);
      // Initialize synchronously if not done yet
      this.loadAllCardCollections().catch(error => {
        console.error("Failed to load card collections:", error);
      });
    }
    const collection = this.cardCollections[type] || [];
    log.debug(`Getting collection for type: ${type}`, { count: collection.length });
    return collection as T[];
  }
}
