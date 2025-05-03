
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardTypeSelector } from "./CardTypeSelector";
import { FileUploader } from "./FileUploader";
import { ValidationSummary } from "./ValidationSummary";
import { TemplateDownloader } from "./TemplateDownloader";
import { CardPreviewTab } from "./CardPreviewTab";

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
  fileType
}: CardImportTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [selectedCard, setSelectedCard] = useState<CardFormValues | undefined>(
    transformedCards.length > 0 ? transformedCards[0] : undefined
  );

  // Update selected card when transformedCards changes
  React.useEffect(() => {
    if (transformedCards.length > 0) {
      setSelectedCard(transformedCards[0]);
      // If cards were loaded and we're still on upload tab, switch to preview
      if (activeTab === "upload") {
        setActiveTab("preview");
      }
    } else {
      setSelectedCard(undefined);
    }
  }, [transformedCards, activeTab]);

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger 
          value="preview" 
          disabled={transformedCards.length === 0}
        >
          Preview ({transformedCards.length})
        </TabsTrigger>
        <TabsTrigger value="template">Templates</TabsTrigger>
      </TabsList>

      <ValidationSummary 
        validationErrors={validationErrors} 
        transformedCards={transformedCards}
        fileType={fileType}
      />

      <TabsContent value="upload" className="space-y-4 mt-4">
        <CardTypeSelector
          cardType={cardType}
          setCardType={setCardType}
          defaultCardType={defaultCardType}
        />
        <FileUploader
          onFileSelected={onFileSelected}
          isProcessing={isProcessing}
          className="mt-4"
        />
      </TabsContent>

      <TabsContent value="preview" className="space-y-4 mt-4">
        <CardPreviewTab 
          cards={transformedCards} 
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
        />
      </TabsContent>

      <TabsContent value="template" className="space-y-4 mt-4">
        <TemplateDownloader cardType={cardType} />
      </TabsContent>
    </Tabs>
  );
}
