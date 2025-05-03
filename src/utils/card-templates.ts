
import { CardType } from "@/types/cards";

// Basic templates for each card type
export const getCardTemplateForType = (cardType: CardType): Record<string, any> => {
  const baseTemplate = {
    id: "example-id",
    name: "Example Name",
    type: cardType,
    icons: [
      { symbol: "🔮", meaning: "Magic" }
    ],
    keywords: ["keyword1", "keyword2"],
    rules: ["Rule description goes here"],
    flavor: "Flavor text for card",
    imagePrompt: "Description for AI image generation"
  };
  
  switch (cardType) {
    case 'treasure':
    case 'artifact':
      return {
        ...baseTemplate,
        value: 3,
        consumable: false
      };
    
    case 'gear':
      return {
        ...baseTemplate,
        category: 'tool', // 'consumable' | 'tool' | 'weapon' | 'vehicle' | 'supply'
        uses: 3
      };
    
    case 'hazard':
      return {
        ...baseTemplate,
        subType: 'environmental', // 'environmental' | 'creature' | 'social' | 'weird'
        difficultyClasses: {
          fight: 8,
          flee: 7
        },
        onSuccess: "What happens on success",
        onFailure: "What happens on failure"
      };
    
    case 'npc':
    case 'player-character':
      return {
        ...baseTemplate,
        role: "Character role",
        stats: {
          brawn: 3,
          moxie: 2,
          charm: 4,
          grit: 3,
          weirdSense: 2
        },
        health: 10,
        ability: {
          name: "Special Ability",
          description: "Ability description"
        }
      };
    
    case 'mission':
      return {
        ...baseTemplate,
        hook: "Mission introduction",
        startingHeat: 2,
        objectives: [
          {
            description: "Main objective",
            required: true
          },
          {
            description: "Optional objective",
            required: false,
            reward: "Bonus reward"
          }
        ],
        scaling: {
          small: "For 2-3 players",
          large: "For 4-6 players"
        }
      };
      
    case 'flomanjified':
      return {
        ...baseTemplate,
        originalRole: "Original character role",
        chaosAction: "Special chaos action",
        specialAbility: "Flomanjified ability"
      };
      
    case 'region':
      return {
        ...baseTemplate,
        biomeTags: ["coastal", "urban"],
        onEnter: "Effect when entering region",
        action: "Special action available in this region",
        rest: "Special rest effects",
        bonusZone: "Description of bonus zone"
      };
      
    case 'secret':
      return {
        ...baseTemplate,
        alignment: "saboteur", // 'saboteur' | 'innocent'
        winCondition: "What must be accomplished to win"
      };
      
    case 'automa':
      return {
        ...baseTemplate,
        movement: "How automa moves",
        combatBonus: 2,
        specialEffect: "Special effect description"
      };
      
    case 'chaos':
      return {
        ...baseTemplate,
        heatEffect: 2,
        globalEffect: "Effect on all players",
        duration: "ongoing" // 'immediate' | 'ongoing' | 'end-of-round'
      };
      
    default:
      return baseTemplate;
  }
};

// Export card format documentation
export const cardFieldDocumentation = {
  id: "Unique identifier for the card",
  name: "Display name of the card",
  type: "Card type (gear, treasure, hazard, etc.)",
  icons: "Array of icon objects with symbol and meaning",
  keywords: "Array of keyword strings for searching/filtering",
  rules: "Array of rule text strings",
  flavor: "Flavor text/quote for the card",
  imagePrompt: "Text prompt for image generation"
};
