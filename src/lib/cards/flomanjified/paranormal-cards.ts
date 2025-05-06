
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";

// Cards related to paranormal/weird themes 
export const paranormalCards: FlomanjifiedRoleCard[] = [
  {
    id: "flomanjified-skunkape-puppet",
    name: "Puppet of the Paranoid Skunk Ape",
    type: "flomanjified",
    icons: [
      { symbol: "🐾", meaning: "Animal" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Paranoia Spreading", "Hazard Manipulation", "Fear Control"],
    rules: [
      "Objective: Ensure Survivors discard a total of 5+ Gear cards due to fear or paranoia effects OR lure a Survivor into a Swamp region containing 2+ active Hazards.",
      "Chaos Phase Action: Choose one:",
      "Spread Paranoia: Target one Survivor. Goblet whispers: \"Something's watching... Shake Moxie, DC 4, or drop something!\" Failure: Survivor must discard 1 random Gear card from their hand.",
      "Cryptid Call: Target one Hazard card in an adjacent region. Move that Hazard card into the target Survivor's region (if legally possible for the Hazard type).",
      "Special: Immune to Fear effects. Can move through Swamp/Forest regions without triggering Animal Hazards."
    ],
    flavor: "The Truth isn't just out there, it's gibbering in your ear. And it smells awful.",
    imagePrompt: "A figure covered in crude camouflage and tinfoil, moving stealthily through dense woods, with large, glowing red eyes peering from the shadows behind them.",
    originalRole: "Survivor",
    chaosAction: "Choose: Spread Paranoia (force Moxie DC 4 check or discard gear) OR Cryptid Call (move Hazard to target Survivor's region).",
    specialAbility: "Immune to Fear effects. Ignore Animal Hazards in Swamp/Forest regions."
  },
  {
    id: "flomanjified-eternal-spring-breaker",
    name: "The Eternal Spring Breaker",
    type: "flomanjified",
    icons: [
      { symbol: "🎭", meaning: "Party" },
      { symbol: "🏖️", meaning: "Beach" },
      { symbol: "🌀", meaning: "Chaos" }
    ],
    keywords: ["Status Effects", "Party Manipulation", "Disruption"],
    rules: [
      "Objective: Ensure at least 3 Survivors are simultaneously affected by negative Statuses (Poisoned, Cursed, Sick, Debuffed etc.) OR ensure the game ends with the 'Party' Event active.",
      "Chaos Phase Action: Choose one:",
      "Spike the Punch: Target one Survivor. Goblet announces: \"Someone spiked your drink! Shake Grit, DC 4, or feel the effects!\" Failure: Survivor gains a random minor negative Status (e.g., -1 Moxie for 1 round, lose next action).",
      "Party Foul: Target one Survivor. Goblet announces: \"Whoops! You knocked over their stuff! Shake Luck, DC 3, or lose something!\" Failure: Survivor must discard 1 Gear card.",
      "Special: Immune to negative effects from 'Party' or 'Food/Drink' related Hazards/Events. Gains +1 Charm when interacting negatively with other players (e.g., forcing discards)."
    ],
    flavor: "The party never stops. Ever. Pass the questionable jungle juice.",
    imagePrompt: "A figure perpetually stuck mid-celebration, maybe with glowing neon body paint and vacant eyes, surrounded by ghostly party debris on a dark beach.",
    originalRole: "Survivor",
    chaosAction: "Choose: Spike the Punch (force Grit DC 4 check or gain negative status) OR Party Foul (force Luck DC 3 check or discard gear).",
    specialAbility: "Immune to Party/Food/Drink Hazards. +1 Charm when forcing negative effects on others."
  },
  {
    id: "flomanjified-goblet-vessel",
    name: "The Goblet's Corrupted Vessel",
    type: "flomanjified",
    icons: [
      { symbol: "🏆", meaning: "Goblet" },
      { symbol: "⚡", meaning: "Glitch" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Weirdness Control", "System Manipulation", "Goblet Connection"],
    rules: [
      "Objective: Ensure the Goblet enters \"Corrupted Mode\" (via Chaos Card or other effect) three times OR ensure all other remaining Survivors reach Weirdness 5+.",
      "Chaos Phase Action: Choose one:",
      "Amplify Weirdness: Target one Survivor. Goblet speaks with static: \"Feedback loop initiated... Shake Moxie, DC 4, or absorb the static!\" Failure: Survivor gains 1 Weirdness.",
      "System Glitch: Target one Survivor. Goblet announces: \"Unexpected error! Shake Luck, DC 4!\" Failure: Survivor suffers -1 to their next Stat Check.",
      "Special: When the Goblet is in \"Corrupted Mode,\" this player may take two Chaos Phase Actions instead of one. Immune to negative effects caused directly by the Goblet itself (like 'Goblet Demands a Snack')."
    ],
    flavor: "You heard the whispers. Now you are the whispers. The signal is strong... and wrong.",
    imagePrompt: "A player character whose eyes glow with the same color light as the Goblet, perhaps with faint circuit patterns visible on their skin. The physical Goblet might be near them, pulsing darkly.",
    originalRole: "Survivor",
    chaosAction: "Choose: Amplify Weirdness (force Moxie DC 4 check or gain Weirdness) OR System Glitch (force Luck DC 4 check or -1 to next stat check).",
    specialAbility: "Take 2 Chaos actions when Goblet is in Corrupted Mode. Immune to negative Goblet effects."
  }
]
