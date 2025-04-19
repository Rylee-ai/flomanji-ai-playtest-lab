import { ChaosCard } from '@/types/cards/chaos';

export const CHAOS_CARDS: ChaosCard[] = [
  {
    id: "heat-wave",
    name: "Heat Wave",
    type: "chaos",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Heat", "Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 7 → Failure: Take 1 Damage; suffer -1 penalty if in Urban or Highway Regions.",
    heatEffect: 1,
    rules: [
      "Heat penalty applies to all Urban/Highway regions",
      "Damage taken on failed Grit checks",
      "Stacks with other Heat effects"
    ],
    flavor: "The sun's fury turns pavement into lava.",
    imagePrompt: "A blistering white sun overhead, heat haze warping palm-lined streets; neon-orange mirages dance off melting asphalt"
  },
  {
    id: "flash-flood-warning",
    name: "Flash Flood Warning",
    type: "chaos",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌊", meaning: "Coastal" },
      { symbol: "💧", meaning: "River" }
    ],
    keywords: ["Environmental", "Flood", "Heat Increase"],
    globalEffect: "Increase Heat +1. Players in Swamp, Coastal, or River (or adjacent Urban/Residential): Grit DC 7 → Failure: Lose 1 non-Vehicle Gear or Take 1 Damage.",
    heatEffect: 1,
    rules: [
      "Flood damage affects coastal and river regions",
      "Gear loss on failed Grit checks",
      "Heat increase stacks with other effects"
    ],
    flavor: "The earth wasn't ready for this deluge.",
    imagePrompt: "Torrential water surging over curbs, half-submerged cars, swirling debris under dark clouds; neon reflections on rising floodwaters"
  },
  {
    id: "sinkhole-swarm",
    name: "Sinkhole Swarm",
    type: "chaos",
    icons: [
      { symbol: "🌍", meaning: "Unstable Ground" },
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🛣️", meaning: "Highway" }
    ],
    keywords: ["Environmental", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Each player rolls d6: on 1–2 (1–3 if Heat ≥ 7) immediately trigger the Sinkhole Surprise Hazard in their Region.",
    heatEffect: 1,
    rules: [
      "Sinkholes trigger hazard events",
      "Higher heat increases sinkhole frequency",
      "Dice roll determines hazard activation"
    ],
    flavor: "The ground gives way—everywhere at once.",
    imagePrompt: "Pockmarked landscapes with gaping sinkholes swallowing roads, lawns, and sidewalks; dust clouds swirl at each rim"
  },
  {
    id: "red-tide-alert",
    name: "Red Tide Alert",
    type: "chaos",
    icons: [
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "☣️", meaning: "Toxic" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Coastal", "Resource Penalty"],
    globalEffect: "Increase Heat +1. Players in Coastal: Grit DC 7 → Failure: Take 1 Damage and Gain 1 Weirdness. Until next Chaos card, Interact actions in Coastal Regions cannot find Food/Water.",
    heatEffect: 1,
    rules: [
      "Red tide affects coastal regions",
      "Resource penalty on failed Grit checks",
      "Weirdness gain on failed checks"
    ],
    flavor: "Waves of death wash ashore.",
    imagePrompt: "Blood-red water lapping onto toxic foam-lined beach, dead fish dotting sand; eerie neon-red glow under stormy sky"
  },
  {
    id: "sudden-fog-bank",
    name: "Sudden Fog Bank",
    type: "chaos",
    icons: [
      { symbol: "🌧️", meaning: "Weather" },
      { symbol: "🌫️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Movement", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, all Move actions cost +1 Action and Ranged/Spot checks suffer -1 penalty. Discard when next Chaos is drawn.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Fog bank increases movement cost",
      "Ranged and spot checks suffer penalties",
      "Persistent effect until next chaos card"
    ],
    flavor: "You can’t see your hand in front of your face.",
    imagePrompt: "Dense white fog rolling across a swamp boardwalk, obscuring all but the closest shapes; neon-pastel orbs of light barely glowing through mist"
  },
  {
    id: "rolling-blackout",
    name: "Rolling Blackout",
    type: "chaos",
    icons: [
      { symbol: "🏙️", meaning: "Urban" },
      { symbol: "⚡", meaning: "Tech" },
      { symbol: "🌡️", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Tech Penalty", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, Electronic Gear cannot be used; players in Urban/Residential must Moxie DC 7 → Failure: Lose 1 Action. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Blackout disables electronic gear",
      "Moxie checks required in urban areas",
      "Action loss on failed checks"
    ],
    flavor: "First the lights go, then the noise, then hope.",
    imagePrompt: "A city street plunged into darkness, neon signs dead, only moonlight and car headlights piercing shadows; thick outlines emphasize blackout"
  },
  {
    id: "bridge-closed-unexpectedly",
    name: "Bridge Closed Unexpectedly",
    type: "chaos",
    icons: [
      { symbol: "🛣️", meaning: "Highway" },
      { symbol: "🌊", meaning: "Water" },
      { symbol: "🌍", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Movement", "Heat Increase"],
    globalEffect: "Increase Heat +1. The next time a player tries to Move across water or between Coastal/Swamp/Highway/Urban, the path is blocked: either spend +1 Action detour or Grit DC 7 → Failure: Take 1 Damage. Applies once.",
    heatEffect: 1,
    rules: [
      "Bridge closure blocks movement",
      "Detour requires extra action",
      "Damage taken on failed Grit checks"
    ],
    flavor: "That bridge seemed safe yesterday…",
    imagePrompt: "A battered overpass crumbled in mid-span, “CLOSED” barricades in harsh neon paint blocking one lane; broken girders jut into the sky"
  },
  {
    id: "alligator-migration",
    name: "Alligator Migration",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" },
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "💧", meaning: "River" }
    ],
    keywords: ["Creature", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Spawn one Alligator Ambush! Hazard in each occupied Swamp/River/Coastal Region, plus one in a random adjacent empty such Region.",
    heatEffect: 1,
    rules: [
      "Alligator migration spawns hazards",
      "Hazards appear in swamp, river, and coastal regions",
      "Additional hazard in adjacent empty region"
    ],
    flavor: "They’re on the move—and you’re in their path.",
    imagePrompt: "Dozens of gators slithering across swamp, beach, and canal toward civilization; neon-green eyes and scales glint in fading light"
  },
  {
    id: "invasive-species-bloom",
    name: "Invasive Species Bloom",
    type: "chaos",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🌿", meaning: "Environmental" }
    ],
    keywords: ["Environmental", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. For each occupied Swamp or Coastal Region, draw and place one random Hazard card there (e.g. Python Constrictor, Fire Ant Swarm).",
    heatEffect: 1,
    rules: [
      "Invasive species trigger hazards",
      "Hazards appear in swamp and coastal regions",
      "Random hazard card drawn for each region"
    ],
    flavor: "Nature’s invaders don’t care who signed treaties.",
    imagePrompt: "Overgrown foliage bursting with alien pythons, giant snails, walking catfish; neon pastel flora tangled with dangerous fauna"
  },
  {
    id: "political-meltdown",
    name: "Political Meltdown",
    type: "chaos",
    icons: [
      { symbol: "🗳️", meaning: "Social" }
    ],
    keywords: ["Social", "Heat Increase", "Discard"],
    globalEffect: "Increase Heat +1 (instead +2 if Heat ≥ 5). All players: Discard 1 random card from hand.",
    heatEffect: 1,
    rules: [
      "Political chaos increases heat",
      "Higher heat intensifies the effect",
      "Players discard random cards"
    ],
    flavor: "Everybody’s screaming—and nobody’s listening.",
    imagePrompt: "Flickering TV screens show shouting candidates over glitchy static; a pile of discarded ballots smolders in foreground"
  },
  {
    id: "flomanji-lottery-fever",
    name: "Flomanji Lottery Fever",
    type: "chaos",
    icons: [
      { symbol: "🤑", meaning: "Social" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Social", "Luck", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Luck DC 9 → Success: Draw 1 Gear; Failure: Lose next Action.",
    heatEffect: 1,
    rules: [
      "Lottery fever increases heat",
      "Luck checks determine gear gain or action loss",
      "Gear drawn on successful checks"
    ],
    flavor: "Dreams of riches, nightmares of lines.",
    imagePrompt: "A crowded convenience store, patrons furiously scratching tickets, neon signs promising “$1 Million!” glowing overhead"
  },
  {
    id: "governor-signs-weird-law",
    name: "Governor Signs Weird Law",
    type: "chaos",
    icons: [
      { symbol: "🏛️", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Social", "Weirdness", "Choice"],
    globalEffect: "Increase Heat +1. All players choose: Lose 1 Luck or Gain 1 Weirdness.",
    heatEffect: 1,
    rules: [
      "Weird law increases heat",
      "Players choose between luck loss or weirdness gain",
      "Choice affects individual stats"
    ],
    flavor: "Bureaucracy meets lunacy in Tallahassee.",
    imagePrompt: "A governor’s desk piled with bizarre decrees, an official signing a neon-pink parchment under flickering fluorescent lights"
  },
  {
    id: "rolling-black-market-shutdown",
    name: "Rolling Black Market Shutdown",
    type: "chaos",
    icons: [
      { symbol: "🏘️", meaning: "Suburb" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Social", "Resource", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players in Urban or Residential must discard 1 Gear (non-Weapon).",
    heatEffect: 1,
    rules: [
      "Black market shutdown increases heat",
      "Gear loss in urban and residential areas",
      "Non-weapon gear discarded"
    ],
    flavor: "What you can’t buy legally fuels desperation here.",
    imagePrompt: "Shadowy figures dashing from a shuttered shop, underground stalls torn down, neon flicker from broken signs"
  },
  {
    id: "national-guard-deployment",
    name: "National Guard Deployment",
    type: "chaos",
    icons: [
      { symbol: "🛡️", meaning: "Social" },
      { symbol: "🚁", meaning: "Vehicle" }
    ],
    keywords: ["Social", "Movement Penalty", "Heat Increase"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos card, Move into/out of Urban Regions requires Charm DC 9 → Failure: Lose 1 Action. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "National guard deployment increases heat",
      "Charm checks required for urban movement",
      "Action loss on failed checks"
    ],
    flavor: "Soldiers block your path in fatigues and sidearms.",
    imagePrompt: "Humvees rumbling down urban avenues, soldiers at checkpoints; neon-green flares mark roadblocks"
  },
  {
    id: "infrastructure-strike",
    name: "Infrastructure Strike",
    type: "chaos",
    icons: [
      { symbol: "🏗️", meaning: "Environmental" },
      { symbol: "🏭", meaning: "Industrial" }
    ],
    keywords: ["Social", "Environmental", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 9 → Failure: Lose 1 Action and Gain 1 Heat.",
    heatEffect: 1,
    rules: [
      "Infrastructure strike increases heat",
      "Grit checks required for all players",
      "Action loss and heat gain on failed checks"
    ],
    flavor: "The pipes burst when no one’s there to fix them.",
    imagePrompt: "Broken water main flooding an industrial lot, steam rising through grates, riot-taped barricades fluttering"
  },
    {
    id: "tourist-season-surge",
    name: "Tourist Season Surge",
    type: "chaos",
    icons: [
      { symbol: "🏖️", meaning: "Coastal" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Social", "Movement Penalty", "Persistent"],
    globalEffect: "Increase Heat +1. Persistent: Until next Chaos, Move into or out of Urban/Tourist Regions requires Moxie DC 7 → Failure: Lose Move Action. NPC checks there suffer –1 penalty. Discard on next Chaos.",
    heatEffect: 1,
    duration: "ongoing",
    rules: [
      "Tourist surge increases heat",
      "Moxie checks required for urban movement",
      "NPC checks suffer penalties"
    ],
    flavor: "Selfies block your path; “Excuse me?” she shouts.",
    imagePrompt: "Teeming boardwalk clogged with pastel-shirted tourists and flashing cameras; thick black outlines enforce the swarm."
  },
  {
    id: "alligator-ambush",
    name: "Alligator Ambush!",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Boss Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Spawn the Meth Gator Boss (HP = 3×players) in the nearest Swamp Region.",
    heatEffect: 1,
    rules: [
      "Alligator ambush spawns boss",
      "Meth Gator boss appears in swamp",
      "Boss health scales with player count"
    ],
    flavor: "Jaws snap—can you even fight this?",
    imagePrompt: "A colossal chemically-mutated alligator lunging from swamp water, glowing eyes, dripping neon-green ichor"
  },
  {
    id: "python-constrictor-strike",
    name: "Python Constrictor Strike",
    type: "chaos",
    icons: [
      { symbol: "🐍", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Hazard Trigger", "Heat Increase"],
    globalEffect: "Increase Heat +1. Trigger a Python Constrictor Hazard in each occupied Swamp Region.",
    heatEffect: 1,
    rules: [
      "Python strike triggers hazard",
      "Python constrictor hazard appears in swamp",
      "Hazard affects occupied regions"
    ],
    flavor: "Muscle and scale squeeze the life out of you.",
    imagePrompt: "A thick python wrapped around a timber piling, squeezing with deadly intent, neon stripes on its skin"
  },
  {
    id: "fire-ant-frenzy",
    name: "Fire Ant Frenzy",
    type: "chaos",
    icons: [
      { symbol: "🐜", meaning: "Creature" },
      { symbol: "🌱", meaning: "Environmental" }
    ],
    keywords: ["Creature", "Toxin", "Heat Increase"],
    globalEffect: "Increase Heat +1. All players: Grit DC 8 → Failure: Take 1 Damage and Lose 1 Luck.",
    heatEffect: 1,
    rules: [
      "Fire ant frenzy increases heat",
      "Grit checks required for all players",
      "Damage and luck loss on failed checks"
    ],
    flavor: "Tiny devils sting your every nerve.",
    imagePrompt: "A writhing mound of crimson ants swarming up a boot, bites glowing red on pale skin; neon highlights on each insect"
  },
  {
    id: "swamp-boar-stampede",
    name: "Swamp Boar Stampede",
    type: "chaos",
    icons: [
      { symbol: "🐗", meaning: "Creature" },
      { symbol: "🐊", meaning: "Swamp" }
    ],
    keywords: ["Creature", "Stampede", "Heat Increase"],
    globalEffect: "Increase Heat +1. All here: Moxie DC 9 → Failure: Lose 1 Action and Take 1 Damage.",
    heatEffect: 1,
    rules: [
      "Boar stampede increases heat",
      "Moxie checks required for all players",
      "Action loss and damage on failed checks"
    ],
    flavor: "Hooves thunder—dodge or be trampled.",
    imagePrompt: "A pack of tusked boars charging through shallow water, mud spray in neon-pastel arcs"
  },
  {
    id: "stray-dog-pack",
    name: "Stray Dog Pack",
    type: "chaos",
    icons: [
      { symbol: "🐕", meaning: "Creature" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Creature", "Pack", "Heat Increase"],
    globalEffect: "Increase Heat +1. Fight DC 9 → Failure: Take 1 Damage and Discard 1 non-Weapon Gear.",
    heatEffect: 1,
    rules: [
      "Dog pack increases heat",
      "Fight checks required",
      "Damage and gear loss on failed checks"
    ],
    flavor: "Hungry strays turn deadly in the alleys.",
    imagePrompt: "Mangy dogs snarling under flickering streetlights, pastel graffiti walls behind, tension crackling in neon outlines"
  },
  {
    id: "meteor-shower",
    name: "Meteor Shower",
    type: "chaos",
    icons: [
      { symbol: "🌌", meaning: "Cosmic" },
      { symbol: "🔥", meaning: "Event" }
    ],
    keywords: ["Cosmic", "Damage", "Luck"],
    globalEffect: "All here: Moxie DC 11 → Failure: Take 1 Damage, Lose 1 Action, and Gain 1 Heat; Success: Gain 1 Luck.",
    heatEffect: 0,
    rules: [
      "Meteor shower causes damage",
      "Moxie checks determine outcome",
      "Luck gain on successful checks"
    ],
    flavor: "Fire falls from the sky—God help you.",
    imagePrompt: "Flaming meteors streaking violet skies, neon orange trails, splashes of impact in swamp and highway."
  },
  {
    id: "reality-tear",
    name: "Reality Tear",
    type: "chaos",
    icons: [
      { symbol: "🔮", meaning: "Weird" },
      { symbol: "💀", meaning: "Event" }
    ],
    keywords: ["Weird", "Rule-Twist", "Heat Spike"],
    globalEffect: "Weirdness DC 13 → Failure: Gain +3 Weirdness and Lose All Luck; Success: Discard 1 Event in play.",
    heatEffect: 0,
    rules: [
      "Reality tear causes weirdness",
      "Weirdness checks determine outcome",
      "Event discard on successful checks"
    ],
    flavor: "The world rips—nothing stays real.",
    imagePrompt: "A neon-pink tear in the sky, swirling green energies leaking through, twisted forms emerging."
  },
  {
    id: "swamp-witchs-curse",
    name: "Swamp Witch’s Curse",
    type: "chaos",
    icons: [
      { symbol: "🧙", meaning: "NPC" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Curse", "Weird Increase"],
    globalEffect: "Charm DC 11 → Failure: Gain +2 Weirdness and Discard 1 Gear; Success: Draw 1 Treasure.",
    heatEffect: 0,
    rules: [
      "Swamp witch curse causes weirdness",
      "Charm checks determine outcome",
      "Treasure gain on successful checks"
    ],
    flavor: "Her hex claws deeper than the marsh.",
    imagePrompt: "A moss-draped crone in a stilted shack, purple eyes aglow, gnarled staff cracking neon-green lightning."
  },
  {
    id: "ghost-orchid-fever",
    name: "Ghost Orchid Fever",
    type: "chaos",
    icons: [
      { symbol: "🌱", meaning: "Environmental" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Botanical", "Hallucination"],
    globalEffect: "At start of turn here: Weirdness DC 10 → Failure: Gain +2 Weirdness; Success: Reduce 1 Weirdness.",
    heatEffect: 0,
    rules: [
      "Ghost orchid causes weirdness",
      "Weirdness checks at start of turn",
      "Weirdness reduction on successful checks"
    ],
    flavor: "One sniff, and reality wilts.",
    imagePrompt: "A spectral white orchid dripping glowing spores, neon mist curling around petals."
  },
  {
    id: "radioactive-alligator",
    name: "Radioactive Alligator",
    type: "chaos",
    icons: [
      { symbol: "☢️", meaning: "Toxic" },
      { symbol: "🐊", meaning: "Creature" }
    ],
    keywords: ["Mutation", "Damage", "Weirdness"],
    globalEffect: "All here: Grit DC 11 → Failure: Take 2 Damage and Gain +1 Weirdness; Success: Take 1 Damage.",
    heatEffect: 0,
    rules: [
      "Radioactive alligator causes damage",
      "Grit checks determine outcome",
      "Damage and weirdness gain on failed checks"
    ],
    flavor: "Science’s monstrosity lurks in every swamp.",
    imagePrompt: "A hulking gator streaked with neon-green radiation burns, pustules oozing toxic slime."
  },
  {
    id: "meteoric-heat-spike",
    name: "Meteoric Heat Spike",
    type: "chaos",
    icons: [
      { symbol: "☀️", meaning: "Weather" },
      { symbol: "☄️", meaning: "Event" }
    ],
    keywords: ["Heat", "Cosmic", "Persistent"],
    globalEffect: "Increase Heat +2. Persistent: Until next Chaos card, all Heat gains from Chaos/Hazards are +1 extra. Discard on next Chaos.",
    heatEffect: 2,
    duration: "ongoing",
    rules: [
      "Meteoric heat spike increases heat",
      "Persistent effect increases heat gains",
      "Discarded on next chaos card"
    ],
    flavor: "Stars fall, and the air ignites.",
    imagePrompt: "A blazing meteor impact sending a crimson fireball skyward, neon shockwave rippling through air."
  },
  {
    id: "talking-alligator-prophet",
    name: "Talking Alligator Prophet",
    type: "chaos",
    icons: [
      { symbol: "🐊", meaning: "Creature" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Weird", "Choice"],
    globalEffect: "All players: Choose to Lose 1 Luck or Gain 1 Weirdness. Then, draw 1 Event card.",
    heatEffect: 0,
    rules: [
      "Talking alligator offers choice",
      "Players choose luck loss or weirdness gain",
      "Event card drawn after choice"
    ],
    flavor: "It speaks… and nobody is sure they want to listen.",
    imagePrompt: "A gator with glowing eyes perched on a stump, opening its maw as if to speak, neon-pastel runes swirling around."
  },
  {
    id: "flomanji-man-encounter",
    name: "Flomanji Man Encounter",
    type: "chaos",
    icons: [
      { symbol: "🚹", meaning: "Social" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["NPC", "Unpredictable", "Weird Increase"],
    globalEffect: "Weirdness DC 11 → Failure: Gain +2 Weirdness and Lose 1 Action; Success: Gain +1 Luck.",
    heatEffect: 0,
    rules: [
      "Flomanji man encounter causes weirdness",
      "Weirdness checks determine outcome",
      "Luck gain on successful checks"
    ],
    flavor: "Smile, nod, back away—he never looks normal.",
    imagePrompt: "A disheveled man in a stained tank top waving a rubber chicken; thick lines and neon-pink haze underscore his madness."
  },
  {
    id: "flomanjified-resurrection",
    name: "Flomanjified Resurrection",
    type: "chaos",
    icons: [
      { symbol: "💀", meaning: "Event" },
      { symbol: "🦴", meaning: "Lair" },
      { symbol: "🔮", meaning: "Weird" }
    ],
    keywords: ["Endgame", "Betrayal", "Persistent"],
    globalEffect: "If any player died this turn, at end of turn they instead flip to a Flomanjified role. Surviving players here make Grit DC 11 → Failure: Lose 1 Action and Gain 1 Heat.",
    heatEffect: 0,
    rules: [
      "Dead players become Flomanjified instead of elimination",
      "Survivors must pass Grit checks or face consequences",
      "Triggers at end of turn phase"
    ],
    flavor: "Death isn't the end—only a new beginning of terror.",
    imagePrompt: "A broken tombstone in cursed marsh, skeletal hand bursting forth, neon-purple mist swirling around"
  }
];
