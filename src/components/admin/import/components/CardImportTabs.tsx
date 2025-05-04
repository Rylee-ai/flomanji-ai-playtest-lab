
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "./FileUploader";
import { CardPreviewTab } from "./CardPreviewTab";
import { ValidationSummary } from "./ValidationSummary";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { AISuggestions } from "./AISuggestions";
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";
import { CardTypeSelector } from "./CardTypeSelector";

interface CardImportTabsProps {
  cardType: CardType;
  setCardType: (cardType: CardType) => void;
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  validationErrors: string[];
  transformedCards: CardFormValues[];
  defaultCardType: CardType;
  fileType: string | null;
  enableAIProcessing?: boolean;
  setEnableAIProcessing?: (enable: boolean) => void;
  aiSuggestions?: CardSuggestion[];
  processingError?: string | null;
  onApplySuggestion?: (index: number) => void;
  onIgnoreSuggestion?: (index: number) => void;
  failedCards?: {index: number, name?: string, error: string}[];
  showFlomanjiOptions?: boolean;
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
  // AI-related props
  enableAIProcessing = false,
  setEnableAIProcessing = () => {},
  aiSuggestions = [],
  processingError = null,
  onApplySuggestion = () => {},
  onIgnoreSuggestion = () => {},
  failedCards = [],
  showFlomanjiOptions = true
}: CardImportTabsProps) {
  const shouldShowAITab = enableAIProcessing && aiSuggestions.length > 0;
  const hasPreview = transformedCards.length > 0;
  const hasErrors = validationErrors.length > 0;
  const hasFailedCards = failedCards.length > 0;
  
  return (
    <div className="space-y-4">
      <CardTypeSelector
        cardType={cardType}
        onChange={setCardType}
        disabled={isProcessing}
      />
      
      {hasErrors || hasFailedCards ? (
        <ValidationSummary 
          errors={validationErrors} 
          failedCards={failedCards}
          cardCount={transformedCards.length + failedCards.length}
        />
      ) : null}
      
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          {hasPreview && (
            <TabsTrigger value="preview">
              Preview
              {transformedCards.length > 0 && (
                <span className="ml-1 text-xs bg-muted px-2 py-0.5 rounded-sm">
                  {transformedCards.length}
                </span>
              )}
            </TabsTrigger>
          )}
          {shouldShowAITab && (
            <TabsTrigger value="ai">
              AI Suggestions
              {aiSuggestions.length > 0 && (
                <span className="ml-1 text-xs bg-muted px-2 py-0.5 rounded-sm">
                  {aiSuggestions.length}
                </span>
              )}
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <FileUploader
            onFileSelected={onFileSelected}
            isProcessing={isProcessing}
            cardType={cardType}
            enableAIProcessing={enableAIProcessing}
            setEnableAIProcessing={setEnableAIProcessing}
            fileType={fileType}
          />
        </TabsContent>
        
        {hasPreview && (
          <TabsContent value="preview" className="space-y-4">
            <CardPreviewTab cards={transformedCards} />
          </TabsContent>
        )}
        
        {shouldShowAITab && (
          <TabsContent value="ai" className="space-y-4">
            <AISuggestions
              suggestions={aiSuggestions}
              processingError={processingError}
              onApplySuggestion={onApplySuggestion}
              onIgnoreSuggestion={onIgnoreSuggestion}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
