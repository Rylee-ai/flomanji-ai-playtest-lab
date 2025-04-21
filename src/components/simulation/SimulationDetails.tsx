import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SimulationResult, AgentMessage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

/**
 * Helper for pretty-printing config
 */
function formatConfig(config?: SimulationResult["config"]) {
  if (!config) return null;
  const entries = Object.entries(config)
    .filter(([k, v]) => typeof v !== "undefined")
    .map(([k, v]) => {
      if (Array.isArray(v)) return [k, v.map(e => typeof e === "object" && e ? e.description || JSON.stringify(e) : String(e)).join("; ")]
      if (typeof v === "object" && v !== null)
        return [k, Object.entries(v).map(([k2, v2]) => `${k2}: ${v2}`).join(", ")]
      return [k, String(v)];
    });
  return (
    <ul className="text-sm md:text-base grid grid-cols-1 md:grid-cols-2 gap-2">
      {entries.map(([k, v]) => (
        <li key={k}><b className="capitalize">{k}:</b> {v as string}</li>
      ))}
    </ul>
  );
}

/**
 * Formats a date string to local string
 */
const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleString();
  } catch (e) {
    return dateStr;
  }
};

// Attempt to display (if present) the agent/system prompt that generated this message
function AgentPromptDisplay({ prompt }: { prompt: string }) {
  return (
    <div className="prose prose-xs max-w-none bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
      <b>Agent Prompt:</b> <pre className="whitespace-pre-wrap break-words">{prompt}</pre>
    </div>
  );
}

interface SimulationDetailsProps {
  simulation: SimulationResult;
}

const SimulationDetails: React.FC<SimulationDetailsProps> = ({ simulation }) => {
  // UI debug toggle to show/hide debug info
  const [showDebugPrompts, setShowDebugPrompts] = useState(false);

  if (!simulation) return null;

  // Try to expose debug prompts per message if available (from metadata.debugPrompt, or placeholder text otherwise)
  const extractPrompt = (message: AgentMessage) =>
    (message as any)?.metadata?.debugPrompt || (message as any)?.prompt || null;

  // Action detail summary for each log entry
  const actionDetails = (message: AgentMessage) => {
    const md = message.metadata || {};
    const lines: string[] = [];
    if (md.phase) lines.push(`Phase: ${md.phase}`);
    if (md.roundNumber) lines.push(`Round: ${md.roundNumber}`);
    if (md.playerNumber) lines.push(`Player #: ${md.playerNumber}`);
    if (md.playerName) lines.push(`Character: ${md.playerName}`);
    if (md.roll) lines.push(`Dice Roll: [${md.roll.stat}] = ${md.roll.value} + ${md.roll.modifier} = ${md.roll.total} (${md.roll.result})`);
    if (md.hazard) lines.push(`Hazard: ${md.hazard}`);
    if (md.inventory) {
      lines.push(
        `Inventory - Health: ${md.inventory.health}, Weirdness: ${md.inventory.weirdness}, Luck: ${md.inventory.luck}, Gear: ${md.inventory.gear?.join(", ") || "None"}, Treasures: ${md.inventory.treasures?.join(", ") || "None"}`
      );
    }
    if (typeof md.heat === "number") lines.push(`Heat: ${md.heat}`);
    if (md.reason) lines.push(`Reason: ${md.reason}`);
    return lines.map((l, idx) => <div className="text-xs text-slate-600" key={idx}>{l}</div>);
  };

  // Show agent roles and log action metadata more prominently
  const renderMessageHeader = (message: AgentMessage) => (
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2">
        <Badge variant="outline">
          {message.role}
          {message.role === "Player" && message.playerIndex !== undefined && ` ${message.playerIndex + 1}`}
        </Badge>
        {(message.metadata?.phase || message.metadata?.roundNumber) && (
          <span className="flex gap-1">
            {message.metadata?.phase && (
              <Badge variant="secondary">
                {message.metadata.phase}
              </Badge>
            )}
            {message.metadata?.roundNumber && (
              <Badge variant="outline" className="bg-slate-50">
                Round {message.metadata.roundNumber}
              </Badge>
            )}
          </span>
        )}
      </div>
      <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
    </div>
  );

  // Formats message content (simple markdown/HTML)
  const renderMessageContent = (message: AgentMessage) => {
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
      {/* Settings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>
            Simulation Run Settings
          </CardTitle>
          <CardDescription>
            <span>
              Created: {formatDate(simulation.timestamp)}
            </span>
            <div className="mt-2">
              <Button
                size="sm"
                variant={showDebugPrompts ? "default" : "outline"}
                className="ml-2"
                onClick={() => setShowDebugPrompts(v => !v)}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                {showDebugPrompts ? "Hide Debug Prompts" : "Show Debug Prompts"}
              </Button>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <strong>Scenario:</strong> {simulation.scenario}
            <Separator className="my-3" />
            <div className="mb-1">
              <b>Full Settings Summary:</b>
            </div>
            {formatConfig(simulation.config)}
          </div>
        </CardContent>
      </Card>

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
                    <Badge variant={simulation.gameState?.completedObjectives.includes(objective.id) ? "default" : (objective.required ? "destructive" : "outline")}>
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
                          roll.result === "success" ? "default" : 
                          roll.result === "partial success" ? "secondary" : "destructive"
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
            Full transcript of the game session, with role and action details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulation.log.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border border-slate-200 ${
                  message.role === "GM"
                    ? "bg-slate-100"
                    : message.role === "Player"
                    ? "bg-blue-50"
                    : "bg-amber-50"
                }`}
              >
                {renderMessageHeader(message)}
                {actionDetails(message)}
                <div className="prose prose-sm max-w-none mt-2">
                  {renderMessageContent(message)}
                </div>
                {/* Inventory for player messages */}
                {message.role === "Player" && message.metadata?.inventory && (
                  <div className="mt-2 text-xs bg-white p-2 rounded border border-slate-100">
                    <strong>Inventory:</strong> H:{message.metadata.inventory.health} W:{message.metadata.inventory.weirdness} L:{message.metadata.inventory.luck} | 
                    Gear: {(message.metadata.inventory.gear || []).join(", ") || "None"} | 
                    Treasures: {(message.metadata.inventory.treasures || []).join(", ") || "None"}
                  </div>
                )}
                {/* Show agent prompt if debug is enabled */}
                {showDebugPrompts && extractPrompt(message) && (
                  <AgentPromptDisplay prompt={extractPrompt(message)} />
                )}
                {/* Fallback/help if no agent prompt is present */}
                {showDebugPrompts && !extractPrompt(message) && (
                  <div className="prose prose-xs max-w-none bg-yellow-50 border border-yellow-200 rounded p-2 mt-2 text-sm">
                    <b>No agent prompt recorded for this message.</b>
                    <span className="block opacity-70">(To surface prompts in the future, update the simulation code to log <code>prompt</code> or <code>metadata.debugPrompt</code> into each message.)</span>
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
