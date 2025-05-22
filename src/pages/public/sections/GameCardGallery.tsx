
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Gamepad2 } from "lucide-react"; // Changed from Arcade to Gamepad2

const GameCardGallery = () => {
  // Sample card data
  const cards = [
    {
      id: 1,
      name: "Alligator Ally",
      type: "Region",
      description: "A treacherous swamp filled with reptilian dangers.",
      image: null,
    },
    {
      id: 2,
      name: "Flamingo Flyer",
      type: "Character",
      description: "The fastest bird in the Everglades, known for delivering messages.",
      image: null,
    },
    {
      id: 3,
      name: "Neon Compass",
      type: "Gear",
      description: "A glowing compass that points to the nearest treasure, powered by AAA batteries.",
      image: null,
    },
    {
      id: 4,
      name: "Mall Mayhem",
      type: "Mission",
      description: "Navigate the abandoned shopping mall without triggering the security system.",
      image: null,
    },
  ];

  return (
    <section className="py-10 bg-black relative overflow-hidden arcade-bg">
      <div className="container mx-auto px-4">
        {/* Section Header with Arcade Icon */}
        <div className="flex items-center justify-center mb-8 arcade-text-container">
          <Gamepad2 className="h-8 w-8 text-green-400 mr-3" />
          <h2 className="text-3xl font-bold text-center text-white arcade-text glow-green">
            Game Cards Collection
          </h2>
        </div>
        
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10 arcade-font">
          Explore the cards that await you in the weird world of 1987 Florida. Each one tells a story of adventure, danger, and the unexplained.
        </p>

        {/* Card Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden border-2 border-green-500 arcade-card hover:scale-105 transition-transform"
            >
              {/* Card Image */}
              <div className="relative bg-gray-700">
                <AspectRatio ratio={1/1} className="bg-black/50 arcade-screen-effect">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-green-400 arcade-font text-center px-4">
                      [{card.name}]
                    </p>
                  </div>
                </AspectRatio>
                <div className="absolute top-2 right-2 bg-black/70 text-green-400 text-xs px-2 py-1 rounded arcade-font">
                  {card.type}
                </div>
              </div>
              
              {/* Card Info */}
              <div className="p-4">
                <h3 className="text-green-400 font-bold mb-2 arcade-text">
                  {card.name}
                </h3>
                <p className="text-gray-300 text-sm arcade-font leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <Button 
            variant="outline"
            className="arcade-button border-green-500 text-green-400 hover:bg-green-900/30"
          >
            <Gamepad2 className="mr-2 h-4 w-4" />
            View Complete Card Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GameCardGallery;
