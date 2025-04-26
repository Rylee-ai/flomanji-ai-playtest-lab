
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";
import { useAICardGeneration } from "@/hooks/useAICardGeneration";
import { ApiKeyMissingDialog } from "./ApiKeyMissingDialog";

interface AICardAssistantProps {
  form: UseFormReturn<CardFormValues>;
}

export const AICardAssistant = ({ form }: AICardAssistantProps) => {
  const {
    prompt,
    setPrompt,
    isLoading,
    apiKeyMissing,
    setApiKeyMissing,
    handleAIAssist
  } = useAICardGeneration({ form });

  return (
    <>
      <div className="space-y-4 p-4 border rounded-lg bg-secondary/10">
        <div className="flex items-center space-x-2">
          <Wand className="w-4 h-4" />
          <h4 className="text-sm font-medium">AI Card Assistant</h4>
        </div>
        <Textarea
          placeholder="Describe the card you want to create..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px]"
        />
        <Button 
          onClick={handleAIAssist}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get AI Suggestions"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          AI will generate content based on your card type and description.
        </p>
      </div>

      <ApiKeyMissingDialog 
        open={apiKeyMissing} 
        onOpenChange={setApiKeyMissing}
      />
    </>
  );
};
