
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Map, Sparkles, Grid3X3 } from "lucide-react";

export const KeyFeaturesSection = () => (
  <section
    className="py-20 bg-gradient-to-b from-gray-950 to-black relative flex"
    style={{ minHeight: 520 }}
    data-section="2"
  >
    {/* Vertical connecting progress line */}
    <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1 z-0 bg-gradient-to-b from-blue-400 via-green-400 to-green-400 rounded-full opacity-40"></div>
    <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row gap-12 relative z-10">
      {/* Left header: step marker */}
      <div className="flex flex-col items-center w-full md:w-1/5 relative md:z-10 mb-4 md:mb-0">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-lg"></div>
          <Badge
            variant="outline"
            className="relative z-10 h-12 w-12 text-2xl flex items-center justify-center p-0 font-bold border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-lg animate-fade-in"
          >
            2
          </Badge>
        </div>
        <div className="hidden md:block h-full flex-1 w-1 mt-4 bg-gradient-to-b from-blue-400 to-green-400 rounded-lg opacity-40"></div>
      </div>
      {/* Section content */}
      <div className="w-full md:w-4/5">
        <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400 drop-shadow-md animate-fade-in">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <CardContent className="pt-8 relative z-10">
              <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-yellow-900/30 group-hover:border-yellow-700/40 transition-colors border border-gray-700/50">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">AI Game Master</h3>
              <p className="text-gray-400 text-sm">
                Dynamic storytelling powered by AI that adapts to your choices and creates unique gameplay experiences.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <CardContent className="pt-8 relative z-10">
              <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-green-900/30 group-hover:border-green-700/40 transition-colors border border-gray-700/50">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors">Risk Management</h3>
              <p className="text-gray-400 text-sm">
                Balance heat levels, resources, and strategy to survive the increasingly chaotic environment.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <CardContent className="pt-8 relative z-10">
              <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-blue-900/30 group-hover:border-blue-700/40 transition-colors border border-gray-700/50">
                <Map className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">Mission System</h3>
              <p className="text-gray-400 text-sm">
                Complete unique objectives while exploring distinctive regions with special challenges.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col animate-scale-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <CardContent className="pt-8 relative z-10">
              <div className="bg-gray-800/80 p-3 rounded-lg inline-block mb-4 group-hover:bg-red-900/30 group-hover:border-red-700/40 transition-colors border border-gray-700/50">
                <Grid3X3 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">Flomanjified Cards</h3>
              <p className="text-gray-400 text-sm">
                Encounter bizarre paradise-themed hazards, characters and treasures with unique abilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);
