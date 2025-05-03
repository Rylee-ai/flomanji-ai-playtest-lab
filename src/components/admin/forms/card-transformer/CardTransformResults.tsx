
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

interface CardTransformResultsProps {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  cardType: string;
  onCompleteTransform: () => void;
}

export const CardTransformResults = ({
  showResults,
  setShowResults,
  transformedCards,
  validationErrors,
  cardType,
  onCompleteTransform
}: CardTransformResultsProps) => {
  return (
    <Dialog open={showResults} onOpenChange={setShowResults}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Transform Results</DialogTitle>
          <DialogDescription>
            Review the results of your card transformation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {validationErrors.length > 0 ? (
            <Alert variant="destructive">
              <AlertTitle>Transform failed</AlertTitle>
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
          ) : (
            <Alert className="bg-green-50 dark:bg-green-900/20">
              <Check className="h-4 w-4" />
              <AlertTitle>Transform successful</AlertTitle>
              <AlertDescription>
                <p>Successfully transformed {transformedCards.length} {cardType} cards.</p>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          {validationErrors.length > 0 ? (
            <Button onClick={() => setShowResults(false)}>
              Close
            </Button>
          ) : (
            <Button onClick={onCompleteTransform}>
              Complete Transform
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
