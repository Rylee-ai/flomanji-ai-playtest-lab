
import { SimulationConfig } from "@/types";

export type GobletVoiceType = 'swamp-prophet' | 'pirate-radio-dj' | 'park-ranger' | 'theme-park-mascot' | 'random';

export const getGobletNarration = (
  type: 'intro' | 'hazard' | 'result' | 'round-end',
  gobletVoice: GobletVoiceType,
  heat: number,
  context?: any
): string => {
  let narration = '';
  let gobletMood = heat >= 8 ? "malfunctioning" : heat >= 5 ? "excited" : "normal";
  
  switch(gobletVoice) {
    case 'swamp-prophet':
      switch(type) {
        case 'intro':
          narration = "The Goblet speaks in hushed, mystical tones: \"The waters stir with portents, travelers. The path ahead is fraught with whispers from beyond. Heed the signs, for they speak of what shadows lie ahead.\"";
          break;
        case 'hazard':
          narration = "The Goblet's surface ripples unnaturally: \"The veil grows thin. An omen approaches. The spirits warn of danger.\"";
          break;
        case 'result':
          narration = "The Goblet hums with spiritual energy: \"The fates have spoken through the trembling waters. Their judgment is revealed.\"";
          break;
        case 'round-end':
          narration = "The Goblet's voice deepens: \"Another cycle completes. The moon shifts, the waters rise. What waits beyond the next bend?\"";
          break;
      }
      break;
      
    case 'pirate-radio-dj':
      switch(type) {
        case 'intro':
          narration = "The Goblet crackles like an old radio: \"GOOOOOD EVENING SURVIVORS! You're tuned to 87.9 FM - DOOM on the dial! We're coming at you LIVE from the edge of sanity! Stay tuned for weather, traffic, and imminent threats to your existence!\"";
          break;
        case 'hazard':
          narration = "Static bursts from the Goblet: \"BREAKING NEWS! We've got a situation developing! This is NOT a drill, folks! I repeat, this is NOT a drill!\"";
          break;
        case 'result':
          narration = "The Goblet makes a record scratch sound: \"And the results are IN! Let's go to our correspondent in the field - ME!\"";
          break;
        case 'round-end':
          narration = "The Goblet's voice fades like a radio signal: \"And that's all the time we have for this segment, folks! Stay tuned after these messages from our sponsor - CERTAIN DOOM!\"";
          break;
      }
      break;
      
    case 'park-ranger':
      switch(type) {
        case 'intro':
          narration = "The Goblet speaks with a tired drawl: \"Welcome to Florida State Emergency Zone 42. Please keep your limbs inside the designated safe areas at all times. No, I cannot give refunds if you get bit. Yes, everything here can and will try to kill you.\"";
          break;
        case 'hazard':
          narration = "The Goblet sighs audibly: \"Folks, we've got another situation. I'm required by state law to inform you of the approaching danger, but honestly, you signed the waiver.\"";
          break;
        case 'result':
          narration = "The Goblet's voice is flat: \"I've seen this outcome about a hundred times. You might want to write this down for future reference.\"";
          break;
        case 'round-end':
          narration = "The Goblet sounds exhausted: \"That concludes our scheduled programming for this section of the tour. Please proceed to the next area, and remember - I told you not to touch that.\"";
          break;
      }
      break;
      
    case 'theme-park-mascot':
      switch(type) {
        case 'intro':
          narration = "The Goblet's voice is unnervingly cheerful: \"HI THERE HAPPY FRIENDS! Welcome to the MOST SPECTACULAR adventure of your LIVES! I'm your host, the MAGICAL GOBLET, and we're going to have SO MUCH FUN today! *giggles manically*\"";
          break;
        case 'hazard':
          narration = "The Goblet's cheeriness becomes strained: \"OH MY GOODNESS! Look what's coming our way! Isn't this EXCITING? Don't you just LOVE surprises? *laughs nervously*\"";
          break;
        case 'result':
          narration = "The Goblet bounces with glee: \"And now for my FAVORITE part! Let's see how you did! Remember, in this park, EVERYONE'S a winner... until they're not! HAHAHA!\"";
          break;
        case 'round-end':
          narration = "The Goblet's voice drops an octave before returning to normal: \"That's the end of this attraction, friends. *deep voice* But not the end of you... *normal voice* YET! On to the next THRILLING experience!\"";
          break;
      }
      break;
  }

  if (heat >= 8) {
    narration += " The Goblet's surface is dangerously hot to the touch, glowing with an ominous red light.";
  } else if (heat >= 5) {
    narration += " The Goblet feels warm, pulsing with increasing energy.";
  }
  
  return narration;
};

export const selectGobletVoice = (config: SimulationConfig): GobletVoiceType => {
  if (config.gobletVoice === 'random') {
    const voices: GobletVoiceType[] = ['swamp-prophet', 'pirate-radio-dj', 'park-ranger', 'theme-park-mascot'];
    return voices[Math.floor(Math.random() * voices.length)];
  }
  return config.gobletVoice || 'swamp-prophet';
};
