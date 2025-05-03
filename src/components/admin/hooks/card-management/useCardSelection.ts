
import { useState } from "react";
import { GameCard } from "@/types/cards";
import { CardVersion } from "@/types/cards/card-version";

export const useCardSelection = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<GameCard | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [versionHistory, setVersionHistory] = useState<CardVersion[]>([]);

  const handleViewCard = (id: string) => {
    setSelectedCard(id);
  };

  return {
    selectedCard,
    editingCard,
    isFormOpen,
    versionHistory,
    setSelectedCard,
    setEditingCard,
    setIsFormOpen,
    setVersionHistory,
    handleViewCard
  };
};
