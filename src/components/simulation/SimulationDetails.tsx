import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SimulationResult } from "@/types";
import { updateSimulationAnnotations } from "@/lib/storage";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import SimulationSummaryPanel from "./SimulationSummaryPanel";
import SimulationLogDisplay from "./SimulationLogDisplay";
import SimulationDetailsControls from "./SimulationDetailsControls";
import { TrainingDataExporter } from "@/lib/simulation/training/TrainingDataExporter";

interface SimulationDetailsProps {
  simulation: SimulationResult;
  onBack?: () => void;
}

const SimulationDetails = ({ simulation, onBack }: SimulationDetailsProps) => {
  const [annotations, setAnnotations] = useState(simulation.annotations || "");
  const [showPrompts, setShowPrompts] = useState(false);
  const [activeTab, setActiveTab] = useState("log");
  const [exportFormat, setExportFormat] = useState<'json' | 'jsonl' | 'csv'>('json');

  const handleSaveAnnotations = () => {
    const success = updateSimulationAnnotations(simulation.id, annotations);
    if (success) {
      showSuccessToast("Annotations updated successfully");
    } else {
      showErrorToast("Failed to update annotations");
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
    
    showSuccessToast("Simulation data has been exported as JSON");
  };
  
  const handleExportTrainingData = () => {
    if (!simulation.trainingData) {
      showErrorToast("No training data available for this simulation");
      return;
    }
    
    try {
      const exporter = new TrainingDataExporter();
      let exportData: string;
      
      switch (exportFormat) {
        case 'json':
          exportData = exporter.exportToJson(simulation);
          break;
        case 'jsonl':
          exportData = exporter.exportToJsonl(simulation);
          break;
        case 'csv':
          exportData = exporter.exportToCsv(simulation);
          break;
        default:
          exportData = exporter.exportToJson(simulation);
      }
      
      const mimeType = exportFormat === 'csv' ? 'text/csv' : 'application/json';
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `training-data-${simulation.id}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showSuccessToast(`Training data exported as ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error("Error exporting training data:", error);
      showErrorToast(`Failed to export training data: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SimulationDetailsControls 
        simulationId={simulation.id}
        simulation={simulation}
        showPrompts={showPrompts}
        onTogglePrompts={() => setShowPrompts(!showPrompts)}
        onExportData={handleExportData}
        onBack={onBack}
      />
      
      <SimulationSummaryPanel simulation={simulation} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-[800px]">
          <TabsTrigger value="log" className="text-gray-300 data-[state=active]:text-white">Simulation Log</TabsTrigger>
          <TabsTrigger value="critic" className="text-gray-300 data-[state=active]:text-white">Critic Feedback</TabsTrigger>
          <TabsTrigger value="annotations" className="text-gray-300 data-[state=active]:text-white">Notes & Annotations</TabsTrigger>
          <TabsTrigger value="training" className="text-gray-300 data-[state=active]:text-white">Training Data</TabsTrigger>
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
        
        <TabsContent value="training" className="p-4 border rounded-md mt-2 border-gray-800">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Training Data</h3>
            
            {simulation.trainingData ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Format:</span>
                    <div className="flex border rounded-md overflow-hidden">
                      <Button 
                        variant={exportFormat === 'json' ? "default" : "ghost"} 
                        className="rounded-none h-8 px-3"
                        onClick={() => setExportFormat('json')}
                      >
                        JSON
                      </Button>
                      <Button 
                        variant={exportFormat === 'jsonl' ? "default" : "ghost"} 
                        className="rounded-none h-8 px-3"
                        onClick={() => setExportFormat('jsonl')}
                      >
                        JSONL
                      </Button>
                      <Button 
                        variant={exportFormat === 'csv' ? "default" : "ghost"} 
                        className="rounded-none h-8 px-3"
                        onClick={() => setExportFormat('csv')}
                      >
                        CSV
                      </Button>
                    </div>
                    <Button onClick={handleExportTrainingData} className="ml-2">
                      Export Training Data
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-300">Training Examples ({simulation.trainingData.examples.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(
                      simulation.trainingData.examples.reduce((acc, ex) => {
                        acc[ex.type] = (acc[ex.type] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([type, count]) => (
                      <div key={type} className="bg-gray-900 p-3 rounded border border-gray-800">
                        <div className="text-sm font-medium text-gray-400">{type}</div>
                        <div className="text-2xl font-bold text-white">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-300">Statistics</h4>
                  <div className="bg-gray-900 p-4 rounded border border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Success Rate</div>
                        <div className="text-xl font-medium text-white">
                          {Math.round(simulation.trainingData.statistics.successRate * 100)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Average Rounds</div>
                        <div className="text-xl font-medium text-white">
                          {simulation.trainingData.statistics.averageRounds}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-300">Key Decision Points</h4>
                  <div className="bg-gray-900 p-4 rounded border border-gray-800 max-h-80 overflow-y-auto">
                    {simulation.trainingData.statistics.keyDecisionPoints.length > 0 ? (
                      <div className="space-y-4">
                        {simulation.trainingData.statistics.keyDecisionPoints.map((point, idx) => (
                          <div key={idx} className="border-l-4 pl-3 py-1" style={{
                            borderColor: point.impact === 'positive' ? 'green' : 
                                        point.impact === 'negative' ? 'red' : 'gray'
                          }}>
                            <div className="text-sm font-medium text-gray-300">Round {point.round}: {point.description}</div>
                            <div className="text-xs text-gray-400 mt-1">{point.decision}</div>
                            <div className="text-xs text-gray-500 mt-1 italic">{point.outcome}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No key decision points identified</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 p-4 rounded border border-gray-800">
                <p className="text-gray-400">
                  No training data available for this simulation. This may be because the simulation was run before training data generation was implemented.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationDetails;
