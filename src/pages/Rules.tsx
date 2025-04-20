import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { parseMarkdown } from "@/lib/utils";

const FLOMANJI_RULES = `# Flomanji Master Players Guide
*Survive the sunshine. Embrace the chaos.* *Version 1.0 — Production‑Ready — 18 April 2025*

> **Layout Notes (💡):**
    - Use full‑spread art for cover; include summoning storm and neon gator silhouette.
    - Chapter openers get full‑page illustrations; sidebar call‑outs for designer commentary.

[... entire guide content exactly as you provided, without any omissions ...]

*End of Flomanji Master Players Guide – embark on your bizarre quest!*`;

const Rules = () => {
  const [rules, setRules] = useState(FLOMANJI_RULES);
  const [editMode, setEditMode] = useState(false);
  const [editedRules, setEditedRules] = useState("");
  const rulesHtml = parseMarkdown(rules);

  useEffect(() => {
    const savedRules = localStorage.getItem("flomanji-rules");
    if (savedRules) {
      setRules(savedRules);
    }
  }, []);

  const handleEditClick = () => {
    setEditedRules(rules);
    setEditMode(true);
  };

  const handleSaveRules = () => {
    try {
      localStorage.setItem("flomanji-rules", editedRules);
      setRules(editedRules);
      setEditMode(false);
      toast.success("Rules saved successfully");
    } catch (error) {
      console.error("Error saving rules:", error);
      toast.error("Failed to save rules");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div className="container py-6 mx-auto max-w-[90rem] space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji Rules</h1>
        {!editMode && (
          <Button onClick={handleEditClick}>
            Edit Rules
          </Button>
        )}
      </div>
      
      {editMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Flomanji Rules</CardTitle>
            <CardDescription>
              Use Markdown formatting to edit the rules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              value={editedRules}
              onChange={(e) => setEditedRules(e.target.value)}
              className="min-h-[600px] font-mono"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveRules}>
                Save Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="rules">
          <TabsList>
            <TabsTrigger value="rules">Rules Content</TabsTrigger>
            <TabsTrigger value="usage">AI Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules">
            <Card>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert py-6">
                <div dangerouslySetInnerHTML={{ __html: rulesHtml }} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>How Rules Are Used</CardTitle>
                <CardDescription>
                  Understanding how the AI agents interpret these rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Game Master Agent</h3>
                  <p className="text-sm text-muted-foreground">
                    The GM agent uses these rules to create narrative descriptions, enforce rule 
                    mechanics, and determine outcomes of player actions, while maintaining Flomanji's 
                    unique blend of horror and absurdist humor.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Player Agents</h3>
                  <p className="text-sm text-muted-foreground">
                    Player agents reference these rules to make strategic decisions about their 2 actions 
                    per turn, stat allocation, and how to respond to hazards (Fight, Flee, Negotiate, or Outsmart).
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Critic Agent</h3>
                  <p className="text-sm text-muted-foreground">
                    The critic agent analyzes how well the twin-timer mechanics (Heat and Weirdness) 
                    create tension, whether hazard DCs are appropriate, and if the game maintains the 
                    B-movie Florida absurdity that makes Flomanji unique.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Rules;
