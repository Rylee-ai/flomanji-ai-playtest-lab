
import { supabase } from "@/integrations/supabase/client";
import { GameCard } from '@/types/cards';
import { CardBulkEditOperation, CardImportResult } from '@/types/cards/card-version';

/**
 * Service for bulk card editing operations with transaction support
 */
export class CardBulkEditService {
  /**
   * Record a bulk edit operation
   */
  static async recordBulkEditOperation(operation: Omit<CardBulkEditOperation, 'id' | 'timestamp'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('card_bulk_operations')
        .insert({
          user_id: operation.userId,
          operation_type: operation.operationType,
          affected_cards: operation.affectedCards,
          metadata: operation.metadata
        })
        .select('id')
        .single();

      if (error) throw error;
      return data?.id;
    } catch (error) {
      console.error('Error recording bulk edit operation:', error);
      throw error;
    }
  }

  /**
   * Save multiple cards with batching support for large datasets
   */
  static async saveCardsBatched(
    cards: GameCard[],
    batchSize: number = 50,
    onProgress?: (completed: number, total: number) => void
  ): Promise<{
    success: boolean;
    count: number;
    failed: GameCard[];
    errors: string[];
  }> {
    if (cards.length === 0) {
      return { success: true, count: 0, failed: [], errors: [] };
    }

    try {
      const failed: GameCard[] = [];
      const errors: string[] = [];
      let successCount = 0;

      // Break cards into batches
      const batches = [];
      for (let i = 0; i < cards.length; i += batchSize) {
        batches.push(cards.slice(i, i + batchSize));
      }

      console.log(`Processing ${cards.length} cards in ${batches.length} batches`);

      // Process each batch
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        try {
          const upserts = batch.map(card => ({
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

          if (error) {
            console.error(`Error in batch ${i+1}:`, error);
            failed.push(...batch);
            errors.push(`Batch ${i+1} failed: ${error.message}`);
          } else {
            successCount += (data?.length || 0);
          }
          
          // Report progress
          if (onProgress) {
            onProgress((i + 1) * batchSize, cards.length);
          }
          
        } catch (batchError) {
          console.error(`Error processing batch ${i+1}:`, batchError);
          failed.push(...batch);
          errors.push(`Batch ${i+1} failed: ${batchError instanceof Error ? batchError.message : String(batchError)}`);
        }
      }

      const success = successCount > 0;
      return { success, count: successCount, failed, errors };
    } catch (error) {
      console.error('Error in batch card processing:', error);
      return { 
        success: false, 
        count: 0, 
        failed: cards, 
        errors: [`Failed to save cards: ${error instanceof Error ? error.message : String(error)}`] 
      };
    }
  }
}
