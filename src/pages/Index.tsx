
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("Index page mounting");
    
    try {
      // Basic initialization - simulate checking for critical resources
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error initializing Index page:", error);
      setHasError(true);
      setIsLoading(false);
    }
    
    return () => {
      console.log("Index page unmounting");
    };
  }, []);

  // Error state
  if (hasError) {
    return (
      <div className="container max-w-5xl py-6">
        <div className="p-4 mb-4 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            We encountered an error while loading the Flomanji AI Playtest Lab.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container max-w-5xl py-6 flex justify-center items-center" style={{ minHeight: "70vh" }}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Flomanji AI Playtest Lab...</p>
        </div>
      </div>
    );
  }

  // Normal content
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
