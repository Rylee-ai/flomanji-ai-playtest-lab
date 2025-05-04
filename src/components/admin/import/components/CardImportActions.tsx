
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CardImportActionsProps {
  onClose: () => void;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  isProcessing: boolean;
  failedCards?: {index: number, name?: string, error: string}[];
}

export function CardImportActions({
  onClose,
  transformedCards,
  validationErrors,
  importResults,
  onImport,
  isProcessing,
  failedCards = []
}: CardImportActionsProps) {
  const hasCards = transformedCards.length > 0;
  const hasErrors = validationErrors.length > 0;
  const hasFailedCards = failedCards.length > 0;
  
  // Create an import result if we don't have one yet
  const handleImport = () => {
    if (!importResults) {
      // Build an import result based on the cards and validation errors
      const result: CardImportResult = {
        imported: hasErrors ? 0 : transformedCards.length,
        updated: 0,
        failed: hasErrors ? transformedCards.length : 0,
        errors: validationErrors.map(error => ({ name: 'Validation error', error }))
      };
      onImport(transformedCards, result);
    } else {
      onImport(transformedCards, importResults);
    }
  };

  // Show a summary of what will be imported
  const renderSummary = () => {
    if (hasErrors) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Import validation failed</AlertTitle>
          <AlertDescription>
            Please fix the validation errors before importing.
          </AlertDescription>
        </Alert>
      );
    }
    
    if (hasFailedCards) {
      return (
        <Alert variant="default" className="mb-4 border-yellow-500">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle>Some cards could not be processed</AlertTitle>
          <AlertDescription>
            {failedCards.length} card(s) had issues. {transformedCards.length} card(s) are ready to import.
          </AlertDescription>
        </Alert>
      );
    }
    
    if (transformedCards.length > 0) {
      return (
        <Alert variant="default" className="mb-4 border-green-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Ready to import</AlertTitle>
          <AlertDescription>
            {transformedCards.length} card(s) are ready to import.
          </AlertDescription>
        </Alert>
      );
    }
    
    return null;
  };

  return (
    <div className="space-y-4">
      <Separator />
      
      {renderSummary()}
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onClose} 
          disabled={isProcessing}
        >
          Cancel
        </Button>
        
        <Button
          variant="default"
          onClick={handleImport}
          disabled={!hasCards || hasErrors || isProcessing}
        >
          {hasFailedCards ? "Import Valid Cards" : "Import Cards"}
        </Button>
      </div>
    </div>
  );
}
