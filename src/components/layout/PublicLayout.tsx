
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl flex items-center text-amber-400">
            <span>FLOMANJI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/about" className="text-sm hover:text-amber-400 transition-colors">About</Link>
            <Link to="/gameplay" className="text-sm hover:text-amber-400 transition-colors">Gameplay</Link>
            <Link to="/faq" className="text-sm hover:text-amber-400 transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="border-gray-700 hover:bg-gray-800 hidden md:flex">
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
