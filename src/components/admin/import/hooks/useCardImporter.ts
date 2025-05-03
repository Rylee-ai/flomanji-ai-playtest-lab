
import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImportOrchestrator } from "./useCardImportOrchestrator";

interface UseCardImporterProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
}

/**
 * Main hook for card importing functionality
 * This is now a slim wrapper around useCardImportOrchestrator for backward compatibility
 */
export function useCardImporter({ onImportComplete, initialCardType = "gear" }: UseCardImporterProps) {
  // Use the specialized orchestrator hook
  const importOrchestrator = useCardImportOrchestrator({
    onImportComplete,
    initialCardType
  });

  // Return all properties from the orchestrator
  // This maintains backward compatibility
  return {
    ...importOrchestrator
  };
}
