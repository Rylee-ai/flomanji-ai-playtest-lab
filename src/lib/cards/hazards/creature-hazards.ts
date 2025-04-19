
import { HazardCard } from '@/types/cards/hazard';

export const CREATURE_HAZARDS: HazardCard[] = [
  {
    id: "water-moccasin-ambush",
    name: "Water Moccasin Ambush",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "💧", meaning: "River" }
    ],
    keywords: ["Creature", "Hazard", "Poison"],
    rules: [
      "Grit Check DC 9 → Failure: Take 1 Damage and gain Poison (1 persistent token)",
      "Boots or Gloves: +1 Bonus on this check"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Take 1 Damage and gain 1 Poison token",
    gearBonuses: [
      {
        itemName: "Boots",
        effect: "bonus",
        bonusValue: 1
      },
      {
        itemName: "Gloves",
        effect: "bonus",
        bonusValue: 1
      }
    ],
    flavor: "Cottonmouth bites first, asks questions later.",
    imagePrompt: "A venomous snake lunging from murky swamp water at ankle level, fangs bared, ripples spreading; neon-green highlights in the water"
  },
  {
    id: "alligator-ambush",
    name: "Alligator Ambush!",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Apex Predator"],
    rules: [
      "Fight Check DC 11 → Failure: Take 2 Damage",
      "Ally Aid: Each other player here may spend 1 Action to grant +1 Bonus to your roll"
    ],
    difficultyClasses: {
      fight: 11
    },
    onFailure: "Take 2 Damage",
    flavor: "The jaws clamp—either you break free or become lunch.",
    imagePrompt: "A massive gator's snout bursting from dark water toward the viewer, teeth dripping, cypress knees framing the scene"
  },
  {
    id: "python-constrictor",
    name: "Python Constrictor",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Constrictor"],
    rules: [
      "Grit Check DC 10 → Failure: Lose 1 Action and become Immobilized until you spend 1 Action to free yourself (Grit DC 9)",
      "Machete: +2 Bonus to initial check or auto-succeed freeing yourself"
    ],
    difficultyClasses: {
      grit: 10
    },
    onFailure: "Lose 1 Action and become Immobilized until you spend 1 Action to free yourself (Grit DC 9)",
    gearBonuses: [
      {
        itemName: "Machete",
        effect: "bonus",
        bonusValue: 2
      }
    ],
    flavor: "Muscles coil tight—breathing gets hard fast.",
    imagePrompt: "Thick python wrapped tightly around a limb, scales glistening; neon-green moss and shadowy foliage loom in the background"
  },
  {
    id: "skunk-ape-sighting",
    name: "Skunk Ape Sighting!",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🦍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Creature", "Cryptid"],
    rules: [
      "Weirdness Check DC 11 → Failure: Gain +2 Weirdness. On success: Gain +1 Luck"
    ],
    difficultyClasses: {
      weirdSense: 11
    },
    onFailure: "Gain +2 Weirdness",
    onSuccess: "Gain +1 Luck",
    flavor: "You glimpse hulking fur and glowing eyes—might be better left unseen.",
    imagePrompt: "A hulking, ape-like silhouette emerging from cypress shadows, eyes glowing neon; thick outlines and eerie mist emphasize the uncanny"
  },
  {
    id: "panther-screech",
    name: "Panther Screech",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐆", meaning: "Creature" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Creature", "Ambush"],
    rules: [
      "All players here make Grit Check DC 9 → Failure: Lose 1 Luck Token"
    ],
    difficultyClasses: {
      grit: 9
    },
    onFailure: "Lose 1 Luck Token",
    flavor: "A scream that rattles bones—and steals your composure.",
    imagePrompt: "Midnight jungle scene with a panther mid-yowl from a low branch, white teeth bared; neon moonlight glints on wet leaves"
  },
  {
    id: "fire-ant-swarm",
    name: "Fire Ant Swarm",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐜", meaning: "Creature" },
      { symbol: "🌱", meaning: "Environmental" }
    ],
    keywords: ["Creature", "Insect"],
    rules: [
      "Grit Check DC 8 → Failure: Take 1 Damage and Lose 1 Luck Token",
      "Bug Spray / Mosquito Netting: Auto-Success"
    ],
    difficultyClasses: {
      grit: 8
    },
    onFailure: "Take 1 Damage and Lose 1 Luck Token",
    gearBonuses: [
      {
        itemName: "Bug Spray",
        effect: "autoSuccess"
      },
      {
        itemName: "Mosquito Netting",
        effect: "autoSuccess"
      }
    ],
    flavor: "Tiny red devils bite in relentless waves.",
    imagePrompt: "A writhing cloud of angry red ants swarming a boot, bites marked in bright red; thick outlines and neon accents amplify the sting"
  },
  {
    id: "armadillo-attack",
    name: "Armadillo Attack",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🦔", meaning: "Creature" },
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Creature", "Unpredictable"],
    rules: [
      "Moxie Check DC 9 → Failure: Take 1 Damage and Lose 1 Action (knocked over)"
    ],
    difficultyClasses: {
      moxie: 9
    },
    onFailure: "Take 1 Damage and Lose 1 Action (knocked over)",
    flavor: "Shell-backed balls of fury sprint—and they will turf you.",
    imagePrompt: "A round armadillo mid-charge, claws braced, dust cloud behind; pastel browns and thick lines give it comic menace"
  },
  {
    id: "swamp-boar-stampede",
    name: "Swamp Boar Stampede",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐗", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Stampede"],
    rules: [
      "All players here make Moxie Check DC 10 → Failure: Lose 1 Action and Take 1 Damage (trampled)"
    ],
    difficultyClasses: {
      moxie: 10
    },
    onFailure: "Lose 1 Action and Take 1 Damage (trampled)",
    flavor: "Wild boars burst through the undergrowth—run or be trampled.",
    imagePrompt: "A group of tusked boars charging through shallow water, mud flying; thick outlines and neon-pastel splashes heighten the chaos"
  },
  {
    id: "stray-dog-pack",
    name: "Stray Dog Pack",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🐕", meaning: "Creature" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Creature", "Pack"],
    rules: [
      "Fight Check DC 9 → Failure: Take 1 Damage and Discard 1 Gear (non-Weapon)"
    ],
    difficultyClasses: {
      fight: 9
    },
    onFailure: "Take 1 Damage and Discard 1 Gear (non-Weapon)",
    flavor: "Teeth flash in back alleys—no leash tames these.",
    imagePrompt: "Mangy dogs snarling in a narrow urban alley, trash and neon graffiti around; heavy outlines create tension"
  },
  {
    id: "coastal-shark-attack",
    name: "Coastal Shark Attack",
    type: "hazard",
    subType: "creature",
    icons: [
      { symbol: "🦈", meaning: "Creature" },
      { symbol: "🏖️", meaning: "Coastal" }
    ],
    keywords: ["Creature", "Aquatic"],
    rules: [
      "Fight Check DC 11 → Failure: Take 2 Damage. On success, still Lose 1 Action (recover)"
    ],
    difficultyClasses: {
      fight: 11
    },
    onFailure: "Take 2 Damage",
    onSuccess: "Lose 1 Action (recover)",
    flavor: "Jaws breach the surf—there's no escaping below.",
    imagePrompt: "A fin cutting through teal surf toward an unwary swimmer's leg, water churning; neon highlights on the wave crest for dramatic effect"
  }
];
