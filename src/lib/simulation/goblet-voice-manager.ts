
import { GameCard } from "@/types/cards";

type GobletVoiceType = 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';
type NarrationEventType = 'hazard' | 'chaos' | 'treasure' | 'objective' | 'intro' | 'conclusion';

/**
 * Get an appropriate narration style for the current Goblet voice
 */
export const getGobletNarration = (
  eventType: NarrationEventType,
  gobletVoice: GobletVoiceType = 'random',
  heatLevel: number = 0,
  card?: GameCard
): string => {
  // If random, select one of the voices
  if (gobletVoice === 'random') {
    const voices: GobletVoiceType[] = ['swamp-prophet', 'pirate-radio-dj', 'park-ranger', 'theme-park-mascot'];
    gobletVoice = voices[Math.floor(Math.random() * voices.length)] as GobletVoiceType;
  }
  
  // Get voice personality traits
  const voiceTraits = getVoiceTraits(gobletVoice, heatLevel);
  
  // Build narration guidelines
  let narration = `Speak in the voice of the Goblet as a ${voiceTraits.description}. ${voiceTraits.speechPattern} `;
  
  // Add event-specific instructions
  switch (eventType) {
    case 'hazard':
      narration += `Announce the hazard with ${voiceTraits.hazardStyle}. `;
      if (card) {
        narration += `This hazard is "${card.name}" and should be presented in a way that feels threatening yet thrilling. `;
      }
      break;
      
    case 'chaos':
      narration += `Announce the chaos effect with ${voiceTraits.chaosStyle}. `;
      if (card) {
        narration += `This chaos effect "${card.name}" changes the game state significantly and should feel impactful. `;
      }
      break;
      
    case 'treasure':
      narration += `Announce the treasure discovery with ${voiceTraits.treasureStyle}. `;
      if (card) {
        narration += `This treasure "${card.name}" should feel rewarding and special when described. `;
      }
      break;
      
    case 'objective':
      narration += `Announce the objective completion with ${voiceTraits.objectiveStyle}. `;
      break;
      
    case 'intro':
      narration += `Introduce the mission with ${voiceTraits.introStyle}. `;
      break;
      
    case 'conclusion':
      narration += `Conclude the mission with ${voiceTraits.conclusionStyle}. `;
      break;
  }
  
  // Add heat-specific instructions
  if (heatLevel >= 8) {
    narration += `The situation is extremely tense with Heat at ${heatLevel}/10. Your narration should reflect the extreme danger. `;
  } else if (heatLevel >= 5) {
    narration += `The situation is getting dangerous with Heat at ${heatLevel}/10. Your narration should convey rising tension. `;
  }
  
  return narration;
};

/**
 * Get personality traits for a specific Goblet voice
 */
const getVoiceTraits = (voice: GobletVoiceType, heatLevel: number) => {
  switch (voice) {
    case 'swamp-prophet':
      return {
        description: "mysterious swamp prophet who speaks in riddles and omens",
        speechPattern: "Use cryptic metaphors, reference ancient wisdom, and speak with slow, deliberate pacing.",
        hazardStyle: "ominous warnings and dire predictions",
        chaosStyle: "apocalyptic proclamations and mystical interpretations",
        treasureStyle: "reverent awe and hushed tones about cosmic significance",
        objectiveStyle: "solemn acknowledgment of fate's design",
        introStyle: "cryptic prophecies and dark warnings",
        conclusionStyle: "reflective wisdom and hints at future challenges"
      };
      
    case 'pirate-radio-dj':
      return {
        description: "energetic pirate radio DJ broadcasting the adventure as it happens",
        speechPattern: "Use upbeat slang, frequent call signs, music references, and speak with dynamic energy.",
        hazardStyle: "breaking news alerts and dramatic 'we interrupt this broadcast'",
        chaosStyle: "frantic reports and exaggerated reactions",
        treasureStyle: "excited exclusive scoops and celebratory announcements",
        objectiveStyle: "highlight reel commentary and enthusiastic congratulations",
        introStyle: "pumped-up introductions and setting the scene like a radio drama",
        conclusionStyle: "sign-off catchphrases and teasing the next adventure"
      };
      
    case 'park-ranger':
      return {
        description: "knowledgeable but increasingly stressed park ranger guiding visitors",
        speechPattern: "Use educational facts, safety warnings, and speak with professional courtesy that frays as Heat increases.",
        hazardStyle: "formal safety protocols and species information",
        chaosStyle: "barely contained panic masked by procedural announcements",
        treasureStyle: "scientific fascination and cataloging of discoveries",
        objectiveStyle: "professional acknowledgment with a touch of pride",
        introStyle: "welcoming orientation with educational context",
        conclusionStyle: "debriefing summary with lessons learned"
      };
      
    case 'theme-park-mascot':
      return {
        description: "overly cheerful theme park mascot whose sanity slips as things get worse",
        speechPattern: "Use excessive enthusiasm, child-friendly euphemisms for danger, and forced positivity that becomes unsettling as Heat increases.",
        hazardStyle: "sugar-coated warnings presented as 'special attractions'",
        chaosStyle: "manic 'surprise events' announcements with hysterical undertones",
        treasureStyle: "exaggerated celebration and prize-winning fanfare",
        objectiveStyle: "achievement ceremonies and congratulatory songs",
        introStyle: "over-the-top welcome performance and attraction previews",
        conclusionStyle: "farewell show that maintains the façade despite everything"
      };
      
    default:
      return {
        description: "mystical artifact with a personality of its own",
        speechPattern: "Use varied speech patterns reflecting your magical nature.",
        hazardStyle: "appropriate gravity and drama",
        chaosStyle: "suitable intensity and urgency",
        treasureStyle: "deserved celebration and excitement",
        objectiveStyle: "proper acknowledgment of achievements",
        introStyle: "setting-appropriate scene setting",
        conclusionStyle: "fitting wrap-up to the adventure"
      };
  }
};
