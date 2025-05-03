
import React from "react";
import { AlertTriangle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";

interface ValidationSummaryProps {
  validationErrors: string[];
  transformedCards: CardFormValues[];
  cardType: CardType;
}

export const ValidationSummary = ({
  validationErrors,
  transformedCards,
  cardType,
}: ValidationSummaryProps) => {
  if (validationErrors.length > 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Validation errors found</AlertTitle>
        <AlertDescription>
          <p>The following errors were found:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {validationErrors.slice(0, 5).map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
            {validationErrors.length > 5 && (
              <li className="text-sm">And {validationErrors.length - 5} more errors...</li>
            )}
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  if (transformedCards.length > 0) {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20">
        <FileText className="h-4 w-4" />
        <AlertTitle>Ready to import</AlertTitle>
        <AlertDescription>
          Successfully processed {transformedCards.length} {cardType} cards.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};
