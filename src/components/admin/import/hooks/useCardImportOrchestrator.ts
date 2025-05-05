
import { useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImportConfig } from "./useCardImportConfig";
import { useCardImportResults } from "./useCardImportResults";
import { useAICardProcessing } from "./useAICardProcessing";
import { useCardFileProcessor, FileProcessingOptions } from "./useCardFileProcessor";
import { handleAIProcessing, handleApplySuggestion } from "../utils/cardImportUtils";
import { formatCardError } from "@/utils/error-handling/cardErrorHandler";

interface UseCardImportOrchestratorProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
  processingOptions?: FileProcessingOptions;
}

/**
 * Main hook for orchestrating the card import process
 * Coordinates between file processing, validation, AI enhancement, and results management
 * with improved error handling
 */
export function useCardImportOrchestrator({ 
  onImportComplete, 
  initialCardType = "gear",
  processingOptions
}: UseCardImportOrchestratorProps) {
  // AI processing state
  const [enableAIProcessing, setEnableAIProcessing] = useState(false);
  const [failedCards, setFailedCards] = useState<{index: number, name?: string, error: string}[]>([]);

  // Use specialized hooks for different aspects of card importing
  const {
    isProcessing: isFileProcessing,
    processingProgress,
    analyzeFile,
    processFile
  } = useCardFileProcessor();
  
  const {
    cardType,
    setCardType
  } = useCardImportConfig(initialCardType);

  const {
    transformedCards,
    setTransformedCards,
    validationErrors,
    setValidationErrors,
    importResults,
    setImportResults,
    createImportResults,
    resetResults
  } = useCardImportResults();

  const {
    isProcessing: isAIProcessing,
    suggestions: aiSuggestions,
    enhancedCards,
    processCardsWithAI,
    applySuggestion,
    resetAIProcessing,
    processingError
  } = useAICardProcessing();

  // Overall processing state
  const isProcessing = isFileProcessing || isAIProcessing;

  /**
   * Process a file and update the state with the results
   */
  const handleFileProcess = async (file: File, selectedCardType?: CardType): Promise<CardFormValues[]> => {
    if (!file) return [];
    
    // Use passed in card type if available, otherwise use the state
    const typeToUse = selectedCardType || cardType;
    console.log("Processing file for card type:", typeToUse);

    // Reset state before processing
    resetResults();
    resetAIProcessing();
    setFailedCards([]);

    try {
      // Process the file with the provided options
      const { processedCards, errors, failedCards: newFailedCards } = 
        await processFile(file, typeToUse, processingOptions);
      
      // Update state with results
      setTransformedCards(processedCards);
      setValidationErrors(errors);
      setFailedCards(newFailedCards);
      
      // If errors, don't proceed with AI processing
      if (errors.length > 0) {
        console.log("Validation errors found, skipping AI processing");
        // Create and set import results
        const results = createImportResults(processedCards, errors);
        setImportResults(results);
        
        // Return but don't trigger completion callback yet
        return processedCards;
      }
      
      // Process with AI if enabled
      const enhancedCards = await handleAIProcessing(
        processedCards,
        errors,
        typeToUse,
        enableAIProcessing,
        processCardsWithAI,
        setTransformedCards,
        createImportResults,
        setImportResults
      );
      
      // If the import is successful and no errors, trigger completion
      if (enhancedCards.length > 0 && validationErrors.length === 0) {
        const results = createImportResults(enhancedCards, []);
        // We don't call onImportComplete here because we let the user
        // decide when to import through the UI
      }
      
      return enhancedCards;
    } catch (error) {
      const formattedError = formatCardError(error, 'import orchestration');
      console.error("Error during orchestration:", formattedError);
      setValidationErrors([formattedError.message]);
      return [];
    }
  };

  /**
   * Apply an AI suggestion to the cards
   */
  const handleApplySuggestionWrapper = async (index: number): Promise<CardFormValues[]> => {
    return await handleApplySuggestion(
      index,
      applySuggestion,
      setTransformedCards,
      validationErrors,
      createImportResults,
      setImportResults
    );
  };

  /**
   * Helper to ignore a suggestion
   */
  const handleIgnoreSuggestion = (index: number) => {
    // We don't update the cards, just remove the suggestion
    console.log(`Ignoring suggestion at index ${index}`);
  };

  /**
   * Reset all import state
   */
  const resetState = () => {
    resetResults();
    resetAIProcessing();
    setEnableAIProcessing(false);
    setFailedCards([]);
  };

  /**
   * Manually trigger import completion
   */
  const triggerImportComplete = () => {
    if (transformedCards.length > 0) {
      const results = createImportResults(transformedCards, validationErrors);
      onImportComplete(transformedCards, results);
    }
  };

  return {
    isProcessing,
    processingProgress,
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    failedCards,
    detectFileFormat: analyzeFile,
    processFile: handleFileProcess,
    resetState,
    triggerImportComplete,
    // AI-related properties
    enableAIProcessing,
    setEnableAIProcessing,
    aiSuggestions,
    handleApplySuggestion: handleApplySuggestionWrapper,
    handleIgnoreSuggestion,
    processingError
  };
}
