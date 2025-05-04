import { GearCard } from '@/types/cards/gear';

/**
 * Complete collection of Flomanji gear cards
 * These follow the official rule text from the Player's Guide
 */
export const FLOMANJI_GEAR_CARDS: GearCard[] = [
  {
    id: "shrimp-sauce-repellent",
    name: "Shrimp Sauce Repellent",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🐞", meaning: "Bug" },
      { symbol: "🤢", meaning: "Odor" }
    ],
    keywords: ["One-Time Use", "Insect Repellent", "Grit Boost"],
    rules: [
      "Discard this card to cancel the effects of any insect-based Hazard just announced by the Goblet. Gain +1 Grit for your next Stat Check. The Goblet might comment on the smell."
    ],
    flavor: "Goblet: 'Phew! That stings the ol' sensors... but the bugs seem to hate it more. Grit +1.'",
    imagePrompt: "A squeeze bottle labeled \"Bayou Blend Shrimp Sauce\" next to mosquito wings mid-fall.",
    consumable: true
  },
  {
    id: "flip-flops-reinforced",
    name: "Flip-Flops (Reinforced)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "👡", meaning: "Footwear" },
      { symbol: "🏞️", meaning: "Terrain" }
    ],
    keywords: ["Movement Buff", "Heat Reduction", "Fashion Penalty"],
    rules: [
      "While equipped, ignore 1 movement penalty per round announced by the Goblet (e.g., difficult terrain). Suffer -1 Charm on all relevant Stat Checks (Goblet will factor this in)."
    ],
    flavor: "Goblet: 'Function over fashion... a bold choice. Movement penalties eased, social standing... compromised.'",
    imagePrompt: "Heavy-duty flip-flops with duct tape reinforcements and airboat tread soles.",
    passive: "Ignore 1 movement penalty per round"
  },
  {
    id: "duct-tape-raft-kit",
    name: "Duct Tape Raft Kit",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "💧", meaning: "Water" },
      { symbol: "🔨", meaning: "Build" }
    ],
    keywords: ["Craftable", "Escape Tool", "Combo Piece"],
    rules: [
      "If you also have 'Pool Noodles' equipped, declare \"Crafting Raft!\" Discard both cards to cross any one water-based Region freely this turn, ignoring hazards within it. The Goblet confirms raft success."
    ],
    flavor: "Goblet: 'Impressive ingenuity... or desperation. It floats. For now.'",
    imagePrompt: "A half-wrapped raft made of pool noodles and industrial tape bobbing in swamp water.",
    consumable: true
  },
  {
    id: "emergency-sublix-wrapper",
    name: "Emergency Sublix Wrapper",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🥪", meaning: "Food" },
      { symbol: "🗣️", meaning: "Negotiation" }
    ],
    keywords: ["Distraction Tool", "Social Use", "Single Use"],
    rules: [
      "Discard during an NPC interaction. Gain +1 Charm for the next Stat Check against that NPC. The Goblet acknowledges the offering."
    ],
    flavor: "Goblet: 'Ah, the scent of processed meat and desperation. A classic bribe. Charm +1.'",
    imagePrompt: "A slightly greasy wrapper glinting heroically in the sun.",
    consumable: true
  },
  {
    id: "pool-noodles",
    name: "Pool Noodles",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🏊", meaning: "Float" },
      { symbol: "🛠️", meaning: "Improv" }
    ],
    keywords: ["Combo Piece", "Floatation", "Improvised Use"],
    rules: [
      "While equipped: Once per game, declare \"Cooling Down!\" to negate 1 Heat increase announced by the Goblet. Required for 'Duct Tape Raft Kit' combo."
    ],
    flavor: "Goblet: 'Surprisingly versatile. Less buoyant than hope, though.'",
    imagePrompt: "Sun-faded pool noodles lashed together like a primitive raft."
  },
  {
    id: "retired-fwc-badge",
    name: "Retired FWC Badge",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "👮", meaning: "Authority" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["Bluff Tool", "NPC Influence"],
    rules: [
      "Once per game, declare \"Flashing the Badge!\" before a Charm Check against an NPC. The Goblet confirms automatic success. Remains equipped."
    ],
    flavor: "Goblet: 'They don't know it's expired. Confidence is key. Check passed.'",
    imagePrompt: "A rusted badge with \"Florida Wildlife (Retired-ish)\" etched in duct tape."
  },
  {
    id: "no-see-um-netting",
    name: "No-See-Um Netting",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🦟", meaning: "Insect" },
      { symbol: "🏕️", meaning: "Survival" }
    ],
    keywords: ["Defense Tool", "Condition Prevention"],
    rules: [
      "While equipped, you are immune to effects from insect-based Hazards announced by the Goblet. Occupies 1 gear slot."
    ],
    flavor: "Goblet: 'They still buzz... but their tiny wrath is thwarted. Immunity granted.'",
    imagePrompt: "A full-body mesh suit hanging on a line next to scorched bug wings."
  },
  {
    id: "bug-zapper-sceptre",
    name: "Bug Zapper Sceptre",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "⚔️", meaning: "Combat" },
      { symbol: "🦟", meaning: "Insect" }
    ],
    keywords: ["Hazard Modifier", "Humor", "Weapon-Like"],
    rules: [
      "Once per game, after failing a Stat Check against an insect-based Hazard, declare \"Zap!\" The Goblet allows a reroll (reshake the Goblet). If used dramatically (player must make zapping noises), gain +1 Grit for that check."
    ],
    flavor: "Goblet: 'The satisfying sizzle of vengeance! Reroll granted.'",
    imagePrompt: "A glowing electric tennis racket with gator teeth marks on the handle.",
    actionCost: 1
  },
  {
    id: "truck-nutz-amulet",
    name: "Truck Nutz Amulet",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🍀", meaning: "Luck" },
      { symbol: "⚠️", meaning: "Cursed" }
    ],
    keywords: ["Luck Modifier", "Curse Risk", "Regional Lore"],
    rules: [
      "While equipped: +1 Luck on all relevant Stat Checks (Goblet confirms bonus). Suffer -1 Charm on all relevant Stat Checks. Cannot be unequipped once used in a check. The Goblet may occasionally whisper unsettling things."
    ],
    flavor: "Goblet: 'Shiny... distracting... slightly cursed. Luck up, Charm down. Permanently.'",
    imagePrompt: "A shimmering pair of chrome truck nuts dangling from a moss-draped branch like a talisman."
  },
  {
    id: "mosquito-candle-lit",
    name: "Mosquito Candle (Lit)",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🕯️", meaning: "Light" },
      { symbol: "🦟", meaning: "Insect" }
    ],
    keywords: ["Temporary Aura", "Bug Repellent", "Area Effect"],
    rules: [
      "Discard to activate. For the next 3 rounds (tracked by the Goblet), players ending their turn in your Region ignore Heat increases during the Chaos Phase and are immune to insect effects. Goblet announces when effect expires."
    ],
    flavor: "Goblet: 'Citronella sphere activated. A temporary truce in the war against tiny vampires.'",
    imagePrompt: "A flickering citronella candle glowing like a holy artifact in the dark.",
    consumable: true,
    uses: 3
  },
  {
    id: "tarp-of-invisibility",
    name: "Tarp of Invisibility(?)",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🏕️", meaning: "Cover" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Shelter", "Sneak", "Escape Tool"],
    rules: [
      "Once per game, declare \"Hiding under the tarp!\" to automatically avoid the effects of one non-combat Hazard targeting you. If used during a storm Event (announced by Goblet), also negate the next Heat increase for yourself."
    ],
    flavor: "Goblet: 'Out of sight, out of... well, still in Flomanji. Hazard avoided.'",
    imagePrompt: "A frayed camo tarp draped over a lawn chair, with glowing eyes peeking from underneath."
  },
  {
    id: "gator-tooth-necklace",
    name: "Gator-Tooth Necklace",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🐊", meaning: "Animal" },
      { symbol: "✨", meaning: "Charm" }
    ],
    keywords: ["NPC Influence", "Bluff", "Ego Boost"],
    rules: [
      "While equipped: +1 Charm on Stat Checks involving animal-related encounters or NPCs. Player must make a growling/snarling sound when interacting; otherwise, the Goblet negates the bonus for that check."
    ],
    flavor: "Goblet: 'Channeling the apex predator... or just looking intimidating. Charm +1, if you commit to the bit.'",
    imagePrompt: "A necklace of real gator teeth glowing in humidity.",
    statBonus: {
      stat: "charm",
      value: 1
    }
  },
  {
    id: "giant-styrofoam-cup",
    name: "Giant Styrofoam Cup",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "❄️", meaning: "Cooling" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Heat Reduction", "Buff", "Single Use"],
    rules: [
      "Discard this card. Declare \"Big Gulp of Relief!\" Negate the next 2 points of Heat increase announced by the Goblet (can span multiple rounds). Gain +1 Luck on your next Stat Check."
    ],
    flavor: "Goblet: 'Ah, the insulating power of cheap foam. Heat reduced by 2. Momentary Luck increase.'",
    imagePrompt: "A sweat-drenched Styrofoam cup sitting next to an airboat prop.",
    consumable: true
  },
  {
    id: "croc-inspired-toes",
    name: "Croc-Inspired Toes",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "👡", meaning: "Footwear" },
      { symbol: "🤪", meaning: "Insanity" }
    ],
    keywords: ["Movement Buff", "Heat Resistance", "Humiliation"],
    rules: [
      "While equipped: +1 Movement in swamp Regions (declare bonus when moving). Suffer -1 Charm on all relevant Stat Checks. Can combo with 'Speed Shorts'."
    ],
    flavor: "Goblet: 'Aerodynamic. Hydrodynamic. Socially problematic. Move faster in swamps, Charm -1.'",
    imagePrompt: "A pair of neon crocs with gator eye decals and swamp grime.",
    statBonus: {
      stat: "charm",
      value: -1
    }
  },
  {
    id: "bubbas-airhorn",
    name: "Bubba's Airhorn",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "📢", meaning: "Sound" },
      { symbol: "😱", meaning: "Panic" }
    ],
    keywords: ["Distraction", "Escape Tool", "NPC Aggro"],
    rules: [
      "Discard to use. Declare \"Sound the Horn!\" Cancel one non-combat Hazard involving an NPC targeting you or your group. All players in the region suffer -1 Charm on their next NPC interaction. The Goblet plays a loud horn sound effect."
    ],
    flavor: "GOBLET: BWAAAAAAAH! 'Effective... and obnoxious. Hazard cancelled. Charm penalized.'",
    imagePrompt: "A dented airhorn with racing stripes and a sticker: \"Bubba Approved.\"",
    consumable: true
  },
  {
    id: "handheld-misting-fan",
    name: "Handheld Misting Fan",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "❄️", meaning: "Cooling" },
      { symbol: "✨", meaning: "Luxury" }
    ],
    keywords: ["Heat Control", "Social Debuff", "Cosmetic"],
    rules: [
      "While equipped: If you take no Move actions on your turn, declare \"Misting Break\" to negate 1 point of the next Heat increase during the Chaos Phase. Suffer -1 Grit on all relevant Stat Checks (due to focusing on comfort)."
    ],
    flavor: "Goblet: 'A futile, yet stylish, gesture against the inevitable. Minor Heat relief, major Grit penalty.'",
    imagePrompt: "A glitter-pink misting fan spritzing itself heroically.",
    statBonus: {
      stat: "grit",
      value: -1
    }
  },
  {
    id: "gas-station-taquito",
    name: "Gas Station Taquito",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🌮", meaning: "Food" },
      { symbol: "❤️", meaning: "Health" }
    ],
    keywords: ["Risk/Reward", "Grit Boost", "Humor"],
    rules: [
      "Discard to use. Declare \"Taquito Time!\" Shake the Goblet for a Luck Check (DC 4). Goblet announces result: Success = +1 Grit and Heal 1 Damage. Failure = Take 1 Damage (Goblet: \"Bad taquito!\")."
    ],
    flavor: "Goblet: 'A culinary gamble. Roll for intestinal fortitude...'",
    imagePrompt: "A greasy, glowing taquito on a torn wrapper beside a crumpled receipt.",
    consumable: true
  },
  {
    id: "tire-swing-shield",
    name: "Tire Swing Shield",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛡️", meaning: "Defense" },
      { symbol: "🛠️", meaning: "Improv" }
    ],
    keywords: ["Damage Block", "Improvised Defense", "Bulky"],
    rules: [
      "Once per game, declare \"Tire Defense!\" to completely block up to 2 points of damage from a single Hazard source. Takes up 2 gear slots while equipped."
    ],
    flavor: "Goblet: 'Recycled resilience! Damage blocked. Mobility... slightly hampered.'",
    imagePrompt: "A sun-faded tire swing strapped to a player's back with twine and bravado."
  },
  {
    id: "dollar-store-magic-8-ball",
    name: "Dollar Store Magic 8-Ball",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "🍀", meaning: "Luck" }
    ],
    keywords: ["Decision Aid", "Risk Tool", "Reroll"],
    rules: [
      "Discard this card after failing any Stat Check. Declare \"Ask the 8-Ball!\" The Goblet allows a reroll (reshake the Goblet) but might provide a cryptic or unhelpful voice line regardless of the new outcome."
    ],
    flavor: "Goblet: 'Consulting the plastic oracle... Reroll granted. Answer... hazy.'",
    imagePrompt: "A scratched-up 8-ball floating in a bowl of rainwater.",
    consumable: true
  },
  {
    id: "legendary-fanny-pack",
    name: "Legendary Fanny Pack",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🎒", meaning: "Inventory" },
      { symbol: "🏆", meaning: "Legacy" }
    ],
    keywords: ["Storage", "Combo Boost", "Iconic Gear"],
    rules: [
      "While equipped, your maximum hand size increases by 1 and you gain +1 passive Gear equip slot. If this item is lost or stolen, lose 1 Grit permanently (Goblet narrates the loss)."
    ],
    flavor: "Goblet: 'Behold! Maximum storage, minimum style. More stuff, more to lose.'",
    imagePrompt: "A gleaming fanny pack stitched with \"Property of Flomanji Survivor #001.\""
  },
  {
    id: "speed-shorts",
    name: "Speed Shorts",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "⚡", meaning: "Speed" },
      { symbol: "👕", meaning: "Fashion" }
    ],
    keywords: ["Movement Buff", "Combo", "Heat Vulnerable"],
    rules: [
      "While equipped: Gain +1 Movement (can take an extra Move action if desired, costing 1 action). If also wearing 'Croc-Inspired Toes', gain +1 Grit. During storm Events (announced by Goblet), take +1 Heat personally at the end of your turn."
    ],
    flavor: "Goblet: 'Less fabric, more velocity! Move faster. Suffer more in storms.'",
    imagePrompt: "Neon-orange nylon shorts fluttering on a clothesline, glowing in the sun."
  },
  {
    id: "roadshoulder-lounge-chair",
    name: "Roadshoulder Lounge Chair",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🪑", meaning: "Comfort" },
      { symbol: "❤️‍🩹", meaning: "Recovery" }
    ],
    keywords: ["Heat Control", "Healing", "Stationary Use"],
    rules: [
      "If you performed no Move actions on your turn, you may declare \"Lounging\" at the end of your Action Phase. If you do, negate 1 Heat increase for yourself during the next Chaos Phase and Heal 1 damage. Cannot be used if Hazards are present."
    ],
    flavor: "Goblet: 'Strategic inactivity. A rare moment of peace... probably temporary. Heal 1, reduce Heat next round.'",
    imagePrompt: "A beat-up lawn chair reclined beside a swampy rest stop, beer can on armrest."
  },
  {
    id: "bug-spray-triple-strength",
    name: "Bug Spray (Triple Strength)",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🧴", meaning: "Spray" },
      { symbol: "🦟", meaning: "Insect" }
    ],
    keywords: ["One-Time Use", "Multi-Effect", "Area Buff"],
    rules: [
      "Discard to use. Declare \"Decontamination!\" All players currently in your Region ignore insect effects until the start of your next turn. The Goblet confirms the area is clear (temporarily)."
    ],
    flavor: "Goblet: 'Chemical warfare deployed! Zone temporarily secured from the tiny buzzing menace.'",
    imagePrompt: "A red-capped aerosol can with hand-written \"MAX KILL\" label taped on it.",
    consumable: true
  }
];

