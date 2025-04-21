
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TREASURE_CARDS } from "@/lib/cards/treasures";
import { 
  BookOpen, 
  Map, 
  Workflow, 
  Users, 
  Clock, 
  Sparkles, 
  Skull, 
  HeartPulse, 
  ShieldAlert, 
  User, 
  Shirt, 
  Zap 
} from "lucide-react";

export const GameSpecificationsSection = () => {
  const cardCategories = [
    { name: "Treasure & Artifacts", icon: <Sparkles className="h-6 w-6" /> },
    { name: "Missions", icon: <Map className="h-6 w-6" /> },
    { name: "Regions", icon: <Map className="h-6 w-6" /> },
    { name: "Hazards", icon: <ShieldAlert className="h-6 w-6" /> },
    { name: "Gear", icon: <Shirt className="h-6 w-6" /> },
    { name: "NPCs", icon: <User className="h-6 w-6" /> },
    { name: "Player Characters", icon: <Users className="h-6 w-6" /> },
    { name: "Secret Objectives", icon: <BookOpen className="h-6 w-6" /> },
    { name: "Chaos Cards", icon: <Zap className="h-6 w-6" /> },
    { name: "Automa", icon: <Workflow className="h-6 w-6" /> },
    { name: "Flomanjified", icon: <Sparkles className="h-6 w-6" /> },
    { name: "Boss Cards", icon: <Skull className="h-6 w-6" /> },
  ];

  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold mb-8">Game Specifications</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">2-6</h3>
            <p className="text-gray-400">Number of players supported per game session</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">30-60 min</h3>
            <p className="text-gray-400">Average playtime for a full game mission</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-lg border border-gray-800">
            <h3 className="text-lg font-bold mb-2">12+</h3>
            <p className="text-gray-400">Recommended player age for gameplay</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-6">Card Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {cardCategories.map((category, index) => (
            <div key={index} className="bg-gray-900 aspect-card rounded-lg border border-gray-800 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {category.icon}
              </div>
              <div className="p-3 border-t border-gray-800">
                <p className="text-sm font-medium">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
