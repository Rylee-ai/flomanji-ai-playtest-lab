
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { useFileProcessor } from "./useFileProcessor";
import { handleFileProcessingError } from "../utils/cardImportUtils";

/**
 * Hook for managing file processing in the card import workflow
 */
export function useCardFileProcessor() {
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const {
    isProcessing: isFileProcessorBusy,
    analyzeFile,
    processFile: processorProcessFile
  } = useFileProcessor();

  /**
   * Process a file and extract card data
   * @param file The file to process
   * @param cardType The type of cards to create
   * @returns The processed cards and any validation errors
   */
  const processFile = async (
    file: File,
    cardType: CardType
  ): Promise<{
    processedCards: CardFormValues[];
    errors: string[];
  }> => {
    if (!file) {
      return { processedCards: [], errors: ["No file provided"] };
    }
    
    setIsProcessingFile(true);
    
    try {
      console.log("Processing file:", file.name);
      
      // Auto-detect format
      await analyzeFile(file);
      
      // Process the file
      const result = await processorProcessFile(file, cardType);
      console.log(`File processed with ${result.processedCards.length} cards and ${result.errors.length} errors`);
      
      return result;
    } catch (error) {
      return {
        processedCards: [],
        errors: handleFileProcessingError(error)
      };
    } finally {
      setIsProcessingFile(false);
    }
  };

  return {
    isProcessing: isProcessingFile || isFileProcessorBusy,
    analyzeFile,
    processFile
  };
}
