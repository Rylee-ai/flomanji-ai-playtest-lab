
import React from "react";
import { Button } from "@/components/ui/button";
import { FileJson } from "lucide-react";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransformFileSelectorProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
  isProcessing: boolean;
  onFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TransformFileSelector = ({ 
  cardType, 
  setCardType, 
  isProcessing, 
  onFileSelected 
}: TransformFileSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Select value={cardType} onValueChange={(value: CardType) => setCardType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Card Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="player-character">Player Characters</SelectItem>
          <SelectItem value="npc">NPC Characters</SelectItem>
          <SelectItem value="flomanjified">Flomanjified Roles</SelectItem>
          <SelectItem value="treasure">Treasure Cards</SelectItem>
          <SelectItem value="gear">Gear Cards</SelectItem>
          <SelectItem value="hazard">Hazard Cards</SelectItem>
          <SelectItem value="chaos">Chaos Cards</SelectItem>
          <SelectItem value="region">Region Cards</SelectItem>
          <SelectItem value="mission">Mission Sheets</SelectItem>
          <SelectItem value="secret">Secret Objectives</SelectItem>
          <SelectItem value="automa">Automa Cards</SelectItem>
        </SelectContent>
      </Select>
      
      <input
        type="file"
        accept=".json"
        onChange={onFileSelected}
        className="hidden"
        id="card-transform"
        disabled={isProcessing}
      />
      <label htmlFor="card-transform">
        <Button variant="outline" type="button" disabled={isProcessing} asChild>
          <span className="flex items-center space-x-2">
            {isProcessing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <FileJson className="h-4 w-4 mr-2" />
                <span>Transform {cardType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} JSON</span>
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
};
