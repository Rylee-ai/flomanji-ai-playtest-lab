import { useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { toast } from "sonner";
import { CardFormValues } from "../CardForm";
import { TREASURE_CARDS } from "@/lib/cards/treasure-cards";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { AUTOMA_CARDS } from "@/lib/cards/automa-cards";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { NPC_CARDS } from "@/lib/cards/npc-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { HAZARD_CARDS } from "@/lib/cards/hazard-cards";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

const SESSION_CARDS: Record<string, GameCard[]> = {
  treasure: [],
  hazard: [],
  automa: [],
  region: [],
  npc: [],
  mission: [],
  gear: [],
  chaos: [],
  flomanjified: [],
  secret: [],
  "player-character": [],
};

export const useCardManagement = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CardType>("treasure");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GameCard | undefined>();

  const getCardById = (id: string): GameCard | undefined => {
    const allCards: GameCard[] = [
      ...TREASURE_CARDS,
      ...SECRET_OBJECTIVES,
      ...AUTOMA_CARDS,
      ...REGION_CARDS,
      ...NPC_CARDS,
      ...MISSION_CARDS,
      ...HAZARD_CARDS,
      ...GEAR_CARDS,
      ...CHAOS_CARDS,
      ...FLOMANJIFIED_CARDS,
      ...PLAYER_CHARACTER_CARDS,
      ...Object.values(SESSION_CARDS).flat()
    ];
    return allCards.find(card => card.id === id);
  };

  const handleViewCard = (id: string) => {
    setSelectedCard(id);
  };

  const handleEditCard = (card: GameCard) => {
    console.log("Editing card:", card); // Added for debugging
    setEditingCard(card);
    setActiveTab(card.type as CardType);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(undefined);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: CardFormValues) => {
    console.log("Form submitted with data:", data);
    
    const cardData: GameCard = {
      id: editingCard?.id || `card-${Date.now().toString(36)}`,
      name: data.name,
      type: data.type as CardType,
      icons: data.icons || [],
      keywords: data.keywords || [],
      rules: data.rules || [],
      flavor: data.flavor || "",
      imagePrompt: data.imagePrompt || "",
    };
    
    if (!editingCard) {
      const cardType = cardData.type as string;
      const targetArray = SESSION_CARDS[cardType] || SESSION_CARDS.treasure;
      targetArray.push(cardData);
      
      toast.success(`${data.name} created successfully`);
    } else {
      toast.success(`${data.name} updated successfully`);
    }
    
    setIsFormOpen(false);
    setEditingCard(undefined);
  };

  const getActiveCards = () => {
    const baseCards = (() => {
      switch (activeTab) {
        case "treasure":
          return TREASURE_CARDS;
        case "hazard":
          return HAZARD_CARDS;
        case "automa":
          return AUTOMA_CARDS;
        case "region":
          return REGION_CARDS;
        case "npc":
          return NPC_CARDS;
        case "mission":
          return MISSION_CARDS;
        case "gear":
          return GEAR_CARDS;
        case "chaos":
          return CHAOS_CARDS;
        case "flomanjified":
          return FLOMANJIFIED_CARDS;
        case "secret":
          return SECRET_OBJECTIVES;
        case "player-character":
          return PLAYER_CHARACTER_CARDS;
        default:
          return [];
      }
    })();
    
    const sessionCards = SESSION_CARDS[activeTab] || [];
    return [...baseCards, ...sessionCards];
  };

  return {
    selectedCard,
    setSelectedCard,
    activeTab,
    isFormOpen,
    editingCard,
    setActiveTab,
    setIsFormOpen,
    getCardById,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
    getActiveCards,
  };
};
