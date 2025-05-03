
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { processImportedCards } from "@/utils/cardImport";
import { transformCardData } from "@/utils/card-transformers";
import { transformMarkdownToCards } from "@/utils/markdown";

export interface FileProcessingResult {
  processedCards: CardFormValues[];
  errors: string[];
}

/**
 * Custom hook for processing imported files and converting them to card data
 */
export function useFileProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  /**
   * Detect file format and card type from the uploaded file
   */
  const detectFileFormat = async (file: File): Promise<string> => {
    try {
      // Check file extension first
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'md') {
        setFileType("markdown");
        console.log("Detected Markdown file");
        return "markdown";
      }
      
      // For JSON files, analyze content to determine format
      if (fileExtension === 'json') {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // Check if this is standard format or needs transformation
        let detectedFormat = "standard";
        
        // Check structure to see if it needs transformation
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          
          // If it has a type field that matches our CardType, suggest that type
          if (firstItem.type && typeof firstItem.type === 'string') {
            const possibleType = firstItem.type.toLowerCase();
            
            if (possibleType === "gear" || 
                possibleType.includes("consumable") || 
                possibleType.includes("tool") || 
                possibleType.includes("weapon")) {
              detectedFormat = "transform";
            }
          }
          
          // Check structure to see if it needs transformation
          if (!firstItem.id && firstItem.title) {
            detectedFormat = "transform";
          }
        }
        
        console.log("Detected format:", detectedFormat);
        setFileType(detectedFormat);
        
        return detectedFormat;
      }
      
      setFileType("unknown");
      return "unknown";
    } catch (error) {
      console.error("Error detecting file format:", error);
      setFileType("unknown");
      return "unknown";
    }
  };

  /**
   * Process a file and convert it to card data
   */
  const processFile = async (file: File, cardType: CardType): Promise<FileProcessingResult> => {
    if (!file) return { processedCards: [], errors: ["No file provided"] };
    
    console.log("Processing file for card type:", cardType);
    setIsProcessing(true);
    
    try {
      console.log("Processing file:", file.name);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (!['json', 'md'].includes(fileExtension || '')) {
        toast.error('Only JSON and Markdown files are supported');
        return { processedCards: [], errors: ["Only JSON and Markdown files are supported"] };
      }

      const text = await file.text();
      let processedCards: CardFormValues[] = [];
      
      // Process based on file type
      if (fileExtension === 'md') {
        // Process Markdown file
        console.log("Processing Markdown file for card type:", cardType);
        processedCards = transformMarkdownToCards(text, cardType);
      } else {
        // Process JSON file
        let jsonData;
        
        try {
          jsonData = JSON.parse(text);
        } catch (error) {
          toast.error('Invalid JSON file format');
          return { processedCards: [], errors: ["Invalid JSON file format"] };
        }
        
        // Process the cards based on file type
        if (fileType === "transform") {
          // Transform external format to our format
          console.log("Transforming external data format for card type:", cardType);
          processedCards = transformCardData(jsonData, cardType);
        } else {
          // Process standard format
          console.log("Processing standard data format for card type:", cardType);
          processedCards = processImportedCards(jsonData, cardType) as CardFormValues[];
        }
      }
      
      console.log("Processed cards:", processedCards.length);
      
      // Validate cards
      const errors: string[] = [];
      if (processedCards.length === 0) {
        errors.push("No valid cards found in file. Please check the format and card type selection.");
      } else {
        processedCards.forEach((card, index) => {
          if (!card.name) errors.push(`Card #${index + 1}: Missing name`);
          if (!card.type) errors.push(`Card #${index + 1}: Missing type`);
        });
      }
      
      return { 
        processedCards,
        errors
      };
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
    fileType,
    detectFileFormat,
    processFile
  };
}
