
import { PlayerCharacterCard } from "@/types/cards/player-character";

export const PLAYER_CHARACTER_CARDS: PlayerCharacterCard[] = [
  {
    id: "eddie",
    name: "Eddie \"Airboat\" Alvarez",
    type: "player-character",
    role: "Everglades Tour Guide",
    stats: {
      brawn: 2,
      moxie: 4,
      charm: 1,
      grit: 2,
      weirdSense: 1
    },
    ability: {
      name: "Swamp Skimmer",
      description: "Once per turn when you enter a Swamp Region, ignore its swamp-movement cost."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Airboat",
        type: "Vehicle",
        effect: "Special movement in swamp regions"
      },
      {
        name: "Machete",
        type: "Weapon",
        effect: "+2 Damage melee; 0 Actions to clear vines"
      },
      {
        name: "Bottled Water (Case)",
        type: "Consumable",
        effect: "3 Uses: heal 1 or auto-succeed Heat Stroke"
      },
      {
        name: "Compass",
        type: "Tool",
        effect: "+1 Moxie vs Lost; once/game ignore movement penalties"
      },
      {
        name: "Zippo Lighter",
        type: "Tool",
        effect: "3 Uses: ignite fuel or intimidate minor threats"
      }
    ],
    icons: [
      { symbol: "🐊", meaning: "Swamp Specialist" },
      { symbol: "🛥️", meaning: "Vehicle Expert" }
    ],
    keywords: ["survivor", "guide", "everglades", "vehicle"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "Twenty years of guiding tourists through the Everglades taught Eddie to respect the swamp—and to know exactly when to run.",
    imagePrompt: "A weathered Hispanic man in his 40s wearing a fishing hat and sunglasses, standing confidently next to an airboat in a cypress-filled swamp."
  },
  {
    id: "sandy",
    name: "Sandy Dupree",
    type: "player-character",
    role: "Retired Roller-Derby Champion",
    stats: {
      brawn: 2,
      moxie: 3,
      charm: 2,
      grit: 2,
      weirdSense: 1
    },
    ability: {
      name: "Roller Reflexes",
      description: "When you Move (1 Action), treat your Moxie as +2 for that Move."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Baseball Bat",
        type: "Weapon",
        effect: "1 Damage; +1 Grit vs Creatures/Social"
      },
      {
        name: "First Aid Kit",
        type: "Tool",
        effect: "heal 2"
      },
      {
        name: "Sturdy Work Boots",
        type: "Equipment",
        effect: "ignore minor ground hazards; +1 vs snakes/ants"
      },
      {
        name: "Energy Drink",
        type: "Consumable",
        effect: "+1 Action; end turn +1 Weirdness"
      },
      {
        name: "Mosquito Netting",
        type: "Equipment",
        effect: "0 Actions: auto-success insect hazards when resting"
      }
    ],
    icons: [
      { symbol: "🛼", meaning: "Fast Movement" },
      { symbol: "🏃‍♀️", meaning: "Agility Expert" }
    ],
    keywords: ["survivor", "athlete", "quick", "mobile"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "In the derby, Sandy learned that sometimes the best defense is being too fast to hit. That lesson still serves her well in Flomanji.",
    imagePrompt: "A muscular woman in her 30s with colorful tattoos, wearing shorts and a tank top, with a baseball bat slung across her shoulders, looking confident and ready for action."
  },
  // Add the remaining character cards in the same format
],

export default PLAYER_CHARACTER_CARDS;
