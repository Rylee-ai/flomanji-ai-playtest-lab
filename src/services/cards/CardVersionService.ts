
import { supabase } from "@/integrations/supabase/client";
import { GameCard } from "@/types/cards";
import { CardVersion } from "@/types/cards/card-version";

/**
 * Service for managing card version history
 */
export class CardVersionService {
  /**
   * Create a version record for a card
   */
  static async createCardVersion<T extends GameCard>(card: T): Promise<void> {
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
          data: card as any, // Type casting to satisfy Supabase Json type
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
        data: version.data as unknown as GameCard,
        changedBy: version.changed_by,
        notes: version.notes || ''
      })) || [];
    } catch (error) {
      console.error('Error fetching card version history:', error);
      throw error;
    }
  }
}