// Export additional cards in smaller batches to keep module size manageable
export const FLOMANJI_GEAR_CARDS_PART2: GearCard[] = [
  {
    id: "gator-gripped-jaw-clamps",
    name: "Gator-Gripped Jaw Clamps",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🐊", meaning: "Animal" }
    ],
    keywords: ["Utility Tool", "Combo Enabler", "Physical Hazard Reducer"],
    rules: [
      "While equipped: +1 Grit on Stat Checks involving terrain, traps, or physical obstacles announced by the Goblet. Automatically succeed on any check specifically involving slipping."
    ],
    flavor: "Goblet: 'Get a grip! Literally. Bonus Grit for physical challenges. No slipping allowed.'",
    imagePrompt: "Bright green clamp tools with faux gator jaws used as makeshift climbing hooks.",
    statBonus: {
      stat: "grit",
      value: 1
    }
  },
  {
    id: "rv-window-shard-dagger",
    name: "RV Window Shard Dagger",
    type: "gear",
    category: "weapon",
    icons: [
      { symbol: "🗡️", meaning: "Weapon" },
      { symbol: "🛠️", meaning: "Improv" }
    ],
    keywords: ["Improvised Weapon", "NPC Threat", "Combo Enabler"],
    rules: [
      "Once per game, declare \"Don't Make Me Use This!\" to automatically succeed on one non-combat Stat Check meant to intimidate or deter an NPC. If also equipped with 'Retired FWC Badge', gain +1 Grit for that turn."
    ],
    flavor: "Goblet: 'A shard of someone's vacation nightmare... surprisingly persuasive. Check passed.'",
    imagePrompt: "A glass shard wrapped in duct tape, glinting with vengeance.",
    actionCost: 1
  },
  {
    id: "tiki-torch-stake",
    name: "Tiki Torch Stake",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🔥", meaning: "Fire" },
      { symbol: "🚫", meaning: "Crowd Control" }
    ],
    keywords: ["Ritual Object", "Area Disruption", "Risk/Reward"],
    rules: [
      "Discard to use. Declare \"Light the Torch!\" All NPCs currently in your Region immediately leave (discard their cards if applicable). The Goblet plays a crackling fire sound. During the next Chaos Phase, Heat increases by an additional +1."
    ],
    flavor: "Goblet: 'Fire! Purifying... and attention-grabbing. NPCs retreat. Heat rises.'",
    imagePrompt: "A tiki torch burning wildly among lawn gnomes and lawn chairs.",
    consumable: true
  },
  {
    id: "neon-whistle",
    name: "Neon Whistle",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "📢", meaning: "Sound" },
      { symbol: "📲", meaning: "Summon" }
    ],
    keywords: ["Summon Tool", "NPC Bait", "Random Outcome"],
    rules: [
      "Discard to use. Declare \"Blowing the Whistle!\" The Goblet plays a piercing whistle sound and announces a random NPC arriving at your location at the start of the next round (draw from NPC deck). Shake the Goblet for a Luck Check (DC 4): Success = NPC is helpful (treat as positive interaction). Fail = NPC is hostile or problematic."
    ],
    flavor: "Goblet: 'Who answers the call? Roll for... consequences.'",
    imagePrompt: "A glowing pink whistle hanging from a cracked keychain by an Everglades outpost sign.",
    consumable: true
  },
  {
    id: "swamp-mire-cleats",
    name: "Swamp Mire Cleats",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "👟", meaning: "Footwear" },
      { symbol: "🏕️", meaning: "Survival" }
    ],
    keywords: ["Movement Buff", "Terrain Modifier", "Region-Specific"],
    rules: [
      "While equipped: Gain +2 Movement in swamp Regions. Suffer -1 Movement in urban Regions. Ignore 1 Hazard effect related to slipping or mud announced by the Goblet."
    ],
    flavor: "Goblet: 'Traction achieved! Faster in swamps, slower on pavement. Less falling.'",
    imagePrompt: "Mud-caked cleats with amphibian webbing designs, drying on a dashboard."
  },
  {
    id: "conspiracy-mug",
    name: "Conspiracy Mug",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🕵️", meaning: "Paranoia" },
      { symbol: "🌡️", meaning: "Heat" }
    ],
    keywords: ["Lore Item", "Conversation Starter", "Minor Buff"],
    rules: [
      "While equipped: Once per round, when targeted by a Hazard, you may declare \"It's a Conspiracy!\" Shake the Goblet for a Luck check (DC 3). Success = ignore the Hazard's effects. The Goblet might respond with paranoid whispers."
    ],
    flavor: "Goblet: 'They ARE out to get you... maybe. Luck check to see if paranoia saves you this time.'",
    imagePrompt: "A ceramic coffee mug printed with \"I Survived Chemtrails and All I Got Was This Rash.\""
  },
  {
    id: "pelican-beacon-flare",
    name: "Pelican Beacon Flare",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🚨", meaning: "Signal" },
      { symbol: "⚠️", meaning: "Risk" }
    ],
    keywords: ["Attention Tool", "NPC Summon", "Trade", "Goblet Interaction"],
    rules: [
      "Discard to use. Declare \"Flare Away!\" The Goblet plays a flare sound and prompts: \"The Pelican Courier circles... Make an offering? Discard 2 Gear?\" If you discard 2 Gear cards, draw 1 Treasure & Artifact card. If not, nothing happens."
    ],
    flavor: "Goblet: 'Signaling the only reliable air mail in Flomanji. Costs gear, brings... potential.'",
    imagePrompt: "A handheld flare igniting sky-blue light, with a pelican circling overhead.",
    consumable: true
  },
  {
    id: "yard-sale-treasure-map",
    name: "Yard Sale Treasure Map",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Discovery", "Region Jump", "Loot Tool"],
    rules: [
      "Discard to use. Declare \"Following the Map!\" Immediately move your character to any previously explored Region on the map. Shake the Goblet for a Luck check (DC 4). Success = Draw 1 Gear card upon arrival. Fail = Gain 1 Weirdness upon arrival (Goblet: \"Wrong X!\")."
    ],
    flavor: "Goblet: 'X marks the spot... or maybe just a stain. Teleporting... somewhere.'",
    imagePrompt: "A folded napkin covered in scribbled lines and Xs, tacked to a bulletin board.",
    consumable: true
  },
  {
    id: "florida-water",
    name: "Florida Water",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "✨", meaning: "Mystic" },
      { symbol: "💫", meaning: "Charm" }
    ],
    keywords: ["Spirit Cleanse", "Charm Buff", "Lore Object"],
    rules: [
      "Discard to use. Declare \"Cleansing Ritual!\" Remove any one negative Status token or ongoing Condition affecting you. Gain +1 Charm for your next Stat Check. The Goblet plays a faint chime."
    ],
    flavor: "Goblet: 'The scent of citrus and mystery... Condition removed. Charm enhanced.'",
    imagePrompt: "A vintage apothecary-style bottle with condensation and a hand-labeled \"Florida Water\" tag.",
    consumable: true
  },
  {
    id: "alligator-snack-pack",
    name: "Alligator Snack Pack",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🍖", meaning: "Food" },
      { symbol: "🐊", meaning: "Animal" }
    ],
    keywords: ["Distraction Tool", "Animal Hazard Bypass"],
    rules: [
      "Discard when targeted by a gator-based Hazard. Declare \"Snack Time!\" Automatically succeed on any required Stat Check to avoid or appease the gator. The Goblet might make munching sounds."
    ],
    flavor: "Goblet: 'A peace offering... or just a delay tactic. Gator appeased.'",
    imagePrompt: "A shrink-wrapped bag of raw chicken legs labeled \"Swamp Lures.\"",
    consumable: true
  },
  {
    id: "frozen-airport-sangria",
    name: "Frozen Airport Sangria",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "✨", meaning: "Luxury" },
      { symbol: "❄️", meaning: "Cooling" }
    ],
    keywords: ["Heat Reducer", "Morale Booster", "Risk/Reward"],
    rules: [
      "Discard to use. Declare \"Brain Freeze!\" Negate the next 2 points of Heat increase announced by the Goblet. Gain +1 Grit for your next check, but suffer -1 Charm for your next check (Goblet: \"Sugar rush... followed by regret.\")."
    ],
    flavor: "Goblet: 'Liquid courage, frozen regret. Heat reduced. Grit up, Charm down.'",
    imagePrompt: "A sweating cup of neon-red sangria sloshing next to a boarding pass with a tear.",
    consumable: true
  },
  {
    id: "loose-change-armor",
    name: "Loose Change Armor",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🛡️", meaning: "Defense" },
      { symbol: "🔊", meaning: "Noise" }
    ],
    keywords: ["Defense Buff", "Noise Penalty", "Absurd"],
    rules: [
      "While equipped: The first time each round you would take 1 damage, ignore it (Goblet: \"Clink! Damage absorbed.\"). Suffer -1 on any Stat Check involving stealth or quietness (Goblet might add jangling sounds to narration)."
    ],
    flavor: "Goblet: 'Armored in low denomination currency. Protection comes at an audible price.'",
    imagePrompt: "A duct-taped vest jangling with pennies, nickels, and arcade tokens."
  },
  {
    id: "ejector-lawn-chair",
    name: "Ejector Lawn Chair",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🚀", meaning: "Movement" },
      { symbol: "🤪", meaning: "Insanity" }
    ],
    keywords: ["Emergency Use", "Hazard Escape", "NPC Reaction"],
    rules: [
      "Once per game, declare \"Eject! Eject!\" to immediately move to any adjacent Region, ignoring any Hazards or NPCs in your current Region. Skip your next turn entirely (Goblet: \"And... liftoff! See you next round.\")."
    ],
    flavor: "Goblet: 'For a rapid, undignified exit. Destination: adjacent. Dignity: questionable.'",
    imagePrompt: "A recliner strapped with bungee cords and fireworks, mid-launch.",
    actionCost: 1
  }
];

