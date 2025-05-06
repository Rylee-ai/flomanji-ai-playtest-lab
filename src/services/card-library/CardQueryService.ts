
import { CardType, GameCard } from "@/types/cards";
import { CardCollectionLoader } from "./CardCollectionLoader";
import { formatCardError } from "@/utils/error-handling/cardErrorHandler";

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
   * Get all cards of a specific type
   */
  public static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    try {
      // Ensure collections are loaded
      if (!CardCollectionLoader.isLoaded()) {
        await CardCollectionLoader.loadAllCardCollections();
      }
      
      return CardCollectionLoader.getCollection<T>(type);
    } catch (error) {
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
      return Object.values(collections).flat();
    } catch (error) {
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
      return allCards.filter(card => 
        card.name.toLowerCase().includes(lowercaseQuery) || 
        card.type.toLowerCase().includes(lowercaseQuery) || 
        (card.keywords && card.keywords.some(k => 
          k.toLowerCase().includes(lowercaseQuery)
        ))
      );
    } catch (error) {
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
