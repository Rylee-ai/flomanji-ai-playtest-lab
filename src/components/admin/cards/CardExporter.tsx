
import React from "react";
import { CardType } from "@/types/cards";
import { FileBasedCardAdapter } from "@/utils/file-based/FileBasedCardAdapter";
import { toast } from "sonner";

interface CardExporterProps {
  cardType: CardType;
}

export const CardExporter: React.FC<CardExporterProps> = ({ cardType }) => {
  const handleExport = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    try {
      toast.info(`Exporting ${cardType} cards...`);
      
      // Get cards from file-based system
      const cards = await FileBasedCardAdapter.exportCards(cardType);
      
      if (!cards || cards.length === 0) {
        toast.warning(`No ${cardType} cards found to export`);
        return;
      }
      
      // Create file for download
      const blob = FileBasedCardAdapter.prepareExportFile(cards);
      const fileName = FileBasedCardAdapter.generateExportFileName(cardType);
      
      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      toast.success(`Successfully exported ${cards.length} ${cardType} cards`);
    } catch (error) {
      console.error("Error exporting cards:", error);
      toast.error(`Failed to export cards: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  // Hidden input that handles the export logic
  return <input type="file" className="hidden" onClick={handleExport} />;
};
