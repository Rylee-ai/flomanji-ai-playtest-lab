
import React from "react";
import { CardType, GameCard } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown, FileText, FileUp, Loader2, Save, Zap } from "lucide-react";
import { CardDisplay } from "@/components/cards/CardDisplay";

interface BulkCardGeneratorProps {
  selectedCardTemplate: CardType;
  bulkPrompt: string;
  setBulkPrompt: (prompt: string) => void;
  bulkCount: number;
  setBulkCount: (count: number) => void;
  isGenerating: boolean;
  errors: string | null;
  bulkResults: GameCard[];
  onGenerate: () => void;
  onSaveAll: () => void;
  onSaveCard: (card: GameCard) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export const BulkCardGenerator = ({
  bulkPrompt,
  setBulkPrompt,
  bulkCount,
  setBulkCount,
  isGenerating,
  errors,
  bulkResults,
  onGenerate,
  onSaveAll,
  onSaveCard,
  onImport,
  onExport,
}: BulkCardGeneratorProps) => {
  const renderCardPreview = (card: GameCard) => (
    <div key={card.id} className="mb-4 p-4 border rounded-md">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">{card.name}</h3>
        <Button size="sm" variant="outline" onClick={() => onSaveCard(card)}>
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
      <div className="flex justify-center">
        <CardDisplay card={card} showDetails={true} />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <FormLabel>Number of Cards</FormLabel>
        <Input
          type="number"
          value={bulkCount}
          onChange={(e) => setBulkCount(parseInt(e.target.value) || 5)}
          min={1}
          max={10}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Recommended: 5 or fewer cards per batch
        </p>
      </div>

      <div>
        <FormLabel>Common Requirements</FormLabel>
        <Textarea
          placeholder="Requirements for all generated cards..."
          className="min-h-[100px]"
          value={bulkPrompt}
          onChange={(e) => setBulkPrompt(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Themes, mechanics or other elements to include
        </p>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Zap className="mr-2 h-4 w-4" /> Generate Batch</>
          )}
        </Button>

        <label htmlFor="import-json" className="cursor-pointer">
          <Input 
            id="import-json" 
            type="file" 
            accept=".json" 
            className="hidden" 
            onChange={onImport}
          />
          <Button variant="outline" type="button" className="h-full">
            <FileUp className="h-4 w-4 mr-1" />
            Import
          </Button>
        </label>
      </div>

      {errors && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          <h4 className="font-semibold">Error</h4>
          <p className="text-sm">{errors}</p>
        </div>
      )}

      {bulkResults.length > 0 ? (
        <div className="border p-4 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Generated Cards ({bulkResults.length})</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={onExport}>
                <FileDown className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" onClick={onSaveAll}>
                <FileText className="h-4 w-4 mr-1" />
                Save All
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px]">
            {bulkResults.map(renderCardPreview)}
          </ScrollArea>
        </div>
      ) : (
        <div className="border border-dashed rounded-md flex flex-col items-center justify-center p-8 h-full">
          <Zap className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Generated cards will appear here
          </p>
          <p className="text-center text-muted-foreground text-sm mt-1">
            Generate a batch or import from JSON
          </p>
        </div>
      )}
    </div>
  );
};
