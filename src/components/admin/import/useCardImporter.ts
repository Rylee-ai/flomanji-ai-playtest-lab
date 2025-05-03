
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { processImportedCards } from "@/utils/cardImport";
import { transformCardData } from "@/utils/card-data-transformer";
import { transformMarkdownToCards } from "@/utils/markdownCardParser";

interface UseCardImporterProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
}

export function useCardImporter({ onImportComplete }: UseCardImporterProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [cardType, setCardType] = useState<CardType>("gear");
  const [transformedCards, setTransformedCards] = useState<CardFormValues[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importResults, setImportResults] = useState<CardImportResult | null>(null);

  // Detect file format and card type if possible
  const detectFileFormat = async (file: File): Promise<string> => {
    try {
      // Check file extension first
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'md') {
        setFileType("markdown");
        return "markdown";
      }
      
      // For JSON files, analyze content to determine format
      if (fileExtension === 'json') {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // Check if this is standard format or needs transformation
        let detectedFormat = "standard";
        let detectedType: CardType | null = null;
        
        // Try to detect card type from the data
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          
          // If it has a type field that matches our CardType, use that
          if (firstItem.type && typeof firstItem.type === 'string') {
            const possibleType = firstItem.type.toLowerCase();
            const validTypes: CardType[] = [
              "player-character", "npc", "flomanjified", "treasure", 
              "gear", "hazard", "chaos", "region", "mission", "secret", "automa"
            ];
            
            if (validTypes.includes(possibleType as CardType)) {
              detectedType = possibleType as CardType;
            } else if (possibleType === "gear" || 
                      possibleType.includes("consumable") || 
                      possibleType.includes("tool") || 
                      possibleType.includes("weapon")) {
              detectedType = "gear";
              detectedFormat = "transform";
            }
          }
          
          // Check structure to see if it needs transformation
          if (!firstItem.id && firstItem.title) {
            detectedFormat = "transform";
          }
        }
        
        console.log("Detected format:", detectedFormat, "Detected type:", detectedType);
        setFileType(detectedFormat);
        if (detectedType) {
          setCardType(detectedType);
        }
        
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

  const processFile = async (file: File) => {
    if (!file) return;

    // Reset state
    setIsProcessing(true);
    setTransformedCards([]);
    setImportResults(null);
    setValidationErrors([]);

    try {
      console.log("Processing file:", file.name);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (!['json', 'md'].includes(fileExtension || '')) {
        toast.error('Only JSON and Markdown files are supported');
        setIsProcessing(false);
        return;
      }

      const text = await file.text();
      let processedCards: CardFormValues[];
      
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
          setIsProcessing(false);
          return;
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
      processedCards.forEach((card, index) => {
        if (!card.name) errors.push(`Card #${index + 1}: Missing name`);
        if (!card.type) errors.push(`Card #${index + 1}: Missing type`);
      });
      
      setValidationErrors(errors);
      
      // Create import results
      const results: CardImportResult = {
        imported: errors.length > 0 ? 0 : processedCards.length,
        updated: 0, 
        failed: errors.length > 0 ? processedCards.length : 0,
        errors: errors.map(error => ({ name: 'Validation error', error }))
      };
      
      setImportResults(results);
      setTransformedCards(processedCards);
      
      // DO NOT Auto complete import if no errors - let the user trigger the import
      // if (errors.length === 0 && processedCards.length > 0) {
      //   onImportComplete(processedCards, results);
      // }
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(`Failed to process ${cardType} cards. Please check the file format.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => {
    setIsProcessing(false);
    setTransformedCards([]);
    setValidationErrors([]);
    setImportResults(null);
  };

  return {
    isProcessing,
    fileType,
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    detectFileFormat,
    processFile,
    resetState
  };
}
