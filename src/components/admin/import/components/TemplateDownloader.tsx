
import React, { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCardTemplateForType } from "@/utils/card-templates";
import { getMarkdownTemplateForType } from "@/utils/markdown-templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateDownloaderProps {
  cardType: CardType;
  setCardType: (type: CardType) => void;
}

export const TemplateDownloader = ({
  cardType,
  setCardType,
}: TemplateDownloaderProps) => {
  const [formatType, setFormatType] = useState<"json" | "markdown">("json");

  const handleDownloadTemplate = () => {
    let template: any;
    let fileName: string;
    let fileType: string;
    
    if (formatType === "json") {
      template = getCardTemplateForType(cardType);
      fileName = `${cardType}-template.json`;
      fileType = "application/json";
      template = JSON.stringify(template, null, 2);
    } else {
      template = getMarkdownTemplateForType(cardType);
      fileName = `${cardType}-template.md`;
      fileType = "text/markdown";
    }
    
    const blob = new Blob([template], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Download a template for the selected card type to help you create valid card data.
      </p>
      
      <Tabs defaultValue="json" value={formatType} onValueChange={(value) => setFormatType(value as "json" | "markdown")}>
        <TabsList className="mb-4">
          <TabsTrigger value="json">JSON Format</TabsTrigger>
          <TabsTrigger value="markdown">Markdown Format</TabsTrigger>
        </TabsList>
        
        <TabsContent value="json">
          <p className="text-sm text-muted-foreground mb-4">
            Download a JSON template with the required fields for the selected card type.
          </p>
        </TabsContent>
        
        <TabsContent value="markdown">
          <p className="text-sm text-muted-foreground mb-4">
            Download a Markdown template with sections for each card property. 
            Markdown templates are easier to read and edit in text editors.
          </p>
        </TabsContent>
      </Tabs>
      
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
          Download {formatType === "json" ? "JSON" : "Markdown"} Template
        </Button>
      </div>
      
      <Alert>
        <AlertTitle>Template Format</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>
            {formatType === "json" 
              ? "The JSON template contains the minimum required fields for the selected card type."
              : "The Markdown template provides a structured format with sections for each card property, making it easy to create multiple cards in a single file."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {formatType === "json"
              ? "Save your completed template as a JSON file and upload it using the Upload tab."
              : "Fill in the template in any text editor and save it as a .md file for uploading."}
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
};
