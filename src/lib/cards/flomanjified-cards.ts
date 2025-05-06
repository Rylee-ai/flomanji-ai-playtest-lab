
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";
import { log } from "@/utils/logging";

// Collection of Flomanjified role cards for Flomanji
export const FLOMANJIFIED_CARDS: FlomanjifiedRoleCard[] = [
  {
    id: "flomanjified-gator-kings-herald",
    name: "The Gator King's Herald",
    type: "flomanjified",
    icons: [
      { symbol: "🐊", meaning: "Gator" },
      { symbol: "👑", meaning: "Crown" },
      { symbol: "🌿", meaning: "Swamp" }
    ],
    keywords: ["Reptilian Control", "Swamp Power", "Gator Hazards"],
    rules: [
      "Objective: Ensure at least 3 different Gator Hazards are active on the map simultaneously OR ensure a Survivor is eliminated by a Gator Hazard.",
      "Chaos Phase Action: Choose one:",
      "Summon Reptilian Minion: Place one 'Gator Hazard' card from the discard pile onto any Swamp or Water region without an active Gator Hazard.",
      "Gator's Gaze: Target one Survivor in a region with a Gator Hazard. Goblet prompts: \"The gators stare... Shake Moxie, DC 4, or flee!\" Failure: Survivor must move to an adjacent region.",
      "Special: Immune to negative effects of Gator Hazards. Gain +1 when making checks for Gator Hazards (if applicable)."
    ],
    flavor: "The swamp whispers promises of power... and scales. You serve the true king now.",
    imagePrompt: "A shadowy figure draped in moss and reeds, holding a crude sceptre topped with a gator skull, standing knee-deep in murky swamp water. Gator eyes glow nearby.",
    originalRole: "Survivor",
    chaosAction: "Choose: Summon Reptilian Minion (place Gator Hazard from discard pile) OR Gator's Gaze (force Moxie DC 4 check or target flees).",
    specialAbility: "Immune to negative Gator Hazard effects. +1 on Gator Hazard checks."
  },
  {
    id: "flomanjified-hoa-agent",
    name: "Agent of the HOA Overlords",
    type: "flomanjified",
    icons: [
      { symbol: "📋", meaning: "Clipboard" },
      { symbol: "🏛️", meaning: "Bureaucracy" },
      { symbol: "🏙️", meaning: "Urban" }
    ],
    keywords: ["Bureaucratic Control", "Urban Power", "Rule Enforcement"],
    rules: [
      "Objective: Ensure Survivors collectively lose at least 5 Gear cards due to HOA or Bureaucracy Hazards OR ensure the Heat track reaches 10 while at least two Survivors are in Urban/Suburban regions.",
      "Chaos Phase Action: Choose one:",
      "Issue Citation: Target one Survivor in an Urban or Suburban region. Goblet announces: \"Violation detected! Shake Charm, DC 4, or pay the fine!\" Failure: Survivor must discard 1 Gear card.",
      "Enforce Quiet Hours: Target one Survivor. Goblet announces: \"Excessive noise complaint! Shake Moxie, DC 3, or lose your next Action.\" Failure: Survivor loses 1 Action on their next turn.",
      "Special: Immune to negative effects of Bureaucracy Hazards. Can move through Urban/Suburban regions without triggering 'Social' Hazards."
    ],
    flavor: "Compliance is mandatory. Happiness is optional. The beige reign begins.",
    imagePrompt: "A figure in a crisp, unnervingly clean uniform, eyes glowing with bureaucratic fervor, holding a clipboard that seems to absorb light. Background is a disturbingly perfect suburban street.",
    originalRole: "Survivor",
    chaosAction: "Choose: Issue Citation (force Charm DC 4 check or discard gear) OR Enforce Quiet Hours (force Moxie DC 3 check or lose action).",
    specialAbility: "Immune to Bureaucracy Hazards. Ignore Social Hazards in Urban/Suburban regions."
  },
  {
    id: "flomanjified-humidity-harbinger",
    name: "The Humidity Harbinger",
    type: "flomanjified",
    icons: [
      { symbol: "🌦️", meaning: "Weather" },
      { symbol: "🔥", meaning: "Heat" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Heat Control", "Weirdness Generation", "Environmental Influence"],
    rules: [
      "Objective: Ensure the Heat track reaches 10 OR ensure all remaining Survivors have a Weirdness level of 6 or higher.",
      "Chaos Phase Action: Choose one:",
      "Amplify Heat: Increase the Heat track by an additional +1 this phase. (Announce to players).",
      "Whispers on the Steam: Target one Survivor. Goblet whispers: \"The dampness seeps in... Shake Grit, DC 4, or embrace the haze!\" Failure: Survivor gains 1 Weirdness.",
      "Special: Immune to Heat gain from any source. Gains +1 Movement in regions affected by 'Rain' or 'Fog' Events."
    ],
    flavor: "You don't just feel the humidity anymore. You are the humidity. Oppressive, inevitable.",
    imagePrompt: "A shimmering, heat-haze silhouette of a person seemingly made of condensation and fog, standing in a steamy, overgrown environment.",
    originalRole: "Survivor",
    chaosAction: "Choose: Amplify Heat (+1 to Heat track) OR Whispers on the Steam (force Grit DC 4 check or gain Weirdness).",
    specialAbility: "Immune to Heat gain. +1 Movement in Rain/Fog affected regions."
  },
  {
    id: "flomanjified-skunkape-puppet",
    name: "Puppet of the Paranoid Skunk Ape",
    type: "flomanjified",
    icons: [
      { symbol: "🐾", meaning: "Animal" },
      { symbol: "❓", meaning: "Mystery" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Paranoia Spreading", "Hazard Manipulation", "Fear Control"],
    rules: [
      "Objective: Ensure Survivors discard a total of 5+ Gear cards due to fear or paranoia effects OR lure a Survivor into a Swamp region containing 2+ active Hazards.",
      "Chaos Phase Action: Choose one:",
      "Spread Paranoia: Target one Survivor. Goblet whispers: \"Something's watching... Shake Moxie, DC 4, or drop something!\" Failure: Survivor must discard 1 random Gear card from their hand.",
      "Cryptid Call: Target one Hazard card in an adjacent region. Move that Hazard card into the target Survivor's region (if legally possible for the Hazard type).",
      "Special: Immune to Fear effects. Can move through Swamp/Forest regions without triggering Animal Hazards."
    ],
    flavor: "The Truth isn't just out there, it's gibbering in your ear. And it smells awful.",
    imagePrompt: "A figure covered in crude camouflage and tinfoil, moving stealthily through dense woods, with large, glowing red eyes peering from the shadows behind them.",
    originalRole: "Survivor",
    chaosAction: "Choose: Spread Paranoia (force Moxie DC 4 check or discard gear) OR Cryptid Call (move Hazard to target Survivor's region).",
    specialAbility: "Immune to Fear effects. Ignore Animal Hazards in Swamp/Forest regions."
  },
  {
    id: "flomanjified-eternal-spring-breaker",
    name: "The Eternal Spring Breaker",
    type: "flomanjified",
    icons: [
      { symbol: "🎭", meaning: "Party" },
      { symbol: "🏖️", meaning: "Beach" },
      { symbol: "🌀", meaning: "Chaos" }
    ],
    keywords: ["Status Effects", "Party Manipulation", "Disruption"],
    rules: [
      "Objective: Ensure at least 3 Survivors are simultaneously affected by negative Statuses (Poisoned, Cursed, Sick, Debuffed etc.) OR ensure the game ends with the 'Party' Event active.",
      "Chaos Phase Action: Choose one:",
      "Spike the Punch: Target one Survivor. Goblet announces: \"Someone spiked your drink! Shake Grit, DC 4, or feel the effects!\" Failure: Survivor gains a random minor negative Status (e.g., -1 Moxie for 1 round, lose next action).",
      "Party Foul: Target one Survivor. Goblet announces: \"Whoops! You knocked over their stuff! Shake Luck, DC 3, or lose something!\" Failure: Survivor must discard 1 Gear card.",
      "Special: Immune to negative effects from 'Party' or 'Food/Drink' related Hazards/Events. Gains +1 Charm when interacting negatively with other players (e.g., forcing discards)."
    ],
    flavor: "The party never stops. Ever. Pass the questionable jungle juice.",
    imagePrompt: "A figure perpetually stuck mid-celebration, maybe with glowing neon body paint and vacant eyes, surrounded by ghostly party debris on a dark beach.",
    originalRole: "Survivor",
    chaosAction: "Choose: Spike the Punch (force Grit DC 4 check or gain negative status) OR Party Foul (force Luck DC 3 check or discard gear).",
    specialAbility: "Immune to Party/Food/Drink Hazards. +1 Charm when forcing negative effects on others."
  },
  {
    id: "flomanjified-goblet-vessel",
    name: "The Goblet's Corrupted Vessel",
    type: "flomanjified",
    icons: [
      { symbol: "🏆", meaning: "Goblet" },
      { symbol: "⚡", meaning: "Glitch" },
      { symbol: "🌀", meaning: "Weirdness" }
    ],
    keywords: ["Weirdness Control", "System Manipulation", "Goblet Connection"],
    rules: [
      "Objective: Ensure the Goblet enters \"Corrupted Mode\" (via Chaos Card or other effect) three times OR ensure all other remaining Survivors reach Weirdness 5+.",
      "Chaos Phase Action: Choose one:",
      "Amplify Weirdness: Target one Survivor. Goblet speaks with static: \"Feedback loop initiated... Shake Moxie, DC 4, or absorb the static!\" Failure: Survivor gains 1 Weirdness.",
      "System Glitch: Target one Survivor. Goblet announces: \"Unexpected error! Shake Luck, DC 4!\" Failure: Survivor suffers -1 to their next Stat Check.",
      "Special: When the Goblet is in \"Corrupted Mode,\" this player may take two Chaos Phase Actions instead of one. Immune to negative effects caused directly by the Goblet itself (like 'Goblet Demands a Snack')."
    ],
    flavor: "You heard the whispers. Now you are the whispers. The signal is strong... and wrong.",
    imagePrompt: "A player character whose eyes glow with the same color light as the Goblet, perhaps with faint circuit patterns visible on their skin. The physical Goblet might be near them, pulsing darkly.",
    originalRole: "Survivor",
    chaosAction: "Choose: Amplify Weirdness (force Moxie DC 4 check or gain Weirdness) OR System Glitch (force Luck DC 4 check or -1 to next stat check).",
    specialAbility: "Take 2 Chaos actions when Goblet is in Corrupted Mode. Immune to negative Goblet effects."
  },
  {
    id: "flomanjified-theme-park-smile",
    name: "Theme Park Smile (Permanent)",
    type: "flomanjified",
    icons: [
      { symbol: "🎭", meaning: "Entertainment" },
      { symbol: "😷", meaning: "Mask" },
      { symbol: "🧠", meaning: "Mental" }
    ],
    keywords: ["Charm Reduction", "Fear Generation", "Forced Participation"],
    rules: [
      "Objective: Ensure all remaining Survivors have 0 Charm OR ensure a Survivor is eliminated while under the effect of a 'Fear' or 'Panic' Hazard/Status.",
      "Chaos Phase Action: Choose one:",
      "Unsettling Grin: Target one Survivor in the same region. Goblet describes the horrifyingly wide smile: \"It's just... wrong. Shake Moxie, DC 4, or lose your nerve!\" Failure: Survivor suffers -1 Charm until the end of their next turn.",
      "Forced Fun: Target one Survivor. Goblet announces brightly: \"Mandatory fun time! Shake Grit, DC 3, or participate!\" Failure: Survivor loses their next Rest action opportunity.",
      "Special: Immune to Charm loss. Automatically passes any Charm checks required by Hazards (but cannot gain positive effects from them)."
    ],
    flavor: "The smile never fades. Neither does the emptiness behind it. Have a magical day!",
    imagePrompt: "A figure with a terrifyingly fixed, wide, cheerful smile that contrasts sharply with dead eyes. They might still be wearing parts of a mascot costume.",
    originalRole: "Survivor",
    chaosAction: "Choose: Unsettling Grin (force Moxie DC 4 check or -1 Charm) OR Forced Fun (force Grit DC 3 check or lose Rest action).",
    specialAbility: "Immune to Charm loss. Auto-pass Charm checks for Hazards (no positive effects)."
  },
  {
    id: "flomanjified-swamp-thing-kin",
    name: "The Swamp Thing's Kin",
    type: "flomanjified",
    icons: [
      { symbol: "🌿", meaning: "Plant" },
      { symbol: "🌿", meaning: "Swamp" },
      { symbol: "💪", meaning: "Grit" }
    ],
    keywords: ["Plant Control", "Swamp Power", "Terrain Manipulation"],
    rules: [
      "Objective: Ensure at least 3 different 'Plant' or 'Environmental' Hazards are active on the map OR ensure a Survivor is eliminated within a Swamp region.",
      "Chaos Phase Action: Choose one:",
      "Overgrowth: Target one region. Place one 'Plant' or 'Terrain' Hazard from the discard pile onto that region (if legally possible).",
      "Vine Snare: Target one Survivor in a Swamp or Forest region. Goblet describes: \"Vines lash out! Shake Moxie, DC 4, or get tangled!\" Failure: Survivor cannot take a Move action on their next turn.",
      "Special: Immune to negative effects from 'Plant' Hazards. Heals 1 Damage automatically when ending turn in a Swamp region."
    ],
    flavor: "The green calls. You are root and vine now. Protect the muck.",
    imagePrompt: "A figure seemingly merging with the swamp, covered in vines, moss, and mud, with glowing green eyes.",
    originalRole: "Survivor",
    chaosAction: "Choose: Overgrowth (place Plant/Terrain Hazard from discard) OR Vine Snare (force Moxie DC 4 check or block movement).",
    specialAbility: "Immune to Plant Hazards. Heal 1 Damage when ending turn in Swamp region."
  },
  {
    id: "flomanjified-final-tourist",
    name: "The Final Tourist",
    type: "flomanjified",
    icons: [
      { symbol: "🗺️", meaning: "Map" },
      { symbol: "😤", meaning: "Frustration" },
      { symbol: "🧍", meaning: "Isolation" }
    ],
    keywords: ["Misdirection", "Confusion", "Objective Interference"],
    rules: [
      "Objective: Ensure all other players are Flomanjified OR ensure the Mission Objective card is lost or discarded.",
      "Chaos Phase Action: Choose one:",
      "Misdirection: Target one Survivor. Goblet gives bad advice: \"I think the exit is that way... Shake Luck, DC 4, or believe me!\" Failure: Survivor must move towards a region designated by the Flomanjified player on their next turn if possible.",
      "Lost & Confused: Target one Survivor. Goblet sounds bewildered: \"Where are we? Shake Grit, DC 3, or lose focus!\" Failure: Survivor must discard 1 random card from their hand.",
      "Special: Immune to Hazards related to getting lost or misdirection. Once per game, may look at the top 3 cards of the Chaos deck and rearrange them."
    ],
    flavor: "Still looking for the beach. Or the exit. Or maybe... just more company in the confusion.",
    imagePrompt: "A figure looking hopelessly at a torn map, surrounded by bizarre Flomanji scenery, seeming utterly disconnected from the danger but subtly causing it.",
    originalRole: "Survivor",
    chaosAction: "Choose: Misdirection (force Luck DC 4 check or control movement) OR Lost & Confused (force Grit DC 3 check or discard card).",
    specialAbility: "Immune to getting lost. Once per game, peek and rearrange top 3 Chaos cards."
  }
];

log.info("Flomanjified cards initialized with 9 role cards");
