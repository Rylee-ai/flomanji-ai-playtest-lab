
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const GameOverviewSection = () => {
  // Feature cards data
  const features = [
    {
      title: "Strategic Deck Building",
      description: "Your card choices and creates unique gameplay experiences."
    },
    {
      title: "Resource Management",
      description: "Balance your resources, and strategy to survive the increasingly chaotic environment."
    },
    {
      title: "Challenging Missions",
      description: "Complete exciting scenarios with special challenges."
    },
    {
      title: "Immersive World",
      description: "Explore paradise-themed hazards, characters and treasures with unique abilities."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Gear Up, Get Weird, Get Out
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Get ready for an adventure where danger is just the beginning. Every game tells a story, every
          decision matters in this strategic survival experience.
        </p>
      </div>

      {/* Feature cards in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gray-900/80 border border-gray-800 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                {/* Green indicator line at top */}
                <div className="w-12 h-1 bg-green-500 mb-4"></div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gameplay details button */}
      <div className="text-center mt-12">
        <a 
          href="/gameplay" 
          className="text-amber-400 hover:text-amber-300 text-lg font-medium inline-flex items-center gap-2 hover:underline"
        >
          Explore Gameplay Details →
        </a>
      </div>
    </div>
  );
};
