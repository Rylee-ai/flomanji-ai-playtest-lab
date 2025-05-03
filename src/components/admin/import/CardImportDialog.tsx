
import React from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our new components
import { FileUploader } from "./components/FileUploader";
import { TemplateDownloader } from "./components/TemplateDownloader";
import { ValidationSummary } from "./components/ValidationSummary";

interface CardImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  fileType: string | null;
  cardType: CardType;
  setCardType: (type: CardType) => void;
  isProcessing: boolean;
  transformedCards: CardFormValues[];
  validationErrors: string[];
  importResults: CardImportResult | null;
  defaultCardType: CardType;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
}

export function CardImportDialog({
  isOpen,
  onClose,
  onFileSelected,
  fileType,
  cardType,
  setCardType,
  isProcessing,
  transformedCards,
  validationErrors,
  importResults,
  defaultCardType,
  onImport,
}: CardImportDialogProps) {
  const handleImport = () => {
    if (transformedCards.length > 0 && importResults) {
      onImport(transformedCards, importResults);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Import Cards</DialogTitle>
          <DialogDescription>
            Import cards from JSON files or transform external card data.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="template">Get Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="py-4">
            <div className="space-y-4">
              <Select 
                value={cardType} 
                onValueChange={(value: CardType) => setCardType(value)}
                defaultValue={defaultCardType}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select Card Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="player-character">Player Characters</SelectItem>
                  <SelectItem value="npc">NPC Characters</SelectItem>
                  <SelectItem value="flomanjified">Flomanjified Roles</SelectItem>
                  <SelectItem value="treasure">Treasure Cards</SelectItem>
                  <SelectItem value="gear">Gear Cards</SelectItem>
                  <SelectItem value="hazard">Hazard Cards</SelectItem>
                  <SelectItem value="chaos">Chaos Cards</SelectItem>
                  <SelectItem value="region">Region Cards</SelectItem>
                  <SelectItem value="mission">Mission Sheets</SelectItem>
                  <SelectItem value="secret">Secret Objectives</SelectItem>
                  <SelectItem value="automa">Automa Cards</SelectItem>
                </SelectContent>
              </Select>

              <FileUploader 
                onFileSelected={onFileSelected} 
                isProcessing={isProcessing} 
              />

              <ValidationSummary
                validationErrors={validationErrors}
                transformedCards={transformedCards}
                cardType={cardType}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="template" className="py-4">
            <TemplateDownloader 
              cardType={cardType} 
              setCardType={setCardType} 
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {transformedCards.length > 0 && validationErrors.length === 0 && (
            <Button onClick={handleImport}>
              Import {transformedCards.length} Cards
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add missing imports at the top
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
