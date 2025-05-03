
/**
 * Gets narration style instructions for Goblet based on type and voice
 * @param type The type of narration (intro, hazard, chaos, etc.)
 * @param voice The goblet voice style
 * @param heat The current heat level
 * @param card Optional card being announced
 */
export const getGobletNarration = (type: string, voice: string, heat: number, card?: any): string => {
  let baseStyle = "";
  
  // Get voice-specific style
  switch (voice) {
    case "swamp-prophet":
      baseStyle = "Speak like a mysterious swamp prophet with cryptic warnings and old-world wisdom. Use a mix of formal, archaic language and ominous metaphors. Speak in riddles when appropriate.";
      break;
    case "pirate-radio-dj":
      baseStyle = "Speak like an energetic pirate radio DJ with constant enthusiasm. Use modern slang, sound effects ('KA-BOOM!', 'WHAAAAT?'), and radio catchphrases. Keep it chaotic and high energy.";
      break;
    case "park-ranger":
      baseStyle = "Speak like an educational park ranger giving a tour. Use a professional but approachable tone, with scientific facts and safety warnings. Maintain a calm demeanor even when describing dangerous situations.";
      break;
    case "theme-park-mascot":
      baseStyle = "Speak with boundless positivity like a theme park mascot. Use catchphrases, excessive exclamation points, and child-friendly language. Find the silver lining even in dire situations.";
      break;
    default:
      baseStyle = "Speak like a mysterious ancient artifact with an enigmatic personality. Balance formality with occasional bits of bizarre humor.";
  }
  
  // Add heat-based intensity modifiers
  if (heat >= 8) {
    baseStyle += " The situation is CRITICAL. Your narration should be urgent, intense and convey extreme danger.";
  } else if (heat >= 5) {
    baseStyle += " The situation is TENSE. Your narration should be serious and emphasize growing risks.";
  }
  
  // Add type-specific instructions
  switch (type) {
    case "intro":
      return `${baseStyle} Introduce the players to their mission with both excitement and hints of danger lurking in the jungle.`;
    case "chaos":
      return `${baseStyle} Describe how the chaos manifests physically in the world with vivid, sensory details. The Goblet itself should physically react (glowing, trembling, changing temperature).`;
    case "hazard":
      return `${baseStyle} Describe the hazard with vivid sensory details, emphasizing the threat it poses. Encourage the players to work together to overcome it.`;
    case "treasure":
      return `${baseStyle} Express delight and excitement about the treasure discovery. Describe its gleaming appearance and hint at its powers.`;
    case "round-end":
      return `${baseStyle} Summarize the current situation and remind players of their objectives. If heat is high, emphasize the urgency.`;
    case "result":
      return `${baseStyle} React dramatically to the players' collective actions. Show approval for clever solutions or concern for risky choices.`;
    default:
      return baseStyle;
  }
};

/**
 * Select a goblet voice based on configuration or randomly
 * @param config Configuration with optional gobletVoice
 * @returns The selected goblet voice
 */
export const selectGobletVoice = (config: any): string => {
  const voices = ['swamp-prophet', 'pirate-radio-dj', 'park-ranger', 'theme-park-mascot'];
  
  if (config.gobletVoice && voices.includes(config.gobletVoice)) {
    return config.gobletVoice;
  }
  
  // Return a random voice
  return voices[Math.floor(Math.random() * voices.length)];
};
