
import React from "react";
import { SectionBadge } from "@/components/sections/SectionBadge";

export const DesignPillarsSection = () => (
  <section
    className="py-20 bg-gradient-to-b from-black to-gray-950 relative"
    style={{ minHeight: 500 }}
    data-section="3"
  >
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Left side with badge and line */}
        <div className="col-span-12 md:col-span-1 flex flex-col items-center">
          <SectionBadge number={3} color="emerald" />
        </div>

        {/* Content area */}
        <div className="col-span-12 md:col-span-11">
          <h2 className="text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-emerald-400 drop-shadow-md animate-fade-in">
            Design Pillars
          </h2>

          <div className="prose prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Paradise & Chaos</h3>
                <p className="mb-4 text-gray-300">
                  Flomanji explores the duality of paradise - what seems idyllic quickly becomes dangerous. Players navigate the tension between beauty and chaos, making critical decisions with limited information.
                </p>
                <p className="text-gray-300">
                  The Heat and Weirdness systems embody this duality, with Heat representing immediate danger and Weirdness driving character transformation and supernatural elements.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Risk Management</h3>
                <p className="mb-4 text-gray-300">
                  Every decision has consequences in Flomanji. The Twin-Timer system forces players to balance immediate gains against long-term sustainability, with Heat and Weirdness constantly pushing towards critical thresholds.
                </p>
                <p className="text-gray-300">
                  Mission objectives create natural tension between risk and reward, while the 2d6 dice system introduces probability management that experienced players can optimize.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Character Transformation</h3>
                <p className="mb-4 text-gray-300">
                  Characters in Flomanji evolve through play, particularly through the Weirdness mechanic. As Weirdness increases, characters gain access to strange powers but risk complete transformation at maximum levels.
                </p>
                <p className="text-gray-300">
                  The Flomanjified cards represent these transformations, creating memorable moments when characters succumb to the strange energies of the island paradise.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Emergent Storytelling</h3>
                <p className="mb-4 text-gray-300">
                  Flomanji creates stories through systems rather than scripts. The interaction of Heat, Weirdness, character abilities, and card effects generates unique narratives every session.
                </p>
                <p className="text-gray-300">
                  The AI Playtest Lab extends this by simulating how these systems interact, allowing players to test scenarios and discover unexpected narrative and mechanical combinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
