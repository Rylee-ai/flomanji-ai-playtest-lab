import { SecretObjectiveCard } from "@/types/cards";

export const SECRET_OBJECTIVES: SecretObjectiveCard[] = [
  {
    id: "heat-maximus",
    name: "Heat Maximus",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "☠️", meaning: "Saboteur" }
    ],
    keywords: ["Sabotage", "Heat"],
    rules: ["If the Mission fails because Heat reached 10, you win. Otherwise, you lose."],
    flavor: "Let's crank that heat to a boil.",
    imagePrompt: "A cracked neon thermometer spiking into a bubbling pot of glowing swamp water",
    alignment: "saboteur",
    winCondition: "heat-10"
  },
  {
    id: "betrayal-bloom",
    name: "Betrayal Bloom",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "☠️", meaning: "Saboteur" }
    ],
    keywords: ["Sabotage", "Flomanjify"],
    rules: ["If at least **two** non‑Flomanjified Survivors become Flomanjified, you win (regardless of Mission outcome). Otherwise, you lose."],
    flavor: "Nothing says loyalty like a creeping rot.",
    imagePrompt: "Two skeletal hands emerging from neon‑green slime, each clutching a survivor’s discarded card.",
    alignment: "saboteur",
    winCondition: "flomanjify-two"
  },
  {
    id: "gear-hoarder",
    name: "Gear Hoarder",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "☠️", meaning: "Saboteur" }
    ],
    keywords: ["Sabotage", "Theft"],
    rules: ["Steal or traitor‑Betray a total of **4** Gear cards from other Survivors. If you do, you win (even if the team succeeds). Otherwise, you lose."],
    flavor: "Every lucky charm has a darker side.",
    imagePrompt: "A gloved hand snatching a glowing gear card under flickering neon light.",
    alignment: "saboteur",
    winCondition: "steal-four-gear"
  },
  {
    id: "treasure-guardian",
    name: "Treasure Guardian",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "🤝", meaning: "Innocent" }
    ],
    keywords: ["Ally", "Treasure"],
    rules: ["If the Mission succeeds **and** at least **2** non‑Flomanjified Survivors extract with Treasure cards, you win. If the Mission fails or fewer survivors have Treasure, you lose."],
    flavor: "True wealth is who you bring home.",
    imagePrompt: "Two survivors clutching jeweled chests as they step onto a glowing extraction tile.",
    alignment: "innocent",
    winCondition: "mission-success-two-treasure"
  },
  {
    id: "clue-collector",
    name: "Clue Collector",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "🤝", meaning: "Innocent" }
    ],
    keywords: ["Ally", "Clue"],
    rules: ["If the Mission succeeds **and** you personally have used or hold **3** Clue tokens at extraction, you win. Otherwise, you lose."],
    flavor: "Knowledge is power… and salvation.",
    imagePrompt: "A map strewn with three marked tokens, each glowing softly under a lantern.",
    alignment: "innocent",
    winCondition: "mission-success-three-clues"
  },
  {
    id: "caregiver",
    name: "Caregiver",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "🤝", meaning: "Innocent" }
    ],
    keywords: ["Ally", "Healing"],
    rules: ["If the Mission succeeds **and** you have spent **3** Actions to heal other Survivors, you win. Otherwise, you lose."],
    flavor: "Bandages first, questions later.",
    imagePrompt: "A survivor pressing a first‑aid kit to a teammate’s wound, neon pastel spill of warmth around them.",
    alignment: "innocent",
    winCondition: "mission-success-three-heals"
  },
  {
    id: "speed-runner",
    name: "Speed Runner",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "🤝", meaning: "Innocent" }
    ],
    keywords: ["Ally", "Fast Travel"],
    rules: ["If the Mission succeeds **and** extraction occurs by the end of **Round 6**, you win. Otherwise, you lose."],
    flavor: "Fast is sometimes the only way out.",
    imagePrompt: "A survivor sprinting across a map grid, dice in mid‑roll, neon trail streaking behind.",
    alignment: "innocent",
    winCondition: "mission-success-round-six"
  },
  {
    id: "arcade-enthusiast",
    name: "Arcade Enthusiast",
    type: "secret",
    icons: [
      { symbol: "🔒", meaning: "Secret" },
      { symbol: "🎯", meaning: "Objective" },
      { symbol: "🤝", meaning: "Innocent" }
    ],
    keywords: ["Ally", "Special Zone"],
    rules: ["If the Mission succeeds **and** you have activated **PLAY ARCADE** at the Galaxy Bar at least once, you win. Otherwise, you lose."],
    flavor: "One more game—for luck and lore.",
    imagePrompt: "A lone player at a glowing arcade cabinet, weird neon symbols dancing overhead.",
    alignment: "innocent",
    winCondition: "mission-success-arcade"
  }
];
