
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImporter } from "./useCardImporter";
import { CardImportDialog } from "./CardImportDialog";

interface CardImporterProps {
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  activeCardType: CardType;
}

export function CardImporter({ onImport, activeCardType }: CardImporterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    detectFileFormat,
    processFile,
    isProcessing,
    fileType,
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    resetState,
  } = useCardImporter({
    onImportComplete: (cards, results) => {
      onImport(cards, results);
      setIsDialogOpen(false);
      toast.success(`Successfully imported ${cards.length} cards`);
    }
  });

  const handleFileSelected = async (file: File) => {
    if (!file) return;
    
    try {
      // Auto-detect format and card type
      const detectedFormat = await detectFileFormat(file);
      await processFile(file);
    } catch (error) {
      console.error("Error importing file:", error);
      toast.error("Failed to process file. Please check the format and try again.");
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    resetState();
  };

  return (
    <>
      <Button 
        variant="default" 
        size="sm" 
        className="gap-2"
        onClick={() => setIsDialogOpen(true)}
      >
        <Upload className="h-4 w-4" />
        <span>Import Cards</span>
      </Button>

      <CardImportDialog 
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onFileSelected={handleFileSelected}
        fileType={fileType}
        cardType={cardType}
        setCardType={setCardType}
        isProcessing={isProcessing}
        transformedCards={transformedCards}
        validationErrors={validationErrors}
        importResults={importResults}
        defaultCardType={activeCardType}
        onImport={onImport}
      />
    </>
  );
}
