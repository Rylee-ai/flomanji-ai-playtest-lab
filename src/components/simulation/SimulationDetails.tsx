
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveAs } from "file-saver";
import { SimulationResult } from "@/types";
import { updateSimulationAnnotations } from "@/lib/storage";
import SimulationLogDisplay from "./SimulationLogDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileDown, MessageCircle, ChevronDown, AlertTriangle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from "date-fns";

interface SimulationDetailsProps {
  simulation: SimulationResult;
}

const SimulationDetails = ({ simulation }: SimulationDetailsProps) => {
  const [showPrompts, setShowPrompts] = useState(false);
  const [annotations, setAnnotations] = useState(simulation.annotations || "");
  const [isAnnotationsExpanded, setIsAnnotationsExpanded] = useState(false);
  const [isCriticExpanded, setIsCriticExpanded] = useState(false);
  
  const exportSimulation = () => {
    const blob = new Blob([JSON.stringify(simulation, null, 2)], { type: "application/json" });
    saveAs(blob, `flomanji-simulation-${simulation.id}.json`);
  };
  
  const saveAnnotations = () => {
    updateSimulationAnnotations(simulation.id, annotations);
  };
  
  // Check if simulation ended early
  const didEndEarly = simulation.rounds < (simulation.expectedRounds || simulation.config.rounds);
  
  // Find reason for early termination if applicable
  const gameOverEvent = simulation.log.find(entry => entry.metadata?.phase === "game-over");
  const earlyTerminationReason = gameOverEvent?.metadata?.reason || "";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Simulation Overview</span>
              <Badge variant={getOutcomeBadgeVariant(simulation.missionOutcome)}>
                {formatOutcome(simulation.missionOutcome)}
              </Badge>
            </CardTitle>
            <CardDescription>
              {format(new Date(simulation.timestamp), "PPpp")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Scenario</h4>
                <p className="text-sm text-muted-foreground">{simulation.scenario}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Characters</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {simulation.characters.map((char, i) => (
                    <Badge key={i} variant="outline">{char.name}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Rounds
                </h4>
                <p className="text-sm">
                  {simulation.rounds} / {simulation.expectedRounds || simulation.config.rounds}
                  {didEndEarly && (
                    <Badge variant="destructive" className="ml-2">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Early End
                    </Badge>
                  )}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Heat</h4>
                <p className="text-sm text-muted-foreground">{simulation.gameState?.heat || 0}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Mission Type</h4>
                <p className="text-sm text-muted-foreground">{simulation.config.missionType || "Standard"}</p>
              </div>
            </div>

            {didEndEarly && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md text-amber-700">
                <h4 className="font-medium">Simulation Ended Early</h4>
                <p className="text-sm">
                  {earlyTerminationReason === "heat-maximum" 
                    ? "Heat reached maximum level (10+). Mission failed."
                    : earlyTerminationReason === "all-players-transformed"
                    ? "All players reached maximum Weirdness and were transformed. Mission failed."
                    : "Simulation ended before completing all planned rounds."}
                </p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium">Objectives Progress</h4>
              <div className="mt-1">
                {simulation.config.objectives && simulation.config.objectives.length > 0 ? (
                  <div className="space-y-2">
                    {simulation.config.objectives.map((obj, idx) => {
                      const isCompleted = simulation.gameState?.completedObjectives?.includes(obj.id || `objective-${idx}`);
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-xs">{obj.description}</span>
                          {obj.required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No defined objectives</p>
                )}
              </div>
            </div>
            
            <Button size="sm" variant="outline" onClick={exportSimulation}>
              <FileDown className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analysis & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Collapsible 
              open={isAnnotationsExpanded} 
              onOpenChange={setIsAnnotationsExpanded}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Annotations</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isAnnotationsExpanded ? "transform rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <Textarea
                  placeholder="Add notes about this simulation..."
                  value={annotations}
                  onChange={(e) => setAnnotations(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button size="sm" onClick={saveAnnotations} className="mt-2">
                  Save Notes
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            {simulation.criticFeedback && (
              <Collapsible 
                open={isCriticExpanded} 
                onOpenChange={setIsCriticExpanded}
                className="space-y-2 pt-2 border-t"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Critic Feedback
                  </h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className={`h-4 w-4 transition-transform ${isCriticExpanded ? "transform rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <ScrollArea className="h-[200px]">
                    <div className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap text-sm">
                      {simulation.criticFeedback}
                    </div>
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            )}

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Character Stats</h3>
              <div className="space-y-3">
                {simulation.characters.map((char, idx) => (
                  <div key={idx} className="bg-muted/30 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium">{char.name}</h4>
                      <Badge variant="outline">{char.role}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-xs">
                      <div>Health: {simulation.gameState?.playerInventories?.[idx]?.health || char.health}</div>
                      <div>Weirdness: {simulation.gameState?.playerInventories?.[idx]?.weirdness || 0}</div>
                      <div>Luck: {simulation.gameState?.playerInventories?.[idx]?.luck || char.luck}</div>
                    </div>
                    {simulation.gameState?.playerInventories?.[idx]?.gear && (
                      <div className="mt-1 text-xs">
                        <span className="font-medium">Gear:</span> {simulation.gameState.playerInventories[idx].gear.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">Simulation Log</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
        </TabsList>
        <TabsContent value="log" className="p-4 border rounded-md">
          <div className="mb-4 flex items-center">
            <Switch
              id="show-prompts"
              checked={showPrompts}
              onCheckedChange={setShowPrompts}
            />
            <Label htmlFor="show-prompts" className="ml-2">
              Show Debug Information
            </Label>
          </div>
          
          <SimulationLogDisplay 
            messages={simulation.log} 
            showPrompts={showPrompts} 
          />
        </TabsContent>
        <TabsContent value="technical" className="p-4 border rounded-md">
          <ScrollArea className="h-[500px]">
            <pre className="text-xs whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(simulation, null, 2)}
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper functions
const getOutcomeBadgeVariant = (outcome?: string) => {
  switch (outcome) {
    case "success": return "success";
    case "partial": return "warning";
    case "failure": return "destructive";
    default: return "secondary";
  }
};

const formatOutcome = (outcome?: string) => {
  switch (outcome) {
    case "success": return "Success";
    case "partial": return "Partial Success";
    case "failure": return "Failure";
    default: return "Unknown";
  }
};

export default SimulationDetails;
