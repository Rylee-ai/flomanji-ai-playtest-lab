
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useFileProcessor } from "./useFileProcessor";
import { useCardImportConfig } from "./useCardImportConfig";
import { useCardImportResults } from "./useCardImportResults";
import { useAICardProcessing } from "./useAICardProcessing";

interface UseCardImporterProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
}

/**
 * Main hook for card importing functionality
 * Orchestrates the file processing and result management
 */
export function useCardImporter({ onImportComplete, initialCardType = "gear" }: UseCardImporterProps) {
  // Use the specialized hooks for different aspects of card importing
  const { 
    isProcessing,
    fileFormat,
    fileExtension,
    analyzeFile,
    processFile
  } = useFileProcessor();
  
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

  // New AI processing state
  const [enableAIProcessing, setEnableAIProcessing] = useState(false);
  const {
    isProcessing: isAIProcessing,
    suggestions: aiSuggestions,
    enhancedCards,
    processCardsWithAI,
    applySuggestion,
    resetAIProcessing
  } = useAICardProcessing();

  // Helper to ignore a suggestion
  const handleIgnoreSuggestion = (index: number) => {
    const updatedSuggestions = aiSuggestions.filter((_, i) => i !== index);
    // We don't update the cards, just remove the suggestion
  };

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

    // Auto-detect format
    await analyzeFile(file);
    
    // Process the file
    const { processedCards, errors } = await processFile(file, typeToUse);
    
    // Update state with results
    setTransformedCards(processedCards);
    setValidationErrors(errors);
    
    // If errors, don't proceed with AI processing
    if (errors.length > 0) {
      // Create and set import results
      const results = createImportResults(processedCards, errors);
      setImportResults(results);
      return;
    }
    
    // If AI processing is enabled, process the cards with AI
    if (enableAIProcessing && processedCards.length > 0) {
      try {
        console.log("Processing cards with AI...");
        const aiProcessedCards = await processCardsWithAI(processedCards, typeToUse);
        
        // Update state with AI processed cards
        setTransformedCards(aiProcessedCards);
        
        // Create and set import results
        const results = createImportResults(aiProcessedCards, errors);
        setImportResults(results);
      } catch (error) {
        console.error("Error processing cards with AI:", error);
        toast.error("AI processing failed. Using original cards instead.");
        
        // Create and set import results with original cards
        const results = createImportResults(processedCards, errors);
        setImportResults(results);
      }
    } else {
      // Create and set import results
      const results = createImportResults(processedCards, errors);
      setImportResults(results);
    }
  };

  /**
   * Apply an AI suggestion to the cards
   */
  const handleApplySuggestion = (index: number) => {
    const updatedCards = applySuggestion(index);
    setTransformedCards(updatedCards);
    
    // Update import results
    const results = createImportResults(updatedCards, validationErrors);
    setImportResults(results);
  };

  /**
   * Reset all import state
   */
  const resetState = () => {
    resetResults();
    resetAIProcessing();
    setEnableAIProcessing(false);
  };

  return {
    isProcessing: isProcessing || isAIProcessing,
    fileType: fileFormat, // Keep the name fileType for backward compatibility
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    detectFileFormat: analyzeFile, // Keep the name detectFileFormat for backward compatibility
    processFile: handleFileProcess,
    resetState,
    // AI-related properties
    enableAIProcessing,
    setEnableAIProcessing,
    aiSuggestions,
    handleApplySuggestion,
    handleIgnoreSuggestion
  };
}
