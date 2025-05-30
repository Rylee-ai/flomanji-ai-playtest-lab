
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { useFileProcessor } from "./useFileProcessor";
import { formatCardError, formatCardSpecificError } from "@/utils/error-handling/cardErrorHandler";

/**
 * Configuration options for file processing
 */
export interface FileProcessingOptions {
  /** Maximum number of cards to process in a single batch */
  batchSize?: number;
  /** Whether to continue processing on errors */
  continueOnError?: boolean;
}

/**
 * Default options for file processing
 */
const DEFAULT_PROCESSING_OPTIONS: FileProcessingOptions = {
  batchSize: 100,
  continueOnError: true,
};

/**
 * Result of processing a card file
 */
export interface CardFileProcessingResult {
  processedCards: CardFormValues[];
  errors: string[];
  failedCards: {index: number, name?: string, error: string}[];
}

/**
 * Hook for managing file processing in the card import workflow
 * with improved error handling and batch processing
 */
export function useCardFileProcessor() {
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const {
    isProcessing: isFileProcessorBusy,
    analyzeFile,
    processFile: processorProcessFile
  } = useFileProcessor();

  /**
   * Process a file and extract card data with advanced error handling and batching
   */
  const processFile = async (
    file: File,
    cardType: CardType,
    options: FileProcessingOptions = DEFAULT_PROCESSING_OPTIONS
  ): Promise<CardFileProcessingResult> => {
    if (!file) {
      return { 
        processedCards: [], 
        errors: ["No file provided"],
        failedCards: []
      };
    }
    
    setIsProcessingFile(true);
    setProcessingProgress(0);
    
    try {
      console.log(`Processing file: ${file.name} with options:`, options);
      
      // Auto-detect format
      await analyzeFile(file);
      
      // Process the file with batching support
      const result = await processorProcessFile(file, cardType);
      console.log(`Initial file processing complete with ${result.processedCards.length} cards and ${result.errors.length} errors`);
      
      // If no cards were processed, return early
      if (result.processedCards.length === 0) {
        return {
          ...result,
          failedCards: []
        };
      }

      // Process cards in batches if there are a lot of them
      const { batchSize = 100, continueOnError = true } = options;
      const processedCards: CardFormValues[] = [];
      const failedCards: {index: number, name?: string, error: string}[] = [];
      const errors: string[] = [...result.errors];
      
      // Only apply batching if there are more cards than the batch size
      if (result.processedCards.length > batchSize) {
        console.log(`Applying batch processing for ${result.processedCards.length} cards with batch size ${batchSize}`);
        
        // Process in batches
        for (let i = 0; i < result.processedCards.length; i += batchSize) {
          const batch = result.processedCards.slice(i, i + batchSize);
          const batchNumber = Math.floor(i / batchSize) + 1;
          
          try {
            // Here we could perform additional validation or processing per batch
            processedCards.push(...batch);
            
            // Update progress
            const progress = Math.min(((i + batch.length) / result.processedCards.length) * 100, 100);
            setProcessingProgress(progress);
            
            console.log(`Processed batch ${batchNumber}, cards ${i+1} to ${i+batch.length}`);
          } catch (batchError) {
            const formattedError = formatCardError(batchError, `batch ${batchNumber}`);
            console.error(`Error processing batch ${batchNumber}:`, formattedError);
            
            // Record card-specific errors
            batch.forEach((card, batchIndex) => {
              const cardIndex = i + batchIndex;
              failedCards.push({
                index: cardIndex,
                name: card.name,
                error: `Processing error in batch ${batchNumber}: ${formattedError.message}`
              });
            });
            
            // Add batch error to general errors
            errors.push(`Error processing batch ${batchNumber}: ${formattedError.message}`);
            
            // If we should stop on errors, break the loop
            if (!continueOnError) {
              break;
            }
          }
        }
      } else {
        // No batching needed, just use all processed cards
        processedCards.push(...result.processedCards);
        setProcessingProgress(100);
      }
      
      // Return the final results
      return {
        processedCards,
        errors,
        failedCards
      };
    } catch (error) {
      const formattedError = formatCardError(error, 'file processing');
      return {
        processedCards: [],
        errors: [formattedError.message],
        failedCards: []
      };
    } finally {
      setIsProcessingFile(false);
      setProcessingProgress(0);
    }
  };

  return {
    isProcessing: isProcessingFile || isFileProcessorBusy,
    processingProgress,
    analyzeFile,
    processFile
  };
}
