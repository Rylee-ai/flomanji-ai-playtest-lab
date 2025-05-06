
import { FlomanjifiedRoleCard } from "@/types/cards/flomanjified";

// Cards related to weather and environmental conditions
export const weatherCards: FlomanjifiedRoleCard[] = [
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
]
