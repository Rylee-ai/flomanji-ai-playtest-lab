
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Wand2, FileUp, FileDown, Plus, Save, Zap, RefreshCw, FileText } from "lucide-react";
import { CardDisplay } from "../cards/CardDisplay";
import { CardType, GameCard } from "@/types/cards";
import { createChatCompletion } from "@/lib/openrouterChat";
import { useForm } from "react-hook-form";
import { CardFormValues } from "./CardForm";

interface AIContentAssistantProps {
  activeCardType: CardType;
  onCardCreated: (card: GameCard) => void;
  onCardUpdated: (card: GameCard) => void;
  exampleCards: GameCard[];
}

const DEFAULT_SYSTEM_PROMPT = `You are a helpful assistant for a game designer creating content for a tabletop game called Flomanji. 
Follow these guidelines when creating card content:
1. Create content that is thematically consistent with the game's setting: a neon-soaked, retro-Florida, mutant apocalypse in 1987.
2. Use concise language suitable for card text.
3. Include mechanically interesting effects that work with the game's core mechanics.
4. Create content that is balanced and fair for players.
5. Return content in a structured JSON format matching the card type requested.`;

const AI_CARD_TEMPLATES = {
  hazard: `Create a hazard card with the following structure:
{
  "name": "Card Name",
  "type": "hazard",
  "subType": "environmental|creature|social|weird",
  "icons": [
    { "symbol": "🔥", "meaning": "Fire Hazard" }
  ],
  "keywords": ["Keyword1", "Keyword2"],
  "difficultyClasses": {
    "fight": 11,
    "flee": 9,
    "negotiate": 10,
    "outsmart": 12
  },
  "onFailure": "Detailed failure consequence",
  "onSuccess": "Detailed success outcome",
  "bossHazard": false,
  "rules": ["Rule text"],
  "flavor": "Flavorful quote or description",
  "imagePrompt": "Description for generating card art"
}`,
  treasure: `Create a treasure card with the following structure:
{
  "name": "Card Name",
  "type": "treasure",
  "icons": [
    { "symbol": "💎", "meaning": "Valuable" }
  ],
  "keywords": ["Keyword1", "Keyword2"],
  "consumable": false,
  "value": 3,
  "passiveEffect": "Effect when held",
  "useEffect": "Effect when used",
  "rules": ["Rule text"],
  "flavor": "Flavorful quote or description",
  "imagePrompt": "Description for generating card art"
}`,
  npc: `Create an NPC card with the following structure:
{
  "name": "Character Name",
  "type": "npc",
  "icons": [
    { "symbol": "🗣️", "meaning": "Social" }
  ],
  "keywords": ["Keyword1", "Keyword2"],
  "checkDC": 9,
  "actions": [
    {
      "description": "Action name",
      "cost": 1,
      "effect": "Detailed effect description with checks and outcomes"
    }
  ],
  "rules": ["Rule text"],
  "flavor": "Character quote or description",
  "imagePrompt": "Description for generating card art"
}`
};

