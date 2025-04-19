
import { HazardCard } from '@/types/cards/hazard';

export const HAZARD_CARDS: HazardCard[] = [
  {
    id: "panther-ambush",
    name: "Panther Ambush",
    type: "hazard",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Creature", "Ambush", "Forest"],
    difficultyClasses: {
      fight: 11,
      flee: 9,
      negotiate: 13,
      outsmart: 10
    },
    onFailure: "Take 2 Damage and gain 1 Weirdness",
    rules: [
      "Surprise Attack: -1 penalty on first response roll",
      "On Success: Draw 1 Treasure"
    ],
    flavor: "Silent shadows with gleaming eyes.",
    imagePrompt: "Sleek black panther emerging from dense foliage, eyes reflecting neon glow"
  },
  {
    id: "quicksand-bog",
    name: "Quicksand Bog",
    type: "hazard",
    icons: [
      { symbol: "🏃", meaning: "Flee" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Environmental", "Trap", "Swamp"],
    difficultyClasses: {
      fight: 12,
      flee: 10,
      negotiate: 15,
      outsmart: 8
    },
    onFailure: "Take 1 Damage and discard 1 Gear card",
    rules: [
      "Slow Sink: Each round in the Quicksand adds +1 to all DCs",
      "On Success: Safe passage"
    ],
    flavor: "The ground betrays with a hungry embrace.",
    imagePrompt: "Bubbling mud surface with half-submerged debris, a hand reaching desperately upward"
  },
  {
    id: "meth-gator",
    name: "Meth Gator",
    type: "hazard",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "☣️", meaning: "Toxic" }
    ],
    keywords: ["Boss", "Creature", "Toxic"],
    difficultyClasses: {
      fight: 12,
      flee: 11,
      negotiate: 14,
      outsmart: 10
    },
    onFailure: "Take 3 Damage and gain 2 Weirdness",
    bossHazard: true,
    rules: [
      "Boss: HP = 3 × number of Survivors",
      "Toxic Bite: On failed Fight check, gain 1 Weirdness",
      "Chaos Strike: During Chaos Phase, deals 1 Damage to closest Survivor",
      "Trophy: On defeat, one player may take the Meth Gator Tooth artifact"
    ],
    flavor: "Chemical fury and ancient hunger in one package.",
    imagePrompt: "Massive alligator with glowing green eyes and crystalline scales, jaw agape with chemical steam rising from its mouth"
  }
];
