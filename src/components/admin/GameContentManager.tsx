
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { CardForm } from "./CardForm";
import { CardPreviewModal } from "./CardPreviewModal";
import { TableWrapper } from "./tables/TableWrapper";
import { useCardManagement } from "./hooks/useCardManagement";
import { Badge } from "@/components/ui/badge";
import { CardImporter } from "./import/CardImporter";
import { CardType } from "@/types/cards";
import { toast } from "sonner";
import { log } from "@/utils/logging";

const GameContentManager = () => {
  const {
    selectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    versionHistory,
    setActiveTab,
    setIsFormOpen,
    setSelectedCard,
    getCardById,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
    handleDeleteCard,
    getActiveCards,
    loadCards,
    handleImport,
    loading,
    cards
  } = useCardManagement();

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Force refresh of card data
  const handleRefreshCards = async () => {
    log.info("Manual refresh of cards requested", { cardType: activeTab });
    setIsRefreshing(true);
    try {
      await loadCards();
      toast.success("Cards refreshed successfully");
      log.info("Cards refreshed successfully", { cardType: activeTab });
    } catch (error) {
      console.error("Failed to refresh cards:", error);
      log.error("Failed to refresh cards", { error, cardType: activeTab });
      toast.error("Failed to refresh cards");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle import completion
  const handleCardImport = (cards, results) => {
    log.info("Card import completed", { 
      count: cards.length,
      cardType: activeTab,
      results
    });
    handleImport(cards, results);
  };

  const card = selectedCard ? getCardById(selectedCard) : null;
  const activeCards = getActiveCards();
  
  // Calculate card counts - always use the full cards array
  const cardCounts = {
    "player-character": cards.filter(card => card.type === "player-character").length,
    "npc": cards.filter(card => card.type === "npc").length,
    "flomanjified": cards.filter(card => card.type === "flomanjified").length,
    "treasure": cards.filter(card => card.type === "treasure").length,
    "gear": cards.filter(card => card.type === "gear").length,
    "hazard": cards.filter(card => card.type === "hazard").length,
    "chaos": cards.filter(card => card.type === "chaos").length,
    "region": cards.filter(card => card.type === "region").length,
    "mission": cards.filter(card => card.type === "mission").length,
    "secret": cards.filter(card => card.type === "secret").length,
    "automa": cards.filter(card => card.type === "automa").length
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Card Collection</h2>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleRefreshCards}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </Button>
            <CardImporter
              onImport={handleCardImport}
              activeCardType={activeTab}
              processingOptions={{
                batchSize: 10,
                continueOnError: true
              }}
            />
            <Button size="sm" onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Card
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={value => setActiveTab(value as CardType)} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Characters</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="player-character" className="w-full justify-between">
                  Player Characters
                  <Badge 
                    variant={activeTab === "player-character" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["player-character"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="npc" className="w-full justify-between">
                  NPC Characters
                  <Badge 
                    variant={activeTab === "npc" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["npc"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="flomanjified" className="w-full justify-between">
                  Flomanjified Roles
                  <Badge 
                    variant={activeTab === "flomanjified" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["flomanjified"]}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Items & Encounters</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="treasure" className="w-full justify-between">
                  Treasure Cards
                  <Badge 
                    variant={activeTab === "treasure" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["treasure"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="gear" className="w-full justify-between">
                  Gear Cards
                  <Badge 
                    variant={activeTab === "gear" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["gear"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="hazard" className="w-full justify-between">
                  Hazard Cards
                  <Badge 
                    variant={activeTab === "hazard" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["hazard"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="chaos" className="w-full justify-between">
                  Chaos Cards
                  <Badge 
                    variant={activeTab === "chaos" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["chaos"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="region" className="w-full justify-between">
                  Region Cards
                  <Badge 
                    variant={activeTab === "region" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["region"]}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Game Structure</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="mission" className="w-full justify-between">
                  Mission Sheets
                  <Badge 
                    variant={activeTab === "mission" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["mission"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="secret" className="w-full justify-between">
                  Secret Objectives
                  <Badge 
                    variant={activeTab === "secret" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["secret"]}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="automa" className="w-full justify-between">
                  Automa Cards
                  <Badge 
                    variant={activeTab === "automa" ? "primary" : "secondary"} 
                    className="ml-2">
                    {cardCounts["automa"]}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value={activeTab} className="pt-4 border-t">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground">Loading cards...</p>
                </div>
              </div>
            ) : (
              <TableWrapper 
                activeTab={activeTab} 
                cards={activeCards} 
                onViewCard={handleViewCard} 
                onEditCard={handleEditCard} 
                onDeleteCard={handleDeleteCard} 
              />
            )}
          </TabsContent>
        </Tabs>

        {card && (
          <CardPreviewModal 
            card={card} 
            onClose={() => setSelectedCard(null)} 
            onEdit={() => handleEditCard(card)} 
          />
        )}

        <CardForm 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleFormSubmit} 
          initialData={editingCard} 
          activeTab={activeTab}
          versionHistory={versionHistory}
        />
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
