
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface SimulationProgressProps {
  isRunning: boolean;
  finished: boolean;
  simulationId?: string;
  onGoToResults: () => void;
  error?: string | null;
  onRetry?: () => void;
}

const SimulationProgress: React.FC<SimulationProgressProps> = ({
  isRunning,
  finished,
  simulationId,
  onGoToResults,
  error,
  onRetry
}) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 pt-8">
      {isRunning && !finished && !error && (
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
      
      {error && (
        <Alert variant="destructive" className="max-w-xl">
          <AlertTitle className="flex items-center gap-2">
            Simulation Error
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-sm mb-3">{error}</p>
            {onRetry && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry} 
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry with Different Model
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {finished && simulationId && !error && (
        <Button onClick={onGoToResults} className="mt-4 animate-fade-in" autoFocus>
          View Simulation Results
        </Button>
      )}
    </div>
  );
};

export default SimulationProgress;
