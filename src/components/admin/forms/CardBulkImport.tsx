
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { processImportedCards } from "@/utils/cardImport";
import { CardFormValues } from "@/types/forms/card-form";
import { Upload } from "lucide-react";

interface CardBulkImportProps {
  onImport: (cards: CardFormValues[]) => void;
}

export const CardBulkImport = ({ onImport }: CardBulkImportProps) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const processedCards = processImportedCards(jsonData);
      
      onImport(processedCards as CardFormValues[]);
      toast.success(`Successfully processed ${processedCards.length} gear cards`);
    } catch (error) {
      console.error('Error importing cards:', error);
      toast.error('Failed to import gear cards. Please check the file format.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
        id="card-import"
      />
      <label htmlFor="card-import">
        <Button variant="outline" type="button" asChild>
          <span className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import Gear Cards</span>
          </span>
        </Button>
      </label>
    </div>
  );
};
