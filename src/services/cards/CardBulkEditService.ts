
import { supabase } from "@/integrations/supabase/client";
import { CardBulkEditOperation } from "@/types/cards/card-version";

/**
 * Service for bulk operations on cards
 */
export class CardBulkEditService {
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
}
