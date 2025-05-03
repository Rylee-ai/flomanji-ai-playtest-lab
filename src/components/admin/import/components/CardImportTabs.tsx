
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, FileSymlink, Robot } from "lucide-react";
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardSuggestion } from "@/utils/ai-processing/AICardProcessorService";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { FileUploader } from "./FileUploader";
import { CardTypeSelector } from "./CardTypeSelector";
import { CardPreview } from "./CardPreview";
import { ValidationSummary } from "./ValidationSummary";
import { AISuggestions } from "./AISuggestions";

interface CardImportTabsProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  validationErrors: string[];
  transformedCards: CardFormValues[];
  defaultCardType: CardType;
  fileType: string | null;
  // AI-related props
  enableAIProcessing?: boolean;
  setEnableAIProcessing?: (enable: boolean) => void;
  aiSuggestions?: CardSuggestion[];
  processingError?: string | null;
  onApplySuggestion?: (index: number) => void;
  onIgnoreSuggestion?: (index: number) => void;
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
}: CardImportTabsProps) {
  return (
    <Tabs defaultValue="upload" className="mt-4">
      <TabsList className="mb-4">
        <TabsTrigger value="upload" className="flex items-center gap-2">
          <FileSymlink className="h-4 w-4" />
          <span>Upload</span>
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2" disabled={transformedCards.length === 0}>
          <FileSymlink className="h-4 w-4" />
          <span>Preview</span>
        </TabsTrigger>
        {aiSuggestions && aiSuggestions.length > 0 && (
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Robot className="h-4 w-4" />
            <span>AI Suggestions</span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
              {aiSuggestions.length}
            </span>
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="upload">
        <div className="space-y-6">
          <CardTypeSelector 
            value={cardType} 
            onChange={setCardType} 
            disabled={isProcessing}
          />

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Switch 
                id="ai-processing"
                checked={enableAIProcessing}
                onCheckedChange={setEnableAIProcessing}
                disabled={isProcessing}
              />
              <Label htmlFor="ai-processing" className="cursor-pointer flex items-center gap-1">
                <Robot className="h-4 w-4 text-muted-foreground" />
                <span>Enable AI Processing</span>
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              AI will analyze your cards for consistency, suggest improvements, and help standardize terminology.
            </p>
          </div>

          {enableAIProcessing && (
            <Alert variant="outline" className="bg-primary/5">
              <Robot className="h-4 w-4 text-primary" />
              <AlertDescription className="text-xs text-muted-foreground">
                AI processing is enabled. The AI will analyze your cards after import to suggest improvements 
                and ensure consistency across your card data.
              </AlertDescription>
            </Alert>
          )}
          
          <Separator />
          
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

      <TabsContent value="preview">
        <CardPreview cards={transformedCards} />
      </TabsContent>

      <TabsContent value="ai">
        <AISuggestions 
          suggestions={aiSuggestions || []}
          onApplySuggestion={onApplySuggestion}
          onIgnoreSuggestion={onIgnoreSuggestion}
          processingError={processingError}
        />
      </TabsContent>
    </Tabs>
  );
}
