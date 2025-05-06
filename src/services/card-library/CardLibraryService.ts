
import { CardType, GameCard } from "@/types/cards";
import { CardCollectionLoader } from "./CardCollectionLoader";
import { CardQueryService } from "./CardQueryService";
import { toast } from "sonner";

/**
 * Main service for card library operations
 * Provides compatibility with CardService API
 */
export class CardLibraryService {
  /**
   * Initialize card collections if needed
   */
  private static async ensureInitialized(): Promise<void> {
    if (!CardCollectionLoader.isLoaded()) {
      await CardCollectionLoader.loadAllCardCollections();
    }
  }

  /**
   * Get a card by ID - compatible with CardService API
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    return CardQueryService.findCardById<T>(id);
  }

  /**
   * Get cards by type - compatible with CardService API
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    return CardQueryService.getCardsByType<T>(type);
  }

  /**
   * Get all cards - compatible with CardService API
   */
  static async getAllCards(): Promise<GameCard[]> {
    return CardQueryService.getAllCards();
  }

  /**
   * Search cards by text - compatible with CardService API
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    return CardQueryService.searchCards(query);
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
    return CardQueryService.validateCard(card, type);
  }
}
