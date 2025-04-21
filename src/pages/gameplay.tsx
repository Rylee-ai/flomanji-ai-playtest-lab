import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FooterSection } from "@/pages/public/sections/FooterSection";

const Gameplay = () => (
  <>
    <main className="container mx-auto px-4 py-8 max-w-3xl min-h-screen text-white space-y-7">
      <h1 className="text-4xl font-bold mb-5 text-amber-400">How to Play Flomanji</h1>
      <p className="text-gray-300 text-lg mb-6">
        Flomanji is a strategic survival adventure, blending exploration, teamwork, and a touch of absurdity. Below you'll find the complete breakdown of how to play, referencing real rules and game simulation details.
      </p>

      {/* Mission Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Mission Structure</CardTitle>
          <CardDescription>
            Each session is centered around a unique <strong>Mission Sheet</strong>, setting the tone, map, objectives, and key win/loss conditions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li><strong>Setup:</strong> Select a Mission, lay out the map using Region cards, gather characters, and follow the narrative hook.</li>
            <li><strong>Objectives:</strong> Complete all required goals before Heat or Weirdness become overwhelming.</li>
            <li><strong>Extraction:</strong> Survive and escape via the designated extraction region after objectives are complete.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Turn Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Turn Structure</CardTitle>
          <CardDescription>
            Each round is split into four phases, driving the pulse of the game and keeping action tense.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="text-sm pl-5 list-decimal text-muted-foreground space-y-1">
            <li><b>Draw Phase:</b> Draw and resolve a card (Gear, Hazard, NPC, or Event) that sets the scene for the round.</li>
            <li><b>Action Phase:</b> Each player takes <b>2 actions</b>, choosing from: Move, Use Gear, Interact, Team-Up, Rest, or advance the Mission. Reactions (⚡) can be played outside the action limit.</li>
            <li><b>Chaos Phase:</b> Draw a Chaos card – escalating dangers with global effects.</li>
            <li><b>End Phase:</b> Advance the <b>Heat</b> timer, resolve end-of-turn effects, and check for milestone triggers (like increased Weirdness or defeat).</li>
          </ol>
        </CardContent>
      </Card>

      {/* Player Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Player Actions & Decisions</CardTitle>
          <CardDescription>
            Every choice matters! Here’s what you can do on your turn:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm pl-5 list-disc text-muted-foreground space-y-1">
            <li><b>Move (1 Action):</b> Enter an adjacent region. Explore new areas, trigger events, reveal surprises.</li>
            <li><b>Use Gear (1):</b> Activate one of your gear cards – essential for overcoming hazards.</li>
            <li><b>Interact (1):</b> Engage with NPCs, regions, or special events on the map.</li>
            <li><b>Team-Up (1):</b> Cooperate to help allies or swap gear. Teamwork is vital!</li>
            <li><b>Rest (1):</b> Heal or reduce Weirdness (if in a safe region).</li>
            <li><b>Mission (1):</b> Progress the scenario’s objectives.</li>
            <li><b>⚡ Reactions:</b> Play cards or abilities at any time, even outside your turn or action limit.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Twin Timers */}
      <Card>
        <CardHeader>
          <CardTitle>Heat & Weirdness: The Twin Timers</CardTitle>
          <CardDescription>
            The central threat system! If either gauge maxes out, things get wild—or deadly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <div>
            <strong>Heat:</strong> A global danger counter (<span className="text-amber-400 font-bold">0–10</span>). It rises every turn and from chaotic events. If you hit 10, you lose the mission!
          </div>
          <div>
            <strong>Weirdness:</strong> Each character tracks their supernatural “strangeness” (0–10). Milestones trigger Attuned, Hallucinating, and Paranoid effects. At 10, you become <b>Flomanjified</b>—and get a new chaos-driven role.
          </div>
          <ul className="list-disc pl-5 mt-1">
            <li><b>Heat increase:</b> +1 every End Phase (+2 if 4–6 players) and by card effects. Rules prevent falling below milestone thresholds.</li>
            <li><b>Weirdness gain:</b> From card failures, hazard effects, or certain regions. Mitigate by Resting in safe regions or consuming rare gear.</li>
          </ul>
          <div>
            <b>Tip:</b> Skillful play involves managing these rising threats while pushing toward your objectives.
          </div>
        </CardContent>
      </Card>

      {/* Skill Checks and Hazards */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Checks & Facing Hazards</CardTitle>
          <CardDescription>
            Resolve dangers using iconic Flomanji checks—always 2d6 + Stat + modifiers vs. DC.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <ul className="list-disc pl-5">
            <li><b>Fight (⚔️):</b> Use Brawn to overcome brute-force threats.</li>
            <li><b>Flee (🏃):</b> Use Moxie to escape danger.</li>
            <li><b>Negotiate (💬):</b> Use Charm in social stand-offs.</li>
            <li><b>Outsmart (🧠):</b> Use Weird Sense to bypass supernatural obstacles.</li>
          </ul>
          <div>
            <b>Default DCs:</b> Easy 7, Standard 9, Hard 11, Heroic 13 (see the full rules or quick reference).
          </div>
          <div>
            Choose your response as a team—success moves you forward, but failure can raise Heat, Weirdness, or cause serious harm.
          </div>
          <div className="border-l-4 border-amber-500 pl-4 mt-2">
            <b>Simulation insight:</b> Game reports show the biggest risks come from underestimating Weirdness and ignoring Rest!
          </div>
        </CardContent>
      </Card>

      {/* Win & Loss */}
      <Card>
        <CardHeader>
          <CardTitle>Win & Loss Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <ul className="list-disc pl-5">
            <li><b>Victory:</b> Complete all required mission objectives and extract your team before Heat hits 10.</li>
            <li><b>Defeat:</b> Heat reaches 10, all players are eliminated or Flomanjified, or an instant-fail objective triggers.</li>
            <li><b>Partial success:</b> Rare missions allow alternate win conditions if only some objectives are completed (see mission sheet).</li>
          </ul>
        </CardContent>
      </Card>

      {/* How Simulation Impacts the Game */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation & AI Agents</CardTitle>
          <CardDescription>
            The rules engine and AI agents run the complete game loop, ensuring all rules are enforced and generating narrative-rich play reports.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <ul className="list-disc pl-5">
            <li>Characters, actions, and events are validated against the full Players Guide.</li>
            <li>Analytics from real and simulated runs inform game balance, difficulty, and card tuning.</li>
            <li>All timers, win/loss checks, and weird effects are enforced automatically in the simulation and admin dashboards.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Call to action & reference */}
      <div className="pt-4 text-center">
        <a
          href="/rules"
          className="text-amber-400 hover:underline hover-scale transition"
        >
          Want all the details? Read the complete Official Rules &rarr;
        </a>
      </div>
    </main>
    <FooterSection />
  </>
);

export default Gameplay;
