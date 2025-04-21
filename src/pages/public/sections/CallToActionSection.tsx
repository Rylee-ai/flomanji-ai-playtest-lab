
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CallToActionSection = ({ scrollToWaitlist }: { scrollToWaitlist: () => void }) => (
  <section className="py-16 bg-black text-center">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold mb-2">Gear Up, Get Weird, Get Out</h2>
      <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
        Get ready for an adventure where danger is just the beginning.
        Every game tells a story, every decision matters, and paradise never felt so dangerous.
      </p>
      <div className="relative mx-auto max-w-md">
        <div className="bg-gray-900 border border-green-900/60 p-6 rounded-lg relative z-10 shadow-xl hover:shadow-green-900/20 transition-shadow">
          <Badge className="bg-green-600 mb-2">Early Access</Badge>
          <h3 className="text-xl font-bold mb-2">Join our Playtest</h3>
          <p className="text-gray-400 text-sm mb-4">
            Be among the first to experience Flomanji and help shape its development.
          </p>
          <Button 
            onClick={scrollToWaitlist} 
            className="w-full bg-green-600 hover:bg-green-700 transition-colors"
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  </section>
);
