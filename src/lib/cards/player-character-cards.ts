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
  {
    id: "carlotta",
    name: "Carlotta \"Cryptid\" Cortez",
    type: "player-character",
    role: "Freelance Cryptozoologist",
    stats: {
      brawn: 1,
      moxie: 2,
      charm: 2,
      grit: 2,
      weirdSense: 3
    },
    ability: {
      name: "Sixth Sense",
      description: "Once per turn on a Weirdness check, roll an extra d6 and add it."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Binoculars",
        type: "Tool",
        effect: "1 Action: view one adjacent Region's full Hazard/Bonus"
      },
      {
        name: "Ghost Orchid Sample",
        type: "Artifact",
        effect: "+1 Weirdness on acquire; see Guide"
      },
      {
        name: "Pocket Knife",
        type: "Weapon",
        effect: "1 Damage or +1 on cutting checks"
      },
      {
        name: "Basic Flomanji Map",
        type: "Tool",
        effect: "0 Actions: reroll one Lost/Navigate check"
      },
      {
        name: "Radioactive Gator Tooth",
        type: "Artifact",
        effect: "+1 Grit; +1 Weirdness; special Chaos effect"
      }
    ],
    icons: [
      { symbol: "👻", meaning: "Supernatural Expert" },
      { symbol: "🔍", meaning: "Investigation Expert" }
    ],
    keywords: ["survivor", "investigator", "cryptozoologist", "mystic"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "Some call her crazy, but Carlotta knows the truth is out there. And in Flomanji, the truth is stranger than fiction.",
    imagePrompt: "A determined Latina woman in her late 20s wearing hiking gear and carrying research equipment, examining mysterious tracks in the swamp."
  },
  {
    id: "jax",
    name: "Jackson \"Jax\" Rivera",
    type: "player-character",
    role: "Ex-Park Ranger",
    stats: {
      brawn: 3,
      moxie: 2,
      charm: 1,
      grit: 3,
      weirdSense: 1
    },
    ability: {
      name: "Ranger's Instinct",
      description: "In Forest/Swamp, roll 3d6 take highest two on Nature or Grit checks."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Crowbar",
        type: "Weapon",
        effect: "+1 Grit on forced-entry; 1 Damage melee"
      },
      {
        name: "Rope (50 ft)",
        type: "Tool",
        effect: "2 Uses: auto-success Grit for climbing/restraining"
      },
      {
        name: "Flashlight & Batteries",
        type: "Tool",
        effect: "4 Uses: ignore darkness or view Hazard table"
      },
      {
        name: "Bug Spray",
        type: "Consumable",
        effect: "3 Uses: 0 Actions auto-success insect hazards"
      },
      {
        name: "Map & Compass",
        type: "Tool",
        effect: "map: reroll Lost; compass: +1 Moxie vs Lost, once/game ignore penalties"
      }
    ],
    icons: [
      { symbol: "🌲", meaning: "Wilderness Expert" },
      { symbol: "🦁", meaning: "Wildlife Expert" }
    ],
    keywords: ["survivor", "ranger", "wilderness", "strong"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "After what happened at the park, Jax thought he'd seen it all. Flomanji proved him wrong.",
    imagePrompt: "A rugged man in his 30s wearing a park ranger uniform with rolled-up sleeves, wielding a crowbar and looking alert in dense forest."
  },
  {
    id: "marisol",
    name: "Marisol Vega",
    type: "player-character",
    role: "Investigative News Reporter",
    stats: {
      brawn: 1,
      moxie: 2,
      charm: 4,
      grit: 1,
      weirdSense: 2
    },
    ability: {
      name: "Deadline Drive",
      description: "On a successful Charm check, draw 1 Gear card."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Press Pass & Camera",
        type: "Tool",
        effect: "1 Action: auto-succeed one Charm check"
      },
      {
        name: "Lost Tourist's Wallet",
        type: "Tool",
        effect: "0 Actions: +2 Charm; 1 Action: draw 2 Gear & +1 Heat"
      },
      {
        name: "Energy Drink",
        type: "Consumable",
        effect: "+1 Action; end turn +1 Weirdness"
      },
      {
        name: "Baseball Bat",
        type: "Weapon",
        effect: "1 Damage; +1 Grit vs social threats"
      },
      {
        name: "Map & Compass",
        type: "Tool",
        effect: "reroll Lost; +1 Moxie vs Lost, once/game ignore penalties"
      }
    ],
    icons: [
      { symbol: "📰", meaning: "Media Expert" },
      { symbol: "🗣️", meaning: "Social Expert" }
    ],
    keywords: ["survivor", "reporter", "social", "investigator"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "They said the story was too dangerous to pursue. For Marisol, that only made it more interesting.",
    imagePrompt: "A sharp-dressed Latina reporter in her late 20s with a press pass and camera, confidently interviewing locals about strange occurrences."
  },
  {
    id: "frank",
    name: "Frank \"Snowbird\" McAllister",
    type: "player-character",
    role: "Seasonal Retiree",
    stats: {
      brawn: 2,
      moxie: 1,
      charm: 3,
      grit: 3,
      weirdSense: 1
    },
    ability: {
      name: "Winter Wisdom",
      description: "When you Rest, reduce Weirdness by 2 instead of 1."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Sunscreen (SPF 50)",
        type: "Consumable",
        effect: "3 Uses: next 2 Rounds auto-success Sunburn checks"
      },
      {
        name: "Sturdy Work Boots",
        type: "Equipment",
        effect: "ignore minor ground hazards; +1 vs snakes/ants"
      },
      {
        name: "Bag of Pork Rinds",
        type: "Consumable",
        effect: "heal 1 or +1 Grit next Grit check"
      },
      {
        name: "Mystery Novel",
        type: "Tool",
        effect: "0 Actions on Rest: reduce Weirdness by 1 extra"
      },
      {
        name: "Boombox & Batteries",
        type: "Tool",
        effect: "1 Battery: 1 Action distraction +2 Moxie stealth, +1 Heat"
      }
    ],
    icons: [
      { symbol: "👴", meaning: "Life Experience" },
      { symbol: "🌞", meaning: "Heat Resistant" }
    ],
    keywords: ["survivor", "retiree", "social", "resilient"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "Frank came to Florida for the quiet life. Now he's fighting for that life, and finding out he's tougher than he thought.",
    imagePrompt: "An elderly man in a Hawaiian shirt and cargo shorts, surprisingly spry and determined, wielding his trusty mystery novel as a weapon."
  },
  {
    id: "hannah",
    name: "Dr. Hannah Lee",
    type: "player-character",
    role: "Marine Biologist",
    stats: {
      brawn: 1,
      moxie: 2,
      charm: 1,
      grit: 3,
      weirdSense: 3
    },
    ability: {
      name: "Aquatic Affinity",
      description: "+1 Bonus on checks in Coastal/Swamp/Water; +1 DC vs Rip Current & Shark Attack."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Speargun",
        type: "Weapon",
        effect: "2 Uses: 2 Damage ranged; +1 vs aquatic"
      },
      {
        name: "Fishing Pole",
        type: "Tool",
        effect: "Luck DC 4 in water Regions: catch fish → heal 1; on natural 1 gain +1 Weirdness"
      },
      {
        name: "Binoculars",
        type: "Tool",
        effect: "1 Action: view adjacent Region's full text"
      },
      {
        name: "Lab Journal",
        type: "Tool",
        effect: "gain +1 Weirdness when triggering any water-based creature hazard"
      },
      {
        name: "Bottled Water (Case)",
        type: "Consumable",
        effect: "3 Uses: heal 1 or auto-succeed Heat Stroke"
      }
    ],
    icons: [
      { symbol: "🌊", meaning: "Water Expert" },
      { symbol: "🔬", meaning: "Science Expert" }
    ],
    keywords: ["survivor", "scientist", "aquatic", "researcher"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "Dr. Lee came to study Florida's marine life. Now she's trying to survive it.",
    imagePrompt: "An Asian woman in her 40s wearing field research gear, analyzing water samples while keeping an eye on the surrounding swamp."
  },
  {
    id: "rico",
    name: "Rico \"Roadie\" Santos",
    type: "player-character",
    role: "Motorcycle Courier",
    stats: {
      brawn: 2,
      moxie: 4,
      charm: 1,
      grit: 1,
      weirdSense: 2
    },
    ability: {
      name: "Highway Dash",
      description: "Once per turn when moving on a Highway tile (on foot or Vehicle), move +1 tile free."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Motorcycle",
        type: "Vehicle",
        effect: "1 Action: move 1-3 Highway/Urban; each use +1 Heat"
      },
      {
        name: "Helmet & Leathers",
        type: "Equipment",
        effect: "−1 Damage from vehicular hazards; +1 Moxie vs Road-rage & Panicked-Driver"
      },
      {
        name: "Gas Can (Full)",
        type: "Tool",
        effect: "1 Action: refuel Vehicle or ignite fire"
      },
      {
        name: "Flashlight & Batteries",
        type: "Tool",
        effect: "4 Uses: ignore darkness or view Hazard table"
      },
      {
        name: "Duct Tape",
        type: "Tool",
        effect: "3 Uses: auto-success Repair or negate Lose-Gear or +2 Fortify"
      }
    ],
    icons: [
      { symbol: "🏍️", meaning: "Vehicle Expert" },
      { symbol: "⚡", meaning: "Quick Movement" }
    ],
    keywords: ["survivor", "courier", "vehicle", "quick"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "Rico knows every shortcut in Florida. Now he's finding out some roads weren't meant to be taken.",
    imagePrompt: "A Latino man in his 20s wearing motorcycle leathers and a messenger bag, straddling a beat-up but reliable motorcycle."
  },
  {
    id: "tasha",
    name: "Tasha \"Treasure\" Dupree",
    type: "player-character",
    role: "Urban Treasure-Hunter",
    stats: {
      brawn: 1,
      moxie: 3,
      charm: 2,
      grit: 1,
      weirdSense: 3
    },
    ability: {
      name: "Hoarder's Instinct",
      description: "When you draw from the Treasure deck, look at 2, keep 1."
    },
    health: 5,
    weirdness: 0,
    luck: 5,
    starterGear: [
      {
        name: "Bag of Spanish Doubloons",
        type: "Treasure",
        effect: "0 Actions: +3 Charm; 1 Action: −2 Heat"
      },
      {
        name: "Bag of Holding",
        type: "Equipment",
        effect: "1 Action: draw 3 Gear, keep 1, discard 2"
      },
      {
        name: "Lockpicks",
        type: "Tool",
        effect: "1 Action: Moxie DC 4 bypass; on 1 break +1 Heat"
      },
      {
        name: "Basic Flomanji Map",
        type: "Tool",
        effect: "0 Actions: reroll Lost/Navigate check"
      },
      {
        name: "Boombox & Batteries",
        type: "Tool",
        effect: "1 Action with 1 Battery: +2 Moxie stealth, +1 Heat"
      }
    ],
    icons: [
      { symbol: "💎", meaning: "Treasure Expert" },
      { symbol: "🔓", meaning: "Lockpicking Expert" }
    ],
    keywords: ["survivor", "treasure-hunter", "explorer", "collector"],
    rules: [
      "Start with 5 Health cards in hand",
      "Discard lowest card per damage",
      "Track Weirdness on a d10, starting at 0",
      "Gain 5 Luck tokens"
    ],
    flavor: "They say one person's trash is another's treasure. In Flomanji, Tasha's finding both are trying to kill her.",
    imagePrompt: "A young Black woman with braids and practical exploring gear, examining ancient artifacts while navigating urban ruins."
  }
];

export default PLAYER_CHARACTER_CARDS;
