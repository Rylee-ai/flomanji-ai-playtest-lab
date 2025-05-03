
import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCardTemplateForType } from "@/utils/card-templates";

interface TemplateDownloaderProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
}

export const TemplateDownloader = ({
  cardType,
  setCardType,
}: TemplateDownloaderProps) => {
  const handleDownloadTemplate = () => {
    const template = getCardTemplateForType(cardType);
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cardType}-template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Download a template for the selected card type to help you create valid card data.
      </p>
      
      <div className="flex items-center space-x-4">
        <Select 
          value={cardType} 
          onValueChange={(value: CardType) => setCardType(value)}
        >
          <SelectTrigger className="w-[220px]">
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
        
        <Button onClick={handleDownloadTemplate} className="gap-2">
          <Download className="h-4 w-4" />
          Download Template
        </Button>
      </div>
      
      <Alert>
        <AlertTitle>Template Format</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>
            The template contains the minimum required fields for the selected card type.
            You can add additional fields as needed based on the card type.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Save your completed template as a JSON file and upload it using the Upload tab.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
};
