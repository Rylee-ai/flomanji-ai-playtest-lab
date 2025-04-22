
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, BookOpen, Settings } from "lucide-react";
import { getExampleRules, getSimulationSummaries } from "@/lib/api";
import { parseMarkdown } from "@/lib/utils";
import { SimulationSummary } from "@/types";
import { formatDate } from "@/lib/utils";

const Dashboard = () => {
  const [simulations, setSimulations] = useState<SimulationSummary[]>([]);
  const [rulesPreview, setRulesPreview] = useState<string>("");
  const [isLoadingRules, setIsLoadingRules] = useState(true);

  useEffect(() => {
    // Load simulations
    const loadedSimulations = getSimulationSummaries();
    setSimulations(loadedSimulations);
    
    // Load rules preview
    const loadRulesPreview = async () => {
      try {
        setIsLoadingRules(true);
        const rules = await getExampleRules();
        const preview = rules.substring(0, 200) + "...";
        setRulesPreview(parseMarkdown(preview));
      } catch (error) {
        console.error("Error loading rules preview:", error);
      } finally {
        setIsLoadingRules(false);
      }
    };
    
    loadRulesPreview();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flonaki AI Playtest Lab</h1>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Gamepad2 className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Run Simulation</CardTitle>
            <CardDescription>
              Start a new AI-driven playtest session
            </CardDescription>
          </CardHeader>
          <CardContent>
            Use OpenAI to simulate a game master, players, and a critic to run a complete game session
            based on the current rules.
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/simulations/new">
                New Simulation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Game Rules</CardTitle>
            <CardDescription>
              View and edit game rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingRules ? (
              <p className="text-sm text-muted-foreground">Loading rules...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: rulesPreview }} className="text-sm text-muted-foreground prose prose-sm max-h-24 overflow-hidden" />
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/rules">
                View Rules <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Settings className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your OpenAI API key
            </CardDescription>
          </CardHeader>
          <CardContent>
            Set up the connection to OpenAI for simulation and customize the application behavior.
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/settings">
                Settings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Simulations</CardTitle>
          <CardDescription>
            View your most recent playtest sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {simulations.length > 0 ? (
            <div className="space-y-4">
              {simulations.slice(0, 3).map((simulation) => (
                <div key={simulation.id} className="p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-300">{simulation.scenario}</h3>
                    <span className="text-xs text-gray-500">{formatDate(simulation.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{simulation.result}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No simulations yet. Start your first simulation to see it here.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/simulations">
              View All Simulations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
