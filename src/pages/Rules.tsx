
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getExampleRules } from "@/lib/api";
import { parseMarkdown } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";

const Rules = () => {
  const rules = getExampleRules();
  const rulesHtml = parseMarkdown(rules);

  const handleEditClick = () => {
    toast.info("In a production environment, this would open the Decap CMS interface for rule editing");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Game Rules</h1>
        <Button onClick={handleEditClick}>
          Edit Rules
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Flomanji Rules Guide</CardTitle>
          <CardDescription>
            These rules are used by AI agents during simulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: rulesHtml }} />
          </div>
        </CardContent>
      </Card>

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
              mechanics, and determine outcomes of player actions.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Player Agents</h3>
            <p className="text-sm text-muted-foreground">
              Player agents reference these rules to make strategic decisions and understand 
              what actions are available to them.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Critic Agent</h3>
            <p className="text-sm text-muted-foreground">
              The critic agent analyzes gameplay against these rules to provide feedback on 
              game balance, rule clarity, and player experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
