
import { CardType, GameCard } from "@/types/cards";
import { CardCollectionLoader } from "./CardCollectionLoader";
import { formatCardError } from "@/utils/error-handling/cardErrorHandler";
import { log } from "@/utils/logging";

/**
 * Responsible for querying card collections
 */
export class CardQueryService {
  /**
   * Find a card by ID across all collections
   */
  public static async findCardById<T extends GameCard>(id: string): Promise<T | null> {
    try {
      // Ensure collections are loaded
      if (!CardCollectionLoader.isLoaded()) {
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      const collections = CardCollectionLoader.getCardCollections();
      
      // Search all collections for the card
      for (const type in collections) {
        const collection = collections[type as CardType];
        const card = collection.find(card => card.id === id);
        if (card) {
          log.debug(`Found card with ID ${id} in ${type} collection`);
          return card as T;
        }
      }
      
      log.warn(`Card with ID ${id} not found in any collection`);
      return null;
    } catch (error) {
      log.error(`Failed to get card with ID ${id}`, { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error(`Failed to get card with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Get all cards of a specific type
   */
  public static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    try {
      // Ensure collections are loaded
      if (!CardCollectionLoader.isLoaded()) {
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      // Fixed: Changed getCollection to getCardCollection
      const cards = CardCollectionLoader.getCardCollection(type) as T[];
      log.debug(`Retrieved ${cards.length} cards of type ${type}`);
      return cards;
    } catch (error) {
      log.error(`Failed to get cards of type ${type}`, { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error(`Failed to get cards of type ${type}:`, error);
      return [];
    }
  }

  /**
   * Get all cards from all collections
   */
  public static async getAllCards(): Promise<GameCard[]> {
    try {
      // Ensure collections are loaded
      if (!CardCollectionLoader.isLoaded()) {
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      const collections = CardCollectionLoader.getCardCollections();
      const allCards = Object.values(collections).flat();
      log.debug(`Retrieved ${allCards.length} total cards from all collections`);
      return allCards;
    } catch (error) {
      log.error('Failed to get all cards', { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error('Failed to get all cards:', error);
      return [];
    }
  }

  /**
   * Search for cards by text across all collections
   */
  public static async searchCards(query: string): Promise<GameCard[]> {
    try {
      // Ensure collections are loaded
      if (!CardCollectionLoader.isLoaded()) {
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      const allCards = await this.getAllCards();
      const lowercaseQuery = query.toLowerCase();
      
      // Filter cards by name, type, or keywords
      const results = allCards.filter(card => 
        card.name.toLowerCase().includes(lowercaseQuery) || 
        card.type.toLowerCase().includes(lowercaseQuery) || 
        (card.keywords && card.keywords.some(k => 
          k.toLowerCase().includes(lowercaseQuery)
        ))
      );
      
      log.debug(`Search for "${query}" returned ${results.length} results`);
      return results;
    } catch (error) {
      log.error(`Failed to search cards with query "${query}"`, { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      console.error(`Failed to search cards with query "${query}":`, error);
      return [];
    }
  }

  /**
   * Validate a card against schema
   */
  public static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    try {
      // This would call card schema validation
      return { valid: true, errors: [] };
    } catch (error) {
      const formattedError = formatCardError(error, 'validateCard');
      return { valid: false, errors: [formattedError.message] };
    }
  }
}
