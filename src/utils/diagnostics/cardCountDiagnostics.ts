
import { CardType } from "@/types/cards";
import { log } from "@/utils/logging";
import { CardCollectionLoader } from "@/services/card-library/CardCollectionLoader";

/**
 * Log and analyze card counts to help diagnose discrepancies
 */
export function analyzeCardCounts(): void {
  if (!CardCollectionLoader.isLoaded()) {
    log.warn("Cannot analyze card counts - collections not loaded");
    return;
  }
  
  const collections = CardCollectionLoader.getCardCollections();
  const counts: Record<string, number> = {};
  
  // Get counts from all collections
  Object.entries(collections).forEach(([type, cards]) => {
    counts[type] = cards.length;
  });
  
  // Log detailed card count analysis
  log.info("Card count analysis", { 
    counts, 
    timestamp: new Date().toISOString(),
    totalCards: Object.values(counts).reduce((sum, count) => sum + count, 0)
  });
  
  // Check specific interesting collections
  if (collections.gear) {
    log.info("Gear card details", {
      total: collections.gear.length,
      consumable: collections.gear.filter(c => (c as any).category === 'consumable').length,
      tool: collections.gear.filter(c => (c as any).category === 'tool').length,
      weapon: collections.gear.filter(c => (c as any).category === 'weapon').length,
      vehicle: collections.gear.filter(c => (c as any).category === 'vehicle').length,
      supply: collections.gear.filter(c => (c as any).category === 'supply').length
    });
  }
}
