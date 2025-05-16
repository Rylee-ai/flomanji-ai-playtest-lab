
import React, { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/sections/SectionBadge";

/**
 * 1987-Inspired Game Card Gallery Section
 * Displays a horizontal scrolling gallery of game cards with 80s aesthetics
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

  useEffect(() => {
    if (isScrolling && scrollDirection) {
      // Set up interval for smooth scrolling
      scrollIntervalRef.current = setInterval(() => {
        scrollCards(scrollDirection);
      }, 10);
    } else if (scrollIntervalRef.current) {
      // Clean up interval
      clearInterval(scrollIntervalRef.current);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, scrollDirection]);

  const handleMouseDown = (direction: 'left' | 'right') => {
    setIsScrolling(true);
    setScrollDirection(direction);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
    setScrollDirection(null);
  };

  // Sample card data (in a real app, this would come from a database)
  const cards = [
    { title: "Gator King", type: "Character", year: "1987", color: "from-emerald-600 to-cyan-700" },
    { title: "Beach Zombie", type: "Hazard", year: "1987", color: "from-red-600 to-yellow-600" },
    { title: "Neon Amulet", type: "Treasure", year: "1987", color: "from-pink-600 to-purple-700" },
    { title: "Miami Mall", type: "Location", year: "1987", color: "from-blue-600 to-cyan-600" },
    { title: "Flamingo Man", type: "NPC", year: "1987", color: "from-pink-500 to-red-700" },
    { title: "VHS Curse", type: "Chaos", year: "1987", color: "from-purple-700 to-violet-900" },
    { title: "Swamp Thing", type: "Enemy", year: "1987", color: "from-green-700 to-yellow-600" },
    { title: "Arcade Wizard", type: "Character", year: "1987", color: "from-blue-500 to-indigo-700" },
  ];

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side with badge and line */}
          <div className="col-span-12 md:col-span-1 flex flex-col items-center">
            <SectionBadge number={5} color="cyan" />
          </div>

          {/* Content */}
          <div className="col-span-12 md:col-span-11">
            <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-400 drop-shadow-md animate-fade-in font-playfair">
              CARDS FROM 1987
            </h2>
            
            <p className="text-gray-300 max-w-2xl mb-10">
              Dive into the unique world of Flomanji with our collection of game cards inspired by the weird and wonderful 1987 Florida. Each card unlocks new adventures and challenges for your journey.
            </p>
            
            {/* Card Gallery with 80s Trading Card Aesthetics */}
            <div className="relative">
              {/* Scroll Controls */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
                <button 
                  className="w-8 h-8 bg-cyan-700 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg"
                  onMouseDown={() => handleMouseDown('left')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  &larr;
                </button>
              </div>
              
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                <button 
                  className="w-8 h-8 bg-cyan-700 hover:bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg"
                  onMouseDown={() => handleMouseDown('right')}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  &rarr;
                </button>
              </div>
              
              {/* Scrollable Card Container */}
              <div 
                className="flex gap-6 pb-4 overflow-x-auto scrollbar-none scroll-smooth snap-x"
                ref={scrollRef}
              >
                {cards.map((card, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-48 snap-center transform hover:scale-105 transition-transform duration-300"
                  >
                    {/* 80s Trading Card Design */}
                    <div className="rounded-lg overflow-hidden border-4 border-white/20 h-64 shadow-xl relative">
                      {/* Card Background */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${card.color}`}></div>
                      
                      {/* 80s Grid Pattern */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                        mixBlendMode: 'overlay',
                        opacity: 0.3
                      }}></div>
                      
                      {/* Card Content */}
                      <div className="relative p-3 flex flex-col h-full">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white">
                            {card.type}
                          </span>
                          <span className="text-xs font-mono text-white/60">
                            '{card.year.substring(2)}
                          </span>
                        </div>
                        
                        {/* Card Image Area */}
                        <div className="flex-1 flex items-center justify-center my-3">
                          {/* Placeholder for card image */}
                          <div className="w-32 h-32 bg-white/10 rounded flex items-center justify-center">
                            <span className="text-white/50 text-xs">Card Art</span>
                          </div>
                        </div>
                        
                        {/* Card Title */}
                        <div className="text-center font-bold text-white text-lg mb-1" style={{
                          textShadow: '0 0 8px rgba(0,0,0,0.5)'
                        }}>
                          {card.title}
                        </div>
                        
                        {/* Card Stats */}
                        <div className="flex justify-between text-xs text-white/80">
                          <span>★★★☆☆</span>
                          <span className="font-mono">#0{index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-cyan-300 text-sm font-mono">[SCROLL TO VIEW MORE CARDS]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
