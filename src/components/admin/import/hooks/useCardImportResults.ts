
import { useState } from "react";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

/**
 * Custom hook for managing card import results
 */
export function useCardImportResults() {
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
   * Reset all results state
   */
  const resetResults = () => {
    setTransformedCards([]);
    setValidationErrors([]);
    setImportResults(null);
  };

  return {
    transformedCards,
    setTransformedCards,
    validationErrors,
    setValidationErrors,
    importResults,
    setImportResults,
    createImportResults,
    resetResults
  };
}
