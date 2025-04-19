import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardForm, CardFormValues } from "./CardForm";
import { CardType, GameCard } from "@/types/cards";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { AUTOMA_CARDS } from "@/lib/cards/automa-cards";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { NPC_CARDS } from "@/lib/cards/npc-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { TreasureCardsTable } from "./tables/TreasureCardsTable";
import { HazardCardsTable } from "./tables/HazardCardsTable";
import { CardPreviewModal } from "./CardPreviewModal";
import { AutomaCardsTable } from "./tables/AutomaCardsTable";
import { RegionCardsTable } from "./tables/RegionCardsTable";
import { NPCCardsTable } from "./tables/NPCCardsTable";
import { MissionCardsTable } from "./tables/MissionCardsTable";
import { GearCardsTable } from "./tables/GearCardsTable";
import { ChaosCardsTable } from "./tables/ChaosCardsTable";
import { FlomanjifiedCardsTable } from "./tables/FlomanjifiedCardsTable";
import { toast } from "sonner";

const GameContentManager = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<CardType>("treasure");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingCard, setEditingCard] = React.useState<GameCard | undefined>();

  const getCardById = (id: string): GameCard | undefined => {
    const allCards: GameCard[] = [
      ...TREASURE_CARDS,
      ...SECRET_OBJECTIVES,
      ...AUTOMA_CARDS,
      ...REGION_CARDS,
      ...NPC_CARDS,
      ...MISSION_CARDS,
      ...HAZARD_CARDS,
      ...GEAR_CARDS,
      ...CHAOS_CARDS,
      ...FLOMANJIFIED_CARDS
    ];
    return allCards.find(card => card.id === id);
  };

  const handleViewCard = (id: string) => {
    setSelectedCard(id);
  };

  const handleEditCard = (card: GameCard) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(undefined);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CardFormValues) => {
    console.log("Form submitted:", data);
    // In a real implementation, this would update the card in the database
    toast.success(`${data.name} ${editingCard ? "updated" : "created"} successfully`);
    setIsFormOpen(false);
  };

  const card = selectedCard ? getCardById(selectedCard) : null;

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
          onValueChange={(value) => setActiveTab(value as CardType)}
          className="w-full"
        >
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="treasure">Treasure Cards</TabsTrigger>
            <TabsTrigger value="hazard">Hazard Cards</TabsTrigger>
            <TabsTrigger value="automa">Automa Cards</TabsTrigger>
            <TabsTrigger value="region">Region Cards</TabsTrigger>
            <TabsTrigger value="npc">NPC Cards</TabsTrigger>
            <TabsTrigger value="mission">Mission Sheets</TabsTrigger>
            <TabsTrigger value="gear">Gear Cards</TabsTrigger>
            <TabsTrigger value="chaos">Chaos Cards</TabsTrigger>
            <TabsTrigger value="flomanjified">Flomanjified Roles</TabsTrigger>
            <TabsTrigger value="secret">Secret Objectives</TabsTrigger>
          </TabsList>

          <TabsContent value="treasure" className="space-y-4">
            {activeTab === "treasure" && (
              <TreasureCardsTable
                cards={TREASURE_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="hazard" className="space-y-4">
            {activeTab === "hazard" && (
              <HazardCardsTable
                cards={HAZARD_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="automa" className="space-y-4">
            {activeTab === "automa" && (
              <AutomaCardsTable
                cards={AUTOMA_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="region" className="space-y-4">
            {activeTab === "region" && (
              <RegionCardsTable
                cards={REGION_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="npc" className="space-y-4">
            {activeTab === "npc" && (
              <NPCCardsTable
                cards={NPC_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="mission" className="space-y-4">
            {activeTab === "mission" && (
              <MissionCardsTable
                cards={MISSION_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="gear" className="space-y-4">
            {activeTab === "gear" && (
              <GearCardsTable
                cards={GEAR_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="chaos" className="space-y-4">
            {activeTab === "chaos" && (
              <ChaosCardsTable
                cards={CHAOS_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="flomanjified" className="space-y-4">
            {activeTab === "flomanjified" && (
              <FlomanjifiedCardsTable
                cards={FLOMANJIFIED_CARDS}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
              />
            )}
          </TabsContent>

          <TabsContent value="secret" className="space-y-4">
            {activeTab === "secret" && (
              <TreasureCardsTable
                cards={SECRET_OBJECTIVES as TreasureCard[]}
                onViewCard={handleViewCard}
                onEditCard={handleEditCard}
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
        />
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