export const AIContentAssistant: React.FC<AIContentAssistantProps> = ({
  activeCardType,
  onCardCreated,
  onCardUpdated,
  exampleCards
}) => {
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState<GameCard | null>(null);
  const [bulkResults, setBulkResults] = useState<GameCard[]>([]);
  const [selectedCardTemplate, setSelectedCardTemplate] = useState(activeCardType);
  const [bulkPrompt, setBulkPrompt] = useState("");
  const [bulkCount, setBulkCount] = useState(5);
  const [errors, setErrors] = useState<string | null>(null);

  const form = useForm<CardFormValues>();

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    setErrors(null);
    
    try {
      const template = AI_CARD_TEMPLATES[selectedCardTemplate as keyof typeof AI_CARD_TEMPLATES] || 
        `Create a ${selectedCardTemplate} card in JSON format`;
      
      const exampleCard = exampleCards.length > 0 
        ? `Here's an example of an existing ${selectedCardTemplate} card for reference:\n${JSON.stringify(exampleCards[0], null, 2)}\n\n`
        : "";
        
      const messages = [
        { role: "user", content: `${exampleCard}${template}\n\nSpecific requirements: ${prompt}` }
      ];

      const result = await createChatCompletion(systemPrompt, messages);
      console.log("OpenRouter response:", result);
      
      // Extract JSON from the response
      const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/) || 
                        result.match(/{[\s\S]*}/) || 
                        result.match(/\[\s*{[\s\S]*}\s*\]/);
      
      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }
      
      const jsonString = jsonMatch[1] || jsonMatch[0];
      let parsedCard;
      
      try {
        parsedCard = JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        throw new Error("Generated content is not valid JSON");
      }
      
      // Handle if we got an array but need a single object
      const cardData = Array.isArray(parsedCard) ? parsedCard[0] : parsedCard;
      
      // Add an ID if one doesn't exist
      if (!cardData.id) {
        cardData.id = `ai-generated-${Date.now().toString(36)}`;
      }
      
      setGeneratedCard(cardData);
      toast.success("Card generated successfully");
    } catch (error) {
      console.error("Error generating card:", error);
      setErrors(error instanceof Error ? error.message : "Failed to generate card");
      toast.error("Failed to generate card");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async () => {
    setIsGenerating(true);
    setErrors(null);
    
    try {
      const template = AI_CARD_TEMPLATES[selectedCardTemplate as keyof typeof AI_CARD_TEMPLATES] || 
        `Create a ${selectedCardTemplate} card in JSON format`;
      
      const exampleCard = exampleCards.length > 0 
        ? `Here's an example of an existing ${selectedCardTemplate} card for reference:\n${JSON.stringify(exampleCards[0], null, 2)}\n\n`
        : "";
        
      const messages = [
        { 
          role: "user", 
          content: `${exampleCard}Generate ${bulkCount} unique ${selectedCardTemplate} cards based on this template:\n${template}\n\nAdditional requirements for all cards: ${bulkPrompt}\n\nReturn an array of card objects in JSON format.` 
        }
      ];

      const result = await createChatCompletion(systemPrompt, messages);
      console.log("OpenRouter bulk response:", result);
      
      // Extract JSON from the response
      const jsonMatch = result.match(/```json\n([\s\S]*?)\n```/) || 
                        result.match(/\[\s*{[\s\S]*}\s*\]/) ||
                        result.match(/{[\s\S]*}/);
      
      if (!jsonMatch) {
        throw new Error("Failed to extract valid JSON from the AI response");
      }
      
      const jsonString = jsonMatch[1] || jsonMatch[0];
      let parsedCards;
      
      try {
        parsedCards = JSON.parse(jsonString);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        throw new Error("Generated content is not valid JSON");
      }
      
      // Handle if we got a single object but need an array
      const cardsData = Array.isArray(parsedCards) ? parsedCards : [parsedCards];
      
      // Add IDs if they don't exist
      const cardsWithIds = cardsData.map((card, index) => ({
        ...card,
        id: card.id || `ai-bulk-${Date.now().toString(36)}-${index}`
      }));
      
      setBulkResults(cardsWithIds);
      toast.success(`Generated ${cardsWithIds.length} cards`);
    } catch (error) {
      console.error("Error generating bulk cards:", error);
      setErrors(error instanceof Error ? error.message : "Failed to generate cards");
      toast.error("Failed to generate bulk cards");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCard = () => {
    if (!generatedCard) return;
    
    onCardCreated(generatedCard);
    toast.success("Card saved to collection");
    setGeneratedCard(null);
  };
  
  const handleSaveBulkCard = (card: GameCard) => {
    onCardCreated(card);
    toast.success(`Card "${card.name}" saved to collection`);
    setBulkResults(bulkResults.filter(c => c.id !== card.id));
  };
  
  const handleSaveAllBulkCards = () => {
    if (!bulkResults.length) return;
    
    bulkResults.forEach(card => {
      onCardCreated(card);
    });
    
    toast.success(`Saved ${bulkResults.length} cards to collection`);
    setBulkResults([]);
  };
  
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
  
  const renderCardPreview = (card: GameCard) => (
    <div key={card.id} className="mb-4 p-4 border rounded-md">
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">{card.name}</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleSaveBulkCard(card)}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <CardDisplay card={card} showDetails={true} />
      </div>
    </div>
  );

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
          
          <TabsContent value="single">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-4">
                    <div>
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
                      onClick={handleGenerateCard} 
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                      ) : (
                        <><Wand2 className="mr-2 h-4 w-4" /> Generate Card</>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div>
                  {errors && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                      <h4 className="font-semibold">Error</h4>
                      <p className="text-sm">{errors}</p>
                    </div>
                  )}
                  
                  {generatedCard ? (
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold">{generatedCard.name}</h3>
                        <Button size="sm" onClick={handleSaveCard}>
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
              </div>
              
              <Separator className="my-4" />
              
              <div>
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
            </div>
          </TabsContent>
          
          <TabsContent value="bulk">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-4">
                    <div>
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
                        onClick={handleBulkGenerate} 
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
                          onChange={handleImportFile}
                        />
                        <Button variant="outline" type="button" className="h-full">
                          <FileUp className="h-4 w-4 mr-1" />
                          Import
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  {errors && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                      <h4 className="font-semibold">Error</h4>
                      <p className="text-sm">{errors}</p>
                    </div>
                  )}
                  
                  {bulkResults.length > 0 ? (
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Generated Cards ({bulkResults.length})</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={handleExportJSON}>
                            <FileDown className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                          <Button size="sm" onClick={handleSaveAllBulkCards}>
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
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIContentAssistant;
