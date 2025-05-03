
import React from "react";
import { CardType } from "@/types/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardTypeSelector } from "./CardTypeSelector";
import { FileUploader } from "./FileUploader";
import { ValidationSummary } from "./ValidationSummary";
import { CardFormValues } from "@/types/forms/card-form";
import { Label } from "@/components/ui/label";

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

export const CardImportTabs = ({
  cardType,
  setCardType,
  onFileSelected,
  isProcessing,
  validationErrors,
  transformedCards,
  defaultCardType,
  fileType,
}: CardImportTabsProps) => {
  return (
    <Tabs defaultValue="file-upload" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="file-upload">File Upload</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="file-upload" className="space-y-4">
        <div className="mb-4">
          <Label className="text-sm font-medium mb-1 block">Importing as Card Type:</Label>
          <CardTypeSelector 
            cardType={cardType} 
            setCardType={setCardType}
            defaultValue={defaultCardType}
          />
          <p className="text-xs text-muted-foreground mt-1">
            You can change the card type before uploading a file
          </p>
        </div>
        
        <FileUploader 
          onFileSelected={onFileSelected}
          isProcessing={isProcessing} 
        />
        
        <ValidationSummary 
          transformedCards={transformedCards}
          validationErrors={validationErrors}
          fileType={fileType}
        />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Card Type</Label>
          <CardTypeSelector 
            cardType={cardType}
            setCardType={setCardType}
            defaultValue={defaultCardType}
          />
          <p className="text-xs text-muted-foreground">
            Select the type of cards you wish to import
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
