
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { startSimulation, getExampleRules } from "@/lib/api";
import { SimulationConfig } from "@/types";
import { toast } from "@/components/ui/sonner";

const NewSimulation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<SimulationConfig>({
    scenarioPrompt: "The players arrive at a mysterious jungle temple surrounded by dense foliage. They need to find a way inside while avoiding traps.",
    rounds: 5,
    players: 1,
    enableCritic: true,
    outputMode: "full"
  });

  const handleInputChange = (field: keyof SimulationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const runSimulation = async () => {
    try {
      setIsLoading(true);
      // Load rules content (in production this would come from CMS)
      const rulesContent = getExampleRules();

      // Check if OpenAI API key is set
      if (!localStorage.getItem("openai-api-key")) {
        toast.error("Please set your OpenAI API key in Settings first");
        setIsLoading(false);
        return;
      }

      // Start the simulation
      const result = await startSimulation(config, rulesContent);
      setIsLoading(false);
      
      // Navigate to the simulation details page
      toast.success("Simulation completed successfully");
      navigate(`/simulations/${result.id}`);
    } catch (error) {
      console.error("Simulation failed:", error);
      toast.error(`Simulation failed: ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Simulation</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Simulation Configuration</CardTitle>
          <CardDescription>
            Set up the parameters for your AI-powered playtest session
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scenario">Scenario Prompt</Label>
            <Textarea 
              id="scenario"
              value={config.scenarioPrompt}
              onChange={(e) => handleInputChange("scenarioPrompt", e.target.value)}
              placeholder="Describe the scenario or starting situation..."
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Describe the initial scenario, setting, or specific test case you want to simulate.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rounds">Number of Rounds: {config.rounds}</Label>
            <Slider
              id="rounds"
              defaultValue={[config.rounds]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => handleInputChange("rounds", value[0])}
            />
            <p className="text-sm text-muted-foreground">
              How many interaction rounds to simulate (1-10).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="players">Number of Players: {config.players}</Label>
            <Slider
              id="players"
              defaultValue={[config.players]}
              min={1}
              max={4}
              step={1}
              onValueChange={(value) => handleInputChange("players", value[0])}
            />
            <p className="text-sm text-muted-foreground">
              How many AI player characters to simulate (1-4).
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="critic">Enable Critic</Label>
              <p className="text-sm text-muted-foreground">
                Include AI critic feedback at the end of the simulation.
              </p>
            </div>
            <Switch
              id="critic"
              checked={config.enableCritic}
              onCheckedChange={(checked) => handleInputChange("enableCritic", checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={runSimulation} disabled={isLoading || !config.scenarioPrompt}>
            {isLoading ? "Running Simulation..." : "Start Simulation"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
          <CardDescription>
            Fine-tune the simulation parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="outputMode">Output Mode</Label>
            <select
              id="outputMode"
              value={config.outputMode}
              onChange={(e) => handleInputChange("outputMode", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="full">Full (Complete dialogue)</option>
              <option value="narrative-only">Narrative Only (GM summarizes)</option>
              <option value="minimal">Minimal (Core outcomes only)</option>
            </select>
            <p className="text-sm text-muted-foreground">
              How detailed you want the simulation output to be.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewSimulation;
