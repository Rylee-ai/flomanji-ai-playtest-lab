
/**
 * @deprecated Use the new import hooks in src/components/admin/import/hooks/ instead
 * This file is kept for backward compatibility
 */

import { CardType } from "@/types/cards";
import { CardFormValues } from "@/types/forms/card-form";
import { CardImportResult } from "@/types/cards/card-version";
import { useCardImporter as useCardImporterNew } from "./hooks/useCardImporter";

interface UseCardImporterProps {
  onImportComplete: (cards: CardFormValues[], results: CardImportResult) => void;
  initialCardType?: CardType;
}

/**
 * @deprecated Use useCardImporter from ./hooks/useCardImporter instead
 */
export function useCardImporter({ onImportComplete, initialCardType = "gear" }: UseCardImporterProps) {
  console.warn("This hook is deprecated. Use useCardImporter from ./hooks/useCardImporter instead");
  return useCardImporterNew({ onImportComplete, initialCardType });
}
