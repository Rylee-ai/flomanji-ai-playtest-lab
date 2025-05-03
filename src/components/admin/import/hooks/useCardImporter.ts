
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useFileProcessor } from "./useFileProcessor";
import { useCardImportConfig } from "./useCardImportConfig";
import { useCardImportResults } from "./useCardImportResults";

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

    // Auto-detect format
    await analyzeFile(file);
    
    // Process the file
    const { processedCards, errors } = await processFile(file, typeToUse);
    
    // Update state with results
    setTransformedCards(processedCards);
    setValidationErrors(errors);
    
    // Create and set import results
    const results = createImportResults(processedCards, errors);
    setImportResults(results);
  };

  /**
   * Reset all import state
   */
  const resetState = () => {
    resetResults();
  };

  return {
    isProcessing,
    fileType: fileFormat, // Keep the name fileType for backward compatibility
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    detectFileFormat: analyzeFile, // Keep the name detectFileFormat for backward compatibility
    processFile: handleFileProcess,
    resetState,
  };
}
