
import { useState, useCallback } from 'react';
import { GameCard, CardType } from '@/types/cards';
import { HazardCard } from '@/types/cards/hazard';
import { TreasureCard } from '@/types/cards/treasure';
import { NPCCard } from '@/types/cards/npc';
import { FlomanjifiedRoleCard } from '@/types/cards/flomanjified';
import { PlayerCharacterCard } from '@/types/cards/player-character';
import { ChaosCard } from '@/types/cards/chaos';
import { RegionCard } from '@/types/cards/region';
import { MissionSheet } from '@/types/cards/mission';
import { SecretObjectiveCard } from '@/types/cards/secret';
import { CardFormData } from '../CardForm';
import { generateId } from '@/lib/cards/cardUtils';

// Import card data 
import { HAZARD_CARDS } from '@/lib/cards/hazards';
import { TREASURE_CARDS } from '@/lib/cards/treasures';
import { NPC_CARDS } from '@/lib/cards/npcs';
import { FLOMANJIFIED_CARDS } from '@/lib/cards/flomanjified-cards';
import { REGION_CARDS } from '@/lib/cards/region-cards';
import { CHAOS_CARDS } from '@/lib/cards/chaos-cards';
import { MISSION_CARDS } from '@/lib/cards/mission-cards';
import { SECRET_OBJECTIVES } from '@/lib/cards/secret-objectives';

export const useCardManagement = () => {
  const [activeTab, setActiveTab] = useState<CardType>('hazard');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GameCard | undefined>(undefined);
  
  // Helper to get all cards based on active tab
  const getActiveCards = useCallback(() => {
    switch (activeTab) {
      case 'hazard':
        return HAZARD_CARDS;
      case 'treasure':
      case 'artifact':
        return TREASURE_CARDS.filter(card => 
          activeTab === 'artifact' 
            ? card.type === 'artifact' || (!card.consumable && card.value && card.value >= 3)
            : card.type === 'treasure' && (card.consumable || !card.value || card.value < 3)
        );
      case 'npc':
        return NPC_CARDS;
      case 'flomanjified':
        return FLOMANJIFIED_CARDS;
      case 'region':
        return REGION_CARDS;
      case 'chaos':
        return CHAOS_CARDS;
      case 'mission':
        return MISSION_CARDS;
      case 'secret':
        return SECRET_OBJECTIVES;
      default:
        return [];
    }
  }, [activeTab]);
  
  // Get a card by ID from any collection
  const getCardById = useCallback((id: string): GameCard | null => {
    // Search all card collections
    const allCards = [
      ...HAZARD_CARDS,
      ...TREASURE_CARDS,
      ...NPC_CARDS,
      ...FLOMANJIFIED_CARDS,
      ...REGION_CARDS,
      ...CHAOS_CARDS,
      ...MISSION_CARDS,
      ...SECRET_OBJECTIVES
    ];
    
    return allCards.find(card => card.id === id) || null;
  }, []);
  
  // Handle viewing a card (opens preview modal)
  const handleViewCard = useCallback((card: GameCard) => {
    setSelectedCard(card.id);
  }, []);
  
  // Handle editing a card (opens form)
  const handleEditCard = useCallback((card: GameCard) => {
    setEditingCard(card);
    setIsFormOpen(true);
    if (selectedCard) setSelectedCard(null);
  }, [selectedCard]);
  
  // Handle adding a new card
  const handleAddNew = useCallback(() => {
    setEditingCard(undefined);
    setIsFormOpen(true);
    if (selectedCard) setSelectedCard(null);
  }, [selectedCard]);
  
  // Handle form submission
  const handleFormSubmit = useCallback((data: CardFormData) => {
    console.log('Form submitted with data:', data);
    // In a real implementation, this would save the data to a backend
    // or generate a markdown file and commit it to the repo
    
    // For now, just log it and close the form
    setIsFormOpen(false);
    setEditingCard(undefined);
  }, []);
  
  return {
    activeTab,
    selectedCard,
    isFormOpen,
    editingCard,
    setActiveTab,
    setSelectedCard,
    setIsFormOpen,
    setEditingCard,
    getCardById,
    getActiveCards,
    handleViewCard,
    handleEditCard,
    handleAddNew,
    handleFormSubmit,
  };
};
