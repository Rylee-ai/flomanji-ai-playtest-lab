
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { transformMarkdownToCards } from "@/utils/markdown";
import { processImportedCards } from "@/utils/cardImport";
import { transformCardData } from "@/utils/card-transformers";
import { ensureCardIds } from "@/utils/card-transformers/base-transformer";

export interface FileProcessingResult {
  processedCards: CardFormValues[];
  errors: string[];
}

/**
 * Service for processing imported files into card data
 */
export class FileProcessingService {
  /**
   * Basic validation for files before processing
   * @param file The file to validate
   * @returns Validation result and any error message
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: "No file provided" };
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!['json', 'md'].includes(fileExtension || '')) {
      return { valid: false, error: "Only JSON and Markdown files are supported" };
    }
    
    return { valid: true };
  }

  /**
   * Process a file and transform its content into card data
   * @param file The file to process
   * @param cardType The type of cards to create
   * @param fileFormat The format of the file
   * @returns Processed card data and any validation errors
   */
  static async processFileContent(
    file: File,
    cardType: CardType,
    fileFormat: "markdown" | "json-standard" | "json-transform" | "unknown"
  ): Promise<FileProcessingResult> {
    try {
      console.log(`Processing ${fileFormat} file for card type:`, cardType);
      
      if (fileFormat === "unknown") {
        return { 
          processedCards: [], 
          errors: ["Unsupported file format. Please use JSON or Markdown files."] 
        };
      }
      
      const text = await file.text();
      let processedCards: CardFormValues[] = [];
      
      // Process based on file type
      if (fileFormat === "markdown") {
        // Process Markdown file
        processedCards = transformMarkdownToCards(text, cardType);
      } else {
        // Process JSON file
        const jsonData = JSON.parse(text);
        
        if (fileFormat === "json-transform") {
          // Transform external format to our format
          processedCards = transformCardData(jsonData, cardType);
        } else {
          // Process standard format
          processedCards = processImportedCards(jsonData, cardType) as CardFormValues[];
        }
      }
      
      // Ensure all cards have valid IDs
      processedCards = ensureCardIds(processedCards, cardType) as CardFormValues[];
      
      console.log("Processed cards:", processedCards.length);
      
      // Validate cards
      const errors: string[] = [];
      if (processedCards.length === 0) {
        errors.push("No valid cards found in file. Please check the format and card type selection.");
      } else {
        processedCards.forEach((card, index) => {
          if (!card.name) errors.push(`Card #${index + 1}: Missing name`);
          if (!card.type) errors.push(`Card #${index + 1}: Missing type`);
          
          // For gear cards, check category
          if (card.type === 'gear' && !card.category) {
            // Auto-assign tool category instead of showing error
            card.category = 'tool';
          }
        });
      }
      
      return { processedCards, errors };
    } catch (error) {
      console.error('Error processing file content:', error);
      return { 
        processedCards: [], 
        errors: [`Failed to process file: ${error}`] 
      };
    }
  }
}
