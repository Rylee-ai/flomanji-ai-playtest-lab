
import React from "react";
import { Button } from "@/components/ui/button";

export const PreOrderSection = () => (
  <section className="py-16 bg-black text-center">
    <div className="container mx-auto px-4 max-w-5xl">
      <h2 className="text-3xl font-bold mb-2">Get Ready for Launch!</h2>
      <p className="text-gray-400 mb-10">Pre-order now and be ready when Flomanji hits game tables</p>
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg border border-gray-800">
        <h3 className="text-lg text-gray-400 uppercase tracking-wide mb-2">Starting From</h3>
        <div className="flex items-center justify-center mb-3">
          <span className="text-4xl font-bold">$49.99</span>
          <span className="text-gray-400 ml-2">USD</span>
        </div>
        <p className="text-gray-400 text-sm mb-6">Base game with all core components</p>
        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
          Pre-Order Now
        </Button>
        <p className="mt-3 text-xs text-gray-500">Ships Q2 2025 • Limited quantities available</p>
      </div>
    </div>
  </section>
);

