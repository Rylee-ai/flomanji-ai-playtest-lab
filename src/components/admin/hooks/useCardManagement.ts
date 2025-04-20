import { useState } from "react";
import { CardType, GameCard } from "@/types/cards";
import { toast } from "sonner";
import { CardFormValues } from "../CardForm";
import { TREASURE_CARDS } from "@/lib/cards/treasures";
import { SECRET_OBJECTIVES } from "@/lib/cards/secret-objectives";
import { AUTOMA_CARDS } from "@/lib/cards/automa-cards";
import { REGION_CARDS } from "@/lib/cards/region-cards";
import { NPC_CARDS } from "@/lib/cards/npc-cards";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import { HAZARD_CARDS } from "@/lib/cards/hazards";
import { GEAR_CARDS } from "@/lib/cards/gear-cards";
import { CHAOS_CARDS } from "@/lib/cards/chaos-cards";
import { FLOMANJIFIED_CARDS } from "@/lib/cards/flomanjified-cards";
import { PLAYER_CHARACTER_CARDS } from "@/lib/cards/player-character-cards";

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
      ...PLAYER_CHARACTER_CARDS
    ];
    return allCards.find(card => card.id === id);
  };

  const handleViewCard = (id: string) => {
    setSelectedCard(id);
  };

  const handleEditCard = (card: GameCard) => {
    setEditingCard(card);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingCard(undefined);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: CardFormValues) => {
    try {
      const cardData: GameCard = {
        id: data.id || crypto.randomUUID(),
        name: data.name,
        type: data.type,
        icons: data.icons || [],
        keywords: data.keywords || [],
        rules: data.rules || [],
        flavor: data.flavor || "",
        imagePrompt: data.imagePrompt || "",
        markdownContent: data.markdownContent,
      };
      
      console.log("Form submitted with data:", cardData);
      toast.success(`${data.name} ${data.id ? "updated" : "created"} successfully`);
      setIsFormOpen(false);
      setEditingCard(undefined);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save card");
    }
  };

  const getActiveCards = () => {
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
