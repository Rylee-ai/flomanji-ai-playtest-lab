
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

interface CardImportActionsProps {
  onClose: () => void;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  isProcessing?: boolean;
}

export const CardImportActions = ({
  onClose,
  transformedCards,
  validationErrors,
  importResults,
  onImport,
  isProcessing = false,
}: CardImportActionsProps) => {
  const handleImport = () => {
    // Create a default import result if none exists
    const resultsToUse = importResults || {
      imported: transformedCards.length,
      updated: 0,
      failed: 0,
      errors: []
    };
    
    if (transformedCards.length > 0) {
      console.log("Importing cards:", transformedCards.length);
      onImport(transformedCards, resultsToUse);
    }
  };

  // Show the import button only when we have valid cards
  const showImportButton = transformedCards.length > 0 && validationErrors.length === 0;
  
  console.log("CardImportActions - Showing import button:", showImportButton);
  console.log("CardImportActions - Cards count:", transformedCards.length);
  console.log("CardImportActions - Validation errors:", validationErrors.length);
  console.log("CardImportActions - Is processing:", isProcessing);

  return (
    <DialogFooter className="flex justify-between mt-4 pt-4 border-t">
      <Button 
        variant="outline" 
        onClick={onClose}
        disabled={isProcessing}
      >
        Cancel
      </Button>
      
      {isProcessing ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </Button>
      ) : showImportButton ? (
        <Button 
          onClick={handleImport} 
          variant="default" 
          className="bg-green-600 hover:bg-green-700 font-medium text-lg px-6 py-2"
        >
          Import {transformedCards.length} Cards
        </Button>
      ) : transformedCards.length > 0 ? (
        <Button variant="secondary" disabled>
          Fix Errors to Import
        </Button>
      ) : null}
    </DialogFooter>
  );
}
