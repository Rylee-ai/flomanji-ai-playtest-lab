
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
    const loadedSimulations = getSimulationSummaries();
    setSimulations(loadedSimulations);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-amber-400">Simulations</h1>
        <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
          <Link to="/simulations/new">
            <Plus className="mr-2 h-4 w-4" />
            New Simulation
          </Link>
        </Button>
      </div>
      
      {simulations.length === 0 ? (
        <Card className="border-gray-800 bg-black/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-center text-gray-400 mb-4">
              No simulations yet. Start your first simulation to see it here.
            </p>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
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
            <Card key={simulation.id} className="border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-gray-900/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-amber-400">{simulation.scenario}</CardTitle>
                <CardDescription className="text-gray-400">
                  {formatDate(simulation.timestamp)} • {simulation.rounds} rounds
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {simulation.result && (
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {simulation.result}
                  </p>
                )}
                {simulation.notes && (
                  <div className="mt-2 p-2 bg-gray-900/50 rounded-md border border-gray-800">
                    <p className="text-sm font-medium text-gray-300">Notes:</p>
                    <p className="text-sm text-gray-400">{simulation.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-amber-400">
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