export const FLOMANJI_GEAR_CARDS_PART3: GearCard[] = [
  {
    id: "roadside-pumpkin-patch-mask",
    name: "Roadside Pumpkin Patch Mask",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🎭", meaning: "Disguise" },
      { symbol: "🎃", meaning: "Cultural" }
    ],
    keywords: ["Stealth Buff", "Comedy", "NPC Confusion"],
    rules: [
      "While equipped: Once per game, automatically avoid the negative effects of one NPC encounter (declare \"Pumpkin Power!\"). If used, suffer -1 Charm permanently (Goblet: \"They won't forget the gourd.\")."
    ],
    flavor: "Goblet: 'Seasonal confusion is your shield. NPC baffled. Your reputation... slightly squash-ed.'",
    imagePrompt: "A jack-o'-lantern mask with sunglasses resting on a beach chair."
  },
  {
    id: "diy-bless-this-mess-sign",
    name: "DIY \"Bless This Mess\" Sign",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🏠", meaning: "Home" },
      { symbol: "🙏", meaning: "Moral" }
    ],
    keywords: ["NPC Buff", "Environment Mod", "Charm Boost"],
    rules: [
      "While equipped in a suburban or town Region: Gain +1 Charm on all relevant Stat Checks. Once per game while in such a region, declare \"Neighborly!\" to draw 1 Gear card."
    ],
    flavor: "Goblet: 'Appealing to local sentiment. Charm increased in civilized zones. Free stuff possible.'",
    imagePrompt: "A woodburned sign nailed crookedly to a mailbox post near a flamingo army.",
    statBonus: {
      stat: "charm",
      value: 1
    }
  },
  {
    id: "the-last-ice-cube",
    name: "The Last Ice Cube",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "❄️", meaning: "Cooling" },
      { symbol: "✨", meaning: "Luxury" }
    ],
    keywords: ["Heat Reset", "Humor", "Ultra Rare", "Goblet Interaction"],
    rules: [
      "Discard to use. Hold the card aloft and declare dramatically \"Behold! The Last Ice Cube!\" The Goblet plays a 'holy' sound effect and prompts: \"A miracle! Reset personal Heat contribution?\" If confirmed, negate all Heat you would personally contribute during the next Chaos Phase."
    ],
    flavor: "Goblet: 'Frozen perfection. A fleeting respite. Use it wisely... and with reverence.'",
    imagePrompt: "A single glowing ice cube inside a cracked thermos lined with aluminum foil.",
    consumable: true
  },
  {
    id: "trunk-organizer-of-wonder",
    name: "Trunk Organizer of Wonder",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🧳", meaning: "Storage" },
      { symbol: "🏆", meaning: "Legacy" }
    ],
    keywords: ["Storage Boost", "Combo Flexibility"],
    rules: [
      "While equipped, you gain +2 passive Gear equip slots. If this item is lost or stolen, lose 1 Grit permanently and discard 1 equipped Gear of your choice (Goblet narrates the tragic loss of organization)."
    ],
    flavor: "Goblet: 'Maximum capacity achieved! More gear, more problems if lost.'",
    imagePrompt: "A collapsible car trunk bin stuffed with flashlights, tarps, peanut butter jars, and fishing line."
  },
  {
    id: "canned-gator-grease",
    name: "Canned Gator Grease",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "💦", meaning: "Slippery" },
      { symbol: "🏃", meaning: "Escape" }
    ],
    keywords: ["Hazard Escape", "Terrain Mod", "NPC Repellent"],
    rules: [
      "Discard to use. Declare \"Greased Lightning!\" Automatically succeed on one Stat Check required to escape a physical Hazard or restraint. Any NPCs in your current Region are repulsed and cannot be interacted with next turn."
    ],
    flavor: "Goblet: 'Lubrication applied! Escape successful. Social prospects... slimy.'",
    imagePrompt: "A rusted can with a cartoon gator winking and the word \"Slippin' Safe\" hand-written.",
    consumable: true
  },
  {
    id: "souvenir-hurricane-globe",
    name: "Souvenir Hurricane Globe",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🌀", meaning: "Weather" },
      { symbol: "✨", meaning: "Charm" }
    ],
    keywords: ["Region Defense", "Passive Boost", "Combo Piece"],
    rules: [
      "While equipped: Once per game, negate the effects of one weather-based Chaos card announced by the Goblet affecting your Region. If also equipped with 'Conspiracy Mug', gain +1 Luck permanently."
    ],
    flavor: "Goblet: 'A tiny tempest contained. Weather immunity... once. Pairs well with paranoia.'",
    imagePrompt: "A glitter-filled snow globe showing a trailer park being lifted into a cartoon cloud."
  },
  {
    id: "jorts-of-immunity",
    name: "Jorts of Immunity",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "👖", meaning: "Fashion" },
      { symbol: "🛡️", meaning: "Resistance" }
    ],
    keywords: ["Status Immunity", "Style Penalty"],
    rules: [
      "While equipped: You cannot suffer Charm loss from any source. You also cannot gain Charm from any source. The Goblet may make sarcastic comments about your fashion sense."
    ],
    flavor: "Goblet: 'Denim defiance! Immune to Charm loss... and gain. A bold statement.'",
    imagePrompt: "Distressed jean shorts with patches reading \"Official Survivor\" and \"Property of Daytona.\""
  },
  {
    id: "emergency-cigar-box",
    name: "Emergency Cigar Box",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "😌", meaning: "Calm" },
      { symbol: "🎯", meaning: "Focus" }
    ],
    keywords: ["Mental Boost", "Debuff Removal", "One-Time Use"],
    rules: [
      "Discard to use. Declare \"Taking a Moment.\" Remove any one negative mental or fear-based Status token/Condition affecting you. Gain +1 Grit for your next Stat Check. The Goblet plays a brief, calming melody."
    ],
    flavor: "Goblet: 'Inhale courage, exhale doubt... or just nicotine. Condition removed. Grit +1.'",
    imagePrompt: "A battered cigar box cracked open to reveal a perfectly preserved hand-rolled cigar glowing faintly.",
    consumable: true
  },
  {
    id: "neon-koozie-of-distinction",
    name: "Neon Koozie of Distinction",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "✨", meaning: "Luxury" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["Charm Buff", "Event Tool"],
    rules: [
      "While equipped: Gain +1 Charm on Stat Checks made during Event card encounters announced by the Goblet. Must be discarded if you fail a Grit check during a physical Hazard."
    ],
    flavor: "Goblet: 'Keeps your drink cold, and your social standing... slightly less awkward during Events. Charm +1.'",
    imagePrompt: "A lime green foam koozie branded \"World's Best Mosquito Magnet.\"",
    statBonus: {
      stat: "charm",
      value: 1
    }
  },
  {
    id: "zip-tie-toe-spikes",
    name: "Zip Tie Toe Spikes",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🛠️", meaning: "Improvised" },
      { symbol: "⚔️", meaning: "Combat" }
    ],
    keywords: ["Terrain Mod", "Swamp Defense", "Improvised Weapon"],
    rules: [
      "While equipped: Ignore movement penalties in swamp/marsh Regions. Once per game, gain +1 Grit on a Stat Check involving climbing or resisting being knocked down."
    ],
    flavor: "Goblet: 'Improvised traction... and pointy bits. Move freely in muck. Grit bonus available.'",
    imagePrompt: "Zip ties twisted into makeshift spikes strapped over dirty socks."
  }
];

