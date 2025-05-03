
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
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
  fileType?: string | null;
}

export const CardImportTabs = ({
  cardType,
  setCardType,
  onFileSelected,
  isProcessing,
  validationErrors,
  transformedCards,
  defaultCardType,
  fileType
}: CardImportTabsProps) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <CardTypeSelector
          cardType={cardType}
          setCardType={setCardType}
          defaultValue={defaultCardType}
        />
      </div>
      
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="template">Download Template</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="py-4">
          <FileUploader
            onFileSelected={onFileSelected}
            isProcessing={isProcessing}
          />
          
          <div className="mt-4">
            <ValidationSummary
              transformedCards={transformedCards}
              validationErrors={validationErrors}
              fileType={fileType}
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
    </div>
  );
};
