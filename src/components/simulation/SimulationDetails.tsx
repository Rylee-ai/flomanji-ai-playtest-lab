
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SimulationResult } from "@/types";
import { updateSimulationAnnotations } from "@/lib/storage";
import { toast } from "sonner";
import SimulationSummaryPanel from "./SimulationSummaryPanel";
import SimulationLogDisplay from "./SimulationLogDisplay";
import SimulationDetailsControls from "./SimulationDetailsControls";

interface SimulationDetailsProps {
  simulation: SimulationResult;
  onBack?: () => void;
}

const SimulationDetails = ({ simulation, onBack }: SimulationDetailsProps) => {
  const [annotations, setAnnotations] = useState(simulation.annotations || "");
  const [showPrompts, setShowPrompts] = useState(false);
  const [activeTab, setActiveTab] = useState("log");

  const handleSaveAnnotations = () => {
    const success = updateSimulationAnnotations(simulation.id, annotations);
    if (success) {
      toast.success("Annotations updated successfully");
    } else {
      toast.error("Failed to update annotations");
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
    
    toast.success("Simulation data has been exported as JSON");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SimulationDetailsControls 
        simulationId={simulation.id}
        showPrompts={showPrompts}
        onTogglePrompts={() => setShowPrompts(!showPrompts)}
        onExportData={handleExportData}
        onBack={onBack}
      />
      
      <SimulationSummaryPanel simulation={simulation} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:w-[600px]">
          <TabsTrigger value="log" className="text-gray-300 data-[state=active]:text-white">Simulation Log</TabsTrigger>
          <TabsTrigger value="critic" className="text-gray-300 data-[state=active]:text-white">Critic Feedback</TabsTrigger>
          <TabsTrigger value="annotations" className="text-gray-300 data-[state=active]:text-white">Notes & Annotations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="p-4 border rounded-md mt-2 border-gray-800">
          <SimulationLogDisplay messages={simulation.log} showPrompts={showPrompts} />
        </TabsContent>
        
        <TabsContent value="critic" className="p-4 border rounded-md mt-2 border-gray-800">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Critic Feedback</h3>
            {simulation.criticFeedback ? (
              <div className="whitespace-pre-wrap text-sm bg-gray-900 p-4 rounded-md text-gray-300 border border-gray-800">
                {simulation.criticFeedback}
              </div>
            ) : (
              <p className="text-gray-400">No critic feedback available for this simulation.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="annotations" className="p-4 border rounded-md mt-2 border-gray-800">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Notes & Annotations</h3>
            <Textarea
              value={annotations}
              onChange={(e) => setAnnotations(e.target.value)}
              placeholder="Add your notes about this simulation run..."
              className="min-h-[200px] bg-gray-900 text-gray-300 border-gray-800"
            />
            <Button onClick={handleSaveAnnotations} variant="outline" className="text-gray-300 hover:text-white hover:border-white">Save Notes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationDetails;
