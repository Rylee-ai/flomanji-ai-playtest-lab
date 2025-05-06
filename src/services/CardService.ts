
import { CardLibraryService } from './card-library';
import { GameCard, CardType } from '@/types/cards';
import { CardVersion, CardChangeRecord, CardBulkEditOperation } from '@/types/cards/card-version';
import { formatCardError, safeCardOperation, logCardOperation } from '@/utils/error-handling/cardErrorHandler';
import { toast } from 'sonner';

/**
 * Card Service that serves as the main entry point for card operations
 * Now uses CardLibraryService for file-based card operations
 */
export class CardService {
  /**
   * Create or update a card in memory (file-based mode)
   * This would require a different paradigm for persistence in a file-based system
   */
  static async saveCard<T extends GameCard>(card: T): Promise<T> {
    logCardOperation('saveCard', { id: card.id, name: card.name, type: card.type });
    toast.info("In file-based mode, card changes would require code changes");
    
    return CardLibraryService.saveCard(card);
  }

  /**
   * Save multiple cards in memory (file-based mode)
   */
  static async saveCards<T extends GameCard>(
    cards: T[],
    options?: {
      batchSize?: number;
      onProgress?: (completed: number, total: number) => void;
    }
  ): Promise<{ 
    success: boolean; 
    count: number;
    failed?: T[];
    errors?: string[];
  }> {
    // If no cards, return early
    if (!cards || cards.length === 0) {
      return { success: true, count: 0 };
    }
    
    logCardOperation('saveCards', { count: cards.length, types: [...new Set(cards.map(c => c.type))] });
    toast.info("In file-based mode, bulk card changes would require code changes");
    
    return CardLibraryService.saveCards(cards);
  }

  /**
   * Get a card by ID using file-based service
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    const operation = async () => CardLibraryService.getCard<T>(id);
    const { result, error } = await safeCardOperation(operation, `getCard(${id})`);
    
    if (error) {
      console.error(`Failed to get card with ID ${id}:`, error);
      return null;
    }
    
    return result || null;
  }

  /**
   * Get cards by type using file-based service
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    const operation = async () => CardLibraryService.getCardsByType<T>(type);
    const { result, error } = await safeCardOperation(operation, `getCardsByType(${type})`);
    
    if (error) {
      console.error(`Failed to get cards of type ${type}:`, error);
      return [];
    }
    
    return result || [];
  }

  /**
   * Get all cards using file-based service
   */
  static async getAllCards(): Promise<GameCard[]> {
    const operation = async () => CardLibraryService.getAllCards();
    const { result, error } = await safeCardOperation(operation, 'getAllCards');
    
    if (error) {
      console.error('Failed to get all cards:', error);
      return [];
    }
    
    return result || [];
  }

  /**
   * Delete a card (file-based mode)
   */
  static async deleteCard(id: string): Promise<boolean> {
    logCardOperation('deleteCard', { id });
    toast.info("In file-based mode, card deletion would require code changes");
    
    return CardLibraryService.deleteCard(id);
  }

  /**
   * Get version history for a card (file-based mode)
   * In a fully implemented system, this could use git history
   */
  static async getCardVersionHistory(cardId: string): Promise<CardVersion[]> {
    console.log("Getting version history in file-based mode for card:", cardId);
    // In file-based mode, we don't have version history unless we integrate with git
    return [];
  }

  /**
   * Record a bulk edit operation (file-based mode)
   */
  static async recordBulkEditOperation(operation: Omit<CardBulkEditOperation, 'id' | 'timestamp'>): Promise<string> {
    console.log("Recording bulk edit operation in file-based mode:", operation);
    // This would be handled differently in file-based mode
    return "file-based-operation";
  }

  /**
   * Export cards to JSON - still works in file-based mode
   */
  static exportCardsToJSON(cards: GameCard[]): string {
    return JSON.stringify(cards, null, 2);
  }

  /**
   * Search cards by text using file-based service
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    const operation = async () => CardLibraryService.searchCards(query);
    const { result, error } = await safeCardOperation(operation, `searchCards(${query})`);
    
    if (error) {
      console.error(`Failed to search cards with query "${query}":`, error);
      return [];
    }
    
    return result || [];
  }

  /**
   * Validate card against schema - still works in file-based mode
   */
  static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    return CardLibraryService.validateCard(card, type);
  }
}
