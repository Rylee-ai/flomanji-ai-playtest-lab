
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "./FileUploader";
import { CardPreviewTab } from "./CardPreviewTab";
import { ValidationSummary } from "./ValidationSummary";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { AISuggestions } from "./AISuggestions";
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";
import { CardTypeSelector } from "./CardTypeSelector";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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
  processingProgress?: number;
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
  showFlomanjiOptions = true,
  processingProgress = 0
}: CardImportTabsProps) {
  // Determine which tabs should be available
  const shouldShowAITab = enableAIProcessing && aiSuggestions.length > 0;
  const hasPreview = transformedCards.length > 0;
  const hasErrors = validationErrors.length > 0;
  const hasFailedCards = failedCards.length > 0;
  const hasWarnings = hasErrors || hasFailedCards;
  
  // Determine which tab should be active by default
  const defaultTab = useMemo(() => {
    // If we have warnings but no preview, stay on upload tab
    if (hasWarnings && !hasPreview) return "upload";
    // If we have a preview, go to preview tab
    if (hasPreview) return "preview";
    // Default to upload
    return "upload";
  }, [hasWarnings, hasPreview]);
  
  // Calculate success rate for reporting
  const successRate = useMemo(() => {
    const total = transformedCards.length + failedCards.length;
    if (total === 0) return 0;
    return Math.round((transformedCards.length / total) * 100);
  }, [transformedCards, failedCards]);
  
  return (
    <div className="space-y-4">
      <CardTypeSelector
        cardType={cardType}
        onChange={setCardType}
        disabled={isProcessing}
      />
      
      {/* Processing status */}
      {isProcessing && processingProgress > 0 && (
        <Alert>
          <div className="flex items-center justify-between w-full">
            <div>Processing cards... {processingProgress.toFixed(0)}%</div>
            <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${processingProgress}%` }}
              />
            </div>
          </div>
        </Alert>
      )}
      
      {/* Warnings and validation errors */}
      {(hasErrors || hasFailedCards) && (
        <ValidationSummary 
          errors={validationErrors} 
          failedCards={failedCards}
          cardCount={transformedCards.length + failedCards.length}
        />
      )}
      
      {/* Success summary when cards are processed */}
      {hasPreview && (
        <Alert className="border-green-500">
          <AlertTitle className="flex items-center justify-between">
            <span>Card Processing Results</span>
            <Badge variant="outline" className="ml-2">
              {successRate}% Success Rate
            </Badge>
          </AlertTitle>
          <AlertDescription className="text-sm">
            Successfully processed {transformedCards.length} cards
            {hasFailedCards && ` (${failedCards.length} cards failed)`}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Warning if there are no cards after processing */}
      {fileType && !isProcessing && transformedCards.length === 0 && !hasErrors && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Cards Found</AlertTitle>
          <AlertDescription>
            No cards could be extracted from the file. Please check the file format and try again.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          {hasPreview && (
            <TabsTrigger value="preview">
              Preview
              <Badge variant="secondary" className="ml-1 text-xs">
                {transformedCards.length}
              </Badge>
            </TabsTrigger>
          )}
          {shouldShowAITab && (
            <TabsTrigger value="ai">
              AI Suggestions
              <Badge variant="secondary" className="ml-1 text-xs">
                {aiSuggestions.length}
              </Badge>
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
