
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SimulationResult } from "@/types";
import { updateSimulationAnnotations } from "@/lib/storage";
import { toast } from "@/components/ui/use-toast";
import SimulationSummaryPanel from "./SimulationSummaryPanel";
import SimulationLogDisplay from "./SimulationLogDisplay";
import SimulationDetailsControls from "./SimulationDetailsControls";

interface SimulationDetailsProps {
  simulation: SimulationResult;
}

const SimulationDetails = ({ simulation }: SimulationDetailsProps) => {
  const [annotations, setAnnotations] = useState(simulation.annotations || "");
  const [showPrompts, setShowPrompts] = useState(false);
  const [activeTab, setActiveTab] = useState("log");

  const handleSaveAnnotations = () => {
    const success = updateSimulationAnnotations(simulation.id, annotations);
    if (success) {
      toast({
        title: "Success",
        description: "Annotations updated successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update annotations",
      });
    }
  };

  const handleExportData = () => {
    const exportData = JSON.stringify(simulation, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulation-${simulation.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export complete",
      description: "Simulation data has been exported as JSON",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SimulationDetailsControls 
        simulationId={simulation.id}
        showPrompts={showPrompts}
        onTogglePrompts={() => setShowPrompts(!showPrompts)}
        onExportData={handleExportData}
      />
      
      <SimulationSummaryPanel simulation={simulation} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="log">Simulation Log</TabsTrigger>
          <TabsTrigger value="annotations">Notes & Annotations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="p-4 border rounded-md mt-2">
          <SimulationLogDisplay messages={simulation.log} showPrompts={showPrompts} />
        </TabsContent>
        
        <TabsContent value="annotations" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes & Annotations</h3>
            <Textarea
              value={annotations}
              onChange={(e) => setAnnotations(e.target.value)}
              placeholder="Add your notes about this simulation run..."
              className="min-h-[200px]"
            />
            <Button onClick={handleSaveAnnotations}>Save Notes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationDetails;
