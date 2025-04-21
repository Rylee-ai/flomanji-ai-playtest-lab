
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const AgentManager = () => {
  const [activeTab, setActiveTab] = useState("gm");
  const [temperature, setTemperature] = useState(0.7);
  
  const handleSavePrompt = (role: string) => {
    toast.success(`${role} prompt updated successfully`);
  };

  return (
    <div className="container py-6 mx-auto space-y-6">
      <div className="flex flex-col border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Agent Manager</h1>
        <div className="text-sm text-muted-foreground mt-1">
          Configure and test the AI agents that power Flomanji simulations
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="gm">Game Master</TabsTrigger>
          <TabsTrigger value="player">Player Character</TabsTrigger>
          <TabsTrigger value="critic">Critic</TabsTrigger>
        </TabsList>

        <TabsContent value="gm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Game Master Agent Configuration</CardTitle>
              <CardDescription>
                Configure how the GM presents scenarios, manages game state, and responds to player actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gm-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="gm-system-prompt" 
                    rows={10}
                    defaultValue={`You are the Game Master for Flomanji, a semi-cooperative survival horror card-and-dice adventure game set in a heightened 1987 Florida.

Your role is to facilitate play, describe the environment, narrate outcomes, and enforce rules. 
Make the game challenging but fair, and create a cinematic B-movie horror-comedy atmosphere.`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gm-temperature">Temperature: {temperature.toFixed(1)}</Label>
                    <Slider 
                      id="gm-temperature"
                      min={0} 
                      max={1} 
                      step={0.1} 
                      value={[temperature]} 
                      onValueChange={(values) => setTemperature(values[0])} 
                    />
                  </div>

                  {/* Removed LLM model selector to use centralized setting */}

                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="gm-verbose" defaultChecked />
                  <Label htmlFor="gm-verbose">Verbose Mode (Include detailed rule explanations)</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSavePrompt("GM")}>Save GM Configuration</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Game Master</CardTitle>
              <CardDescription>
                Test your GM's responses to player actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="test-prompt">Player Action</Label>
                <Textarea 
                  id="test-prompt" 
                  placeholder="Enter a player action to test the GM's response..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button>Test Response</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="player" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Player Agent Configuration</CardTitle>
              <CardDescription>
                Configure how AI players make decisions and respond to game events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="player-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="player-system-prompt" 
                    rows={10}
                    defaultValue={`You are a Player in Flomanji, controlling a survivor in a semi-cooperative adventure set in a heightened 1987 Florida filled with supernatural threats.

You have the following responsibilities:
1. Make decisions based on your character's stats and abilities
2. Use your special ability strategically
3. Manage your Health, Weirdness, and Luck effectively`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="player-personality">Player Personality</Label>
                    <select id="player-personality" className="w-full p-2 border rounded">
                      <option value="cautious">Cautious</option>
                      <option value="balanced" selected>Balanced</option>
                      <option value="reckless">Reckless</option>
                      <option value="teamwork">Team-focused</option>
                      <option value="selfish">Self-preserving</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="player-skill">Player Skill Level</Label>
                    <select id="player-skill" className="w-full p-2 border rounded">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate" selected>Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="player-meta" />
                  <Label htmlFor="player-meta">Allow Meta-gaming (Use knowledge of game mechanics)</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSavePrompt("Player")}>Save Player Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Critic Agent Configuration</CardTitle>
              <CardDescription>
                Configure how the critic analyzes and provides feedback on game sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="critic-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="critic-system-prompt" 
                    rows={10}
                    defaultValue={`You are a Critic AI analyzing a playtest session of Flomanji, a semi-cooperative survival horror card-and-dice adventure game.

Analyze the gameplay session objectively and provide feedback on:

1. Rules Implementation
2. Game Balance
3. Player Experience
4. Design Improvement Opportunities`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="critic-focus">Analysis Focus</Label>
                    <select id="critic-focus" className="w-full p-2 border rounded">
                      <option value="balance">Game Balance</option>
                      <option value="player-experience" selected>Player Experience</option>
                      <option value="rules-adherence">Rules Adherence</option>
                      <option value="gm-quality">GM Quality</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="critic-detail">Detail Level</Label>
                    <select id="critic-detail" className="w-full p-2 border rounded">
                      <option value="summary">Brief Summary</option>
                      <option value="standard" selected>Standard Analysis</option>
                      <option value="detailed">Detailed Breakdown</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="critic-suggestions" defaultChecked />
                  <Label htmlFor="critic-suggestions">Include Improvement Suggestions</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSavePrompt("Critic")}>Save Critic Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentManager;
