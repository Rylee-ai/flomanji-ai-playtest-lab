
import { supabase } from "@/integrations/supabase/client";
import { CardType, GameCard } from "@/types/cards";

/**
 * Service for searching and filtering cards
 */
export class CardSearchService {
  /**
   * Search cards by text
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    try {
      if (!query || query.trim().length < 2) {
        return [];
      }

      // Attempt to use direct query with ILIKE for text search
      const { data, error } = await supabase
        .from('cards')
        .select('data')
        .or(`name.ilike.%${query}%, data->>'flavor'.ilike.%${query}%, data->>'rules'.ilike.%${query}%`);

      if (error) throw error;
      return data?.map(item => item.data as unknown as GameCard) || [];
    } catch (error) {
      console.error('Error searching cards:', error);
      throw error;
    }
  }

  /**
   * Filter cards by type and optional query
   */
  static async filterCards(type: CardType, query?: string): Promise<GameCard[]> {
    try {
      let queryBuilder = supabase
        .from('cards')
        .select('data')
        .eq('type', type);

      if (query && query.trim().length >= 2) {
        queryBuilder = queryBuilder.or(`name.ilike.%${query}%, data->>'flavor'.ilike.%${query}%, data->>'rules'.ilike.%${query}%`);
      }

      const { data, error } = await queryBuilder.order('name');

      if (error) throw error;
      return data?.map(item => item.data as unknown as GameCard) || [];
    } catch (error) {
      console.error(`Error filtering ${type} cards:`, error);
      throw error;
    }
  }

  /**
   * Count cards by type
   */
  static async countCardsByType(type: CardType): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('cards')
        .select('*', { count: 'exact', head: true })
        .eq('type', type);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error(`Error counting ${type} cards:`, error);
      return 0;
    }
  }
}
