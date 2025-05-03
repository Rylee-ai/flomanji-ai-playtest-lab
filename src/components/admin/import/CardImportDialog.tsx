
import React, { useEffect } from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Import our new components
import { CardImportDialogHeader } from "./components/CardImportDialogHeader";
import { CardImportTabs } from "./components/CardImportTabs";
import { CardImportActions } from "./components/CardImportActions";

interface CardImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  fileType: string | null;
  cardType: CardType;
  setCardType: (type: CardType) => void;
  isProcessing: boolean;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  defaultCardType: CardType;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
}

export function CardImportDialog({
  isOpen,
  onClose,
  onFileSelected,
  fileType,
  cardType,
  setCardType,
  isProcessing,
  transformedCards,
  validationErrors,
  importResults,
  defaultCardType,
  onImport,
}: CardImportDialogProps) {
  // Set the default card type when dialog opens, but don't override user selection afterwards
  useEffect(() => {
    if (isOpen && !cardType) {
      setCardType(defaultCardType);
    }
  }, [isOpen, defaultCardType, setCardType, cardType]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardImportDialogHeader />

        <CardImportTabs
          cardType={cardType}
          setCardType={setCardType}
          onFileSelected={onFileSelected}
          isProcessing={isProcessing}
          validationErrors={validationErrors}
          transformedCards={transformedCards}
          defaultCardType={defaultCardType}
          fileType={fileType}
        />

        <CardImportActions
          onClose={onClose}
          transformedCards={transformedCards}
          validationErrors={validationErrors}
          importResults={importResults}
          onImport={onImport}
        />
      </DialogContent>
    </Dialog>
  );
}
