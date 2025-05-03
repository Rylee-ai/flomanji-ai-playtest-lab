
import { BasicCardService } from './cards/BasicCardService';
import { CardVersionService } from './cards/CardVersionService';
import { CardBulkEditService } from './cards/CardBulkEditService';
import { CardSearchService } from './cards/CardSearchService';
import { CardValidationService } from './cards/CardValidationService';
import { GameCard, CardType } from '@/types/cards';
import { CardVersion, CardChangeRecord, CardBulkEditOperation } from '@/types/cards/card-version';

/**
 * Card Service that coordinates operations between specialized card services
 */
export class CardService {
  /**
   * Create or update a card in the database
   */
  static async saveCard<T extends GameCard>(card: T): Promise<T> {
    const savedCard = await BasicCardService.saveCard(card);
    await CardVersionService.createCardVersion(card);
    return savedCard as T;
  }

  /**
   * Save multiple cards in a transaction
   */
  static async saveCards<T extends GameCard>(cards: T[]): Promise<{ success: boolean; count: number }> {
    const result = await BasicCardService.saveCards(cards);
    
    // Create version records for all cards
    await Promise.all(cards.map(card => CardVersionService.createCardVersion(card)));

    return result;
  }

  /**
   * Get a card by ID
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    return BasicCardService.getCard<T>(id);
  }

  /**
   * Get cards by type
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    return BasicCardService.getCardsByType<T>(type);
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
