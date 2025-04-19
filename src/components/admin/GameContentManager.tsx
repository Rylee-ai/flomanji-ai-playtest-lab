import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { GameCard } from "@/types/cards";
import { TreasureCardsTable } from "./tables/TreasureCardsTable";
import { HazardCardsTable } from "./tables/HazardCardsTable";
import { CardPreviewModal } from "./CardPreviewModal";

const GameContentManager = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>("treasure");

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

  const card = selectedCard ? getCardById(selectedCard) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Game Content Management</CardTitle>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
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
          </TabsList>

          <TabsContent value="treasure" className="space-y-4">
            <TreasureCardsTable
              cards={TREASURE_CARDS}
              onViewCard={handleViewCard}
            />
          </TabsContent>

          <TabsContent value="hazard" className="space-y-4">
            <HazardCardsTable
              cards={HAZARD_CARDS}
              onViewCard={handleViewCard}
            />
          </TabsContent>

          <TabsContent value="automa" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Combat Bonus</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AUTOMA_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>{card.combatBonus || "-"}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="region" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Biome</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REGION_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.biomeTags.join(", ")}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="npc" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Check DC</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NPC_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.checkDC || "-"}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="mission" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Starting Heat</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MISSION_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.startingHeat}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="gear" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Consumable</TableHead>
                  <TableHead>Stat Bonus</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GEAR_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>{card.consumable ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {card.statBonus ? `${card.statBonus.stat} +${card.statBonus.value}` : "-"}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="chaos" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Heat Effect</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CHAOS_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>{card.heatEffect ? `+${card.heatEffect}` : "-"}</TableCell>
                    <TableCell>{card.duration || "immediate"}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="flomanjified" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Special Ability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FLOMANJIFIED_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>{card.specialAbility || "-"}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCard(card.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        {card && (
          <CardPreviewModal
            card={card}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
