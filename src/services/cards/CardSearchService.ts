
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
      // Attempt to use database search function if available
      try {
        const { data, error } = await supabase.rpc('search_cards', { 
          search_term: `%${query}%` 
        });

        if (!error && data) {
          return data?.map(item => item.data as unknown as GameCard) || [];
        }

        // If RPC fails, we'll fall through to the fallback
        console.error('RPC search_cards not available:', error);
      } catch (rpcError) {
        console.error('RPC search_cards failed:', rpcError);
      }

      // Fallback to direct select if the RPC call fails
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('cards')
        .select('data')
        .ilike('name', `%${query}%`);

      if (fallbackError) throw fallbackError;
      return fallbackData?.map(item => item.data as unknown as GameCard) || [];
    } catch (error) {
      console.error('Error searching cards:', error);
      throw error;
    }
  }
}
