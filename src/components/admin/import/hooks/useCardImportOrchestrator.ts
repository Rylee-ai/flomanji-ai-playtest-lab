
import { useState } from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImportConfig } from "./useCardImportConfig";
import { useCardImportResults } from "./useCardImportResults";
import { useAICardProcessing } from "./useAICardProcessing";
import { useCardFileProcessor, FileProcessingOptions } from "./useCardFileProcessor";
import { handleAIProcessing, handleApplySuggestion } from "../utils/cardImportUtils";

interface UseCardImportOrchestratorProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
  processingOptions?: FileProcessingOptions;
}

/**
 * Main hook for orchestrating the card import process
 * Coordinates between file processing, validation, AI enhancement, and results management
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
  const handleFileProcess = async (file: File, selectedCardType?: CardType) => {
    if (!file) return;
    
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
        return;
      }
      
      // Process with AI if enabled
      await handleAIProcessing(
        processedCards,
        errors,
        typeToUse,
        enableAIProcessing,
        processCardsWithAI,
        setTransformedCards,
        createImportResults,
        setImportResults
      );
    } catch (error) {
      console.error("Error during orchestration:", error);
      setValidationErrors([`Failed to process file: ${error instanceof Error ? error.message : "Unknown error"}`]);
    }
  };

  /**
   * Apply an AI suggestion to the cards
   */
  const handleApplySuggestionWrapper = (index: number) => {
    handleApplySuggestion(
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
    const updatedSuggestions = aiSuggestions.filter((_, i) => i !== index);
    // We don't update the cards, just remove the suggestion
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

  return {
    isProcessing,
    processingProgress,
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    failedCards,
    detectFileFormat: analyzeFile, // Kept for backward compatibility
    processFile: handleFileProcess,
    resetState,
    // AI-related properties
    enableAIProcessing,
    setEnableAIProcessing,
    aiSuggestions,
    handleApplySuggestion: handleApplySuggestionWrapper,
    handleIgnoreSuggestion,
    processingError
  };
}
