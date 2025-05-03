
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
      console.log("Import complete callback triggered with", cards.length, "cards");
      onImport(cards, results);
      setIsDialogOpen(false);
      toast.success(`Successfully imported ${cards.length} cards`);
    },
    initialCardType: activeCardType // Pass the active card type here
  });

  const handleFileSelected = async (file: File) => {
    if (!file) return;
    
    try {
      console.log("Processing file:", file.name);
      // Auto-detect format and card type
      const detectedFormat = await detectFileFormat(file);
      console.log("Detected format:", detectedFormat);
      await processFile(file);
    } catch (error) {
      console.error("Error importing file:", error);
      toast.error("Failed to process file. Please check the format and try again.");
    }
  };

  const handleImport = (cards: CardFormValues[], results: CardImportResult) => {
    console.log("Manual import triggered with", cards.length, "cards");
    onImport(cards, results);
    setIsDialogOpen(false);
    resetState();
    toast.success(`Successfully imported ${cards.length} cards`);
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
        onClick={() => {
          setIsDialogOpen(true);
          // Reset card type to the active tab type whenever opening the dialog
          setCardType(activeCardType);
        }}
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
        onImport={handleImport}
      />
    </>
  );
}
