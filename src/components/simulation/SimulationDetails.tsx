
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SimulationResult, AgentMessage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SimulationDetailsProps {
  simulation: SimulationResult;
}

const SimulationDetails: React.FC<SimulationDetailsProps> = ({ simulation }) => {
  if (!simulation) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch (e) {
      return dateStr;
    }
  };

  const renderMessageContent = (message: AgentMessage) => {
    // Basic markdown-like formatting for message content
    const formatted = message.content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");

    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  const renderRollBadge = (message: AgentMessage) => {
    if (!message.metadata?.roll) return null;
    
    const roll = message.metadata.roll;
    let color = "bg-red-100 text-red-800";
    
    if (roll.result === "success") {
      color = "bg-green-100 text-green-800";
    } else if (roll.result === "partial success") {
      color = "bg-yellow-100 text-yellow-800";
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {roll.stat} roll: {roll.value} + {roll.modifier} = {roll.total} ({roll.result})
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Simulation Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Summary</CardTitle>
          <CardDescription>
            Created: {formatDate(simulation.timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Scenario</h3>
              <p>{simulation.scenario}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Configuration</h3>
              <ul className="space-y-1">
                <li><strong>Rounds:</strong> {simulation.rounds}</li>
                <li><strong>Players:</strong> {simulation.playerCount}</li>
                <li><strong>Starting Heat:</strong> {simulation.config?.startingHeat || 0}</li>
                <li><strong>Heat per Round:</strong> {simulation.config?.heatPerRound || 0}</li>
                <li><strong>Final Heat:</strong> {simulation.gameState?.heat || 0}</li>
                <li><strong>Extraction Region:</strong> {simulation.config?.extractionRegion || "Not specified"}</li>
              </ul>
            </div>
          </div>

          <Separator className="my-4" />
          
          {/* Character Details */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Characters</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Final Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulation.characters?.map((character, index) => {
                    const finalInventory = simulation.gameState?.playerInventories[index];
                    return (
                      <TableRow key={character.id || index}>
                        <TableCell className="font-medium">{character.name}</TableCell>
                        <TableCell>{character.role}</TableCell>
                        <TableCell>
                          B:{character.stats.brawn} M:{character.stats.moxie} C:{character.stats.charm} G:{character.stats.grit} W:{character.stats.weirdSense}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge variant={finalInventory?.health > 3 ? "default" : "destructive"}>
                              Health: {finalInventory?.health || character.health}
                            </Badge>
                            <Badge variant={finalInventory?.weirdness < 5 ? "outline" : "secondary"}>
                              Weirdness: {finalInventory?.weirdness || character.weirdness}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Objectives */}
          {simulation.config?.objectives && simulation.config.objectives.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Mission Objectives</h3>
              <ul className="space-y-2">
                {simulation.config.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Badge variant={simulation.gameState?.completedObjectives.includes(objective.id) ? "success" : (objective.required ? "destructive" : "outline")}>
                      {simulation.gameState?.completedObjectives.includes(objective.id) ? "Completed" : (objective.required ? "Required" : "Optional")}
                    </Badge>
                    <span>{objective.description}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
            </div>
          )}
          
          {/* Game Events Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Game Events</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Round</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulation.log.filter(msg => msg.metadata?.phase && ["hazard-introduction", "game-over", "objective-completed"].includes(msg.metadata.phase)).map((event, index) => (
                    <TableRow key={index}>
                      <TableCell>{event.metadata?.roundNumber || "N/A"}</TableCell>
                      <TableCell>
                        {event.metadata?.phase === "hazard-introduction" ? "Hazard" : 
                         event.metadata?.phase === "game-over" ? "Game Over" :
                         event.metadata?.phase === "objective-completed" ? "Objective" : 
                         event.metadata?.phase}
                      </TableCell>
                      <TableCell>
                        {event.metadata?.phase === "hazard-introduction" ? event.metadata?.hazard :
                         event.metadata?.phase === "game-over" ? event.metadata?.reason : 
                         event.content.substring(0, 80) + "..."}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Dice Rolls Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Dice Rolls</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Stat</TableHead>
                    <TableHead>Roll</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simulation.gameState?.rolls.map((roll, index) => (
                    <TableRow key={index}>
                      <TableCell>Player {roll.player}</TableCell>
                      <TableCell>{roll.stat}</TableCell>
                      <TableCell>{roll.value}</TableCell>
                      <TableCell>
                        <Badge variant={
                          roll.result === "success" ? "success" : 
                          roll.result === "partial success" ? "warning" : "destructive"
                        }>
                          {roll.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Log */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Log</CardTitle>
          <CardDescription>
            Full transcript of the game session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulation.log.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === "GM"
                    ? "bg-slate-100"
                    : message.role === "Player"
                    ? "bg-blue-50"
                    : "bg-amber-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>
                      {message.role}
                      {message.role === "Player" && message.playerIndex !== undefined && ` ${message.playerIndex + 1}`}
                    </Badge>
                    {message.metadata?.phase && (
                      <Badge variant="outline">
                        {message.metadata.phase}
                      </Badge>
                    )}
                    {message.metadata?.roundNumber && (
                      <Badge variant="outline" className="bg-slate-50">
                        Round {message.metadata.roundNumber}
                      </Badge>
                    )}
                    {renderRollBadge(message)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  {renderMessageContent(message)}
                </div>
                
                {/* Show inventory for player actions */}
                {message.role === "Player" && message.metadata?.inventory && (
                  <div className="mt-2 text-xs bg-white p-2 rounded border">
                    <strong>Inventory:</strong> H:{message.metadata.inventory.health} W:{message.metadata.inventory.weirdness} L:{message.metadata.inventory.luck} | 
                    Gear: {message.metadata.inventory.gear.join(", ")} | 
                    Treasures: {message.metadata.inventory.treasures.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critic Feedback (if available) */}
      {simulation.criticFeedback && (
        <Card>
          <CardHeader>
            <CardTitle>Critic Analysis</CardTitle>
            <CardDescription>
              AI analysis of the gameplay session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: simulation.criticFeedback
                    .replace(/\n/g, "<br />")
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationDetails;
