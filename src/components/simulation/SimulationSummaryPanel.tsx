
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

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{simulation.scenario}</CardTitle>
        <CardDescription>
          Run on {formatDate(simulation.timestamp)} • {simulation.rounds} rounds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Mission Details</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span>{simulation.config?.missionType || "Standard"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Region:</span>
                <span>{simulation.config?.extractionRegion || "Unknown"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Heat Level:</span>
                <span>Start: {simulation.config?.startingHeat || 0}, Per Round: +{simulation.config?.heatPerRound || 1}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Difficulty:</span>
                <span>
                  {simulation.config?.nightmareDifficulty ? "Nightmare" : "Standard"}
                  {simulation.config?.arcadeModule ? " (Arcade Mode)" : ""}
                  {simulation.config?.competitiveMode ? " (Competitive)" : ""}
                  {simulation.config?.secretTraitor ? " (Traitor Mode)" : ""}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Players ({simulation.characters?.length || 0})</h4>
            <div className="space-y-1">
              {simulation.characters ? (
                simulation.characters.map((character: FlomanjiCharacter, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">
                      P{index + 1}
                    </Badge>
                    <span>{character.name}</span>
                    <span className="text-xs text-muted-foreground">({character.role})</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No character information available</span>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Mission Outcome</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={simulation.missionOutcome?.toLowerCase().includes("success") ? "success" : "destructive"}>
                  {simulation.missionOutcome || "Unknown"}
                </Badge>
              </div>
              {simulation.keyEvents && simulation.keyEvents.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs font-semibold block mb-1">Key Events:</span>
                  <ul className="text-xs space-y-1">
                    {simulation.keyEvents.slice(0, 3).map((event, index) => (
                      <li key={index} className="text-muted-foreground">{event.description}</li>
                    ))}
                    {simulation.keyEvents.length > 3 && (
                      <li className="text-xs text-muted-foreground">+ {simulation.keyEvents.length - 3} more events</li>
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
