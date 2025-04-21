
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SimulationResult, FlomanjiCharacter } from "@/types";

interface SimulationSummaryPanelProps {
  simulation: SimulationResult;
}

const SimulationSummaryPanel = ({ simulation }: SimulationSummaryPanelProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Function to determine mission outcome with proper fallbacks
  const getMissionOutcome = () => {
    // Check if we have an explicit outcome first
    if (simulation.missionOutcome && simulation.missionOutcome !== "unknown") {
      return simulation.missionOutcome;
    }
    
    // Check game-over metadata in the log
    const gameOverMessage = simulation.log?.find(msg => 
      msg.metadata?.phase === "game-over" && msg.metadata?.outcome
    );
    
    if (gameOverMessage?.metadata?.outcome) {
      return gameOverMessage.metadata.outcome;
    }
    
    // Check for key phrases in the log content
    const heatFailureMessage = simulation.log?.find(msg => 
      msg.content?.toLowerCase().includes("heat has reached") ||
      msg.content?.toLowerCase().includes("maximum heat") ||
      msg.content?.toLowerCase().includes("heat level reached maximum")
    );
    
    if (heatFailureMessage) {
      return "failure";
    }
    
    // Default fallback
    return simulation.missionOutcome || "unknown";
  };

  // Get reason for game ending
  const getGameOverReason = () => {
    // Check for explicit reason
    const gameOverMessage = simulation.log?.find(msg => 
      msg.metadata?.phase === "game-over" && msg.metadata?.reason
    );
    
    if (gameOverMessage?.metadata?.reason) {
      return gameOverMessage.metadata.reason === "heat-maximum" 
        ? "Heat level reached maximum" 
        : gameOverMessage.metadata.reason;
    }
    
    // Check for heat in content
    const heatFailureMessage = simulation.log?.find(msg => 
      msg.content?.toLowerCase().includes("heat has reached") ||
      msg.content?.toLowerCase().includes("maximum heat") ||
      msg.content?.toLowerCase().includes("heat level reached maximum")
    );
    
    if (heatFailureMessage) {
      return "Heat level reached maximum";
    }
    
    return "Unknown reason";
  };

  const missionOutcome = getMissionOutcome();
  const gameOverReason = missionOutcome !== "success" ? getGameOverReason() : "";

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-gray-200">{simulation.scenario}</CardTitle>
        <CardDescription className="text-gray-400">
          Run on {formatDate(simulation.timestamp)} • {simulation.rounds} rounds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-300">Mission Details</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="text-gray-200">{simulation.config?.missionType || "Standard"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Region:</span>
                <span className="text-gray-200">{simulation.config?.extractionRegion || "Unknown"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Heat Level:</span>
                <span className="text-gray-200">Start: {simulation.config?.startingHeat || 0}, Per Round: +{simulation.config?.heatPerRound || 1}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Difficulty:</span>
                <span className="text-gray-200">
                  {simulation.config?.nightmareDifficulty ? "Nightmare" : "Standard"}
                  {simulation.config?.arcadeModule ? " (Arcade Mode)" : ""}
                  {simulation.config?.competitiveMode ? " (Competitive)" : ""}
                  {simulation.config?.secretTraitor ? " (Traitor Mode)" : ""}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-300">Players ({simulation.characters?.length || 0})</h4>
            <div className="space-y-1">
              {simulation.characters ? (
                simulation.characters.map((character: FlomanjiCharacter, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs text-gray-400">
                      P{index + 1}
                    </Badge>
                    <span className="text-gray-200">{character.name}</span>
                    <span className="text-xs text-gray-500">({character.role})</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-500">No character information available</span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-300">Mission Outcome</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={missionOutcome.toLowerCase().includes("success") ? "success" : "destructive"}>
                  {missionOutcome.charAt(0).toUpperCase() + missionOutcome.slice(1)}
                </Badge>
              </div>
              {gameOverReason && (
                <div className="text-sm text-gray-400 mt-1">
                  Reason: {gameOverReason}
                </div>
              )}
              {simulation.keyEvents && simulation.keyEvents.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs font-semibold block mb-1 text-gray-300">Key Events:</span>
                  <ul className="text-xs space-y-1">
                    {simulation.keyEvents.slice(0, 3).map((event, index) => (
                      <li key={index} className="text-gray-500">{event}</li>
                    ))}
                    {simulation.keyEvents.length > 3 && (
                      <li className="text-xs text-gray-500">+ {simulation.keyEvents.length - 3} more events</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationSummaryPanel;
