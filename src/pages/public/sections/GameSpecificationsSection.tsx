
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TREASURE_CARDS } from "@/lib/cards/treasures";

export const GameSpecificationsSection = () => {
  const displayCards = TREASURE_CARDS.slice(0, 12);

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
          {displayCards.map((card, i) => (
            <div key={i} className="bg-gray-900 aspect-card rounded-lg border border-gray-800 flex flex-col">
              <div className="flex-1"></div>
              <div className="p-3 border-t border-gray-800">
                <p className="text-sm font-medium">{card.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
