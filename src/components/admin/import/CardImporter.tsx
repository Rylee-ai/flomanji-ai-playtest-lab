
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImporter } from "./hooks/useCardImporter";
import { CardImportDialog } from "./CardImportDialog";
import { FileProcessingOptions } from "./hooks/useCardFileProcessor";

interface CardImporterProps {
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  activeCardType: CardType;
  /**
   * Processing options for batch processing and error handling
   */
  processingOptions?: FileProcessingOptions;
}

export function CardImporter({ 
  onImport, 
  activeCardType, 
  processingOptions 
}: CardImporterProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fileFormat, setFileFormat] = useState<string | null>(null);

  const {
    detectFileFormat,
    processFile,
    isProcessing,
    processingProgress,
    cardType,
    setCardType,
    transformedCards,
    validationErrors,
    importResults,
    resetState,
    failedCards,
    // AI-related properties
    enableAIProcessing,
    setEnableAIProcessing,
    aiSuggestions,
    handleApplySuggestion,
    handleIgnoreSuggestion
  } = useCardImporter({
    onImportComplete: (cards, results) => {
      console.log("Import complete callback triggered with", cards.length, "cards");
      onImport(cards, results);
      setIsDialogOpen(false);
      
      const failedCount = results.failed || 0;
      if (failedCount > 0) {
        toast.warning(`Import completed with ${failedCount} failed cards. ${cards.length} cards were imported successfully.`);
      } else {
        toast.success(`Successfully imported ${cards.length} cards`);
      }
    },
    initialCardType: activeCardType,
    processingOptions
  });

  const handleFileSelected = async (file: File) => {
    if (!file) return;
    
    try {
      console.log("Processing file:", file.name);
      console.log("Current card type before processing:", cardType);
      console.log("AI processing enabled:", enableAIProcessing);
      
      // Auto-detect format but respect the user's selected card type
      const format = await detectFileFormat(file);
      setFileFormat(format);
      
      // Process the file using the current cardType (which might have been set by the user)
      // and pass along processing options
      await processFile(file, cardType);
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
    
    const failedCount = results.failed || 0;
    if (failedCount > 0) {
      toast.warning(`Import completed with ${failedCount} failed cards. ${cards.length} cards were imported successfully.`);
    } else {
      toast.success(`Successfully imported ${cards.length} cards`);
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
        onClick={() => {
          setIsDialogOpen(true);
          // Set the initial card type to the active tab type but don't force reset it later
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
        fileType={fileFormat}
        cardType={cardType}
        setCardType={setCardType}
        isProcessing={isProcessing}
        processingProgress={processingProgress}
        transformedCards={transformedCards}
        validationErrors={validationErrors}
        importResults={importResults}
        defaultCardType={activeCardType}
        onImport={handleImport}
        failedCards={failedCards}
        // AI-related props
        enableAIProcessing={enableAIProcessing}
        setEnableAIProcessing={setEnableAIProcessing}
        aiSuggestions={aiSuggestions}
        onApplySuggestion={handleApplySuggestion}
        onIgnoreSuggestion={handleIgnoreSuggestion}
        showFlomanjiOptions={true}
      />
    </>
  );
}
