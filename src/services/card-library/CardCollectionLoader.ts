
import { CardType, GameCard } from "@/types/cards";

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

/**
 * Responsible for loading and providing access to all card collections
 */
export class CardCollectionLoader {
  private static cardCollections: Record<CardType, GameCard[]> = {} as Record<CardType, GameCard[]>;
  
  /**
   * Load all card collections into memory
   */
  public static async loadAllCardCollections(): Promise<void> {
    try {
      // Import hazard cards
      this.cardCollections.hazard = HAZARD_CARDS;
      
      // Import NPC cards
      this.cardCollections.npc = NPC_CARDS;
      
      // Import mission cards
      this.cardCollections.mission = MISSION_CARDS;
      
      // Import treasure cards
      this.cardCollections.treasure = TREASURE_CARDS;
      
      // Import gear cards
      this.cardCollections.gear = GEAR_CARDS;
      
      // Import chaos cards
      this.cardCollections.chaos = CHAOS_CARDS;
      
      // Import automa cards
      this.cardCollections.automa = AUTOMA_CARDS;
      
      // Import flomanjified cards
      this.cardCollections.flomanjified = FLOMANJIFIED_CARDS;
      
      // Import player character cards
      this.cardCollections['player-character'] = FLOMANJI_PLAYER_CHARACTERS;
      
      console.log("Card collections loaded:", 
        Object.keys(this.cardCollections)
          .map(type => `${type}: ${this.cardCollections[type as CardType]?.length || 0}`)
      );
    } catch (error) {
      console.error("Error loading card collections:", error);
      throw new Error(`Failed to load card collections: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all loaded card collections
   */
  public static getCardCollections(): Record<CardType, GameCard[]> {
    return this.cardCollections;
  }

  /**
   * Check if card collections have been loaded
   */
  public static isLoaded(): boolean {
    return Object.keys(this.cardCollections).length > 0;
  }

  /**
   * Get a specific card collection by type
   */
  public static getCollection<T extends GameCard>(type: CardType): T[] {
    return (this.cardCollections[type] || []) as T[];
  }
}
