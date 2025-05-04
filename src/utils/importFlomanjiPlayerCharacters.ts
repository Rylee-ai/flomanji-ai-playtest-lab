
import { CardService } from "@/services/CardService";
import { getAllFlomanjiPlayerCharacters } from "@/lib/cards/flomanji-player-characters";
import { toast } from "sonner";

/**
 * Imports the predefined Flomanji player character cards into the database
 * @returns Promise with import results
 */
export const importFlomanjiPlayerCharacters = async (): Promise<{
  success: boolean;
  count: number;
  errors?: string[];
}> => {
  try {
    // Get all player character cards from our collection
    const cardsToImport = getAllFlomanjiPlayerCharacters();
    console.log(`Preparing to import ${cardsToImport.length} Flomanji player character cards`);
    
    // Save cards to database with batch processing
    const result = await CardService.saveCards(
      cardsToImport,
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
      toast.success(`Successfully imported ${result.count} Flomanji player character cards`);
    } else {
      toast.error(`Failed to import some Flomanji player character cards: ${result.errors?.[0] || 'Unknown error'}`);
    }
    
    return result;
  } catch (error) {
    console.error("Error importing Flomanji player character cards:", error);
    toast.error("Failed to import Flomanji player character cards");
    return { success: false, count: 0, errors: [error instanceof Error ? error.message : String(error)] };
  }
};
