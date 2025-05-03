
import { supabase } from "@/integrations/supabase/client";
import { GameCard, CardType } from "@/types/cards";

/**
 * Service for basic CRUD operations on cards
 */
export class BasicCardService {
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
            data: card as any, // Type casting to satisfy Supabase Json type
            updated_at: new Date().toISOString()
          })
          .eq('id', card.id)
          .select()
          .single();

        if (error) throw error;
        return (data?.data as any) as T;
      } else {
        // Create new card
        const { data, error } = await supabase
          .from('cards')
          .insert({
            id: card.id,
            name: card.name,
            type: card.type,
            data: card as any // Type casting to satisfy Supabase Json type
          })
          .select()
          .single();

        if (error) throw error;
        return (data?.data as any) as T;
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
        data: card as any, // Type casting to satisfy Supabase Json type
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('cards')
        .upsert(upserts)
        .select();

      if (error) throw error;

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

      return data?.data as unknown as T;
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

      return data?.map(item => item.data as unknown as T) || [];
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

      return data?.map(item => item.data as unknown as GameCard) || [];
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
}
