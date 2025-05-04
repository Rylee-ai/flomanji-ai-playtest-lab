
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { CardImportResult } from "@/types/cards/card-version";
import { 
  handleFileProcessingError as baseHandleFileProcessingError,
  formatCardError,
  safeCardOperation,
  logCardOperation
} from "@/utils/error-handling/cardErrorHandler";

/**
 * Handles errors that occur during file processing and returns appropriate error messages
 */
export const handleFileProcessingError = baseHandleFileProcessingError;

/**
 * Handle AI processing for cards with improved error handling
 */
export const handleAIProcessing = async (
  processedCards: CardFormValues[],
  errors: string[],
  cardType: CardType,
  enableAI: boolean,
  processWithAI: (cards: CardFormValues[], cardType: CardType) => Promise<CardFormValues[]>,
  setCards: (cards: CardFormValues[]) => void,
  createResults: (cards: CardFormValues[], errors: string[]) => CardImportResult,
  setResults: (results: CardImportResult) => void
): Promise<CardFormValues[]> => {
  // Early return if AI processing is disabled or there are errors
  if (!enableAI || errors.length > 0) {
    logCardOperation("AI processing skipped", { 
      reason: !enableAI ? "AI disabled" : "Errors present",
      cardCount: processedCards.length,
      errorCount: errors.length
    });
    
    const results = createResults(processedCards, errors);
    setResults(results);
    return processedCards;
  }

  try {
    // Process cards with AI
    logCardOperation("AI processing started", { 
      cardCount: processedCards.length, 
      cardType 
    });
    
    const enhancedCards = await processWithAI(processedCards, cardType);
    
    // Update state with enhanced cards
    setCards(enhancedCards);
    
    // Create and set import results
    const results = createResults(enhancedCards, errors);
    setResults(results);
    
    logCardOperation("AI processing completed", { 
      cardCount: enhancedCards.length, 
      cardType 
    });
    
    return enhancedCards;
  } catch (error) {
    const formattedError = formatCardError(error, 'AI processing');
    console.error("Error during AI processing:", formattedError);
    
    logCardOperation("AI processing failed", { 
      error: formattedError,
      cardCount: processedCards.length, 
      cardType 
    });
    
    // If AI processing fails, we still return the original cards
    const results = createResults(processedCards, [
      ...errors, 
      `AI Processing error: ${formattedError.message}`
    ]);
    setResults(results);
    
    return processedCards;
  }
};

/**
 * Apply an AI suggestion to the cards and update state
 */
export const handleApplySuggestion = (
  index: number,
  applySuggestion: (index: number) => CardFormValues[],
  setCards: (cards: CardFormValues[]) => void,
  errors: string[],
  createResults: (cards: CardFormValues[], errors: string[]) => CardImportResult,
  setResults: (results: CardImportResult) => void
): CardFormValues[] => {
  logCardOperation("Applying AI suggestion", { suggestionIndex: index });
  
  try {
    // Apply the suggestion
    const updatedCards = applySuggestion(index);
    
    // Update state
    setCards(updatedCards);
    
    // Create and set import results
    const results = createResults(updatedCards, errors);
    setResults(results);
    
    logCardOperation("AI suggestion applied successfully", { 
      suggestionIndex: index,
      updatedCardCount: updatedCards.length
    });
    
    return updatedCards;
  } catch (error) {
    const formattedError = formatCardError(error, 'applying suggestion');
    console.error("Error applying suggestion:", formattedError);
    
    logCardOperation("Error applying AI suggestion", { 
      suggestionIndex: index,
      error: formattedError
    });
    
    return [];
  }
};

/**
 * Create batches of cards for processing large imports
 * @param cards Full array of cards to be processed
 * @param batchSize Number of cards per batch
 */
export const createCardBatches = <T>(cards: T[], batchSize: number = 50): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < cards.length; i += batchSize) {
    batches.push(cards.slice(i, Math.min(i + batchSize, cards.length)));
  }
  logCardOperation("Created card batches", { 
    totalCards: cards.length, 
    batchSize,
    batchCount: batches.length
  });
  return batches;
};

/**
 * Process a batch of cards with error handling
 */
export const processCardBatch = async <T, R>(
  batch: T[],
  batchIndex: number,
  batchCount: number,
  processor: (batch: T[]) => Promise<R>,
  batchDescription: string = "cards"
): Promise<{ result?: R, error?: string, success: boolean }> => {
  try {
    logCardOperation(`Processing ${batchDescription} batch`, { 
      batchIndex, 
      batchSize: batch.length,
      totalBatches: batchCount
    });
    
    const result = await processor(batch);
    
    logCardOperation(`${batchDescription} batch processed successfully`, { 
      batchIndex, 
      batchSize: batch.length
    });
    
    return { result, success: true };
  } catch (error) {
    const formattedError = formatCardError(error, `${batchDescription} batch ${batchIndex + 1}`);
    
    logCardOperation(`${batchDescription} batch processing failed`, { 
      batchIndex, 
      error: formattedError
    });
    
    return { 
      error: formattedError.message, 
      success: false 
    };
  }
};
