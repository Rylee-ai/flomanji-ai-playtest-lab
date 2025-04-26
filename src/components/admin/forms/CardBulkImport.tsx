
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { processImportedCards } from "@/utils/cardImport";
import { CardFormValues } from "@/types/forms/card-form";
import { Upload } from "lucide-react";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardBulkImportProps {
  onImport: (cards: CardFormValues[]) => void;
}

export const CardBulkImport = ({ onImport }: CardBulkImportProps) => {
  const [cardType, setCardType] = useState<CardType>('gear');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      const processedCards = processImportedCards(jsonData, cardType);
      
      onImport(processedCards as CardFormValues[]);
      toast.success(`Successfully processed ${processedCards.length} ${cardType} cards`);
    } catch (error) {
      console.error('Error importing cards:', error);
      toast.error(`Failed to import ${cardType} cards. Please check the file format.`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={cardType} onValueChange={(value: CardType) => setCardType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Card Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gear">Gear Cards</SelectItem>
          <SelectItem value="treasure">Treasure Cards</SelectItem>
          <SelectItem value="hazard">Hazard Cards</SelectItem>
          <SelectItem value="npc">NPC Cards</SelectItem>
          <SelectItem value="exploration">Exploration Mission</SelectItem>
          <SelectItem value="escape">Escape Mission</SelectItem>
          <SelectItem value="escort">Escort Mission</SelectItem>
          <SelectItem value="collection">Collection Mission</SelectItem>
          <SelectItem value="boss">Boss Mission</SelectItem>
          <SelectItem value="solo">Solo Mission</SelectItem>
        </SelectContent>
      </Select>
      
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
        id="card-import"
      />
      <label htmlFor="card-import">
        <Button variant="outline" type="button" asChild>
          <span className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import {cardType.charAt(0).toUpperCase() + cardType.slice(1)} Cards</span>
          </span>
        </Button>
      </label>
    </div>
  );
};

