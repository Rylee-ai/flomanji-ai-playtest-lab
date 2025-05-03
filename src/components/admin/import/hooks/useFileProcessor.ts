
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { useFileFormat } from "./useFileFormat";
import { FileProcessingService } from "@/utils/file-processing/FileProcessingService";

export interface FileProcessingResult {
  processedCards: CardFormValues[];
  errors: string[];
}

/**
 * Custom hook for processing imported files and converting them to card data
 * This hook focuses solely on file processing without card import logic
 */
export function useFileProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { fileFormat, fileExtension, analyzeFile } = useFileFormat();

  /**
   * Process a file and convert it to card data
   * No card import logic is handled here, only file processing
   */
  const processFile = async (file: File, cardType: CardType): Promise<FileProcessingResult> => {
    // Validate file exists
    const validation = FileProcessingService.validateFile(file);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid file");
      return { processedCards: [], errors: [validation.error || "Invalid file"] };
    }
    
    setIsProcessing(true);
    
    try {
      console.log("Processing file:", file.name);
      
      // Make sure we have the file format
      const format = fileFormat || await analyzeFile(file);
      
      // Process the file content
      const result = await FileProcessingService.processFileContent(file, cardType, format as any);
      
      return result;
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(`Failed to process ${cardType} cards. Please check the file format.`);
      return { 
        processedCards: [], 
        errors: [`Failed to process file: ${error}`] 
      };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    fileFormat,
    fileExtension,
    analyzeFile,
    processFile
  };
}
