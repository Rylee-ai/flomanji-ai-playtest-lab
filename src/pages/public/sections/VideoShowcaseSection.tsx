
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SectionBadge } from "@/components/sections/SectionBadge";

/**
 * 1987-Inspired VHS Video Showcase 
 * Displays a promotional video with retro VHS styling
 */
export const VideoShowcaseSection = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setVideoPlaying(true);
    // If we had an actual video element, we would reference and play it here
  };

  return (
    <section className="py-20 bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Left side with badge and line */}
          <div className="col-span-12 md:col-span-1 flex flex-col items-center">
            <SectionBadge number={4} color="pink" />
          </div>

          {/* Content */}
          <div className="col-span-12 md:col-span-11">
            <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-pink-400 drop-shadow-md animate-fade-in font-playfair">
              THE GOBLET EXPERIENCE
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {/* VHS-style video player */}
              <div className="relative bg-black rounded-lg overflow-hidden border-8 border-gray-900 shadow-[0_0_40px_rgba(236,72,153,0.3)]">
                {/* VHS label */}
                <div className="absolute -right-2 -top-2 transform rotate-6 bg-white py-1 px-3 text-xs font-bold text-black z-10 font-mono">
                  FLOMANJI-1987
                </div>
                
                {/* Video Content */}
                <div className="relative">
                  <AspectRatio ratio={4/3} className="bg-gradient-to-br from-gray-900 to-black">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {!videoPlaying ? (
                        <>
                          <div className="text-center mb-4">
                            <Video className="w-16 h-16 mx-auto text-pink-500 mb-4" />
                            <h3 className="text-pink-500 font-bold text-xl mb-2 font-mono tracking-widest">THE GOBLET SPEAKS</h3>
                            <p className="text-gray-400 text-sm max-w-md mx-auto">
                              Experience the enigmatic Goblet in action as it guides players through the supernatural dangers of 1987 Florida
                            </p>
                          </div>
                          <Button 
                            onClick={handlePlayVideo}
                            className="bg-pink-600 hover:bg-pink-700 text-white group flex items-center gap-2"
                          >
                            <Play className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            Play Demo Reel
                          </Button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <p className="text-white/70 text-sm">Video demonstration placeholder</p>
                          {/* In a real implementation, we'd embed an actual video here */}
                        </div>
                      )}
                    </div>
                    
                    {/* VHS Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Scanlines */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%)",
                        backgroundSize: "100% 4px",
                        mixBlendMode: "overlay"
                      }}></div>
                      
                      {/* Color bleeding */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "linear-gradient(90deg, #ff0000, #00ff00, #0000ff)",
                        mixBlendMode: "color"
                      }}></div>
                      
                      {/* Noise */}
                      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-noise"></div>
                      
                      {/* Tracking lines - random position */}
                      <div className="absolute h-6 w-full left-0 bg-white/10 mix-blend-overlay blur-sm" style={{
                        top: `${Math.random() * 100}%`,
                        transform: "translateY(-50%)"
                      }}></div>
                    </div>
                  </AspectRatio>
                </div>
                
                {/* VCR Controls */}
                <div className="bg-gray-900 p-3 flex justify-center gap-4 font-mono text-xs text-gray-400">
                  <button className="hover:text-pink-400">■ STOP</button>
                  <button className="hover:text-pink-400">▶ PLAY</button>
                  <button className="hover:text-pink-400">◼︎◼︎ PAUSE</button>
                  <button className="hover:text-pink-400">◀◀ REW</button>
                  <button className="hover:text-pink-400">▶▶ FF</button>
                  <div className="ml-auto text-[10px] flex items-center">
                    <span className="text-green-400 mr-1">●</span> REC
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  ©1987 FLOMANJI ENTERPRISES - RECORDED IN MIAMI, FL - VHS HI-FI STEREO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
