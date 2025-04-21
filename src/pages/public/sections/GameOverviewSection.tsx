
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const GameOverviewSection = () => (
  <section className="py-16 bg-gray-950">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">1</Badge>
        <h2 className="text-2xl font-bold">Game Overview</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4">Paradise's Craziest Card Game</h3>
            <p className="text-gray-400 mb-4">
              Flomanji combines deck-building mechanics with survival storytelling as players navigate through exotic environments, encountering bizarre hazards, eccentric characters, and unexpected treasures.
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Now in development</span>
              <Link to="/about" className="text-amber-400 flex items-center">
                Learn more <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-800/30">
            <h4 className="font-medium mb-2">Deck Building</h4>
            <Badge className="bg-amber-600">Core Mechanic</Badge>
          </div>
          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
            <h4 className="font-medium mb-2">Heat System</h4>
            <Badge className="bg-blue-600">Core Mechanic</Badge>
          </div>
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
            <h4 className="font-medium mb-2">Character Abilities</h4>
            <Badge className="bg-green-600">Core Mechanic</Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
);
