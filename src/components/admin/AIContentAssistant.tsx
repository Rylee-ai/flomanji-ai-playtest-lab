
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CardType, GameCard } from "@/types/cards";
import { useAIGeneration } from "./hooks/useAIGeneration";
import { SingleCardGenerator } from "./ai/SingleCardGenerator";
import { BulkCardGenerator } from "./ai/BulkCardGenerator";
import { CardDisplay } from "@/components/cards/CardDisplay";

const DEFAULT_SYSTEM_PROMPT = `You are a helpful assistant for a game designer creating content for a tabletop game called Flomanji. 
Follow these guidelines when creating card content:
1. Create content that is thematically consistent with the game's setting: a neon-soaked, retro-Florida, mutant apocalypse in 1987.
2. Use concise language suitable for card text.
3. Include mechanically interesting effects that work with the game's core mechanics.
4. Create content that is balanced and fair for players.
5. Return content in a structured JSON format matching the card type requested.`;

interface AIContentAssistantProps {
  activeCardType: CardType;
  onCardCreated: (card: GameCard) => void;
  onCardUpdated: (card: GameCard) => void;
  exampleCards: GameCard[];
}

const AIContentAssistant = ({
  activeCardType,
  onCardCreated,
  onCardUpdated,
  exampleCards
}: AIContentAssistantProps) => {
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [selectedCardTemplate, setSelectedCardTemplate] = useState<CardType>(activeCardType);
  const [prompt, setPrompt] = useState("");
  const [bulkPrompt, setBulkPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [bulkCount, setBulkCount] = useState(5);

  const {
    isGenerating,
    errors,
    generatedCard,
    bulkResults,
    handleGenerateCard,
    handleBulkGenerate,
    handleSaveCard,
    handleSaveBulkCard,
    handleSaveAllBulkCards,
    setBulkResults
  } = useAIGeneration({
    onCardCreated,
    selectedCardTemplate
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Generator Panel */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>AI Content Assistant</CardTitle>
          <CardDescription>Generate and manage game content with AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label>Card Type</Label>
            <Select 
              value={selectedCardTemplate} 
              onValueChange={(value) => setSelectedCardTemplate(value as CardType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="treasure">Treasure</SelectItem>
                <SelectItem value="hazard">Hazard</SelectItem>
                <SelectItem value="npc">NPC</SelectItem>
                <SelectItem value="gear">Gear</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="chaos">Chaos</SelectItem>
                <SelectItem value="flomanjified">Flomanjified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as "single" | "bulk")}>
            <TabsList className="mb-4">
              <TabsTrigger value="single">Single Card</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Generation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single">
              <SingleCardGenerator
                selectedCardTemplate={selectedCardTemplate}
                prompt={prompt}
                setPrompt={setPrompt}
                isGenerating={isGenerating}
                errors={errors}
                generatedCard={generatedCard}
                onGenerate={() => handleGenerateCard(prompt, systemPrompt)}
                onSave={handleSaveCard}
              />
            </TabsContent>
            
            <TabsContent value="bulk">
              <BulkCardGenerator
                selectedCardTemplate={selectedCardTemplate}
                bulkPrompt={bulkPrompt}
                setBulkPrompt={setBulkPrompt}
                bulkCount={bulkCount}
                setBulkCount={setBulkCount}
                isGenerating={isGenerating}
                errors={errors}
                bulkResults={bulkResults}
                onGenerate={() => handleBulkGenerate(bulkPrompt, systemPrompt, bulkCount)}
                onSaveAll={handleSaveAllBulkCards}
                onSaveCard={handleSaveBulkCard}
                onImport={handleImportFile}
                onExport={handleExportJSON}
              />
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div>
            <Label>System Prompt (Advanced)</Label>
            <Textarea
              placeholder="Instructions for the AI..."
              className="min-h-[100px]"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Customize how the AI generates content
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Example Cards Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Example Cards</CardTitle>
          <CardDescription>Reference cards of the selected type</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[800px] pr-4">
            <div className="space-y-6">
              {exampleCards.map((card) => (
                <div key={card.id} className="p-4 border rounded-lg">
                  <CardDisplay card={card} showDetails={true} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentAssistant;
