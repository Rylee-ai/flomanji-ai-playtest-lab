
import { supabase } from "@/integrations/supabase/client";
import { GameCard } from "@/types/cards";

/**
 * Service for searching and filtering cards
 */
export class CardSearchService {
  /**
   * Search cards by text
   */
  static async searchCards(query: string): Promise<GameCard[]> {
    try {
      // Attempt to use direct query with ILIKE for text search
      const { data, error } = await supabase
        .from('cards')
        .select('data')
        .ilike('name', `%${query}%`);

      if (error) throw error;
      return data?.map(item => item.data as unknown as GameCard) || [];
    } catch (error) {
      console.error('Error searching cards:', error);
      throw error;
    }
  }
}
