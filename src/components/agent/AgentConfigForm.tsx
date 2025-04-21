
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentConfig, AgentRole } from '@/types';
import { RefreshCw } from 'lucide-react';

interface AgentConfigFormProps {
  configs: Record<string, AgentConfig>;
  onChange: (role: string, config: AgentConfig) => void;
  onSave: () => void;
  onReset: (role: AgentRole) => void;
  isLoading?: boolean;
}

const AgentConfigForm: React.FC<AgentConfigFormProps> = ({ 
  configs, 
  onChange, 
  onSave,
  onReset,
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState<string>("gm");
  
  const handleTemperatureChange = (role: string, value: number[]) => {
    onChange(role, { ...configs[role], temperature: value[0] });
  };

  const handleSystemPromptChange = (role: string, value: string) => {
    onChange(role, { ...configs[role], systemPrompt: value });
  };

  const handleResetClick = (role: AgentRole) => {
    onReset(role);
  };

  if (isLoading || !configs.gm || !configs.player || !configs.critic) {
    return (
      <Card className="col-span-full animate-pulse">
        <CardHeader>
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="gm">Game Master Agent</TabsTrigger>
        <TabsTrigger value="player">Player Agent</TabsTrigger>
        <TabsTrigger value="critic">Critic Agent</TabsTrigger>
      </TabsList>
      
      {/* Game Master Agent Tab */}
      <TabsContent value="gm">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Game Master Agent</CardTitle>
              <CardDescription>Configure how the GM runs the game</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetClick('GM')}
              title="Reset to default configuration"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gm-system-prompt">System Prompt</Label>
              <Textarea
                id="gm-system-prompt"
                className="min-h-[200px] font-mono text-sm"
                value={configs.gm.systemPrompt}
                onChange={(e) => handleSystemPromptChange('gm', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="gm-temperature">Temperature: {configs.gm.temperature.toFixed(1)}</Label>
              </div>
              <Slider
                id="gm-temperature"
                min={0}
                max={1}
                step={0.1}
                value={[configs.gm.temperature]}
                onValueChange={(value) => handleTemperatureChange('gm', value)}
              />
              <p className="text-xs text-muted-foreground">
                Lower values (0.0-0.3) for more consistent, rule-focused responses. Higher values (0.6-1.0) for more creative descriptions.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="gm-verbose"
                checked={configs.gm.verbose}
                onCheckedChange={(checked) => onChange('gm', { ...configs.gm, verbose: checked })}
              />
              <Label htmlFor="gm-verbose">Verbose Mode</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Player Agent Tab */}
      <TabsContent value="player">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Player Agent</CardTitle>
              <CardDescription>Configure AI-controlled player behavior</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetClick('Player')}
              title="Reset to default configuration"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-system-prompt">System Prompt</Label>
              <Textarea
                id="player-system-prompt"
                className="min-h-[200px] font-mono text-sm"
                value={configs.player.systemPrompt}
                onChange={(e) => handleSystemPromptChange('player', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="player-temperature">Temperature: {configs.player.temperature.toFixed(1)}</Label>
              </div>
              <Slider
                id="player-temperature"
                min={0}
                max={1}
                step={0.1}
                value={[configs.player.temperature]}
                onValueChange={(value) => handleTemperatureChange('player', value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="player-personality">Personality</Label>
              <Select
                value={configs.player.personality}
                onValueChange={(value) => onChange('player', { ...configs.player, personality: value })}
              >
                <SelectTrigger id="player-personality">
                  <SelectValue placeholder="Select a personality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cautious">Cautious</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="risky">Risk-Taker</SelectItem>
                  <SelectItem value="leader">Leader</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="player-skill">Skill Level</Label>
              <Select
                value={configs.player.skillLevel}
                onValueChange={(value) => onChange('player', { ...configs.player, skillLevel: value })}
              >
                <SelectTrigger id="player-skill">
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
                id="player-meta"
                checked={configs.player.meta || false}
                onCheckedChange={(checked) => onChange('player', { ...configs.player, meta: checked })}
              />
              <Label htmlFor="player-meta">Allow Meta Knowledge</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Critic Agent Tab */}
      <TabsContent value="critic">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Critic Agent</CardTitle>
              <CardDescription>Configure game analysis and feedback</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetClick('Critic')}
              title="Reset to default configuration"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="critic-system-prompt">System Prompt</Label>
              <Textarea
                id="critic-system-prompt"
                className="min-h-[200px] font-mono text-sm"
                value={configs.critic.systemPrompt}
                onChange={(e) => handleSystemPromptChange('critic', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="critic-temperature">Temperature: {configs.critic.temperature.toFixed(1)}</Label>
              </div>
              <Slider
                id="critic-temperature"
                min={0}
                max={1}
                step={0.1}
                value={[configs.critic.temperature]}
                onValueChange={(value) => handleTemperatureChange('critic', value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="critic-focus">Analysis Focus</Label>
              <Select
                value={configs.critic.focus}
                onValueChange={(value) => onChange('critic', { ...configs.critic, focus: value })}
              >
                <SelectTrigger id="critic-focus">
                  <SelectValue placeholder="Select focus area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rules">Rules Implementation</SelectItem>
                  <SelectItem value="balance">Game Balance</SelectItem>
                  <SelectItem value="player-experience">Player Experience</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="critic-detail">Detail Level</Label>
              <Select
                value={configs.critic.detail}
                onValueChange={(value) => onChange('critic', { ...configs.critic, detail: value })}
              >
                <SelectTrigger id="critic-detail">
                  <SelectValue placeholder="Select detail level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Brief Summary</SelectItem>
                  <SelectItem value="standard">Standard Analysis</SelectItem>
                  <SelectItem value="detailed">Detailed Breakdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="critic-suggestions"
                checked={configs.critic.suggestions || false}
                onCheckedChange={(checked) => onChange('critic', { ...configs.critic, suggestions: checked })}
              />
              <Label htmlFor="critic-suggestions">Include Improvement Suggestions</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AgentConfigForm;
