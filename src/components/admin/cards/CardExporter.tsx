
import React, { useState } from "react";
import { CardService } from "@/services/CardService";
import { CardType } from "@/types/cards";
import { toast } from "sonner";

interface CardExporterProps {
  cardType: CardType;
}

export const CardExporter = ({ cardType }: CardExporterProps) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Get cards of the selected type
      const cards = await CardService.getCardsByType(cardType);
      
      if (!cards || cards.length === 0) {
        toast.warning(`No ${cardType} cards found to export`);
        setIsExporting(false);
        return;
      }
      
      // Convert to JSON
      const json = CardService.exportCardsToJSON(cards);
      
      // Create download link
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cardType}-cards.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success(`${cards.length} ${cardType} cards exported successfully`);
    } catch (error) {
      console.error("Error exporting cards:", error);
      toast.error(`Failed to export ${cardType} cards`);
    } finally {
      setIsExporting(false);
    }
    
    return false; // Prevent default link behavior
  };

  return (
    <span 
      onClick={handleExport} 
      className={`cursor-pointer ${isExporting ? 'opacity-50' : ''}`}
      aria-disabled={isExporting}
    >
      {isExporting ? "Exporting..." : "Export Cards"}
    </span>
  );
};
