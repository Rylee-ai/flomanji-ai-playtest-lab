
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
    loading
  } = useCardManagement();

  const card = selectedCard ? getCardById(selectedCard) : null;
  const cards = getActiveCards();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Card Content Management</CardTitle>
        <Button size="sm" onClick={handleAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Card
        </Button>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={value => setActiveTab(value as any)} className="w-full">
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
                cards={cards} 
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
