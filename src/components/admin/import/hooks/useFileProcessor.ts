
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { detectFileFormat, isValidFileType } from "@/utils/file-format/fileFormatDetector";
import { processFileContent, validateFile } from "@/utils/file-processors/fileProcessor";

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
  const [fileFormat, setFileFormat] = useState<"markdown" | "json-standard" | "json-transform" | "unknown" | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

  /**
   * Analyze a file and detect its format
   */
  const analyzeFile = async (file: File): Promise<string> => {
    if (!file) return "unknown";
    
    try {
      const { format, fileExtension } = await detectFileFormat(file);
      setFileFormat(format);
      setFileExtension(fileExtension);
      return format;
    } catch (error) {
      console.error("Error analyzing file:", error);
      setFileFormat("unknown");
      return "unknown";
    }
  };

  /**
   * Process a file and convert it to card data
   * No card import logic is handled here, only file processing
   */
  const processFile = async (file: File, cardType: CardType): Promise<FileProcessingResult> => {
    // Validate file exists
    const validation = validateFile(file);
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
      const result = await processFileContent(file, cardType, format as any);
      
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
