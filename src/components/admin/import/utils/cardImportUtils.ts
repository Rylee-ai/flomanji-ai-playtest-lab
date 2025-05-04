
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

/**
 * Utility functions for the card import process
 */

/**
 * Handle errors during file processing with improved categorization
 * @param error The error that occurred
 * @returns An array of error messages
 */
export function handleFileProcessingError(error: unknown): string[] {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  console.error("Error during file processing:", error);

  // Categorize common errors for better user feedback
  if (errorMessage.includes("JSON")) {
    toast.error(`JSON parsing error: Please check your file format`);
    return [`Failed to parse JSON: ${errorMessage}`];
  }
  
  if (errorMessage.includes("read") || errorMessage.includes("load")) {
    toast.error(`File read error: The file couldn't be read properly`);
    return [`Failed to read file: ${errorMessage}`];
  }
  
  if (errorMessage.includes("timeout") || errorMessage.includes("time out")) {
    toast.error(`Processing timeout: The file is too large or complex`);
    return [`Processing timeout: ${errorMessage}`];
  }
  
  toast.error(`Error processing file: ${errorMessage}`);
  return [`Failed to process file: ${errorMessage}`];
}

/**
 * Process a file with AI if enabled
 * @param processedCards The processed cards from the file
 * @param errors Any validation errors
 * @param cardType The type of cards being imported
 * @param enableAIProcessing Whether AI processing is enabled
 * @param processCardsWithAI Function to process cards with AI
 * @param setTransformedCards Function to update the transformed cards
 * @param createImportResults Function to create import results
 * @param setImportResults Function to update the import results
 */
export async function handleAIProcessing(
  processedCards: CardFormValues[],
  errors: string[],
  cardType: CardType,
  enableAIProcessing: boolean,
  processCardsWithAI: (cards: CardFormValues[], cardType: CardType) => Promise<CardFormValues[]>,
  setTransformedCards: (cards: CardFormValues[]) => void,
  createImportResults: (cards: CardFormValues[], errors: string[]) => CardImportResult,
  setImportResults: (results: CardImportResult) => void
): Promise<void> {
  // If AI processing is enabled, process the cards with AI
  if (enableAIProcessing && processedCards.length > 0) {
    try {
      console.log("Processing cards with AI...");

      // For large sets, give feedback to the user
      if (processedCards.length > 50) {
        toast.info(`AI processing ${processedCards.length} cards. This may take some time...`);
      }

      // Process cards with AI - use batching for large sets
      let aiProcessedCards: CardFormValues[];
      
      if (processedCards.length > 100) {
        // For very large sets, batch the AI processing
        aiProcessedCards = [];
        const batchSize = 50;
        const batches = Math.ceil(processedCards.length / batchSize);
        
        for (let i = 0; i < batches; i++) {
          const start = i * batchSize;
          const end = Math.min(start + batchSize, processedCards.length);
          const batch = processedCards.slice(start, end);
          
          toast.info(`Processing AI batch ${i+1} of ${batches}...`);
          const batchResult = await processCardsWithAI(batch, cardType);
          aiProcessedCards.push(...batchResult);
        }
      } else {
        // For smaller sets, process all at once
        aiProcessedCards = await processCardsWithAI(processedCards, cardType);
      }
      
      // Update state with AI processed cards
      setTransformedCards(aiProcessedCards);
      
      // Create and set import results
      const results = createImportResults(aiProcessedCards, errors);
      setImportResults(results);
      
      toast.success("AI processing complete");
    } catch (error) {
      console.error("Error processing cards with AI:", error);
      toast.error("AI processing failed. Using original cards instead.");
      
      // Create and set import results with original cards
      const results = createImportResults(processedCards, errors);
      setImportResults(results);
    }
  } else {
    // Create and set import results with processed cards
    const results = createImportResults(processedCards, errors);
    setImportResults(results);
  }
}

/**
 * Apply AI suggestion to cards
 * @param index Suggestion index to apply
 * @param applySuggestion Function to apply the suggestion
 * @param setTransformedCards Function to update the transformed cards
 * @param validationErrors Any validation errors
 * @param createImportResults Function to create import results
 * @param setImportResults Function to update the import results
 */
export function handleApplySuggestion(
  index: number,
  applySuggestion: (index: number) => CardFormValues[],
  setTransformedCards: (cards: CardFormValues[]) => void,
  validationErrors: string[],
  createImportResults: (cards: CardFormValues[], errors: string[]) => CardImportResult,
  setImportResults: (results: CardImportResult) => void
): void {
  try {
    const updatedCards = applySuggestion(index);
    setTransformedCards(updatedCards);
    
    // Update import results
    const results = createImportResults(updatedCards, validationErrors);
    setImportResults(results);
    
    toast.success("Applied AI suggestion");
  } catch (error) {
    console.error("Error applying suggestion:", error);
    toast.error(`Failed to apply suggestion: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Helper for handling card import results
 * @param result The import result from the service
 * @param expectedCount The expected number of cards
 * @returns A formatted import result
 */
export function createCardImportResults(
  result: { success: boolean; count: number },
  expectedCount: number,
  errors: string[]
): CardImportResult {
  return {
    imported: result.success ? result.count : 0,
    updated: 0, // We don't track updates vs. new cards yet
    failed: result.success ? expectedCount - result.count : expectedCount,
    errors: errors.map(error => ({
      name: 'Import error',
      error
    }))
  };
}
