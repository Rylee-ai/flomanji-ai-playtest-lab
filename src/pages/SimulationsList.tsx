
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSimulationsList } from "@/lib/storage";
import { SimulationResult } from "@/types";
import { format } from "date-fns";
import SimulationSummaryPanel from "@/components/simulation/SimulationSummaryPanel";

const SimulationsList = () => {
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);

  useEffect(() => {
    // Load simulations list from storage
    const list = getSimulationsList();
    setSimulations(list);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Simulations</h1>
        <Link to="/simulations/new">
          <Button>New Simulation</Button>
        </Link>
      </div>

      {simulations.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Simulations Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You haven't run any simulations yet. Click "New Simulation" to create one.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {simulations.map((simulation) => (
            <Link key={simulation.id} to={`/simulations/${simulation.id}`}>
              <div className="transition-all hover:scale-[1.01] hover:shadow-md">
                <SimulationSummaryPanel simulation={simulation} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimulationsList;
