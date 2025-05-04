
import React from "react";
import { CardImporter } from "@/components/admin/import/CardImporter";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { FileProcessingOptions } from "@/components/admin/import/hooks/useCardFileProcessor";

interface CardBulkImportProps {
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  processingOptions?: FileProcessingOptions;
}

// This is a wrapper for backward compatibility
export const CardBulkImport = ({ onImport, processingOptions }: CardBulkImportProps) => {
  // Default processing options for bulk imports
  const defaultOptions: FileProcessingOptions = {
    batchSize: 50,
    continueOnError: true,
  };
  
  const options = processingOptions || defaultOptions;
  
  return (
    <CardImporter 
      onImport={onImport} 
      activeCardType="gear" 
      processingOptions={options}
    />
  );
};
