
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';

export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = [
  {
    id: "swamp-zombie",
    name: "Swamp Zombie",
    type: "flomanjified",
    icons: [
      { symbol: "💀", meaning: "Undead" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Undead", "Swamp", "Corrupted"],
    chaosAction: "Move 1 region toward the nearest non-Flomanjified Survivor. If adjacent, force them to make a Moxie check DC 10 or take 1 Damage.",
    rules: [
      "Transformation: Replace your character sheet with this card when Weirdness reaches 10 or you die",
      "Hunger: You win if all non-Flomanjified Survivors are eliminated",
      "Shambler: You may only take 1 Action per turn"
    ],
    flavor: "You've become the swamp—ancient, hungry, patient.",
    imagePrompt: "Rotted humanoid form dripping with algae and moss, glowing eyes, torn Flomanji tourist clothes still visible"
  },
  {
    id: "toxic-wraith",
    name: "Toxic Wraith",
    type: "flomanjified",
    icons: [
      { symbol: "💀", meaning: "Undead" },
      { symbol: "☣️", meaning: "Toxic" }
    ],
    keywords: ["Undead", "Toxic", "Corrupted"],
    chaosAction: "All non-Flomanjified Survivors in your Region gain +1 Weirdness. Move 1 Region toward the highest Weirdness Survivor.",
    specialAbility: "Contagion: When a Survivor becomes Flomanjified due to your effects, gain +1 Action next turn.",
    rules: [
      "Transformation: Replace your character sheet with this card when Weirdness reaches 10 or you die",
      "Corruption: You win if at least 3 Survivors become Flomanjified",
      "Toxic Cloud: Survivors in your Region cannot Rest"
    ],
    flavor: "Your very presence corrupts mind and matter alike.",
    imagePrompt: "Translucent spectral figure trailing toxic green vapor, chemical burns visible on partially dissolved form"
  },
  {
    id: "neon-phantom",
    name: "Neon Phantom",
    type: "flomanjified",
    icons: [
      { symbol: "💀", meaning: "Undead" },
      { symbol: "🌃", meaning: "Urban" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Undead", "Urban", "Weird", "Corrupted"],
    chaosAction: "Teleport to any Urban Region with a Survivor. That Survivor must make a Weird Sense check DC 11 or gain +2 Weirdness.",
    rules: [
      "Transformation: Replace your character sheet with this card when Weirdness reaches 10 or you die",
      "Sign Manipulation: May spend 1 Action to flip a face-down Region adjacent to any Urban Region",
      "Light Sensitivity: Cannot enter Exposed Regions during day cycles"
    ],
    flavor: "You flicker between reality and madness like a broken sign.",
    imagePrompt: "Humanoid silhouette composed entirely of flickering neon light tubes in various colors, signs and symbols appearing and disappearing within its form"
  }
];
