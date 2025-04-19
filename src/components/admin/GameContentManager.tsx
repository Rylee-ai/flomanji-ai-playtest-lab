import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { AUTOMA_CARDS } from "@/lib/cards/automa-cards";
import { CardDisplay } from "@/components/cards/CardDisplay";

const REGION_CARDS = [
  {
    id: "everglades-marsh",
    name: "Everglades Marsh",
    type: "region",
    biomeTags: ["🐊"],
    icons: [{ symbol: "🐊", meaning: "Swamp Biome" }],
    keywords: ["Swamp", "Marsh", "Dangerous"],
    onEnter: "Draw 1 Hazard card",
    rest: "Heal 1 Health",
    bonusZone: "Find rare herbs: Draw 1 Gear",
    rules: ["Entering costs +1 Action unless you have Swamp Gear"],
    flavor: "The heart of old Florida, where gators rule supreme.",
    imagePrompt: "Misty marshland with tall grass and cypress knees breaking the surface"
  },
  {
    id: "ghost-mall",
    name: "Ghost Mall",
    type: "region",
    biomeTags: ["🏙️"],
    icons: [{ symbol: "🏙️", meaning: "Urban Biome" }],
    keywords: ["Urban", "Abandoned", "Shelter"],
    onEnter: "Roll Weird check DC 9",
    rest: "Reduce 1 Weirdness",
    bonusZone: "Loot stores: Draw 1 Treasure",
    rules: ["Safe haven: No Hazard draws while resting"],
    flavor: "Once packed with shoppers, now only echoes remain.",
    imagePrompt: "Abandoned mall interior with broken skylights and overgrown plants"
  }
];

const NPC_CARDS = [
  {
    id: "voodoo-priestess",
    name: "Voodoo Priestess",
    type: "npc",
    icons: [{ symbol: "🗣️", meaning: "Social" }, { symbol: "🔮", meaning: "Weirdness" }],
    keywords: ["Mystic", "Helper", "Trade"],
    checkDC: 11,
    actions: [
      {
        description: "Trade herbs for healing",
        cost: 1,
        effect: "Discard 1 Gear → Heal 2 Health"
      },
      {
        description: "Seek guidance",
        cost: 1,
        effect: "Reduce 1 Weirdness"
      }
    ],
    rules: ["Must pass Charm DC 11 to interact", "Leaves if Heat reaches 8"],
    flavor: "Her eyes hold ancient secrets of the swamp.",
    imagePrompt: "Elderly woman in colorful robes surrounded by mystical trinkets"
  }
];

const MISSION_CARDS = [
  {
    id: "blood-tide",
    name: "Blood Tide",
    type: "mission",
    icons: [{ symbol: "🏖️", meaning: "Coastal" }, { symbol: "☣️", meaning: "Toxic" }],
    keywords: ["Escape", "Toxic", "Urgent"],
    hook: "Red tide turns deadly as something rises from the deep.",
    mapLayout: "3x3 grid",
    startingHeat: 3,
    objectives: [
      {
        description: "Collect 3 water samples",
        required: true,
        reward: "Draw 1 Treasure"
      },
      {
        description: "Save all survivors",
        required: false,
        reward: "Reduce Heat by 2"
      }
    ],
    extractionRegion: "Research Lab",
    specialRules: ["Water contact causes +1 Weirdness", "Heat increases by 2 each round"],
    rules: ["Complete all required objectives and reach extraction"],
    flavor: "The waves glow an unnatural red under the setting sun.",
    imagePrompt: "Beach at sunset with crimson waves and dark shapes beneath the surface"
  }
];

const GameContentManager = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

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
        <Tabs defaultValue="treasure" className="w-full">
          <TabsList>
            <TabsTrigger value="treasure">Treasure Cards</TabsTrigger>
            <TabsTrigger value="secret">Secret Objectives</TabsTrigger>
            <TabsTrigger value="automa">Automa Cards</TabsTrigger>
            <TabsTrigger value="region">Region Cards</TabsTrigger>
            <TabsTrigger value="npc">NPC Cards</TabsTrigger>
            <TabsTrigger value="mission">Mission Sheets</TabsTrigger>
          </TabsList>

          <TabsContent value="treasure" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TREASURE_CARDS.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>Treasure</TableCell>
                    <TableCell>{card.keywords.join(", ")}</TableCell>
                    <TableCell>{card.value || "-"}</TableCell>
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

          <TabsContent value="secret" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Alignment</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SECRET_OBJECTIVES.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>{card.alignment}</TableCell>
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
        </Tabs>

        {selectedCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-lg max-w-xl w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Card Preview</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCard(null)}
                >
                  Close
                </Button>
              </div>
              <div className="flex justify-center">
                <CardDisplay 
                  card={[...TREASURE_CARDS, ...SECRET_OBJECTIVES, ...AUTOMA_CARDS].find(c => c.id === selectedCard)!} 
                  showDetails={true}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameContentManager;
