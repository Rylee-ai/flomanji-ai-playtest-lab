import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { processImportedCards } from "@/utils/cardImport";
import { transformCardData } from "@/utils/card-data-transformer";
import { transformMarkdownToCards } from "@/utils/markdown";

interface UseCardImporterProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
}

export function useCardImporter({ onImportComplete, initialCardType = "gear" }: UseCardImporterProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);
  const [cardType, setCardType] = useState<CardType>(initialCardType);
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
        // Don't change the card type for markdown files - use the one set by the user
        console.log("Detected Markdown file, using selected card type:", cardType);
        return "markdown";
      }
      
      // For JSON files, analyze content to determine format
      if (fileExtension === 'json') {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // Check if this is standard format or needs transformation
        let detectedFormat = "standard";
        let detectedType: CardType | null = null;
        
        // Try to detect card type from the data, but don't override user selection
        // unless auto-detection is clearly better
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          
          // If it has a type field that matches our CardType, suggest that type
          if (firstItem.type && typeof firstItem.type === 'string') {
            const possibleType = firstItem.type.toLowerCase();
            const validTypes: CardType[] = [
              "player-character", "npc", "flomanjified", "treasure", 
              "gear", "hazard", "chaos", "region", "mission", "secret", "automa"
            ];
            
            // Only suggest detected type if it's valid
            if (validTypes.includes(possibleType as CardType)) {
              detectedType = possibleType as CardType;
              console.log("Detected card type from JSON:", detectedType);
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
        
        console.log("Detected format:", detectedFormat);
        setFileType(detectedFormat);
        
        // Only suggest the detected type to the user, don't automatically change it
        if (detectedType) {
          console.log("Suggesting card type:", detectedType);
          // Don't override user selection automatically
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

  const processFile = async (file: File, selectedCardType?: CardType) => {
    if (!file) return;
    
    // Use passed in card type if available, otherwise use the state
    const typeToUse = selectedCardType || cardType;
    console.log("Processing file for card type:", typeToUse);

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
      let processedCards: CardFormValues[] = [];
      
      // Process based on file type
      if (fileExtension === 'md') {
        // Process Markdown file - crucial to use the current cardType
        console.log("Processing Markdown file for card type:", typeToUse);
        processedCards = transformMarkdownToCards(text, typeToUse);
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
          console.log("Transforming external data format for card type:", typeToUse);
          processedCards = transformCardData(jsonData, typeToUse);
        } else {
          // Process standard format
          console.log("Processing standard data format for card type:", typeToUse);
          processedCards = processImportedCards(jsonData, typeToUse) as CardFormValues[];
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
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error(`Failed to process ${typeToUse} cards. Please check the file format.`);
      setValidationErrors([`Failed to process file: ${error}`]);
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
