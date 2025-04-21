
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SimulationProgressProps {
  isRunning: boolean;
  finished: boolean;
  simulationId?: string;
  onGoToResults: () => void;
}

const SimulationProgress: React.FC<SimulationProgressProps> = ({
  isRunning,
  finished,
  simulationId,
  onGoToResults
}) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 pt-8">
      {isRunning && !finished && (
        <>
          <Progress value={70} className="w-1/2 mb-2 animate-pulse" />
          <div className="flex items-center space-x-2">
            <span className="font-medium">Simulation running...</span>
            <LogOut className="animate-spin h-5 w-5 text-primary" />
          </div>
          <span className="text-muted-foreground text-sm">
            This may take up to a minute. Results will appear here when complete.
          </span>
        </>
      )}
      {finished && simulationId && (
        <Button onClick={onGoToResults} className="mt-4 animate-fade-in" autoFocus>
          View Simulation Results
        </Button>
      )}
    </div>
  );
};

export default SimulationProgress;
