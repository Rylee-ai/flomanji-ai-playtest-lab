
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardForm } from "./CardForm";
import { CardPreviewModal } from "./CardPreviewModal";
import { TableWrapper } from "./tables/TableWrapper";
import { useCardManagement } from "./hooks/useCardManagement";
import { Badge } from "@/components/ui/badge";

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
    loading,
    cards
  } = useCardManagement();

  const card = selectedCard ? getCardById(selectedCard) : null;
  const activeCards = getActiveCards();
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
          <Button size="sm" onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Card
          </Button>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={value => setActiveTab(value as any)} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Characters</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="player-character" className="w-full justify-between">
                  Player Characters
                  <Badge variant="secondary" className="ml-2">{cardCounts["player-character"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="npc" className="w-full justify-between">
                  NPC Characters
                  <Badge variant="secondary" className="ml-2">{cardCounts["npc"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="flomanjified" className="w-full justify-between">
                  Flomanjified Roles
                  <Badge variant="secondary" className="ml-2">{cardCounts["flomanjified"]}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Items & Encounters</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="treasure" className="w-full justify-between">
                  Treasure Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["treasure"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="gear" className="w-full justify-between">
                  Gear Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["gear"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="hazard" className="w-full justify-between">
                  Hazard Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["hazard"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="chaos" className="w-full justify-between">
                  Chaos Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["chaos"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="region" className="w-full justify-between">
                  Region Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["region"]}</Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Game Structure</h3>
              <TabsList className="flex flex-col space-y-1 h-auto bg-transparent p-0">
                <TabsTrigger value="mission" className="w-full justify-between">
                  Mission Sheets
                  <Badge variant="secondary" className="ml-2">{cardCounts["mission"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="secret" className="w-full justify-between">
                  Secret Objectives
                  <Badge variant="secondary" className="ml-2">{cardCounts["secret"]}</Badge>
                </TabsTrigger>
                <TabsTrigger value="automa" className="w-full justify-between">
                  Automa Cards
                  <Badge variant="secondary" className="ml-2">{cardCounts["automa"]}</Badge>
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
