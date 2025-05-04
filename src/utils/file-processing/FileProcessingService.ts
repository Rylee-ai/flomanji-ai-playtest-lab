
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { transformMarkdownToCards } from "@/utils/markdown";
import { processImportedCards } from "@/utils/cardImport";
import { transformCardData } from "@/utils/card-transformers";
import { ensureCardIds } from "@/utils/card-transformers/base-transformer";
import { parseMarkdownCardsAlternate } from "@/utils/markdown/parseMarkdownCardsAlternate";

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

    // Check file size (20 MB limit)
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
    if (file.size > MAX_FILE_SIZE) {
      return { 
        valid: false, 
        error: `File size (${(file.size / 1024 / 1024).toFixed(1)} MB) exceeds maximum of 20 MB` 
      };
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
        // Try standard markdown parser first
        try {
          processedCards = transformMarkdownToCards(text, cardType);
          
          // If no cards found, try alternate parser
          if (processedCards.length === 0) {
            console.log("Standard markdown parser found no cards, trying alternate parser");
            processedCards = parseMarkdownCardsAlternate(text);
            
            // Apply card type to the alternate-parsed cards
            if (processedCards.length > 0) {
              processedCards = processedCards.map(card => ({
                ...card,
                type: card.type || cardType
              }));
            }
          }
        } catch (mdError) {
          console.error("Error in markdown processing, trying alternate parser:", mdError);
          processedCards = parseMarkdownCardsAlternate(text);
          
          // Apply card type to the alternate-parsed cards
          if (processedCards.length > 0) {
            processedCards = processedCards.map(card => ({
              ...card,
              type: card.type || cardType
            }));
          }
        }
      } else {
        // Process JSON file
        try {
          const jsonData = JSON.parse(text);
          
          if (fileFormat === "json-transform") {
            // Transform external format to our format
            processedCards = transformCardData(jsonData, cardType);
          } else {
            // Process standard format
            processedCards = processImportedCards(jsonData, cardType) as CardFormValues[];
          }
        } catch (jsonError) {
          console.error("JSON parsing error:", jsonError);
          return { 
            processedCards: [], 
            errors: [`Failed to parse JSON: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`] 
          };
        }
      }
      
      // Ensure all cards have valid IDs
      processedCards = ensureCardIds(processedCards, cardType) as CardFormValues[];
      
      // Add logging to check what we've extracted
      console.log(`Processed ${processedCards.length} cards:`);
      if (processedCards.length > 0) {
        console.log(`First card: ${processedCards[0].name}`);
        if (processedCards.length > 1) {
          console.log(`Second card: ${processedCards[1].name}`);
        }
      }
      
      // Apply additional type-specific defaults and validation
      processedCards = processedCards.map(card => {
        // For gear cards, ensure category
        if (card.type === 'gear' && !card.category) {
          return { ...card, category: 'tool' };
        }
        
        // For treasure cards, ensure value is a number
        if (card.type === 'treasure' && card.value && typeof card.value === 'string') {
          return { ...card, value: parseInt(card.value, 10) || 0 };
        }
        
        return card;
      });
      
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
