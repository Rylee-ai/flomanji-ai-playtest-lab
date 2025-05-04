
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { CardImportResult } from "@/types/cards/card-version";
import { 
  handleFileProcessingError as baseHandleFileProcessingError,
  formatCardError,
  safeCardOperation
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
    const results = createResults(processedCards, errors);
    setResults(results);
    return processedCards;
  }

  try {
    // Process cards with AI
    console.log(`Processing ${processedCards.length} cards with AI...`);
    const enhancedCards = await processWithAI(processedCards, cardType);
    
    // Update state with enhanced cards
    setCards(enhancedCards);
    
    // Create and set import results
    const results = createResults(enhancedCards, errors);
    setResults(results);
    
    return enhancedCards;
  } catch (error) {
    const formattedError = formatCardError(error, 'AI processing');
    console.error("Error during AI processing:", formattedError);
    
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
  try {
    // Apply the suggestion
    const updatedCards = applySuggestion(index);
    
    // Update state
    setCards(updatedCards);
    
    // Create and set import results
    const results = createResults(updatedCards, errors);
    setResults(results);
    
    return updatedCards;
  } catch (error) {
    const formattedError = formatCardError(error, 'applying suggestion');
    console.error("Error applying suggestion:", formattedError);
    return [];
  }
};
