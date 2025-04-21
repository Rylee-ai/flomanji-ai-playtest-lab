
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { getOpenRouterModel } from "@/lib/openrouter";
import { useAgentConfig } from "@/hooks/useAgentConfig";
import { Loader2 } from "lucide-react";
import { AgentRole } from "@/types";

const AgentManager = () => {
  const [activeTab, setActiveTab] = useState<"gm" | "player" | "critic">("gm");
  const [llmModel, setLlmModel] = useState<string>("");
  const { configs, isLoading, isSaving, saveAgentConfig, testAgentResponse } = useAgentConfig();
  
  // Local state for form values
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [verbose, setVerbose] = useState(true);
  const [personality, setPersonality] = useState("balanced");
  const [skillLevel, setSkillLevel] = useState("intermediate");
  const [allowMeta, setAllowMeta] = useState(false);
  const [focus, setFocus] = useState("player-experience");
  const [detailLevel, setDetailLevel] = useState("standard");
  const [includeSuggestions, setIncludeSuggestions] = useState(true);
  
  // State for test prompt and response
  const [testPrompt, setTestPrompt] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const model = await getOpenRouterModel();
        setLlmModel(model);
      } catch (error) {
        console.error("Failed to fetch LLM model:", error);
      }
    };
    fetchModel();
  }, []);

  // Update form values when tab changes or configs load
  useEffect(() => {
    if (!isLoading) {
      const currentConfig = configs[activeTab];
      setSystemPrompt(currentConfig.systemPrompt || "");
      setTemperature(currentConfig.temperature || 0.7);
      
      // Update role-specific state
      if (activeTab === "gm") {
        setVerbose(currentConfig.verbose || false);
      } else if (activeTab === "player") {
        setPersonality(currentConfig.personality || "balanced");
        setSkillLevel(currentConfig.skillLevel || "intermediate");
        setAllowMeta(currentConfig.meta || false);
      } else if (activeTab === "critic") {
        setFocus(currentConfig.focus || "player-experience");
        setDetailLevel(currentConfig.detail || "standard");
        setIncludeSuggestions(currentConfig.suggestions || true);
      }
      
      // Clear test responses when switching tabs
      setTestPrompt("");
      setTestResponse("");
    }
  }, [activeTab, configs, isLoading]);

  const handleSavePrompt = async () => {
    const config = {
      systemPrompt,
      temperature,
      ...(activeTab === "gm" && { verbose }),
      ...(activeTab === "player" && { 
        personality, 
        skillLevel,
        meta: allowMeta
      }),
      ...(activeTab === "critic" && { 
        focus, 
        detail: detailLevel,
        suggestions: includeSuggestions
      }),
    };
    
    const success = await saveAgentConfig(activeTab.toUpperCase() as AgentRole, config);
    
    if (success) {
      toast.success(`${activeTab.toUpperCase()} prompt updated successfully`);
    } else {
      toast.error(`Failed to update ${activeTab.toUpperCase()} prompt`);
    }
  };

  const handleTestResponse = async () => {
    if (!testPrompt.trim()) {
      toast.error("Please enter a prompt to test");
      return;
    }
    
    try {
      setIsTesting(true);
      setTestResponse("");
      
      const response = await testAgentResponse(activeTab.toUpperCase() as AgentRole, testPrompt);
      setTestResponse(response);
    } catch (error) {
      console.error("Test response failed:", error);
      toast.error("Failed to get test response");
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6 mx-auto space-y-6 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading agent configurations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 mx-auto space-y-6">
      <div className="flex flex-col border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">AI Agent Manager</h1>
        <div className="text-sm text-muted-foreground mt-1">
          Configure and test the AI agents that power Flomanji simulations
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "gm" | "player" | "critic")} className="w-full">
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
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Current LLM Model: <span className="font-mono">{llmModel || "Loading..."}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gm-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="gm-system-prompt" 
                    rows={10}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Temperature explanation */}
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p className="font-medium mb-1">About Temperature</p>
                    <p className="text-muted-foreground">
                      Lower values (0.1-0.5) make responses more consistent and rule-following.
                      Higher values (0.6-1.0) lead to more creative and varied responses.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="gm-verbose" 
                    checked={verbose}
                    onCheckedChange={setVerbose}
                  />
                  <Label htmlFor="gm-verbose">Verbose Mode (Include detailed rule explanations)</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePrompt} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save GM Configuration
                </Button>
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
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                />
              </div>

              {testResponse && (
                <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {testResponse}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleTestResponse} disabled={isTesting}>
                  {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Test Response
                </Button>
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
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Current LLM Model: <span className="font-mono">{llmModel || "Loading..."}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="player-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="player-system-prompt" 
                    rows={10}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="player-temperature">Temperature: {temperature.toFixed(1)}</Label>
                    <Slider 
                      id="player-temperature"
                      min={0} 
                      max={1} 
                      step={0.1} 
                      value={[temperature]} 
                      onValueChange={(values) => setTemperature(values[0])} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="player-personality">Player Personality</Label>
                    <select 
                      id="player-personality" 
                      className="w-full p-2 border rounded"
                      value={personality}
                      onChange={(e) => setPersonality(e.target.value)}
                    >
                      <option value="cautious">Cautious</option>
                      <option value="balanced">Balanced</option>
                      <option value="reckless">Reckless</option>
                      <option value="teamwork">Team-focused</option>
                      <option value="selfish">Self-preserving</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="player-skill">Player Skill Level</Label>
                    <select 
                      id="player-skill" 
                      className="w-full p-2 border rounded"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="player-meta" 
                    checked={allowMeta}
                    onCheckedChange={setAllowMeta}
                  />
                  <Label htmlFor="player-meta">Allow Meta-gaming (Use knowledge of game mechanics)</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePrompt} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Player Configuration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Player Agent</CardTitle>
              <CardDescription>
                Test how your AI player would respond to a game scenario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="player-test-prompt">Game Scenario</Label>
                <Textarea 
                  id="player-test-prompt" 
                  placeholder="Enter a game scenario to test the player's response..."
                  rows={3}
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                />
              </div>

              {testResponse && (
                <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {testResponse}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleTestResponse} disabled={isTesting}>
                  {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Test Response
                </Button>
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
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Current LLM Model: <span className="font-mono">{llmModel || "Loading..."}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="critic-system-prompt">System Prompt</Label>
                  <Textarea 
                    id="critic-system-prompt" 
                    rows={10}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="critic-temperature">Temperature: {temperature.toFixed(1)}</Label>
                    <Slider 
                      id="critic-temperature"
                      min={0} 
                      max={1} 
                      step={0.1} 
                      value={[temperature]} 
                      onValueChange={(values) => setTemperature(values[0])} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="critic-focus">Analysis Focus</Label>
                    <select 
                      id="critic-focus" 
                      className="w-full p-2 border rounded"
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                    >
                      <option value="balance">Game Balance</option>
                      <option value="player-experience">Player Experience</option>
                      <option value="rules-adherence">Rules Adherence</option>
                      <option value="gm-quality">GM Quality</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="critic-detail">Detail Level</Label>
                    <select 
                      id="critic-detail" 
                      className="w-full p-2 border rounded"
                      value={detailLevel}
                      onChange={(e) => setDetailLevel(e.target.value)}
                    >
                      <option value="summary">Brief Summary</option>
                      <option value="standard">Standard Analysis</option>
                      <option value="detailed">Detailed Breakdown</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="critic-suggestions" 
                    checked={includeSuggestions}
                    onCheckedChange={setIncludeSuggestions}
                  />
                  <Label htmlFor="critic-suggestions">Include Improvement Suggestions</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePrompt} disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Critic Configuration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Critic Agent</CardTitle>
              <CardDescription>
                Test how your critic would analyze a game session summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="critic-test-prompt">Game Session Summary</Label>
                <Textarea 
                  id="critic-test-prompt" 
                  placeholder="Enter a game session summary to test the critic's analysis..."
                  rows={3}
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                />
              </div>

              {testResponse && (
                <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {testResponse}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleTestResponse} disabled={isTesting}>
                  {isTesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Test Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentManager;
