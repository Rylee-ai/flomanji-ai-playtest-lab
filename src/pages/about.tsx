
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FooterSection } from "./public/sections/FooterSection";

const About = () => (
  <div className="flex flex-col min-h-screen bg-black text-white">
    <div className="container mx-auto px-4 pt-16">
      <Link to="/" className="text-amber-400 hover:underline mb-8 inline-flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-amber-400">Welcome to the Flomanji Family!</h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            Flomanji might seem like it's all about surviving gators, weirdness, and questionable tourist traps, but at its heart, it was born from something much simpler: family connection.
          </p>

          <p>
            We are the Hipp family – a multi-generational team, passionate about creating awesome games. Why do we do it? Because we truly believe that gathering around a table to share stories, face challenges, and maybe laugh at the absurdity of it all – whether you're escaping a mythical beast or just a truly epic traffic jam – brings people closer together.
          </p>

          <p>
            Flomanji is our chaotic love letter to resilience, shared experiences, and finding the fun in the unexpected. Our greatest hope is that while you're navigating the hazards and trying to complete your mission, Flomanji provides your group with not just thrills and strangeness, but also genuine moments of connection and shared laughter.
          </p>

          <p>
            When you open one of our boxes, we consider you part of the Hipp family circle. Thank you for joining us on this weird and wonderful adventure.
          </p>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-amber-400">Share Your Adventures</h2>
          <p className="text-gray-300">
            We'd love to hear about your tales from the peninsula!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://twitter.com/hipp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Twitter
            </a>
            <a 
              href="https://instagram.com/hipp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://athipp.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
);

export default About;

