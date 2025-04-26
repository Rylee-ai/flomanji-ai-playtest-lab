
import React from "react";
import { CardType, GameCard } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel } from "@/components/ui/form";
import { Loader2, Save, Wand2 } from "lucide-react";
import { CardDisplay } from "@/components/cards/CardDisplay";

interface SingleCardGeneratorProps {
  selectedCardTemplate: CardType;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  errors: string | null;
  generatedCard: GameCard | null;
  onGenerate: () => void;
  onSave: () => void;
}

export const SingleCardGenerator = ({
  prompt,
  setPrompt,
  isGenerating,
  errors,
  generatedCard,
  onGenerate,
  onSave,
}: SingleCardGeneratorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <FormLabel>Generation Prompt</FormLabel>
        <Textarea
          placeholder="Describe the card you want to generate..."
          className="min-h-[100px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Add details about theme, mechanics, or special requirements
        </p>
      </div>

      <Button 
        onClick={onGenerate} 
        disabled={isGenerating || !prompt.trim()}
        className="w-full"
      >
        {isGenerating ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
        ) : (
          <><Wand2 className="mr-2 h-4 w-4" /> Generate Card</>
        )}
      </Button>

      {errors && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          <h4 className="font-semibold">Error</h4>
          <p className="text-sm">{errors}</p>
        </div>
      )}

      {generatedCard ? (
        <div className="border p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold">{generatedCard.name}</h3>
            <Button size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" />
              Save Card
            </Button>
          </div>
          <div className="flex justify-center">
            <CardDisplay card={generatedCard} showDetails={true} />
          </div>
        </div>
      ) : (
        <div className="border border-dashed rounded-md flex flex-col items-center justify-center p-8 h-full">
          <Wand2 className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Generated card will appear here
          </p>
        </div>
      )}
    </div>
  );
};
