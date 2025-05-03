
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Check, AlertTriangle, FileJson, FileText, Info } from "lucide-react";
import { CardFormValues } from "@/types/forms/card-form";

interface ValidationSummaryProps {
  transformedCards: CardFormValues[];
  validationErrors: string[];
  fileType: string | null;
}

export const ValidationSummary = ({
  transformedCards,
  validationErrors,
  fileType,
}: ValidationSummaryProps) => {
  if (!fileType) {
    return null;
  }
  
  const getFileTypeIcon = () => {
    if (fileType === "markdown") {
      return <FileText className="h-4 w-4" />;
    }
    return <FileJson className="h-4 w-4" />;
  };

  const getFileTypeDescription = () => {
    if (fileType === "markdown") {
      return "Markdown";
    } else if (fileType === "transform") {
      return "External JSON";
    }
    return "JSON";
  };

  // Special handling for when a file was processed but no cards were found
  if (transformedCards.length === 0 && fileType) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertTitle>No Cards Found</AlertTitle>
        <AlertDescription>
          <p className="mb-2">No valid cards were found in the uploaded {getFileTypeDescription()} file.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Check that the file format matches the expected structure</li>
            <li>Verify that you've selected the correct card type</li>
            <li>Make sure the file contains properly formatted card data</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {validationErrors.length > 0 ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : transformedCards.length > 0 ? (
        <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-900/20">
          <Check className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-600 dark:text-green-400">File Validated</AlertTitle>
          <AlertDescription className="text-sm text-green-600 dark:text-green-400">
            <div className="flex gap-1 items-center">
              {getFileTypeIcon()}
              <span>{getFileTypeDescription()} file processed successfully.</span>
            </div>
            <p className="mt-1">Found {transformedCards.length} valid cards ready for import.</p>
            <p className="mt-1 font-medium">Click the "Import Cards" button below to add these cards to your collection.</p>
          </AlertDescription>
        </Alert>
      ) : null}
      
      {transformedCards.length > 0 && (
        <div className="p-4 border rounded-md bg-muted/20">
          <h3 className="text-sm font-medium mb-2">Card Preview</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transformedCards.slice(0, 10).map((card, index) => (
              <div key={index} className="text-xs p-2 bg-background rounded border">
                <span className="font-semibold">{card.name}</span> - {card.type}
                {card.keywords && card.keywords.length > 0 && (
                  <div className="mt-1 text-muted-foreground">
                    Keywords: {card.keywords.join(', ')}
                  </div>
                )}
              </div>
            ))}
            {transformedCards.length > 10 && (
              <p className="text-xs text-muted-foreground">
                ...and {transformedCards.length - 10} more cards
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
