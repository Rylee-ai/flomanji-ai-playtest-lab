
import { useState } from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

/**
 * Custom hook for managing card import state
 */
export function useCardImportState(initialCardType: CardType = "gear") {
  const [cardType, setCardType] = useState<CardType>(initialCardType);
  const [transformedCards, setTransformedCards] = useState<CardFormValues[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [importResults, setImportResults] = useState<CardImportResult | null>(null);

  /**
   * Create import results object from cards and validation errors
   */
  const createImportResults = (
    cards: CardFormValues[], 
    errors: string[]
  ): CardImportResult => {
    return {
      imported: errors.length > 0 ? 0 : cards.length,
      updated: 0, 
      failed: errors.length > 0 ? cards.length : 0,
      errors: errors.map(error => ({ name: 'Validation error', error }))
    };
  };

  /**
   * Reset the import state
   */
  const resetState = () => {
    setTransformedCards([]);
    setValidationErrors([]);
    setImportResults(null);
  };

  return {
    cardType,
    setCardType,
    transformedCards,
    setTransformedCards,
    validationErrors,
    setValidationErrors,
    importResults,
    setImportResults,
    createImportResults,
    resetState
  };
}
