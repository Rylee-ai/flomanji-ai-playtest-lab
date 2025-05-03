
import { supabase } from "@/integrations/supabase/client";
import { GameCard, CardType } from "@/types/cards";
import { CardVersion, CardChangeRecord, CardBulkEditOperation } from "@/types/cards/card-version";

export class CardService {
  /**
   * Create or update a card in the database
   */
  static async saveCard<T extends GameCard>(card: T): Promise<T> {
    try {
      // Check if card exists
      const { data: existingCard, error: checkError } = await supabase
        .from('cards')
        .select('*')
        .eq('id', card.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // Not 'no rows returned'
        throw checkError;
      }

      if (existingCard) {
        // Update existing card
        const { data, error } = await supabase
          .from('cards')
          .update({
            name: card.name,
            type: card.type,
            data: card,
            updated_at: new Date().toISOString()
          })
          .eq('id', card.id)
          .select()
          .single();

        if (error) throw error;
        
        // Create version record
        await this.createCardVersion(card);
        
        return data?.data;
      } else {
        // Create new card
        const { data, error } = await supabase
          .from('cards')
          .insert({
            id: card.id,
            name: card.name,
            type: card.type,
            data: card
          })
          .select()
          .single();

        if (error) throw error;
        
        // Create initial version record
        await this.createCardVersion(card);
        
        return data?.data;
      }
    } catch (error) {
      console.error('Error saving card:', error);
      throw error;
    }
  }

  /**
   * Save multiple cards in a transaction
   */
  static async saveCards<T extends GameCard>(cards: T[]): Promise<{ success: boolean; count: number }> {
    try {
      const upserts = cards.map(card => ({
        id: card.id,
        name: card.name,
        type: card.type,
        data: card,
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('cards')
        .upsert(upserts)
        .select();

      if (error) throw error;

      // Create version records for all cards
      await Promise.all(cards.map(card => this.createCardVersion(card)));

      return { success: true, count: data?.length || 0 };
    } catch (error) {
      console.error('Error saving cards in bulk:', error);
      throw error;
    }
  }

  /**
   * Get a card by ID
   */
  static async getCard<T extends GameCard>(id: string): Promise<T | null> {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('data')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // No rows found
        throw error;
      }

      return data?.data as T;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw error;
    }
  }

  /**
   * Get cards by type
   */
  static async getCardsByType<T extends GameCard>(type: CardType): Promise<T[]> {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('data')
        .eq('type', type)
        .order('name');

      if (error) throw error;

      return data?.map(item => item.data as T) || [];
    } catch (error) {
      console.error(`Error fetching ${type} cards:`, error);
      throw error;
    }
  }

  /**
   * Get all cards
   */
  static async getAllCards(): Promise<GameCard[]> {
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('data')
        .order('name');

      if (error) throw error;

      return data?.map(item => item.data as GameCard) || [];
    } catch (error) {
      console.error('Error fetching all cards:', error);
      throw error;
    }
  }

  /**
   * Delete a card
   */
  static async deleteCard(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  }

  /**
   * Create a version record for a card
   */
  private static async createCardVersion<T extends GameCard>(card: T): Promise<void> {
    try {
      // Get current user info
      const { data: { user } } = await supabase.auth.getUser();
      const changedBy = user?.email || 'system';

      // Get latest version number
      const { data: versions } = await supabase
        .from('card_versions')
        .select('version_number')
        .eq('card_id', card.id)
        .order('version_number', { ascending: false })
        .limit(1);

      const versionNumber = versions && versions.length > 0 
        ? versions[0].version_number + 1 
        : 1;

      // Create version record
      const { error } = await supabase
        .from('card_versions')
        .insert({
          card_id: card.id,
          version_number: versionNumber,
          data: card,
          changed_by: changedBy
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating card version:', error);
      // Continue despite version tracking error
    }
  }

  /**
   * Get version history for a card
   */
  static async getCardVersionHistory(cardId: string): Promise<CardVersion[]> {
    try {
      const { data, error } = await supabase
        .from('card_versions')
        .select('*')
        .eq('card_id', cardId)
        .order('version_number', { ascending: false });

      if (error) throw error;

      return data?.map(version => ({
        id: version.id,
        cardId: version.card_id,
        versionNumber: version.version_number,
        timestamp: version.created_at,
        data: version.data,
        changedBy: version.changed_by,
        notes: version.notes
      })) || [];
    } catch (error) {
      console.error('Error fetching card version history:', error);
      throw error;
    }
  }

  /**
   * Record a bulk edit operation
   */
  static async recordBulkEditOperation(operation: Omit<CardBulkEditOperation, 'id' | 'timestamp'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('card_bulk_edits')
        .insert({
          affected_cards: operation.affectedCards,
          changes: operation.changes,
          notes: operation.notes,
          status: operation.status
        })
        .select()
        .single();

      if (error) throw error;
      
      return data?.id;
    } catch (error) {
      console.error('Error recording bulk edit operation:', error);
      throw error;
    }
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
    try {
      // Basic search implementation using wildcards
      const { data, error } = await supabase.rpc('search_cards', { search_term: `%${query}%` });

      if (error) {
        console.error('RPC search_cards failed:', error);
        // Fallback to direct select if the RPC call fails
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('cards')
          .select('data')
          .ilike('name', `%${query}%`);

        if (fallbackError) throw fallbackError;
        return fallbackData?.map(item => item.data as GameCard) || [];
      }

      return data?.map(item => item.data as GameCard) || [];
    } catch (error) {
      console.error('Error searching cards:', error);
      throw error;
    }
  }

  /**
   * Validate card against schema
   */
  static validateCard<T extends GameCard>(card: T, type: CardType): { valid: boolean; errors: string[] } {
    // This is a placeholder - we'll implement actual validation using Zod schemas
    return { valid: true, errors: [] };
  }
}
