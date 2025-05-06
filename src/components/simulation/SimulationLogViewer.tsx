
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { log } from "@/utils/logging";

interface SimulationLogViewerProps {
  simulationId: string;
}

const SimulationLogViewer = ({ simulationId }: SimulationLogViewerProps) => {
  const [simulationLogs, setSimulationLogs] = useState<any[]>([]);
  
  useEffect(() => {
    // Get all logs that mention this simulation ID
    const allLogs = log.getAll();
    const relevantLogs = allLogs.filter(logEntry => 
      (logEntry.message && logEntry.message.includes(simulationId)) || 
      (logEntry.details && JSON.stringify(logEntry.details).includes(simulationId))
    );
    
    setSimulationLogs(relevantLogs);
    
    // Log this view
    log.info(`Viewing logs for simulation ${simulationId}`, { 
      count: relevantLogs.length,
      simulationId
    });
  }, [simulationId]);
  
  const downloadSimulationLogs = () => {
    if (simulationLogs.length === 0) return;
    
    const logData = JSON.stringify(simulationLogs, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `simulation-logs-${simulationId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  if (simulationLogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-center py-8">
            No detailed logs found for this simulation.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Technical Logs ({simulationLogs.length})</h3>
        <Button variant="outline" size="sm" onClick={downloadSimulationLogs}>
          <Download className="h-4 w-4 mr-1" /> Export Logs
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted sticky top-0">
              <tr>
                <th className="text-left p-2">Timestamp</th>
                <th className="text-left p-2">Level</th>
                <th className="text-left p-2">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {simulationLogs.map((logEntry, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="p-2 text-xs text-muted-foreground">
                    {new Date(logEntry.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs rounded-full uppercase font-bold ${
                      logEntry.level === 'error' ? 'bg-red-100 text-red-800' : 
                      logEntry.level === 'warn' ? 'bg-amber-100 text-amber-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {logEntry.level}
                    </span>
                  </td>
                  <td className="p-2">
                    <div>{logEntry.message}</div>
                    {logEntry.details && (
                      <details className="mt-1">
                        <summary className="text-xs text-muted-foreground cursor-pointer">
                          Details
                        </summary>
                        <pre className="mt-1 p-2 text-xs bg-muted rounded overflow-x-auto">
                          {JSON.stringify(logEntry.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimulationLogViewer;
