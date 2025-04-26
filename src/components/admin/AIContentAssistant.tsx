
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CardType } from "@/types/cards";
import { useAIGeneration } from "./hooks/useAIGeneration";
import { SingleCardGenerator } from "./ai/SingleCardGenerator";
import { BulkCardGenerator } from "./ai/BulkCardGenerator";

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

  const handleExportJSON = () => {
    if (!bulkResults.length) return;
    
    const dataStr = JSON.stringify(bulkResults, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportName = `${selectedCardTemplate}-cards-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
  };
  
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsedData = JSON.parse(content);
        
        if (!Array.isArray(parsedData)) {
          throw new Error("Imported file must contain an array of card objects");
        }
        
        setBulkResults(parsedData);
        toast.success(`Imported ${parsedData.length} cards`);
      } catch (error) {
        console.error("Error importing JSON:", error);
        toast.error("Failed to import file. Make sure it's a valid JSON array of cards.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Assistant</CardTitle>
        <CardDescription>
          Generate and manage game content with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as "single" | "bulk")}>
          <TabsList className="mb-4">
            <TabsTrigger value="single">Single Card</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Generation</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <FormLabel>Card Type</FormLabel>
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

        <div className="mt-8">
          <FormLabel>System Prompt (Advanced)</FormLabel>
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
  );
};

export default AIContentAssistant;
