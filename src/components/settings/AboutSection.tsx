
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Flonaki AI Playtest Lab</CardTitle>
        <CardDescription>
          Version information and resources
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">Version</h3>
          <p className="text-sm text-muted-foreground">1.0.0</p>
        </div>
        <div>
          <h3 className="font-medium">Powered By</h3>
          <p className="text-sm text-muted-foreground">OpenRouter, React, TailwindCSS, and Netlify</p>
        </div>
      </CardContent>
    </Card>
  );
};
