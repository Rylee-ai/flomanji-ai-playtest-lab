
import React, { useEffect } from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";

// Import our components
import { CardImportDialogHeader } from "./components/CardImportDialogHeader";
import { CardImportTabs } from "./components/CardImportTabs";
import { CardImportActions } from "./components/CardImportActions";
import { Progress } from "@/components/ui/progress";

interface CardImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  fileType: string | null;
  cardType: CardType;
  setCardType: (type: CardType) => void;
  isProcessing: boolean;
  processingProgress?: number;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  defaultCardType: CardType;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  failedCards?: {index: number, name?: string, error: string}[];
  // AI-related props
  enableAIProcessing?: boolean;
  setEnableAIProcessing?: (enable: boolean) => void;
  aiSuggestions?: CardSuggestion[];
  processingError?: string | null;
  onApplySuggestion?: (index: number) => void;
  onIgnoreSuggestion?: (index: number) => void;
}

export function CardImportDialog({
  isOpen,
  onClose,
  onFileSelected,
  fileType,
  cardType,
  setCardType,
  isProcessing,
  processingProgress = 0,
  transformedCards,
  validationErrors,
  importResults,
  defaultCardType,
  onImport,
  failedCards = [],
  // AI-related props
  enableAIProcessing = false,
  setEnableAIProcessing = () => {},
  aiSuggestions = [],
  processingError = null,
  onApplySuggestion = () => {},
  onIgnoreSuggestion = () => {},
}: CardImportDialogProps) {
  // Set the default card type when dialog opens, but don't override user selection afterwards
  useEffect(() => {
    if (isOpen && !cardType) {
      setCardType(defaultCardType);
    }
  }, [isOpen, defaultCardType, setCardType, cardType]);

  return (
    <Dialog open={isOpen} onOpenChange={isProcessing ? undefined : onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardImportDialogHeader 
          enableAIProcessing={enableAIProcessing}
          isProcessing={isProcessing}
        />

        {isProcessing && processingProgress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Processing cards...</p>
              <span className="text-sm font-medium">{Math.round(processingProgress)}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>
        )}

        <CardImportTabs
          cardType={cardType}
          setCardType={setCardType}
          onFileSelected={onFileSelected}
          isProcessing={isProcessing}
          validationErrors={validationErrors}
          transformedCards={transformedCards}
          defaultCardType={defaultCardType}
          fileType={fileType}
          failedCards={failedCards}
          // AI-related props
          enableAIProcessing={enableAIProcessing}
          setEnableAIProcessing={setEnableAIProcessing}
          aiSuggestions={aiSuggestions}
          processingError={processingError}
          onApplySuggestion={onApplySuggestion}
          onIgnoreSuggestion={onIgnoreSuggestion}
        />

        <CardImportActions
          onClose={onClose}
          transformedCards={transformedCards}
          validationErrors={validationErrors}
          importResults={importResults}
          onImport={onImport}
          isProcessing={isProcessing}
          failedCards={failedCards}
        />
      </DialogContent>
    </Dialog>
  );
}
