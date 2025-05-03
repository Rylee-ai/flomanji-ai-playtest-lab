
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
    if (transformedCards.length > 0 && importResults) {
      onImport(transformedCards, importResults);
      onClose();
    }
  };

  return (
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      {transformedCards.length > 0 && validationErrors.length === 0 && (
        <Button onClick={handleImport}>
          Import {transformedCards.length} Cards
        </Button>
      )}
    </DialogFooter>
  );
};
