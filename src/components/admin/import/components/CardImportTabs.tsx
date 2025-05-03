
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardTypeSelector } from "./CardTypeSelector";
import { FileUploader } from "./FileUploader";
import { CardPreviewTab } from "./CardPreviewTab";
import { ValidationSummary } from "./ValidationSummary";
import { TemplateDownloader } from "./TemplateDownloader";

interface CardImportTabsProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  validationErrors: string[];
  transformedCards: CardFormValues[];
  defaultCardType: CardType;
  fileType: string | null;
}

export function CardImportTabs({
  cardType,
  setCardType,
  onFileSelected,
  isProcessing,
  validationErrors,
  transformedCards,
  defaultCardType,
  fileType,
}: CardImportTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [selectedCard, setSelectedCard] = useState<CardFormValues | undefined>();

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-4"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger
          value="preview"
          disabled={transformedCards.length === 0}
        >
          Preview ({transformedCards.length})
        </TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <FileUploader
              onFileSelected={onFileSelected}
              isProcessing={isProcessing}
              className="h-full"
            />
          </div>
          <div className="space-y-4">
            <CardTypeSelector
              cardType={cardType}
              setCardType={setCardType}
              defaultCardType={defaultCardType}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">File Format</label>
              <div className="p-2 bg-muted rounded-md text-sm">
                {fileType ? fileType : "No file detected"}
              </div>
              <p className="text-xs text-muted-foreground">
                Detected format will be shown here after upload
              </p>
            </div>
          </div>
        </div>

        {(validationErrors.length > 0 || transformedCards.length > 0) && (
          <ValidationSummary 
            validationErrors={validationErrors} 
            transformedCards={transformedCards} 
            fileType={fileType} 
          />
        )}
      </TabsContent>

      <TabsContent value="preview">
        <CardPreviewTab
          cards={transformedCards}
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
        />
      </TabsContent>

      <TabsContent value="templates" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Download Template</h3>
            <p className="text-sm text-muted-foreground">
              Download a template for the selected card type to help you create
              your own cards.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CardTypeSelector
                cardType={cardType}
                setCardType={setCardType}
                defaultCardType={defaultCardType}
              />
              <TemplateDownloader 
                cardType={cardType}
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-md">
              <h4 className="text-sm font-medium mb-2">Template Information</h4>
              <p className="text-xs text-muted-foreground">
                Templates are provided in Markdown format. Each card should have a
                title, type, and other attributes as shown in the template.
                Icons, keywords, and other fields should follow the format shown.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