export const FLOMANJI_GEAR_CARDS_PART4: GearCard[] = [
  {
    id: "rusted-golf-cart-battery",
    name: "Rusted Golf Cart Battery",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "⚡", meaning: "Power" },
      { symbol: "⚠️", meaning: "Shock" }
    ],
    keywords: ["Trap Trigger", "Hazard Counter", "Risk/Reward", "Goblet Interaction"],
    rules: [
      "Discard to use when facing an electrical or mechanical Hazard. Declare \"Juice It!\" The Goblet announces the Hazard is cancelled, then prompts: \"Risky move... Shake for Luck, DC 4.\" Success = Gain +1 Grit. Failure = Take 1 Damage (Goblet: \"Zap! Shoulda grounded it.\")."
    ],
    flavor: "Goblet: 'Applying questionable voltage... Hazard neutralized. Now, let's see if YOU survive.'",
    imagePrompt: "A cracked golf cart battery leaking onto a moss-covered patio slab.",
    consumable: true
  },
  {
    id: "floribama-passport",
    name: "Floribama Passport",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🪪", meaning: "Identity" },
      { symbol: "✈️", meaning: "Travel" }
    ],
    keywords: ["NPC Neutralizer", "Movement Boost", "Regional Effect"],
    rules: [
      "While equipped: Once per game, upon entering a new Region, declare \"Showing My Papers!\" Ignore the effects of the first NPC or social Hazard encountered there. If used in an Urban Region, gain 1 Weirdness (Goblet: \"They see through your disguise here...\")."
    ],
    flavor: "Goblet: 'Temporary diplomatic immunity... kind of. Works better near the state line.'",
    imagePrompt: "A laminated ID badge stamped \"Certified Between States\" with faded tan lines."
  },
  {
    id: "inflatable-crocodile-raft",
    name: "Inflatable Crocodile Raft",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "🛟", meaning: "Float" },
      { symbol: "🐊", meaning: "Animal" }
    ],
    keywords: ["Water Hazard Bypass", "Distraction Tool"],
    rules: [
      "While equipped: Once per game, ignore movement restrictions and Hazards for crossing one water Region. If also equipped with 'Bug Spray (Triple Strength)', you may discard the spray to make all players in your region immune to the next non-combat Hazard announced by the Goblet."
    ],
    flavor: "Goblet: 'Riding the plastic beast! Water passage granted. Potential for chemical warfare combo.'",
    imagePrompt: "A blown-up plastic crocodile missing one eye, bobbing in flood water."
  },
  {
    id: "shrine-of-spare-keys",
    name: "Shrine of Spare Keys",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🍀", meaning: "Luck" },
      { symbol: "❓", meaning: "Mystery" }
    ],
    keywords: ["Random Aid", "Region Specific", "Buff", "Goblet Interaction"],
    rules: [
      "While equipped: Once per game, after failing any Stat Check, declare \"Checking the Shrine!\" The Goblet prompts: \"The keys jingle... Discard 1 Charm for a reroll?\" If you agree, discard 1 Charm point and reroll the check (reshake Goblet)."
    ],
    flavor: "Goblet: 'A mysterious offering... Chance favors the charmingly desperate. Reroll available, for a price.'",
    imagePrompt: "A birdhouse filled with mismatched keys and old flyers, nestled in an overgrown fence post."
  },
  {
    id: "sun-pass-transponder",
    name: "Sun Pass Transponder (Glitchy)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🚗", meaning: "Vehicle" },
      { symbol: "🔧", meaning: "Tech" }
    ],
    keywords: ["Movement Aid", "Risk/Reward", "Goblet Interaction"],
    rules: [
      "Once per game, declare \"Trying the Sun Pass!\" to ignore movement restrictions or tolls in an Urban or Highway Region. Shake the Goblet for a Luck check (DC 4). Success = Pass freely. Failure = Gain 1 Weirdness as the Goblet narrates a bizarre tracking error or summons a minor \"Bureaucracy\" Hazard next turn."
    ],
    flavor: "Goblet: 'Beep! Or... static? Roll for functional infrastructure...'",
    imagePrompt: "A Sun Pass transponder cracked and sparking slightly, stuck to a dusty dashboard."
  },
  {
    id: "bag-of-boiled-peanuts",
    name: "Bag of Boiled Peanuts",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🥜", meaning: "Food" },
      { symbol: "👥", meaning: "Social" }
    ],
    keywords: ["Healing", "NPC Offering", "Single Use"],
    rules: [
      "Discard to use. Choose one: Heal 1 Damage OR gain +1 Charm on your next Stat Check when interacting with a 'Rural' or 'Local' NPC (declare \"Offering Peanuts!\")."
    ],
    flavor: "Goblet: 'Salty, soggy salvation... or social lubricant. Your choice.'",
    imagePrompt: "A wet paper bag labeled \"GAS STATION GOLD - BOILED P-NUTS\" leaking slightly.",
    consumable: true
  },
  {
    id: "manatee-magnet",
    name: "Manatee Magnet (Formerly Repellent)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🐄", meaning: "Animal" },
      { symbol: "💧", meaning: "Water" }
    ],
    keywords: ["Distraction", "Hazard Manipulation", "Weird Science"],
    rules: [
      "Discard when in a water Region. Declare \"Activating Manatee Magnet!\" The Goblet narrates the arrival of curious manatees. Choose one: Automatically pass one non-combat water Hazard OR force one targeted NPC in the region to be distracted (miss their next action/interaction)."
    ],
    flavor: "Goblet: 'They swore it repelled 'em... Science was wrong. Gentle giants incoming!'",
    imagePrompt: "A spray can with \"MANATEE-B-GONE\" crossed out and \"MAGNET\" scrawled underneath, floating near friendly manatee noses.",
    consumable: true
  },
  {
    id: "tourist-trap-map",
    name: "Tourist Trap Map (Misleading)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "⚠️", meaning: "Trap" }
    ],
    keywords: ["Risky Travel", "Hazard Trigger"],
    rules: [
      "Discard to use. Declare \"Following the Tourist Map!\" Immediately move to any non-adjacent, previously explored Region. Upon arrival, the Goblet announces a minor Hazard related to that Region (e.g., \"Sudden Gator,\" \"Aggressive Snowbird,\" \"Sinkhole Tremor\")."
    ],
    flavor: "Goblet: 'It promises thrills... delivers mostly danger. Welcome to [Region Name]... again. Hazard incoming!'",
    imagePrompt: "A brightly colored, cartoonish map with exaggerated landmarks and questionable routes, coffee-stained.",
    consumable: true
  },
  {
    id: "love-bug-windshield-wipers",
    name: "Love Bug Windshield Wipers (Overdrive)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🚗", meaning: "Vehicle" },
      { symbol: "🐜", meaning: "Bug" }
    ],
    keywords: ["Hazard Immunity (Situational)", "Event Interaction"],
    rules: [
      "While equipped: During a \"Love Bug Season\" Event (announced by Goblet), ignore all negative effects related to movement or visibility Hazards caused by insects."
    ],
    flavor: "Goblet: 'Maximum squeegee power! The splatters cannot stop you... this time.'",
    imagePrompt: "Oversized windshield wipers frantically clearing a thick swarm of love bugs from a cracked windshield."
  },
  {
    id: "sandspur-sandals",
    name: "Sandspur Sandals",
    type: "gear",
    category: "supply",
    icons: [
      { symbol: "👡", meaning: "Footwear" },
      { symbol: "🔥", meaning: "Pain" }
    ],
    keywords: ["Terrain Buff", "Damage Risk", "Regional Gear"],
    rules: [
      "While equipped: Gain +1 Grit on Stat Checks made while in a Beach or Sandy Region. When leaving such a Region, declare \"Checking for Spurs!\" Shake the Goblet for a Luck check (DC 3). Failure = Take 1 Damage (Goblet: \"Ouch! Gotcha!\")."
    ],
    flavor: "Goblet: 'Protection... with a price. Grit bonus on sand, pain potential leaving it.'",
    imagePrompt: "Sandals with actual spiky sandspurs embedded in the soles, looking painful yet functional.",
    statBonus: {
      stat: "grit",
      value: 1
    }
  },
  {
    id: "half-eaten-key-lime-pie",
    name: "Half-Eaten Key Lime Pie",
    type: "gear",
    category: "consumable",
    icons: [
      { symbol: "🥧", meaning: "Food" },
      { symbol: "✨", meaning: "Luxury" }
    ],
    keywords: ["Healing", "Buff", "Single Use"],
    rules: [
      "Discard to use. Declare \"Pie Power!\" Heal 1 Damage and gain +1 Charm for your next NPC interaction or social Stat Check."
    ],
    flavor: "Goblet: 'Tangy, sweet, slightly desperate. Heal 1, Charm +1. Enjoy the sugar high.'",
    imagePrompt: "A slice of key lime pie with one bite taken, sitting precariously on a paper plate on a humid porch railing.",
    consumable: true
  },
  {
    id: "fishing-line",
    name: "Fishing Line (Industrial Strength)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛠️", meaning: "Tool" },
      { symbol: "🧵", meaning: "Rope" }
    ],
    keywords: ["Utility", "Auto-Success (Situational)", "Combo Potential"],
    rules: [
      "While equipped: Once per game, declare \"Got it Hooked!\" to automatically succeed on one Stat Check involving climbing, securing an item, or setting a simple trap (subject to Goblet's approval of 'simple'). Can be combined with other items for specific crafting combos (e.g., Makeshift Tripwire with RV Window Shard Dagger)."
    ],
    flavor: "Goblet: 'Stronger than necessary, just like everything else here. Check passed.'",
    imagePrompt: "A large spool of thick, slightly iridescent fishing line sitting next to a rusty hook."
  }
];

