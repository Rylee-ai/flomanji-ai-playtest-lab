
import { CardType, GameCard } from "@/types/cards";
import { TreasureCard } from "@/types/cards/treasure";
import { HazardCard } from "@/types/cards/hazard";
import { GearCard } from "@/types/cards/gear";
import { NPCCard } from "@/types/cards/npc";
import { RegionCard } from "@/types/cards/region";
import { ChaosCard } from "@/types/cards/chaos";
import { SecretObjectiveCard } from "@/types/cards";
import { AutomaCard } from "@/types/cards";
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { PlayerCharacterCard } from "@/types/cards/player-character";
import { MissionSheet } from "@/types/cards/mission";
import { CardImportResult } from "@/types/cards/card-version";
import { CardFormValues } from "@/types/forms/card-form";
import { formatCardError } from "@/utils/error-handling/cardErrorHandler";

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
 * Service for loading card data from static files instead of a database
 * Maintains API compatibility with CardService for seamless transition
 */
export class CardLibraryService {
  // Cache for card collections
  private static cardCollections: Record<CardType, GameCard[]> = {} as Record<CardType, GameCard[]>;
  
  /**
   * Load all card collections into memory
   */
  private static async loadAllCardCollections(): Promise<void> {
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
      
      // Note: Add any missing card types here as they become available
      // For example: region, secret-objective, etc.
      
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
   * Get a card by ID - compatible with CardService API
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    try {
      // Ensure collections are loaded
      if (Object.keys(this.cardCollections).length === 0) {
        await this.loadAllCardCollections();
      }
      
      // Search all collections for the card
      for (const type in this.cardCollections) {
        const collection = this.cardCollections[type as CardType];
        const card = collection.find(card => card.id === id);
        if (card) {
          return card as T;
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Failed to get card with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Get cards by type - compatible with CardService API
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    try {
      // Ensure collections are loaded
      if (!this.cardCollections[type]) {
        await this.loadAllCardCollections();
      }
      
      return (this.cardCollections[type] || []) as T[];
    } catch (error) {
      console.error(`Failed to get cards of type ${type}:`, error);
      return [];
    }
  }

  /**
   * Get all cards - compatible with CardService API
   */
  static async getAllCards(): Promise<GameCard[]> {
    try {
      // Ensure collections are loaded
      if (Object.keys(this.cardCollections).length === 0) {
        await this.loadAllCardCollections();
      }
      
      // Combine all collections
      return Object.values(this.cardCollections).flat();
    } catch (error) {
      console.error('Failed to get all cards:', error);
      return [];
    }
  }

  /**
   * Search cards by text - compatible with CardService API
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    try {
      // Ensure collections are loaded
      if (Object.keys(this.cardCollections).length === 0) {
        await this.loadAllCardCollections();
      }
      
      const allCards = Object.values(this.cardCollections).flat();
      
      // Filter cards by name, type, or keywords
      return allCards.filter(card => 
        card.name.toLowerCase().includes(query.toLowerCase()) || 
        card.type.toLowerCase().includes(query.toLowerCase()) || 
        (card.keywords && card.keywords.some(k => 
          k.toLowerCase().includes(query.toLowerCase())
        ))
      );
    } catch (error) {
      console.error(`Failed to search cards with query "${query}":`, error);
      return [];
    }
  }
  
  /**
   * Mock implementation to maintain API compatibility - these operations
   * would require a different paradigm in a file-based system
   */
  static async saveCard<T extends GameCard>(card: T): Promise<T> {
    console.warn("CardLibraryService.saveCard: This operation is not supported in file-based mode");
    return card;
  }
  
  static async saveCards<T extends GameCard>(
    cards: T[],
    options?: any
  ): Promise<{ success: boolean; count: number; }> {
    console.warn("CardLibraryService.saveCards: This operation is not supported in file-based mode");
    return { success: true, count: cards.length };
  }
  
  static async deleteCard(id: string): Promise<boolean> {
    console.warn("CardLibraryService.deleteCard: This operation is not supported in file-based mode");
    return true;
  }
  
  static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    // We can still use validation logic even in file-based mode
    try {
      // This would call card schema validation
      return { valid: true, errors: [] };
    } catch (error) {
      const formattedError = formatCardError(error, 'validateCard');
      return { valid: false, errors: [formattedError.message] };
    }
  }
}
