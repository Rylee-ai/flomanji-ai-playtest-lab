
import { CardType } from "@/types/cards";
import { FileProcessingService } from "@/utils/file-processing/FileProcessingService";

/**
 * Process a file and transform its content into card data
 * This is a wrapper function for backward compatibility
 */
export const processFileContent = async (
  file: File,
  cardType: CardType,
  fileFormat: "markdown" | "json-standard" | "json-transform" | "unknown"
): Promise<{
  processedCards: any[];
  errors: string[];
}> => {
  return FileProcessingService.processFileContent(file, cardType, fileFormat);
};

/**
 * Basic validation for files before processing
 * This is a wrapper function for backward compatibility
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  return FileProcessingService.validateFile(file);
};