export const FLOMANJI_GEAR_CARDS_PART5: GearCard[] = [
  {
    id: "airboat-fan-blade",
    name: "Airboat Fan Blade (Makeshift Shield)",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "🛡️", meaning: "Defense" },
      { symbol: "🔊", meaning: "Noise" }
    ],
    keywords: ["Damage Block", "Bulky", "Noise Penalty"],
    rules: [
      "While equipped: Once per game, declare \"Fan Block!\" to ignore up to 2 damage from a single physical Hazard source. Takes up 2 gear slots. Suffer -1 on all stealth-related Stat Checks (Goblet plays loud fan noise when blocking and adds whooshing to stealth checks)."
    ],
    flavor: "Goblet: WHOOSH! 'Damage deflected by sheer rotational force! Sneaking... not advised.'",
    imagePrompt: "A large, bent airboat propeller blade strapped to a player's arm with bungee cords."
  },
  {
    id: "swamp-buggy-bumper-sticker",
    name: "\"My Other Car Is A Swamp Buggy\" Bumper Sticker",
    type: "gear",
    category: "tool",
    icons: [
      { symbol: "👥", meaning: "Social" },
      { symbol: "🚗", meaning: "Vehicle" }
    ],
    keywords: ["NPC Buff (Situational)", "Charm Boost"],
    rules: [
      "While equipped: Gain +1 Charm on Stat Checks when interacting with NPCs identified by the Goblet as 'Rural,' 'Swamp Dweller,' or 'Good Ol' Boy/Gal.' No effect on other NPCs."
    ],
    flavor: "Goblet: 'Ah, a statement of cultural alignment. Charm +1 with the locals.'",
    imagePrompt: "A faded, mud-splattered bumper sticker slapped crookedly onto a backpack.",
    statBonus: {
      stat: "charm",
      value: 1
    }
  }
];

/**
 * Get all Flomanji gear cards combined
 */
export function getAllFlomanjiGearCards(): GearCard[] {
  return [
    ...FLOMANJI_GEAR_CARDS,
    ...FLOMANJI_GEAR_CARDS_PART2,
    ...FLOMANJI_GEAR_CARDS_PART3,
    ...FLOMANJI_GEAR_CARDS_PART4,
    ...FLOMANJI_GEAR_CARDS_PART5
  ];
}
