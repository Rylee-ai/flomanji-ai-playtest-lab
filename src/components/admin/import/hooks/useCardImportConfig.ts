
import { useState } from "react";
import { CardType } from "@/types/cards";

/**
 * Hook for managing card import configuration
 */
export function useCardImportConfig(initialCardType: CardType = "gear") {
  const [cardType, setCardType] = useState<CardType>(initialCardType);

  /**
   * Reset the import configuration
   */
  const resetConfig = () => {
    // Currently only resets the card type if needed
    // Extended for future configuration options
  };

  return {
    cardType,
    setCardType,
    resetConfig
  };
}
