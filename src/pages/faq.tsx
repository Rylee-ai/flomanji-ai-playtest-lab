import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FooterSection } from "@/pages/public/sections/FooterSection";

const FAQPage = () => {
  return (
    <>
      <main className="min-h-screen bg-black text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-amber-400 mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-6">Game Basics</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="what-is-flomanji">
                  <AccordionTrigger className="text-lg">What is Flomanji?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Flomanji is a deck-building survival adventure game that combines strategic card play with immersive storytelling. Set in a surreal version of Florida, players navigate through various missions while building their deck and surviving unique challenges.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="players-needed">
                  <AccordionTrigger className="text-lg">How many players can play?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Flomanji can be played solo or with up to 4 players cooperatively. Each player takes on the role of a unique character with special abilities and deck-building options.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="game-length">
                  <AccordionTrigger className="text-lg">How long does a typical game take?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    A typical mission in Flomanji takes 45-90 minutes to complete, depending on the mission complexity and player count. Campaign missions might take longer due to additional story elements.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Gameplay & Rules</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="core-mechanics">
                  <AccordionTrigger className="text-lg">What are the core mechanics?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    The game combines deck-building with survival mechanics. Players use their cards to overcome challenges, gather resources, and complete mission objectives while managing their Heat level - a measure of how much attention they're attracting from various threats.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="card-types">
                  <AccordionTrigger className="text-lg">What types of cards are there?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Flomanji features various card types including Character Cards, Gear Cards, Hazard Cards, Mission Cards, Region Cards, and special Flomanjified Cards that add unique twists to the gameplay.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="win-conditions">
                  <AccordionTrigger className="text-lg">How do you win?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Victory conditions vary by mission, but typically involve completing specific objectives while managing your resources and Heat level. Some missions might require collecting specific items, surviving for a certain number of turns, or reaching particular locations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="how-to-start">
                  <AccordionTrigger className="text-lg">How do I get started with Flomanji?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    The best way to start is with the tutorial mission, which walks you through the basic mechanics. After that, you can move on to standalone missions or start the campaign mode for a more narrative experience.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deck-building">
                  <AccordionTrigger className="text-lg">How does deck building work?</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Players start with a basic deck and can acquire new cards through various means during gameplay. Each character has access to different card pools, and players can customize their decks between missions to better suit their playstyle and upcoming challenges.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
};

export default FAQPage;
