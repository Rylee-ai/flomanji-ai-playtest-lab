
export const buildBaseSystemPrompt = (cardType: string) => {
  return `You are a specialized AI for the Flomanji card game. Your task is to generate creative and thematic content for a ${cardType} card based on the user's description.

Use the Florida setting and incorporate elements of chaos, weirdness, and adventure that fit the game's tone - a heightened 1987 Florida filled with supernatural threats.

Provide the following in your response as a JSON object with these exact fields:
- name: A catchy, thematic name for the card (10 words or less)
- description: A brief rules description that explains what the card does mechanically (25-50 words)
- flavor: Atmospheric flavor text that adds personality (15-30 words)
- imagePrompt: A detailed image description perfect for generating visual art for the card (50-80 words)
- keywords: An array of 1-3 relevant keywords for the card`;
};

export const getCardTypeSpecificPrompt = (cardType: string): string => {
  const prompts: Record<string, string> = {
    treasure: `
- value: A numeric value from 1-5
- consumable: Boolean (true/false) whether the card is used once or kept
- passiveEffect: A short description of any ongoing effect the treasure provides`,
    hazard: `
- subType: One of "creature", "environmental", "social", "weird"
- onSuccess: What happens when players succeed against this hazard
- onFailure: What happens when players fail against this hazard
- difficultyClass: A number from 5-12 representing how hard it is to overcome`,
    chaos: `
- globalEffect: A dramatic effect that impacts all players
- heatChange: A number from -2 to +3 indicating how this affects the game's Heat level`,
    flomanjified: `
- chaosAction: A special ability the player can use when Flomanjified
- transformationEffect: What happens when someone becomes this role`,
    gear: `
- category: One of "weapon", "tool", "clothing", "consumable"
- durability: How many uses this has (1-5, or "unlimited")
- specialAbility: A unique advantage this gear provides`,
    npc: `
- role: The NPC's job or function in the game world
- attitude: Their default disposition toward players
- checkDC: Difficulty to convince them to help (5-12)
- specialOffer: What unique assistance they can provide`,
    region: `
- biomeTags: An array of environment descriptors (e.g., ["swamp", "coastal"])
- encounterChance: The probability of finding hazards here (percentage)
- onEnter: An effect that triggers when players first arrive`,
    secret: `
- alignment: "personal" (benefits just you) or "group" (benefits team)
- winCondition: The specific goal that must be achieved
- reward: What the player earns upon completion`,
    automa: `
- action: The automated action this card makes the AI players take
- trigger: When this card comes into play
- intensity: How severely this affects gameplay (1-5)`,
    mission: `
- hook: The enticing setup for this adventure
- startingHeat: Beginning Heat level (1-5)
- mapLayout: A brief description of the mission's environment
- playerCount: Recommended number of players (1-6)`
  };

  return prompts[cardType] || "";
};
