
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentRole } from "@/types";

// Configuration form for GM, Player, and Critic agents
const AgentConfigForm = ({ 
  configs, 
  onChange, 
  onSave 
}) => {
  const [activeAgentTab, setActiveAgentTab] = useState<AgentRole>("GM");
  
  const handleSystemPromptChange = (value: string) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      systemPrompt: value
    });
  };
  
  const handleTemperatureChange = (value: number[]) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      temperature: value[0]
    });
  };
  
  const handleVerboseChange = (checked: boolean) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      verbose: checked
    });
  };
  
  const handlePersonalityChange = (value: string) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      personality: value
    });
  };
  
  const handleSkillLevelChange = (value: string) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      skillLevel: value
    });
  };
  
  const handleFocusChange = (value: string) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      focus: value
    });
  };
  
  const handleDetailChange = (value: string) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      detail: value
    });
  };
  
  const handleMetaChange = (checked: boolean) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      meta: checked
    });
  };
  
  const handleSuggestionsChange = (checked: boolean) => {
    onChange(activeAgentTab.toLowerCase(), {
      ...configs[activeAgentTab.toLowerCase()],
      suggestions: checked
    });
  };
  
  const config = configs[activeAgentTab.toLowerCase()];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Configuration</CardTitle>
        <CardDescription>
          Configure the AI agents for your Flomanji game sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeAgentTab} onValueChange={setActiveAgentTab} className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="GM">Game Master</TabsTrigger>
            <TabsTrigger value="Player">Player</TabsTrigger>
            <TabsTrigger value="Critic">Critic</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeAgentTab} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">System Prompt</Label>
                <Textarea 
                  value={config?.systemPrompt || ""}
                  onChange={(e) => handleSystemPromptChange(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Enter the system prompt for this agent"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="mb-2 block">Temperature: {config?.temperature.toFixed(2)}</Label>
                <Slider 
                  value={[config?.temperature || 0.7]} 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleTemperatureChange}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values (0.2-0.5) produce more predictable responses, higher values (0.7-1.0) create more creative variety.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={config?.verbose || false} 
                  onCheckedChange={handleVerboseChange}
                  id="verbose-mode"
                />
                <Label htmlFor="verbose-mode">Verbose Mode</Label>
              </div>
              
              {activeAgentTab === "Player" && (
                <>
                  <div className="space-y-2">
                    <Label className="mb-1 block">Personality</Label>
                    <Select 
                      value={config?.personality || "balanced"} 
                      onValueChange={handlePersonalityChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cautious">Cautious</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="reckless">Reckless</SelectItem>
                        <SelectItem value="analytical">Analytical</SelectItem>
                        <SelectItem value="impulsive">Impulsive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="mb-1 block">Skill Level</Label>
                    <Select 
                      value={config?.skillLevel || "intermediate"} 
                      onValueChange={handleSkillLevelChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={config?.meta || false} 
                      onCheckedChange={handleMetaChange}
                      id="meta-knowledge"
                    />
                    <Label htmlFor="meta-knowledge">Meta-Knowledge</Label>
                  </div>
                </>
              )}
              
              {activeAgentTab === "Critic" && (
                <>
                  <div className="space-y-2">
                    <Label className="mb-1 block">Focus Area</Label>
                    <Select 
                      value={config?.focus || "player-experience"} 
                      onValueChange={handleFocusChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select focus area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rules-accuracy">Rules Accuracy</SelectItem>
                        <SelectItem value="player-experience">Player Experience</SelectItem>
                        <SelectItem value="game-balance">Game Balance</SelectItem>
                        <SelectItem value="narrative">Narrative Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="mb-1 block">Detail Level</Label>
                    <Select 
                      value={config?.detail || "standard"} 
                      onValueChange={handleDetailChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brief">Brief</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={config?.suggestions || false} 
                      onCheckedChange={handleSuggestionsChange}
                      id="include-suggestions"
                    />
                    <Label htmlFor="include-suggestions">Include Improvement Suggestions</Label>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentConfigForm;
