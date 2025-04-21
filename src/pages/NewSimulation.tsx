
import React from "react";
import { useNavigate } from "react-router-dom";
import SimulationSetup from "@/components/simulation/SimulationSetup";
import SimulationProgress from "@/components/simulation/SimulationProgress";
import { useSimulationRunner } from "@/hooks/useSimulationRunner";

/**
 * NewSimulation page now uses useSimulationRunner for process and result access.
 */
const NewSimulation = () => {
  const navigate = useNavigate();
  const {
    runSimulation,
    isLoading,
    isFinished,
    latestSimulationId,
    goToResults,
    latestResult,
    error,
    retryWithDifferentModel
  } = useSimulationRunner();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
      </div>

      {/* Progress and click-through UI */}
      <SimulationProgress
        isRunning={isLoading}
        finished={isFinished}
        simulationId={latestSimulationId ?? undefined}
        onGoToResults={() => goToResults(navigate)}
        error={error}
        onRetry={retryWithDifferentModel}
      />

      {/* Setup and start simulation */}
      <SimulationSetup
        onStartSimulation={runSimulation}
        isLoading={isLoading}
      />

      {/* Example: Display live result as JSON for now (could enhance for admin GUI) */}
      {latestResult && (
        <div className="mt-8 bg-muted rounded p-4 text-sm overflow-x-auto max-w-3xl mx-auto">
          <div className="font-semibold text-primary mb-2">Simulation Results (Live)</div>
          <pre className="whitespace-pre-wrap break-all">{JSON.stringify(latestResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NewSimulation;
