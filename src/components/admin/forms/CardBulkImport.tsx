
import React from "react";
import { CardImporter } from "@/components/admin/import/CardImporter";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";

interface CardBulkImportProps {
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
}

// This is a wrapper for backward compatibility
export const CardBulkImport = ({ onImport }: CardBulkImportProps) => {
  return (
    <CardImporter onImport={onImport} activeCardType="gear" />
  );
};
