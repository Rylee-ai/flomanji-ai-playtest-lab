
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardForm } from "./CardForm";
import { CardPreviewModal } from "./CardPreviewModal";
import { TableWrapper } from "./tables/TableWrapper";
import { useCardManagement } from "./hooks/useCardManagement";

const GameContentManager = () => {
  const {
    selectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    setActiveTab,
    setIsFormOpen,
    setSelectedCard,
    getCardById,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
    getActiveCards,
  } = useCardManagement();

  const card = selectedCard ? getCardById(selectedCard) : null;
  const cards = getActiveCards();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Game Content Management</CardTitle>
        <Button size="sm" onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Card
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Character Cards</h3>
            <TabsList className="flex flex-wrap mb-4">
              <TabsTrigger value="player-character">Player Characters</TabsTrigger>
              <TabsTrigger value="npc">NPC Characters</TabsTrigger>
              <TabsTrigger value="flomanjified">Flomanjified Roles</TabsTrigger>
            </TabsList>

            <h3 className="text-sm font-medium mb-2">Item Cards</h3>
            <TabsList className="flex flex-wrap mb-4">
              <TabsTrigger value="treasure">Treasure Cards</TabsTrigger>
              <TabsTrigger value="gear">Gear Cards</TabsTrigger>
            </TabsList>

            <h3 className="text-sm font-medium mb-2">Event & Encounter Cards</h3>
            <TabsList className="flex flex-wrap mb-4">
              <TabsTrigger value="hazard">Hazard Cards</TabsTrigger>
              <TabsTrigger value="chaos">Chaos Cards</TabsTrigger>
              <TabsTrigger value="region">Region Cards</TabsTrigger>
            </TabsList>

            <h3 className="text-sm font-medium mb-2">Game Structure</h3>
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="mission">Mission Sheets</TabsTrigger>
              <TabsTrigger value="secret">Secret Objectives</TabsTrigger>
              <TabsTrigger value="automa">Automa Cards</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <TableWrapper
              activeTab={activeTab}
              cards={cards}
              onViewCard={handleViewCard}
              onEditCard={handleEditCard}
            />
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
        />
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
