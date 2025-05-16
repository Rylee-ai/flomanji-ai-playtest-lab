
import React, { useRef, useState } from "react";
import { SectionBadge } from "@/components/sections/SectionBadge";
import { Arcade } from "lucide-react";

/**
 * 1987-Inspired Arcade Game Card Gallery
 * Displays game cards with improved readability while maintaining arcade aesthetics
 */
export const GameCardGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right' | null>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollCards = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = direction === 'left' ? -10 : 10;
    scrollRef.current.scrollLeft += scrollAmount;
  };

  const handleMouseDown = (direction: 'left' | 'right') => {
    setIsScrolling(true);
    setScrollDirection(direction);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
    setScrollDirection(null);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  // Set up scrolling interval when isScrolling state changes
  React.useEffect(() => {
    if (isScrolling && scrollDirection) {
      scrollIntervalRef.current = setInterval(() => {
        scrollCards(scrollDirection);
      }, 10);
    } else if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, scrollDirection]);

  // Sample card data
  const cards = [
    { title: "Gator King", type: "Character", year: "1987", color: "from-green-600 to-cyan-700" },
    { title: "Beach Zombie", type: "Hazard", year: "1987", color: "from-red-600 to-yellow-600" },
    { title: "Neon Amulet", type: "Treasure", year: "1987", color: "from-pink-500 to-purple-700" },
    { title: "Miami Mall", type: "Location", year: "1987", color: "from-blue-600 to-cyan-600" },
    { title: "Flamingo Man", type: "NPC", year: "1987", color: "from-pink-500 to-red-700" },
    { title: "VHS Curse", type: "Chaos", year: "1987", color: "from-purple-700 to-violet-900" },
    { title: "Swamp Thing", type: "Enemy", year: "1987", color: "from-green-700 to-yellow-600" },
    { title: "Arcade Wizard", type: "Character", year: "1987", color: "from-blue-500 to-indigo-700" },
  ];

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Arcade grid background */}
      <div className="absolute inset-0 arcade-grid opacity-5"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side with badge and icon */}
          <div className="col-span-12 md:col-span-1 flex flex-col items-center">
            <SectionBadge number={5} color="cyan" />
          </div>

          {/* Content */}
          <div className="col-span-12 md:col-span-11">
            <div className="flex items-center mb-6">
              <Arcade className="text-cyan-400 h-8 w-8 mr-3" />
              <h2 className="text-2xl md:text-3xl readable-heading font-retro text-cyan-300">
                GAME CARDS
              </h2>
            </div>
            
            <p className="text-gray-200 max-w-2xl mb-8 readable-text">
              Collect unique cards inspired by 1987 Florida. Each card unlocks new abilities and challenges.
            </p>
            
            {/* Card Gallery with simplified arcade aesthetics */}
            <div className="relative">
              {/* Scroll Controls - more visible */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-10">
                <button 
                  className="w-10 h-10 bg-cyan-700 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-cyan-500"
                  onMouseDown={() => handleMouseDown('left')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  aria-label="Scroll left"
                >
                  &larr;
                </button>
              </div>
              
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                <button 
                  className="w-10 h-10 bg-cyan-700 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-cyan-500"
                  onMouseDown={() => handleMouseDown('right')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  aria-label="Scroll right"
                >
                  &rarr;
                </button>
              </div>
              
              {/* Scrollable Card Container */}
              <div 
                className="flex gap-6 pb-4 overflow-x-auto scrollbar-none scroll-smooth snap-x"
                ref={scrollRef}
                aria-label="Game card gallery"
              >
                {cards.map((card, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-48 snap-center transform hover:scale-105 transition-transform duration-300"
                  >
                    {/* Simplified Arcade Card Design */}
                    <div className="rounded-lg overflow-hidden border-4 border-white/20 h-64 shadow-xl relative arcade-border">
                      {/* Card Background - more solid for readability */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`}></div>
                      
                      {/* Card Content */}
                      <div className="relative p-3 flex flex-col h-full">
                        {/* Card header - improved contrast */}
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white">
                            {card.type}
                          </span>
                          <span className="text-xs font-mono text-white font-bold">
                            '{card.year.substring(2)}
                          </span>
                        </div>
                        
                        {/* Card Image Area */}
                        <div className="flex-1 flex items-center justify-center my-3">
                          {/* Placeholder for card image */}
                          <div className="w-32 h-32 bg-black/40 rounded flex items-center justify-center border border-white/20">
                            <span className="text-white text-xs font-retro">CARD ART</span>
                          </div>
                        </div>
                        
                        {/* Card Title - improved readability */}
                        <div className="text-center font-bold text-white text-lg mb-1 readable-heading">
                          {card.title}
                        </div>
                        
                        {/* Card Stats - improved contrast */}
                        <div className="flex justify-between text-xs text-white bg-black/40 rounded px-2 py-1">
                          <span>★★★☆☆</span>
                          <span className="font-mono">#{(index + 1).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-cyan-300 text-base font-retro">SCROLL TO VIEW MORE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
