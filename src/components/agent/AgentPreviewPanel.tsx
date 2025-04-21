
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsContext } from './TabsProvider';
import { AgentRole } from '@/types';

const AgentPreviewPanel = ({ configs }) => {
  const [activeAgentTab, setActiveAgentTab] = React.useState<AgentRole>("GM");
  
  const renderPreview = (role: AgentRole) => {
    const config = configs[role.toLowerCase()];
    if (!config) return null;
    
    return (
      <div className="space-y-4">
        <div className="rounded-md bg-secondary/50 p-4 font-mono text-sm">
          <p className="text-xs text-muted-foreground mb-2">System Prompt:</p>
          <div className="whitespace-pre-wrap">{config.systemPrompt}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Temperature:</p>
            <p>{config.temperature}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Verbose Mode:</p>
            <p>{config.verbose ? "Enabled" : "Disabled"}</p>
          </div>
          
          {role === "Player" && (
            <>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Personality:</p>
                <p className="capitalize">{config.personality || "Balanced"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Skill Level:</p>
                <p className="capitalize">{config.skillLevel || "Intermediate"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Meta-Knowledge:</p>
                <p>{config.meta ? "Enabled" : "Disabled"}</p>
              </div>
            </>
          )}
          
          {role === "Critic" && (
            <>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Focus Area:</p>
                <p className="capitalize">{config.focus || "Player Experience"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Detail Level:</p>
                <p className="capitalize">{config.detail || "Standard"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Suggestions:</p>
                <p>{config.suggestions ? "Included" : "Not Included"}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Preview</CardTitle>
        <CardDescription>
          Review how your agents will behave during gameplay
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeAgentTab} onValueChange={setActiveAgentTab}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="GM">Game Master</TabsTrigger>
            <TabsTrigger value="Player">Player</TabsTrigger>
            <TabsTrigger value="Critic">Critic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="GM" className="space-y-4">
            {renderPreview("GM")}
          </TabsContent>
          
          <TabsContent value="Player" className="space-y-4">
            {renderPreview("Player")}
          </TabsContent>
          
          <TabsContent value="Critic" className="space-y-4">
            {renderPreview("Critic")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentPreviewPanel;
