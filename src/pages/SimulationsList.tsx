
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { getSimulationSummaries } from "@/lib/api";
import { SimulationSummary } from "@/types";
import { formatDate } from "@/lib/utils";

const SimulationsList = () => {
  const [simulations, setSimulations] = useState<SimulationSummary[]>([]);

  useEffect(() => {
    // Load simulations
    const loadedSimulations = getSimulationSummaries();
    setSimulations(loadedSimulations);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Simulations</h1>
        <Button asChild>
          <Link to="/simulations/new">
            <Plus className="mr-2 h-4 w-4" />
            New Simulation
          </Link>
        </Button>
      </div>
      
      {simulations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-muted-foreground mb-4">
              No simulations yet. Start your first simulation to see it here.
            </p>
            <Button asChild>
              <Link to="/simulations/new">
                <Plus className="mr-2 h-4 w-4" />
                Create First Simulation
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {simulations.map((simulation) => (
            <Card key={simulation.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{simulation.scenario}</CardTitle>
                <CardDescription>
                  {formatDate(simulation.timestamp)} • {simulation.rounds} rounds
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {simulation.result && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {simulation.result}
                  </p>
                )}
                {simulation.notes && (
                  <div className="mt-2 p-2 bg-secondary rounded-md">
                    <p className="text-sm font-medium">Notes:</p>
                    <p className="text-sm text-muted-foreground">{simulation.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/simulations/${simulation.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimulationsList;
