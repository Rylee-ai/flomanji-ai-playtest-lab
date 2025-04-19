
import { ChaosCard } from '@/types/cards/chaos';

export const CHAOS_CARDS: ChaosCard[] = [
  {
    id: "blistering-sun",
    name: "Blistering Sun",
    type: "chaos",
    icons: [
      { symbol: "☀️", meaning: "Heat" },
      { symbol: "⚠️", meaning: "Danger" }
    ],
    keywords: ["Weather", "Heat", "Global"],
    globalEffect: "All players in Exposed Regions lose 1 Health. Gain +2 Heat if 4-6 players, otherwise +1 Heat.",
    heatEffect: 2,
    rules: [
      "Shade matters: Players in Underground or Urban Regions are protected",
      "Endurance: Survivors with a Brawn of 4+ take no damage"
    ],
    flavor: "The sky burns like an angry god.",
    imagePrompt: "Blazing sun filling most of the frame, distorted heat waves rising from cracked, parched earth"
  },
  {
    id: "flotsam-and-jetsam",
    name: "Flotsam and Jetsam",
    type: "chaos",
    icons: [
      { symbol: "🌊", meaning: "Water" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Debris", "Opportunity", "Coastal"],
    globalEffect: "Each player in a Coastal Region draws 1 Gear card. Gain +1 Heat.",
    heatEffect: 1,
    rules: [
      "Treasure Hunt: 15% chance to draw from Treasure deck instead",
      "Danger: On a natural 2, draw a Hazard card instead"
    ],
    flavor: "The tide brings gifts... and curses.",
    imagePrompt: "Debris-strewn shoreline with strange objects half-buried in sand, waves washing in more items in neon-tinted foam"
  },
  {
    id: "power-outage",
    name: "Power Outage",
    type: "chaos",
    icons: [
      { symbol: "🏙️", meaning: "Urban" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Infrastructure", "Urban", "Weirdness"],
    globalEffect: "All players in Urban Regions gain +1 Weirdness. Electronics-dependent gear cannot be used until next Chaos Phase. Gain +1 Heat.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Blackout: Urban Bonus Zones cannot be used",
      "Restoration: Ends during next Chaos Phase"
    ],
    flavor: "Darkness falls suddenly, unnaturally.",
    imagePrompt: "Cityscape silhouette against night sky with all lights out except for a few scattered emergency lights and strange glows in windows"
  }
];
