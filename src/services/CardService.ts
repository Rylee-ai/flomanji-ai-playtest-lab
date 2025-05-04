
import { BasicCardService } from './cards/BasicCardService';
import { CardVersionService } from './cards/CardVersionService';
import { CardBulkEditService } from './cards/CardBulkEditService';
import { CardSearchService } from './cards/CardSearchService';
import { CardValidationService } from './cards/CardValidationService';
import { GameCard, CardType } from '@/types/cards';
import { CardVersion, CardChangeRecord, CardBulkEditOperation } from '@/types/cards/card-version';
import { formatCardError, safeCardOperation, logCardOperation } from '@/utils/error-handling/cardErrorHandler';

/**
 * Card Service that coordinates operations between specialized card services
 * with improved error handling and batch processing
 */
export class CardService {
  /**
   * Create or update a card in the database
   */
  static async saveCard<T extends GameCard>(card: T): Promise<T> {
    logCardOperation('saveCard', { id: card.id, name: card.name });
    
    try {
      const savedCard = await BasicCardService.saveCard(card);
      await CardVersionService.createCardVersion(card);
      return savedCard as T;
    } catch (error) {
      const formattedError = formatCardError(error, 'saveCard');
      console.error(`Failed to save card: ${formattedError.message}`, card);
      throw error; // Re-throw to allow caller to handle
    }
  }

  /**
   * Save multiple cards in a transaction with improved error handling and progress tracking
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
    
    logCardOperation('saveCards', { count: cards.length });
    
    // For small batches, use the original method
    if (cards.length <= 50 && !options) {
      try {
        const result = await BasicCardService.saveCards(cards);
      
        // Create version records for all cards
        await Promise.all(cards.map(card => CardVersionService.createCardVersion(card)));

        return result;
      } catch (error) {
        const formattedError = formatCardError(error, 'saveCards (small batch)');
        return {
          success: false,
          count: 0,
          errors: [formattedError.message]
        };
      }
    }
    
    // For larger batches or when options are specified, use batched processing
    const { batchSize = 50, onProgress } = options || {};
    
    logCardOperation('saveCards (batched)', { 
      totalCards: cards.length,
      batchSize 
    });
    
    // Use GameCard[] for the internal implementation to fix type compatibility
    const result = await CardBulkEditService.saveCardsBatched(
      cards,
      batchSize,
      onProgress
    );
    
    // Create version records for successfully saved cards
    // We identify these by filtering out the failed ones
    if (result.success && result.count > 0) {
      const failedIds = new Set((result.failed || []).map(card => card.id));
      const successfulCards = cards.filter(card => !failedIds.has(card.id));
      
      // Create versions in batches
      const versionBatchSize = 20;
      for (let i = 0; i < successfulCards.length; i += versionBatchSize) {
        const batch = successfulCards.slice(i, i + versionBatchSize);
        await Promise.all(batch.map(card => CardVersionService.createCardVersion(card)));
      }
      
      logCardOperation('saveCards versions created', { 
        count: successfulCards.length 
      });
    }

    // Convert the generic GameCard[] failed array to T[] for type compatibility
    const typedFailedCards = result.failed ? result.failed.map(card => card as T) : undefined;

    return { 
      success: result.success, 
      count: result.count,
      failed: typedFailedCards,
      errors: result.errors
    };
  }

  /**
   * Get a card by ID with improved error handling
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    try {
      return await BasicCardService.getCard<T>(id);
    } catch (error) {
      const formattedError = formatCardError(error, `getCard(${id})`);
      console.error(formattedError);
      return null;
    }
  }

  /**
   * Get cards by type with improved error handling
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    const operation = async () => BasicCardService.getCardsByType<T>(type);
    const { result, error } = await safeCardOperation(operation, `getCardsByType(${type})`);
    
    if (error) {
      console.error(`Failed to get cards of type ${type}:`, error);
      return [];
    }
    
    return result || [];
  }

  /**
   * Get all cards
   */
  static async getAllCards(): Promise<GameCard[]> {
    return BasicCardService.getAllCards();
  }

  /**
   * Delete a card
   */
  static async deleteCard(id: string): Promise<boolean> {
    logCardOperation('deleteCard', { id });
    return BasicCardService.deleteCard(id);
  }

  /**
   * Get version history for a card
   */
  static async getCardVersionHistory(cardId: string): Promise<CardVersion[]> {
    return CardVersionService.getCardVersionHistory(cardId);
  }

  /**
   * Record a bulk edit operation
   */
  static async recordBulkEditOperation(operation: Omit<CardBulkEditOperation, 'id' | 'timestamp'>): Promise<string> {
    return CardBulkEditService.recordBulkEditOperation(operation);
  }

  /**
   * Export cards to JSON
   */
  static exportCardsToJSON(cards: GameCard[]): string {
    return JSON.stringify(cards, null, 2);
  }

  /**
   * Search cards by text
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    return CardSearchService.searchCards(query);
  }

  /**
   * Validate card against schema
   */
  static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    return CardValidationService.validateCard(card, type);
  }
}
