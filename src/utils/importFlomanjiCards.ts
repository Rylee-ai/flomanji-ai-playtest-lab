
import { CardService } from "@/services/CardService";
import { FLOMANJI_GEAR_CARDS } from "@/lib/cards/flomanji-gear-cards";
import { toast } from "sonner";

/**
 * Imports the predefined Flomanji gear cards into the database
 * @returns Promise with import results
 */
export const importFlomanjiGearCards = async (): Promise<{
  success: boolean;
  count: number;
  errors?: string[];
}> => {
  try {
    // Save cards to database with batch processing
    const result = await CardService.saveCards(
      FLOMANJI_GEAR_CARDS,
      {
        batchSize: 10,
        onProgress: (completed, total) => {
          // Optional progress reporting
          const progress = Math.round((completed / total) * 100);
          console.log(`Import progress: ${progress}%`);
        }
      }
    );
    
    if (result.success) {
      toast.success(`Successfully imported ${result.count} Flomanji gear cards`);
    } else {
      toast.error(`Failed to import some Flomanji gear cards: ${result.errors?.[0] || 'Unknown error'}`);
    }
    
    return result;
  } catch (error) {
    console.error("Error importing Flomanji gear cards:", error);
    toast.error("Failed to import Flomanji gear cards");
    return { success: false, count: 0, errors: [error instanceof Error ? error.message : String(error)] };
  }
};
