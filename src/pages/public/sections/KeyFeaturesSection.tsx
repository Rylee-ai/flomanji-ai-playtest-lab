
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Map, Plus } from "lucide-react";

export const KeyFeaturesSection = () => (
  <section className="py-16 bg-black">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <Badge variant="outline" className="mr-2 bg-amber-500/10 text-amber-400 border-amber-500/20">2</Badge>
        <h2 className="text-2xl font-bold">Key Features</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <Zap className="h-8 w-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">AI Game Master</h3>
            <p className="text-gray-400 text-sm">
              Dynamic storytelling powered by AI that adapts to your choices and creates unique gameplay experiences.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Risk Management</h3>
            <p className="text-gray-400 text-sm">
              Balance heat levels, resources, and strategy to survive the increasingly chaotic environment.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <Map className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Mission System</h3>
            <p className="text-gray-400 text-sm">
              Complete unique objectives while exploring distinctive regions with special challenges.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <Plus className="h-8 w-8 text-red-500 mb-4" />
            <h3 className="text-lg font-bold mb-2">Flomanjified Cards</h3>
            <p className="text-gray-400 text-sm">
              Encounter bizarre paradise-themed hazards, characters and treasures with unique abilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
