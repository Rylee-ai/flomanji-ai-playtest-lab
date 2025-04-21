
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const RulesQuickReference = () => (
  <Card>
    <CardHeader>
      <CardTitle>Quick Reference & Core Icons</CardTitle>
      <CardDescription>
        Handy summary of Flomanji turn flow, actions, DCs, and icon legend. For complete rule wording, consult the main Guide.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <section>
        <h3 className="font-bold">Turn Sequence</h3>
        <ol className="text-sm pl-5 list-decimal text-muted-foreground space-y-1">
          <li><strong>Draw Phase:</strong> Draw top Main Deck card, resolve Gear/Hazard/NPC/Event.</li>
          <li><strong>Action Phase:</strong> Each player spends 2 Actions (Move, Use Gear, Interact, Team-Up, Rest, Mission). Use ⚡ cards at any time.</li>
          <li><strong>Chaos Phase:</strong> Reveal Chaos card, resolve global effect.</li>
          <li><strong>End Phase:</strong> Advance Heat (+1 or +2); check for triggers. At Heat 10: Defeat.</li>
        </ol>
      </section>
      <section>
        <h3 className="font-bold">Core Actions</h3>
        <ul className="text-sm pl-5 list-disc text-muted-foreground space-y-0.5">
          <li>Move (1): Shift to adjacent Region</li>
          <li>Use Gear (1): Activate card</li>
          <li>Interact (1): Use NPC/Region/Event</li>
          <li>Team-Up (1): Support ally or trade Gear</li>
          <li>Rest (1): Heal 1 Health or Weirdness (only in safe Regions)</li>
          <li>Mission (1): Advance Mission progress</li>
        </ul>
        <div className="text-xs text-muted-foreground pt-1">⚡ <b>Reactions:</b> Play anytime; not limited by actions.</div>
      </section>
      <section>
        <h3 className="font-bold">Check Formula & DCs</h3>
        <div className="text-sm">
          <div><b>Skill Check:</b> 2d6 + Stat + Modifiers ≥ DC → Success</div>
          <table className="table-auto text-xs mt-2 border border-muted w-fit">
            <thead>
              <tr className="bg-muted">
                <th className="px-2 py-1 border">Descriptor</th>
                <th className="px-2 py-1 border">DC</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2">Easy</td><td className="border px-2">7</td></tr>
              <tr><td className="border px-2">Standard</td><td className="border px-2">9</td></tr>
              <tr><td className="border px-2">Hard</td><td className="border px-2">11</td></tr>
              <tr><td className="border px-2">Heroic</td><td className="border px-2">13</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h3 className="font-bold">Health, Heat, and Weirdness</h3>
        <ul className="text-sm pl-5 list-disc text-muted-foreground space-y-0.5">
          <li><b>Health:</b> Track with d6 (max 5); 0 = Incapacitated</li>
          <li><b>Heat:</b> Global track (d10); increases per End Phase/events; at 10 = Defeat</li>
          <li><b>Weirdness:</b> Personal d10; thresholds: 3 Attuned, 5 Hallucinating, 7 Paranoid, 10 Flomanjified</li>
          <li><b>Luck Tokens:</b> Start with half Stat total (rounded up); spend before/after rolls</li>
        </ul>
      </section>
      <section>
        <h3 className="font-bold">Icon Key</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-2 text-xs pt-2">
          <div>⚔️ <b>Fight/Combat</b></div>
          <div>🏃 <b>Move/Flee</b></div>
          <div>💬 <b>Negotiate</b></div>
          <div>🧠 <b>Outsmart/Weird</b></div>
          <div>⚡ <b>Reaction (no Action cost)</b></div>
          <div>🐊 <b>Swamp Biome</b></div>
          <div>🏖️ <b>Coastal Biome</b></div>
          <div>🏙️ <b>Urban Biome</b></div>
          <div>🛣️ <b>Highway Biome</b></div>
          <div>🌳 <b>Forest Biome</b></div>
          <div>☀️ <b>Exposed Biome</b></div>
          <div>🕳️ <b>Underground Biome</b></div>
          <div>☣️ <b>Toxic/Environmental</b></div>
          <div>🔮 <b>Weirdness-related</b></div>
          <div>🛟 <b>Treasure & Artifact</b></div>
          <div>🗣️ <b>Social/NPC</b></div>
        </div>
      </section>
    </CardContent>
  </Card>
);

export default RulesQuickReference;
