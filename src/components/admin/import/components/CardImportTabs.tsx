
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";

// Import components
import { FileUploader } from "./FileUploader";
import { TemplateDownloader } from "./TemplateDownloader";
import { ValidationSummary } from "./ValidationSummary";
import { CardTypeSelector } from "./CardTypeSelector";

interface CardImportTabsProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  validationErrors: string[];
  transformedCards: CardFormValues[];
  defaultCardType: CardType;
}

export const CardImportTabs = ({
  cardType,
  setCardType,
  onFileSelected,
  isProcessing,
  validationErrors,
  transformedCards,
  defaultCardType,
}: CardImportTabsProps) => {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upload">Upload File</TabsTrigger>
        <TabsTrigger value="template">Get Template</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="py-4">
        <div className="space-y-4">
          <CardTypeSelector 
            cardType={cardType}
            setCardType={setCardType}
            defaultValue={defaultCardType}
          />

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
  );
};
