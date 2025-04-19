
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';

export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = [
  {
    id: "swamp-zombie",
    name: "Swamp Zombie",
    type: "flomanjified",
    icons: [
      { symbol: "💀", meaning: "Event" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Undead"],
    chaosAction: "Choose a non-Flomanjified Survivor in your tile or an adjacent tile. They test Grit DC 9 → Failure: take 1 Damage; Success: push this Zombie 1 tile (their choice).",
    rules: ["Appears when a Survivor is Flomanjified in a swamp region"],
    flavor: "Rising from the muck with an insatiable hunger.",
    imagePrompt: "Decaying figure half-submerged in neon-green swamp water, milky eyes, dripping rot under thick black outlines."
  },
  {
    id: "toxic-wraith",
    name: "Toxic Wraith",
    type: "flomanjified",
    icons: [
      { symbol: "☣️", meaning: "Toxic" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Wraith", "Poison"],
    chaosAction: "Choose a Survivor in your tile. They test Grit DC 10 → Failure: take 1 Damage and gain 1 Weirdness; Success: nothing.",
    rules: ["Appears when a Survivor is Flomanjified in a toxic region"],
    flavor: "Invisible poison courses through your veins.",
    imagePrompt: "Gaunt, translucent specter exhaling toxic vapor, skeleton hands reaching out—hazy neon-yellow fumes swirl."
  },
  {
    id: "psychic-revenant",
    name: "Psychic Revenant",
    type: "flomanjified",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Psychic", "Torment"],
    chaosAction: "Choose a Survivor in your tile or adjacent. They test Weirdness DC 9 → Failure: gain 2 Weirdness; Success: gain 1 Luck.",
    rules: ["Appears when a Survivor with high Weirdness is Flomanjified"],
    flavor: "Your mind fractures under its mental assault.",
    imagePrompt: "Ghostly figure with glowing eyes, energy tendrils weaving into a victim's head; thick outlines and neon-pink psychic waves."
  },
  {
    id: "roadside-ghoul",
    name: "Roadside Ghoul",
    type: "flomanjified",
    icons: [
      { symbol: "🚗", meaning: "Vehicle" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Highway", "Predator"],
    chaosAction: "Choose a Survivor on a Highway tile. They test Moxie DC 10 → Failure: take 1 Damage; Success: nothing.",
    rules: ["Appears when a Survivor is Flomanjified on a highway"],
    flavor: "It steps from the wreckage—hunger in its hollow grin.",
    imagePrompt: "Ragged humanoid in oil-stained clothes lunging from a mangled car, headlights casting neon shadows."
  },
  {
    id: "neon-phantom",
    name: "Neon Phantom",
    type: "flomanjified",
    icons: [
      { symbol: "🌃", meaning: "Urban" },
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Illusion", "Stealth"],
    chaosAction: "Choose a Survivor in an Urban tile. They test Charm DC 9 → Failure: lose 1 Action and gain 1 Heat; Success: gain 1 Luck.",
    rules: ["Appears when a Survivor is Flomanjified in an urban region"],
    flavor: "It flickers in neon light—real, unreal, and deadly all at once.",
    imagePrompt: "Shimmering silhouette in a rainy city alley, neon signs reflecting off wet pavement, form pulsing and distorting."
  },
  {
    id: "cryptid-crawler",
    name: "Cryptid Crawler",
    type: "flomanjified",
    icons: [
      { symbol: "🦍", meaning: "Creature" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Cryptid", "Ambush"],
    chaosAction: "Choose a Survivor in your tile. They test Moxie DC 9 → Failure: become Immobilized (skip next Action); Success: push this Crawler 1 tile.",
    specialAbility: "May move through otherwise impassable terrain",
    rules: ["Appears when a Survivor is Flomanjified in a forest region"],
    flavor: "Eyes like embers, claws like blades—prey freezes at the sound of its hiss.",
    imagePrompt: "Low, hulking beast with glowing eyes creeping through dense underbrush, neon-green mist swirling around its limbs."
  },
  {
    id: "radioactive-gator",
    name: "Radioactive Gator",
    type: "flomanjified",
    icons: [
      { symbol: "☢️", meaning: "Toxic" },
      { symbol: "🐊", meaning: "Creature" }
    ],
    keywords: ["Mutation", "Apex Predator"],
    chaosAction: "Choose a Survivor in a Swamp tile. They test Grit DC 11 → Failure: take 2 Damage and gain 1 Weirdness; Success: take 1 Damage.",
    specialAbility: "Can move through both land and water regions",
    rules: ["Appears when a Survivor is Flomanjified near toxic waste"],
    flavor: "Its scales glow with a sick green light—and its bite burns.",
    imagePrompt: "Massive gator streaked with neon-green radiation burns, pustules oozing toxic slime."
  },
  {
    id: "underground-lurker",
    name: "Underground Lurker",
    type: "flomanjified",
    icons: [
      { symbol: "🕳️", meaning: "Underground" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Stalker", "Trap"],
    chaosAction: "Choose a Survivor in an Underground tile. They test Moxie DC 9 → Failure: lose 1 Action and take 1 Damage; Success: nothing.",
    specialAbility: "Can move through walls and barriers",
    rules: ["Appears when a Survivor is Flomanjified in an underground region"],
    flavor: "It emerges from the blackness—and the earth seems to swallow your scream.",
    imagePrompt: "Pale, eyeless horror slithering from a sewer grate, dripping neon-purple ichor on the tiles."
  },
  {
    id: "storm-specter",
    name: "Storm Specter",
    type: "flomanjified",
    icons: [
      { symbol: "🌪️", meaning: "Weather" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Elemental", "Haunt"],
    chaosAction: "Increase Heat +1. Then choose a Survivor in a Coastal tile: they test Grit DC 9 → Failure: take 1 Damage; Success: reduce Heat 1.",
    specialAbility: "May move to any region with a Weather effect",
    rules: ["Appears when a Survivor is Flomanjified during a weather event"],
    flavor: "The wind carries a whisper of dread—and then the pain.",
    imagePrompt: "Wraith wrapped in storm clouds, lightning crackling around its skeletal form, neon-blue rain cascading off its cloak."
  }
];
