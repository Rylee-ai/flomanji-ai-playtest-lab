
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardType } from "@/types/cards";
import { CardTypeSelector } from "./CardTypeSelector";
import { FileUploader } from "./FileUploader";
import { TemplateDownloader } from "./TemplateDownloader";
import { ValidationSummary } from "./ValidationSummary";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CardFormValues } from "@/types/forms/card-form";

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
  const [currentTab, setCurrentTab] = useState<string>("upload");

  return (
    <Tabs defaultValue="upload" onValueChange={setCurrentTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          {transformedCards.length > 0 && (
            <TabsTrigger value="preview">
              Preview <Badge variant="secondary">{transformedCards.length}</Badge>
            </TabsTrigger>
          )}
        </TabsList>

        {currentTab === "upload" && (
          <TemplateDownloader 
            cardType={cardType} 
            setCardType={setCardType}
          />
        )}
      </div>

      <TabsContent value="upload" className="pt-2">
        <div className="space-y-4">
          <CardTypeSelector
            cardType={cardType}
            onCardTypeChange={(value) => setCardType(value as CardType)}
            defaultCardType={defaultCardType}
          />

          <FileUploader
            onFileSelected={onFileSelected}
            isProcessing={isProcessing}
          />

          <ValidationSummary
            validationErrors={validationErrors}
            transformedCards={transformedCards}
            fileType={fileType}
          />
        </div>
      </TabsContent>

      <TabsContent value="settings" className="pt-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Import Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure how cards should be imported and processed.
          </p>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="generate-ids" className="text-sm font-medium">
                Auto-generate IDs
              </label>
              <input
                id="generate-ids"
                type="checkbox"
                className="h-4 w-4"
                defaultChecked
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="overwrite" className="text-sm font-medium">
                Overwrite existing cards
              </label>
              <input
                id="overwrite"
                type="checkbox"
                className="h-4 w-4"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="preview" className="pt-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Card Preview</h3>
          
          <ScrollArea className="h-[400px] rounded-md border p-4">
            {transformedCards.map((card, index) => (
              <div 
                key={index} 
                className="mb-4 p-3 border rounded-lg bg-muted/40"
              >
                <h4 className="text-md font-bold">{card.name || "Unnamed Card"}</h4>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <span className="font-medium">Type:</span>{" "}
                    {card.type} {card.category ? ` (${card.category})` : ""}
                  </div>
                  <div>
                    <span className="font-medium">Keywords:</span>{" "}
                    {card.keywords?.join(", ") || "None"}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Rules:</span>{" "}
                    <ul className="list-disc list-inside">
                      {card.rules?.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      )) || "None"}
                    </ul>
                  </div>
                  {card.flavor && (
                    <div className="col-span-2 italic">
                      "{card.flavor}"
                    </div>
                  )}
                  {card.id && (
                    <div className="col-span-2 text-xs text-muted-foreground">
                      ID: {card.id}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </TabsContent>
    </Tabs>
  );
}
