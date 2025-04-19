
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, BookOpen, Settings } from "lucide-react";
import { getExampleRules } from "@/lib/api";
import { parseMarkdown } from "@/lib/utils";

const Dashboard = () => {
  const rules = getExampleRules();
  const rulesHtml = parseMarkdown(rules.substring(0, 200) + "...");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji AI Playtest Lab</h1>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Gamepad2 className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Run Simulation</CardTitle>
            <CardDescription>
              Start a new AI-driven playtest session
            </CardDescription>
          </CardHeader>
          <CardContent>
            Use OpenAI to simulate a game master, players, and a critic to run a complete game session
            based on the current rules.
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/simulations/new">
                New Simulation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Game Rules</CardTitle>
            <CardDescription>
              View and edit game rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: rulesHtml }} className="text-sm text-muted-foreground prose prose-sm max-h-24 overflow-hidden" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/rules">
                View Rules <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Settings className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your OpenAI API key
            </CardDescription>
          </CardHeader>
          <CardContent>
            Set up the connection to OpenAI for simulation and customize the application behavior.
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link to="/settings">
                Settings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Simulations</CardTitle>
          <CardDescription>
            View your most recent playtest sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-12">
            No simulations yet. Start your first simulation to see it here.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/simulations">
              View All Simulations <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
