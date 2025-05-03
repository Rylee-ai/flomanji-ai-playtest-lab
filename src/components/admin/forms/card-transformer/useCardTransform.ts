
import { useState } from "react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { transformCardData } from "@/utils/card-data-transformer";

interface UseCardTransformProps {
  onTransformed: (cards: CardFormValues[], results: CardImportResult) => void;
}

export const useCardTransform = ({ onTransformed }: UseCardTransformProps) => {
  const [cardType, setCardType] = useState<CardType>('gear');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [transformedCards, setTransformedCards] = useState<CardFormValues[]>([]);
  const [importResults, setImportResults] = useState<CardImportResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset state
    setIsProcessing(true);
    setProcessProgress(0);
    setTransformedCards([]);
    setImportResults(null);
    setValidationErrors([]);

    try {
      // Basic validation
      if (!file.name.endsWith('.json')) {
        toast.error('Only JSON files are supported');
        setIsProcessing(false);
        return;
      }

      const text = await file.text();
      let jsonData;
      
      try {
        jsonData = JSON.parse(text);
      } catch (error) {
        toast.error('Invalid JSON file format');
        setIsProcessing(false);
        return;
      }

      // Progress simulation for better UX
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress > 90) {
          clearInterval(progressInterval);
        }
        setProcessProgress(progress);
      }, 50);

      // Transform the cards
      const transformed = transformCardData(jsonData, cardType);
      
      // Validate cards
      const errors: string[] = [];
      transformed.forEach((card, index) => {
        if (!card.name) errors.push(`Card #${index + 1}: Missing name`);
        if (!card.type) errors.push(`Card #${index + 1}: Missing type`);
      });
      
      setValidationErrors(errors);
      
      // Clear progress interval
      clearInterval(progressInterval);
      setProcessProgress(100);
      
      // Create import results
      const results: CardImportResult = {
        imported: errors.length > 0 ? 0 : transformed.length,
        updated: 0, // We don't track updates yet
        failed: errors.length > 0 ? transformed.length : 0,
        errors: errors.map(error => ({ name: 'Validation error', error }))
      };
      
      setImportResults(results);
      setTransformedCards(transformed);
      
      // Show success or error
      if (errors.length > 0) {
        setShowResults(true);
      } else {
        toast.success(`Successfully transformed ${transformed.length} ${cardType} cards`);
        onTransformed(transformed, results);
      }
    } catch (error) {
      console.error('Error transforming cards:', error);
      toast.error(`Failed to transform ${cardType} cards. Please check the file format.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteTransform = () => {
    if (importResults && transformedCards.length > 0 && validationErrors.length === 0) {
      onTransformed(transformedCards, importResults);
    }
    setShowResults(false);
  };

  return {
    cardType,
    setCardType,
    isProcessing,
    processProgress,
    transformedCards,
    importResults,
    showResults,
    setShowResults,
    validationErrors,
    handleFileUpload,
    handleCompleteTransform
  };
};
