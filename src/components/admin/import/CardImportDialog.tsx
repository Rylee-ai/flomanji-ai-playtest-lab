
import React from "react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { FileJson, AlertTriangle, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCardTemplateForType } from "@/utils/card-templates";

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
  const handleDownloadTemplate = () => {
    const template = getCardTemplateForType(cardType);
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cardType}-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
              <div className="flex items-center space-x-4">
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
              </div>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-col items-center space-y-4">
                  <FileJson className="h-10 w-10 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drag and drop your file here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports JSON files with card data
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="card-import"
                    disabled={isProcessing}
                  />
                  <label htmlFor="card-import">
                    <Button variant="outline" type="button" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Select File"}
                    </Button>
                  </label>
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <p className="text-sm">Processing file...</p>
                  <Progress value={40} className="h-2" />
                </div>
              )}

              {validationErrors.length > 0 && (
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
              )}

              {transformedCards.length > 0 && validationErrors.length === 0 && (
                <Alert className="bg-green-50 dark:bg-green-900/20">
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Ready to import</AlertTitle>
                  <AlertDescription>
                    Successfully processed {transformedCards.length} {cardType} cards.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="template" className="py-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Download a template for the selected card type to help you create valid card data.
              </p>
              
              <div className="flex items-center space-x-4">
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
                
                <Button onClick={handleDownloadTemplate} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
              
              <Alert>
                <AlertTitle>Template Format</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>
                    The template contains the minimum required fields for the selected card type.
                    You can add additional fields as needed based on the card type.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Save your completed template as a JSON file and upload it using the Upload tab.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
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
