import { TreasureCard } from "@/types/cards";

export const TREASURE_CARDS: TreasureCard[] = [
  {
    id: "spanish-doubloons",
    name: "Bag of Spanish Doubloons",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🤝", meaning: "Trade" }
    ],
    keywords: ["Valuable", "Coastal", "Trade"],
    rules: [
      "Discard (0 Actions) before a bribe or trade Charm check → Gain +3 Bonus",
      "Discard (1 Action) → Reduce Heat by 2"
    ],
    flavor: "Shiny gold. Still spends... sort of.",
    imagePrompt: "Photorealistic close-up of a rough burlap sack overflowing with tarnished gold doubloons",
    value: 3
  },
  {
    id: "ponce-de-leon-compass",
    name: "Ponce de Leon’s Compass (Cracked)",
    type: "treasure",
    icons: [
      { symbol: "🧭", meaning: "Compass" },
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Unique", "Tool", "Movement", "Weirdness"],
    rules: [
      "Passive: Gain +1 Weirdness per End Phase.",
      "Use (0 Actions): Once per turn before moving, ignore any “Lost” checks and peek at one adjacent face‑down Region card.",
      "Elimination: Return to box after use."
    ],
    flavor: "Points toward trouble… or tacos.",
    imagePrompt: "Ornate antique brass compass with spider‑web crack in the glass, an erratic faint glow from within; needle spinning wildly in dim, atmospheric light."
  },
  {
    id: "lost-tourist-wallet",
    name: "Lost Tourist’s Wallet",
    type: "treasure",
    icons: [
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Valuable (Situational)", "Social", "Gear Source"],
    rules: [
      "Choose one:",
      "Discard (1 Action) → Draw 2 Gear cards and Gain 1 Heat.",
      "Discard (0 Actions) during an Interact with Police/Security/Ranger NPC → Gain +2 Bonus on that Charm check."
    ],
    flavor: "Finders keepers? Or good karma?",
    imagePrompt: "Worn leather wallet lying open on pavement or sand, old vacation photo and expired coupons spilling out; focus on the sense of lucky (and questionable) windfall."
  },
  {
    id: "case-of-runoff-rum",
    name: "Case of Runoff Rum",
    type: "treasure",
    icons: [
      { symbol: "🍹", meaning: "Drink" },
      { symbol: "🪙", meaning: "Value" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Trade Value", "Consumable", "Weirdness", "Grit"],
    rules: [
      "Choose one:",
      "Discard (1 Action) → Gain +2 Grit this turn and Gain 2 Weirdness.",
      "Discard (0 Actions) when trading → Counts as 2 basic Gear for value."
    ],
    flavor: "Smells like molasses, gasoline, bad decisions.",
    imagePrompt: "Waterlogged wooden crate, slightly ajar, revealing unmarked dark glass bottles—one bearing a crude skull sketch; swampy backdrop, ominous glow."
  },
  {
    id: "bag-of-holding",
    name: "Bag of Holding (Flomanji Edition)",
    type: "treasure",
    icons: [
      { symbol: "⚙️", meaning: "Gear" },
      { symbol: "🌀", meaning: "Oddity" }
    ],
    keywords: ["Utility", "Gear Source"],
    rules: [
      "Discard (1 Action): Draw 3 Gear cards; keep one, discard the others."
    ],
    flavor: "Bigger on the inside. Rattles suspiciously.",
    imagePrompt: "Simple burlap sack—impossibly deep and bulging—with strange green glow spilling from its opening; focus on the magical capacity."
  },
  {
    id: "meth-gator-clue-map-fragment",
    name: "Meth Gator Clue – Map Fragment",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Swamp"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Use (1 Action): Discard to auto‑succeed one navigate/avoid “Lost” check in a Swamp Region."
    ],
    flavor: "“X” marks the spot… or where someone dissolved.",
    imagePrompt: "Torn piece of hand‑drawn map showing swampy terrain with ominous symbols and claw prints; damp, hastily sketched, edged in chemical burn."
  },
  {
    id: "meth-gator-clue-strange-residue",
    name: "Meth Gator Clue – Strange Residue",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Weirdness"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Acquire: Gain +1 Weirdness."
    ],
    flavor: "Smells like bad chemicals and angry swamp.",
    imagePrompt: "Small glass vial of viscous green‑iridescent goo, bubbling faintly; held over swamp ground, strange tracks nearby."
  },
  {
    id: "meth-gator-clue-witness-sketch",
    name: "Meth Gator Clue – Witness Sketch",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🕵️", meaning: "Clue" },
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["Information", "Clue (Meth Gator)", "Social"],
    rules: [
      "Mission 3 specific — Counts as 1 Clue.",
      "Use (0 Actions): Discard when Interacting with a Swamp Denizen/Cryptozoologist/Historian NPC → Gain +2 Bonus on that Charm or Moxie check."
    ],
    flavor: "“Too many eyes… or maybe not enough?”",
    imagePrompt: "Crumpled pencil sketch of an alligator distorted with extra teeth and odd eyes; focus on terrified witness’s shaky hand."
  },
  {
    id: "legendary-subsub-order",
    name: "Legendary SubSub Order",
    type: "treasure",
    icons: [
      { symbol: "🎯", meaning: "Mission" },
      { symbol: "🍲", meaning: "Food" },
      { symbol: "🌟", meaning: "Unique" }
    ],
    keywords: ["Mission Item", "Food", "Unique"],
    rules: [
      "Mission 6 specific — Acquire only at the Sublix Bonus Zone.",
      "Passive: While carrying, Gain +1 Heat during each Chaos Phase.",
      "Interact (1 Action) at Safe House: Deliver to auto‑win Mission 6; if you lose it, the Mission fails."
    ],
    flavor: "Chicken Tender SubSub… the order is long, specific, vital.",
    imagePrompt: "Revered crumpled receipt from “Sublix” with exact sandwich instructions stamped in neon‑pastel ink; a single grease stain hinting at urgency."
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
    imagePrompt: "Ornate golden key shaped like a palm frond, dripping sweat under dramatic light; focus on ostentation and power."
  },
  {
    id: "haunted-theme-park-snow-globe-proxy",
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
    imagePrompt: "Kitschy snow globe with a derelict theme‑park mascot inside; swirling glitter forms strange shapes."
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
    flavor: "Smells like Bigfoot’s gym socks. Repels gators.",
    imagePrompt: "Murky glass jar with a slimy gland suspended in foul liquid; faint stench lines visible."
  },
  {
    id: "meth-gator-tooth",
    name: "Meth Gator Tooth",
    type: "treasure",
    icons: [
      { symbol: "🌀", meaning: "Oddity" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Unique", "Weirdness", "Grit", "Mission (Meth Gator)"],
    rules: [
      "Acquire: After defeating the Meth Gator boss. Gain +1 Weirdness.",
      "Passive: Gain +1 Grit.",
      "Chaos Phase: Weirdness Check DC 9 → Failure: Gain +1 Weirdness.",
      "Mission: Counts as proof for Mission 3 objectives.",
      "Elimination: Return to box."
    ],
    flavor: "Souvenir. Probably gives you cavities holding it.",
    imagePrompt: "Enormous, jagged alligator tooth stained neon‑green, pulsing with chemical residue."
  },
  {
    id: "old-flomanji-postcard",
    name: "Old Flomanji Postcard",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Information", "Weirdness", "Unique"],
    rules: [
      "Acquire: Gain +1 Weirdness.",
      "Use (0 Actions): Moxie Check DC 9 → On success: Gain a hint about a nearby Bonus Zone or hidden path; on failure: no effect."
    ],
    flavor: "“Wish you were here!” …Do you, though?",
    imagePrompt: "Faded postcard of a kitschy roadside attraction (giant orange or gator wrestling), cryptic message scribbled on back."
  },
  {
    id: "jewelry-box-empty",
    name: "Jewelry Box (Empty)",
    type: "treasure",
    icons: [
      { symbol: "🍀", meaning: "Luck" },
      { symbol: "🪙", meaning: "Value" }
    ],
    keywords: ["Luck", "Trade (Minor)"],
    rules: [
      "Choose one:",
      "Discard (0 Actions) before a Luck check → Gain +2 Bonus.",
      "Discard when trading → Counts as 1 basic Gear."
    ],
    flavor: "Someone got here first. Or disappointment was the treasure.",
    imagePrompt: "Ornate velvet‑lined box lying open but empty; focus on torn lining and faded elegance."
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
    imagePrompt: "Heavy golden alligator statuette with inset gem eyes, aura of latent menace."
  },
  {
    id: "hurricane-survival-guide",
    name: "Hurricane Survival Guide (Waterlogged)",
    type: "treasure",
    icons: [
      { symbol: "ℹ️", meaning: "Info" },
      { symbol: "🛍️", meaning: "Supply" },
      { symbol: "🎯", meaning: "Mission" }
    ],
    keywords: ["Information", "Mission (Hurricane)", "Supply"],
    rules: [
      "Mission 2 specific — Choose one:",
      "Discard (0 Actions) during a Hurricane Hazard check → Gain +2 Bonus on that Grit check.",
      "Discard (0 Actions) during Fortify action → Counts as 1 Supply Gear."
    ],
    flavor: "Tip #1: Evacuate. Well, that ship sailed.",
    imagePrompt: "Soggy, water‑stained government pamphlet reading “Hurricane Survival” on the cover; pages warped together."
  },
  {
    id: "pile-of-scrap-metal",
    name: "Pile of Scrap Metal",
    type: "treasure",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🔧", meaning: "Resource" }
    ],
    keywords: ["Trade Value", "Resource", "Repair"],
    rules: [
      "Choose one:",
      "Discard when trading with a Mechanic or Pawn Shop NPC → Counts as 1 basic Gear.",
      "Discard (0 Actions) with a “Duct Tape” use before a Repair check → Gain +2 Bonus."
    ],
    flavor: "One man’s trash is another’s treasure… maybe.",
    imagePrompt: "Heap of rusty pipes, bent rebar, and old car parts; gritty texture emphasizing potential utility."
  },
  {
    id: "working-payphone",
    name: "Working Payphone?",
    type: "treasure",
    icons: [
      { symbol: "☎️", meaning: "Comm" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Communication", "Weirdness", "Luck", "Unique"],
    rules: [
      "Use (1 Action): Discard → Luck Check DC 10 → On success: choose to Reduce Heat by 2 or Draw 2 Gear cards; on failure: choose to Gain 2 Weirdness or Trigger the “Sudden Street Closure” Hazard."
    ],
    flavor: "Do you even remember how to use one? Got change?",
    imagePrompt: "Vandalized phone booth with dangling receiver and glowing payphone light; overgrown weeds around base."
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
    imagePrompt: "Worn hardcover first edition with cattle‑drive scene on cover, embossed title “A Land Remembered”; focus on its aged dignity."
  }
];
