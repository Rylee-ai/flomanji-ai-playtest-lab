
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

interface CardImportActionsProps {
  onClose: () => void;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
}

export const CardImportActions = ({
  onClose,
  transformedCards,
  validationErrors,
  importResults,
  onImport,
}: CardImportActionsProps) => {
  const handleImport = () => {
    // Create a default import result if none exists
    const resultsToUse = importResults || {
      imported: transformedCards.length,
      updated: 0,
      failed: 0,
      errors: []
    };
    
    if (transformedCards.length > 0 && validationErrors.length === 0) {
      console.log("Importing cards:", transformedCards.length);
      onImport(transformedCards, resultsToUse);
    }
  };

  // Show the import button only when we have valid cards
  const showImportButton = transformedCards.length > 0 && validationErrors.length === 0;

  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      {showImportButton && (
        <Button onClick={handleImport}>
          Import {transformedCards.length} Cards
        </Button>
      )}
    </DialogFooter>
  );
};
