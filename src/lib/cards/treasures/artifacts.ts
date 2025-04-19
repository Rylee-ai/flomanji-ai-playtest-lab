
import { TreasureCard } from "@/types/cards";

export const ARTIFACTS: TreasureCard[] = [
  {
    id: "ponce-de-leon-compass",
    name: "Ponce de Leon's Compass (Cracked)",
    type: "treasure",
    icons: [
      { symbol: "🧭", meaning: "Compass" },
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Unique", "Tool", "Movement", "Weirdness"],
    rules: [
      "Passive: Gain +1 Weirdness per End Phase.",
      "Use (0 Actions): Once per turn before moving, ignore any "Lost" checks and peek at one adjacent face‑down Region card.",
      "Elimination: Return to box after use."
    ],
    flavor: "Points toward trouble… or tacos.",
    imagePrompt: "Ornate antique brass compass with spider‑web crack in the glass, an erratic faint glow from within"
  },
  {
    id: "mar-a-lago-skeleton-key-proxy",
    name: "Mar‑a‑Lago Skeleton Key Proxy",
    type: "treasure",
    icons: [
      { symbol: "🗝️", meaning: "Bypass" },
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Unique", "Tool", "Social", "Heat Increase", "Bypass"],
    rules: [
      "Passive: Gain +1 Heat each Chaos Phase.",
      "Use (1 Action): Auto‑succeed bypassing any one lock, gate, or container. Immediately Gain +1 Heat.",
      "Elimination: Return to box."
    ],
    flavor: "Unlocks anything. Also subpoenas.",
    imagePrompt: "Ornate golden key shaped like a palm frond, dripping sweat under dramatic light"
  },
  {
    id: "haunted-theme-park-snow-globe",
    name: "Haunted Theme Park Snow Globe Proxy",
    type: "treasure",
    icons: [
      { symbol: "🌀", meaning: "Oddity" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "⚠️", meaning: "Hazard" }
    ],
    keywords: ["Unique", "Oddity", "Weirdness", "Hazard Trigger"],
    rules: [
      "Passive: Gain +1 Weirdness when acquired.",
      "Use (1 Action): Shake globe and roll 1 d6:",
      "1–2: Trigger a minor Hazard.",
      "3–4: Gain +1 Weirdness.",
      "5: Reduce Heat by 1.",
      "6: Gain +2 Luck on your next check.",
      "Elimination: Return to box."
    ],
    flavor: "Shake for snow… or existential dread.",
    imagePrompt: "Kitschy snow globe with a derelict theme‑park mascot inside; swirling glitter forms strange shapes"
  },
  {
    id: "skunk-ape-musk-gland",
    name: "Skunk Ape Musk Gland",
    type: "treasure",
    icons: [
      { symbol: "🌀", meaning: "Oddity" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🦍", meaning: "Creature" }
    ],
    keywords: ["Unique", "Oddity", "Weirdness", "Creature Interaction", "Social (Negative)"],
    rules: [
      "Passive: Gain +1 Weirdness when acquired and suffer –1 Charm on all social checks.",
      "Effect: Gain +2 Bonus on Moxie checks vs non‑cryptid/Insect creatures; suffer –1 Penalty on Moxie checks vs Cryptids.",
      "Elimination: Return to box."
    ],
    flavor: "Smells like Bigfoot's gym socks. Repels gators.",
    imagePrompt: "Murky glass jar with a slimy gland suspended in foul liquid; faint stench lines visible"
  },
  {
    id: "golden-gator-idol",
    name: "Golden Gator Idol",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Unique", "Weirdness", "Heat Increase", "Valuable"],
    rules: [
      "Passive: Gain +1 Weirdness each Chaos Phase.",
      "Use (1 Action, once per game): Before any Stat check, discard to auto‑succeed; immediately Gain +3 Heat.",
      "Elimination: Return to box."
    ],
    flavor: "Feels powerful… and hungry. For offerings?",
    imagePrompt: "Heavy golden alligator statuette with inset gem eyes, aura of latent menace"
  },
  {
    id: "first-edition-a-land-remembered",
    name: "First Edition A Land Remembered",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🕊️", meaning: "Calm" }
    ],
    keywords: ["Unique", "Weirdness", "Calm", "Social (Trade)"],
    rules: [
      "Use (1 Action): Read a passage → Reduce Weirdness by 1 (min 0). Limit once per player per game.",
      "Trade: Discard when Interacting with a Librarian/Historian NPC → Gain +3 Bonus or special favor.",
      "Drop/Elimination: If you drop it, another player on the same tile may Interact (0 Actions) to pick it up; otherwise return to box."
    ],
    flavor: "Reminds you of a tougher, simpler Flomanji. Maybe.",
    imagePrompt: "Worn hardcover first edition with cattle‑drive scene on cover, embossed title "A Land Remembered""
  }
];
