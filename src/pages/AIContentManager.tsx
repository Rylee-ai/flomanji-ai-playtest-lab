
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import GameContentManager from "@/components/admin/GameContentManager";
import AIContentAssistant from "@/components/admin/AIContentAssistant";
import { CardType, GameCard } from "@/types/cards";
import { useCardManagement } from "@/components/admin/hooks/useCardManagement";

const AIContentManager = () => {
  const [activeTab, setActiveTab] = useState<"ai" | "manual">("ai");
  const {
    activeTab: cardTypeTab,
    setActiveTab: setCardTypeTab,
    getActiveCards,
    handleFormSubmit,
  } = useCardManagement();

  const exampleCards = getActiveCards();

  const handleCardCreated = (card: GameCard) => {
    // Handle the newly created card from AI
    console.log("AI generated card:", card);
    handleFormSubmit({
      ...card,
      // Ensure any required properties are set if not provided by AI
    });
  };

  const handleCardUpdated = (card: GameCard) => {
    // Handle the updated card from AI
    console.log("AI updated card:", card);
    handleFormSubmit({
      ...card,
      // Ensure any required properties are set if not provided by AI
    });
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji AI Content Manager</h1>
        <div className="text-sm text-muted-foreground mt-1">
          Use AI to generate and manage game cards and content
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This AI assistant requires an OpenRouter API key to function. Make sure you've set it up in Settings.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "ai" | "manual")}>
        <TabsList>
          <TabsTrigger value="ai">AI Content Assistant</TabsTrigger>
          <TabsTrigger value="manual">Manual Content Management</TabsTrigger>
        </TabsList>
        <TabsContent value="ai">
          <AIContentAssistant 
            activeCardType={cardTypeTab as CardType} 
            onCardCreated={handleCardCreated}
            onCardUpdated={handleCardUpdated}
            exampleCards={exampleCards}
          />
        </TabsContent>
        <TabsContent value="manual">
          <GameContentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIContentManager;
