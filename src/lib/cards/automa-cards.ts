import { AutomaCard } from "@/types/cards";

export const AUTOMA_CARDS: AutomaCard[] = [
  {
    id: "swamp-stalker",
    name: "Swamp Stalker",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature Hunter", "Solo AI"],
    rules: [
      "If you're on a Swamp Region with a Hazard:",
      "• Roll 2d6 + 3 vs DC 9 → on success remove that Hazard; on failure do nothing.",
      "Else: Move 1 tile toward the nearest Swamp Region (orthogonal)."
    ],
    flavor: "It knows every swamp path... and you are its prey.",
    imagePrompt: "Dark waters broken by ripple, unseen jaws beneath neon-green reflections",
    combatBonus: 3,
    movement: "toward-swamp"
  },
  {
    id: "coastal-scavenger",
    name: "Coastal Scavenger",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🏖️", meaning: "Coastal" }
    ],
    keywords: ["Gear Hunt", "Solo AI"],
    rules: [
      "If on a Coastal Region with a Bonus Zone:",
      "• Interact once.",
      "Else: Move 1 tile toward the nearest Coastal Region."
    ],
    flavor: "Salt in the air and treasure at your fingertips.",
    imagePrompt: "A lone figure combing a blood-red tide line under pastel dawn.",
    movement: "toward-coastal"
  },
  {
    id: "forest-ranger",
    name: "Forest Ranger",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Exploration", "Solo AI"],
    rules: [
      "Move 2 tiles toward the nearest Forest Region (choose shortest path).",
      "Ignoring non-orthogonal terrain penalties."
    ],
    flavor: "Tall pines echo with unseen footsteps.",
    imagePrompt: "Sunlight drifting through towering trunks, a map fluttering in hand."
  },
  {
    id: "urban-enforcer",
    name: "Urban Enforcer",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Hazard Clear", "Solo AI"],
    rules: [
      "If on an Urban Region with a Hazard:",
      "• Roll 2d6 + 3 vs DC 9 → on success remove that Hazard.",
      "Else: Move 1 tile toward the nearest Urban Region."
    ],
    flavor: "Sirens fade—but chaos never sleeps.",
    imagePrompt: "Rain-slick street lit by neon, shadowy form advancing on a siren’s glow.",
    combatBonus: 3,
    movement: "toward-urban"
  },
  {
    id: "highway-wrangler",
    name: "Highway Wrangler",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🛣️", meaning: "Highway" }
    ],
    keywords: ["Bonus Zone Use", "Solo AI"],
    rules: [
      "If on a Highway Region with a Bonus Zone:",
      "• Interact once.",
      "Else: Move 1 tile toward the nearest Highway Region."
    ],
    flavor: "Concrete veins pulse with hidden opportunity.",
    imagePrompt: "Endless road stretching toward neon horizon, figure trudging forward."
  },
  {
    id: "exposed-runner",
    name: "Exposed Runner",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "☀️", meaning: "Exposed" }
    ],
    keywords: ["Heat Avoidance", "Solo AI"],
    rules: [
      "Move 2 tiles toward the nearest Exposed Region that is lowest in Heat.",
      "If Galaxy Bar is in play, move toward it instead."
    ],
    flavor: "Bare skin under blistering sun—no place to hide.",
    imagePrompt: "A lone courier sprinting across white flats under a searing sky."
  },
  {
    id: "underground-hunter",
    name: "Underground Hunter",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🕳️", meaning: "Underground" }
    ],
    keywords: ["Lair Assault", "Solo AI"],
    rules: [
      "If on an Underground Region with a Hazard:",
      "• Roll 2d6 + 3 vs DC 10 → on success remove that Hazard.",
      "Else: Move 1 tile toward the nearest Underground Region."
    ],
    flavor: "Shadows hide claws sharper than steel.",
    imagePrompt: "Flickering headlamp revealing a claw-marked wall.",
    combatBonus: 3,
    movement: "toward-underground"
  },
  {
    id: "swamp-scout",
    name: "Swamp Scout",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Clue Gathering", "Solo AI"],
    rules: [
      "If on a Region with a Clue token:",
      "• Interact once (gain Clue).",
      "Else: Move 1 tile toward the nearest Clue-bearing Swamp Region."
    ],
    flavor: "Each footprint whispers direction.",
    imagePrompt: "Mossy path dotted with half-buried tokens in neon murk."
  },
  {
    id: "coastal-voyager",
    name: "Coastal Voyager",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🏖️", meaning: "Coastal" }
    ],
    keywords: ["Extraction Priority", "Solo AI"],
    rules: [
      "If you have visited Extraction Region:",
      "• Move 1 tile toward Extraction.",
      "Else:",
      "• Move 1 tile toward nearest Coastal Region."
    ],
    flavor: "Horizon calls, safety awaits.",
    imagePrompt: "Distant lifeboat beacon flickering over rolling waves."
  },
  {
    id: "urban-adventurer",
    name: "Urban Adventurer",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Bonus Zone Use", "Solo AI"],
    rules: [
      "If on a Souvenir Stand or ATM (Urban Bonus Zone):",
      "• Interact once.",
      "Else: Move 1 tile toward nearest Urban Bonus Zone."
    ],
    flavor: "Souvenirs hide secrets.",
    imagePrompt: "Glittering shop window filled with odd trinkets."
  },
  {
    id: "coastal-predator",
    name: "Coastal Predator",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐟", meaning: "Creature" }
    ],
    keywords: ["Aquatic Combat", "Solo AI"],
    rules: [
      "If on a Coastal tile adjacent to a Creature Hazard:",
      "• Roll 2d6 + 3 vs DC 10 → on success remove that Hazard.",
      "Else: Move 1 tile toward nearest Coastal Creature Hazard."
    ],
    flavor: "Silent fins become lethal shadows.",
    imagePrompt: "Dark fin breaching neon surf toward an unwary form.",
    combatBonus: 3,
    movement: "toward-coastal-creature-hazard"
  },
  {
    id: "exposed-seeker",
    name: "Exposed Seeker",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "☀️", meaning: "Exposed" }
    ],
    keywords: ["Shade Search", "Solo AI"],
    rules: [
      "If on a Region with Shade-Search bonus (e.g. Salt Flats mirage):",
      "• Interact once (reduce Heat).",
      "Else: Move 1 tile toward nearest Exposed Region."
    ],
    flavor: "Any shadow is sanctuary.",
    imagePrompt: "A collapsing ray of light catching weary traveler at a lone cactus."
  },
  {
    id: "weather-chaser",
    name: "Weather Chaser",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🌧️", meaning: "Weather" }
    ],
    keywords: ["Hazard Response", "Solo AI"],
    rules: [
      "Move 1 tile toward the Region most recently hit by a Weather Chaos card."
    ],
    flavor: "Storm’s eye hides its ugliest truths.",
    imagePrompt: "Dark sky swirling overhead, wind whipping neon-sprayed leaves."
  },
  {
    id: "boss-battler",
    name: "Boss Battler",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐊", meaning: "Creature" }
    ],
    keywords: ["Boss Engagement", "Solo AI"],
    rules: [
      "If on the Boss Hazard’s tile:",
      "• Roll 2d6 + 3 vs Boss DC → remove 1 HP per success.",
      "Else: Move 1 tile toward nearest Boss Region."
    ],
    flavor: "One roll could end the nightmare… or your fate.",
    imagePrompt: "Massive silhouette looming in swamp fog under neon glint.",
    combatBonus: 3,
    movement: "toward-boss"
  },
  {
    id: "forest-gatherer",
    name: "Forest Gatherer",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🌳", meaning: "Forest" }
    ],
    keywords: ["Supply Scavenge", "Solo AI"],
    rules: [
      "If on a Region with a Supply Bonus:",
      "• Interact once (draw Gear/Consumable).",
      "Else: Move 1 tile toward nearest Forest Bonus Zone."
    ],
    flavor: "Leaves hide more than shade.",
    imagePrompt: "Overgrown clearing littered with glowing supplies."
  },
  {
    id: "vehicle-seeker",
    name: "Vehicle Seeker",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "⛽", meaning: "Vehicle" }
    ],
    keywords: ["Vehicle Acquisition", "Solo AI"],
    rules: [
      "Move 1 tile toward the nearest Vehicle-relevant Region (Highway or Gas Station)."
    ],
    flavor: "Wheels are freedom; you chase them relentlessly.",
    imagePrompt: "Flickering gas pumps glowing under storm clouds."
  },
  {
    id: "aquatic-fighter",
    name: "Aquatic Fighter",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🌊", meaning: "Water" }
    ],
    keywords: ["Aquatic Combat", "Solo AI"],
    rules: [
      "If on a Coastal or River Region with a Hazard:",
      "• Roll 2d6 + 3 vs DC 11 → remove that Hazard on success.",
      "Else: Move 1 tile toward nearest Water-based Hazard."
    ],
    flavor: "Waves crash… and so will you.",
    imagePrompt: "Roiling water around a struggling silhouette.",
    combatBonus: 3,
    movement: "toward-water-hazard"
  },
  {
    id: "weird-wanderer",
    name: "Weird Wanderer",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Occult Pursuit", "Solo AI"],
    rules: [
      "If on a Weird-tagged Bonus Zone (Echo Chamber, etc.):",
      "• Interact once (draw Artifact-Proxy or Event).",
      "Else: Move 1 tile toward nearest Weird-tagged Region."
    ],
    flavor: "Unnatural whispers guide your path.",
    imagePrompt: "Strange glyphs pulsing on cracked stone floors."
  },
  {
    id: "suburb-scout",
    name: "Suburb Scout",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🏘️", meaning: "Suburb" }
    ],
    keywords: ["Civilian Search", "Solo AI"],
    rules: [
      "Move 1 tile toward the nearest Suburb Region."
    ],
    flavor: "Manicured lawns betray hidden horrors.",
    imagePrompt: "Endless rows of pastel homes under neon streetlamps."
  },
  {
    id: "insect-exterminator",
    name: "Insect Exterminator",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐜", meaning: "Insect" }
    ],
    keywords: ["Pest Control", "Solo AI"],
    rules: [
      "If on a Region infested with insects (e.g. Mosquito Infestation):",
      "• Roll 2d6 + 3 vs DC 8 → remove that Hazard on success.",
      "Else: Move 1 tile toward that named Region."
    ],
    flavor: "Bite back or be devoured.",
    imagePrompt: "A swarm of glowing red ants overrunning cracked earth.",
    combatBonus: 3
  },
  {
    id: "food-forager",
    name: "Food Forager",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🍲", meaning: "Food" }
    ],
    keywords: ["Consumable Hunt", "Solo AI"],
    rules: [
      "If on a Food-tagged Region (Diner, Grocery):",
      "• Interact once (draw Consumable).",
      "Else: Move 1 tile toward nearest Food Region."
    ],
    flavor: "Weakness fades with every bite.",
    imagePrompt: "Neon diner lights illuminating steaming plates."
  },
  {
    id: "road-runner",
    name: "Road Runner",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🛣️", meaning: "Highway" }
    ],
    keywords: ["Rapid Transit", "Solo AI"],
    rules: [
      "Move 3 tiles along Highway grid (orthogonal only)."
    ],
    flavor: "Tire tracks and dust mark your passage.",
    imagePrompt: "Dust cloud billowing behind a speeding silhouette."
  },
  {
    id: "event-resolver",
    name: "Event Resolver",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Hazard Clearing", "Solo AI"],
    rules: [
      "If on a Region with an unresolved Event:",
      "• Resolve it as a Hazard (DC 9 fight).",
      "Else: Move 1 tile toward nearest Event Region."
    ],
    flavor: "Chaos beckons your blade.",
    imagePrompt: "Ember-glowing portal crackling in deserted street.",
    combatBonus: 3,
    movement: "toward-event"
  },
  {
    id: "tech-tinkerer",
    name: "Tech Tinkerer",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "⚙️", meaning: "Tech" }
    ],
    keywords: ["Artifact Hunt", "Solo AI"],
    rules: [
      "If on Buried Research Vault or Data Terminal:",
      "• Interact once (draw Artifact-Proxy).",
      "Else: Move 1 tile toward nearest Tech-tagged Region."
    ],
    flavor: "Forgotten science calls your name.",
    imagePrompt: "Flickering console screens beneath a vaulted chamber."
  },
  {
    id: "urban-explorer",
    name: "Urban Explorer",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Unvisited Pursuit", "Solo AI"],
    rules: [
      "Move 1 tile toward the nearest Urban Region you haven’t visited yet; if all visited, move randomly."
    ],
    flavor: "Fresh streets mean fresh opportunities… or dangers.",
    imagePrompt: "Neon-lit alley turns, footprints in glowing puddles."
  },
  {
    id: "boar-hunter",
    name: "Boar Hunter",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🐗", meaning: "Creature" }
    ],
    keywords: ["Stampede Survival", "Solo AI"],
    rules: [
      "If on a Swamp or Forest with Boar Stampede Hazard:",
      "• Roll 2d6 + 3 vs DC 10 → remove that Hazard on success.",
      "Else: Move 1 tile toward nearest such Region."
    ],
    flavor: "Tusk-shadows charge through undergrowth.",
    imagePrompt: "A blur of tusked silhouettes racing through neon-green ferns.",
    combatBonus: 3
  },
  {
    id: "underground-explorer",
    name: "Underground Explorer",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🕳️", meaning: "Underground" }
    ],
    keywords: ["Hidden Cache", "Solo AI"],
    rules: [
      "If on Bunker/Closet/Hatch Region:",
      "• Interact once (draw Gear/Treasure).",
      "Else: Move 1 tile toward nearest Underground Bonus Zone."
    ],
    flavor: "Buried secrets lie just beneath your feet.",
    imagePrompt: "Dim hatchway cracked open, a beam of pastel light within."
  },
  {
    id: "heat-seeker",
    name: "Heat Seeker",
    type: "automa",
    icons: [
      { symbol: "🏃", meaning: "Move" },
      { symbol: "🌡️", meaning: "Heat" }
    ],
    keywords: ["Thermal Regulation", "Solo AI"],
    rules: [
      "Move 1 tile toward the lowest-Heat Region you’ve visited; ignore Heat otherwise.",
      "If Galaxy Bar is in play, move toward it."
    ],
    flavor: "Chill is a rare luxury.",
    imagePrompt: "Steam rising from pavement under a neon thermometer glow."
  },
  {
    id: "shark-fighter",
    name: "Shark Fighter",
    type: "automa",
    icons: [
      { symbol: "⚔️", meaning: "Fight" },
      { symbol: "🦈", meaning: "Creature" }
    ],
    keywords: ["Coastal Combat", "Solo AI"],
    rules: [
      "If on a Coastal Region with Shark Attack Hazard:",
      "• Roll 2d6 + 3 vs DC 11 → remove that Hazard on success.",
      "Else: Move 1 tile toward nearest Coastal Creature Hazard."
    ],
    flavor: "A dorsal fin can mean death.",
    imagePrompt: "Churning teal surf lit by neon underbelly flickers.",
    combatBonus: 3,
    movement: "toward-coastal-creature-hazard"
  },
  {
    id: "social-stalker",
    name: "Social Stalker",
    type: "automa",
    icons: [
      { symbol: "🤝", meaning: "Interact" },
      { symbol: "🗣️", meaning: "Social" }
    ],
    keywords: ["NPC Engagement", "Solo AI"],
    rules: [
      "If on any NPC-trigger Region and that NPC hasn’t acted this round:",
      "• Interact once.",
      "Else: Move 1 tile toward nearest NPC-rich Region."
    ],
    flavor: "Every voice is another clue… or trap.",
    imagePrompt: "Crowded street corner under neon signs, silent figure in the crowd."
  }
];
