
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Gamepad } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SectionBadge } from "@/components/sections/SectionBadge";

/**
 * 1987-Inspired Arcade Video Showcase 
 * Displays a promotional video with retro arcade styling
 */
export const VideoShowcaseSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setVideoPlaying(true);
    // If we had an actual video element, we would reference and play it here
  };

  return (
    <section className="py-16 bg-gray-950 relative overflow-hidden">
      {/* Arcade grid background */}
      <div className="absolute inset-0 arcade-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side with badge and line */}
          <div className="col-span-12 md:col-span-1 flex flex-col items-center">
            <SectionBadge number={4} color="pink" />
          </div>

          {/* Content */}
          <div className="col-span-12 md:col-span-11">
            <h2 className="text-2xl md:text-3xl readable-heading font-retro mb-6 text-cyan-300">
              THE GOBLET EXPERIENCE
            </h2>
            
            <div className="max-w-3xl mx-auto">
              {/* Arcade-style video player */}
              <div className="relative bg-black rounded-lg overflow-hidden border-4 border-gray-800 arcade-border">
                {/* Arcade ticket label */}
                <div className="absolute -right-2 -top-2 transform rotate-6 bg-white py-1 px-3 text-xs font-bold text-black z-10 font-mono">
                  INSERT COIN
                </div>
                
                {/* Video Content */}
                <div className="relative">
                  <AspectRatio ratio={4/3} className="bg-gradient-to-br from-gray-900 to-black">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {!videoPlaying ? (
                        <>
                          <div className="text-center mb-4">
                            <Gamepad className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                            <h3 className="text-cyan-400 font-bold text-xl mb-2 font-retro tracking-wide">PLAY DEMO</h3>
                            <p className="text-gray-200 text-sm max-w-md mx-auto readable-text">
                              See the Goblet in action guiding players through 1987 Florida
                            </p>
                          </div>
                          <Button 
                            onClick={handlePlayVideo}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white group flex items-center gap-2"
                          >
                            <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            INSERT COIN TO PLAY
                          </Button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <p className="text-cyan-300 text-base font-retro">GAME DEMO LOADING...</p>
                          {/* In a real implementation, we'd embed an actual video here */}
                        </div>
                      )}
                    </div>
                    
                    {/* Arcade Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Scanlines - more subtle for readability */}
                      <div className="absolute inset-0 arcade-scanline opacity-30"></div>
                      
                      {/* Subtle color bleeding for arcade feel */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: "linear-gradient(90deg, #ff0000, #00ff00, #0000ff)",
                        mixBlendMode: "color"
                      }}></div>
                      
                      {/* Noise */}
                      <div className="absolute inset-0 opacity-5 mix-blend-overlay arcade-static"></div>
                    </div>
                  </AspectRatio>
                </div>
                
                {/* Arcade Controls */}
                <div className="bg-gray-900 p-3 flex justify-between items-center">
                  <div className="font-mono text-xs text-gray-200 flex gap-4">
                    <button className="hover:text-cyan-400 px-2 py-1 rounded border border-gray-700">PLAY</button>
                    <button className="hover:text-cyan-400 px-2 py-1 rounded border border-gray-700">PAUSE</button>
                  </div>
                  <div className="text-[10px] flex items-center">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    <span className="text-gray-300 font-mono">HIGH SCORE: 9999</span>
                  </div>
                </div>
              </div>
              
              {/* Video Info - clearer text */}
              <div className="mt-4 text-center">
                <p className="text-gray-300 text-sm font-mono">
                  ©1987 FLOMANJI ARCADE - MIAMI, FL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
