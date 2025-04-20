
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="container max-w-5xl py-6">
      <div className="mb-8 text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Flomanji AI Playtest Lab
        </h1>
        <p className="text-xl text-muted-foreground">
          Create, manage and test your Flomanji game scenarios with AI
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>New Simulation</CardTitle>
            <CardDescription>
              Create a new playtest simulation with AI players
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <p className="text-muted-foreground mb-4">
              Set up a new game with your choice of characters, scenarios, and AI settings
            </p>
            <Button asChild className="mt-auto">
              <Link to="/simulations/new">
                <Sparkles className="mr-2 h-4 w-4" />
                Create Simulation
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
            <CardDescription>
              Browse and edit game content
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <p className="text-muted-foreground mb-4">
              View and manage cards, characters, scenarios and other game elements
            </p>
            <Button asChild variant="outline" className="mt-auto">
              <Link to="/content">
                View Content
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your AI playtest settings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <p className="text-muted-foreground mb-4">
              Adjust your OpenRouter API keys, model selection, and other settings
            </p>
            <Button asChild variant="outline" className="mt-auto">
              <Link to="/settings">
                Configure Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
