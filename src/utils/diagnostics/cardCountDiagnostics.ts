
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
    try {
      // Check gear card categories
      const gearCategoryBreakdown = {
        consumable: collections.gear.filter(c => (c as any).category === 'consumable').length,
        tool: collections.gear.filter(c => (c as any).category === 'tool').length,
        weapon: collections.gear.filter(c => (c as any).category === 'weapon').length,
        vehicle: collections.gear.filter(c => (c as any).category === 'vehicle').length,
        supply: collections.gear.filter(c => (c as any).category === 'supply').length,
        uncategorized: collections.gear.filter(c => !(c as any).category).length
      };
      
      log.info("Gear card details", {
        total: collections.gear.length,
        ...gearCategoryBreakdown,
        firstFewIDs: collections.gear.slice(0, 3).map(c => c.id)
      });
    } catch (err) {
      log.error("Error analyzing gear cards", { error: String(err) });
    }
  }
  
  if (collections.treasure) {
    try {
      // Check treasure breakdown
      const treasureTypeBreakdown = {
        regularTreasure: collections.treasure.filter(c => c.type === 'treasure').length,
        artifacts: collections.treasure.filter(c => c.type === 'artifact').length
      };
      
      log.info("Treasure card details", {
        total: collections.treasure.length,
        ...treasureTypeBreakdown,
        firstFewIDs: collections.treasure.slice(0, 3).map(c => c.id)
      });
    } catch (err) {
      log.error("Error analyzing treasure cards", { error: String(err) });
    }
  }
}
