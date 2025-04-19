
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
