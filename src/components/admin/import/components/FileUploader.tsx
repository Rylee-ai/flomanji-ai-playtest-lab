
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Import, Bot } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CardType } from "@/types/cards";
import { TemplateDownloader } from "./TemplateDownloader";
import { importFlomanjiGearCards } from "@/utils/importFlomanjiCards";
import { importFlomanjiPlayerCharacters } from "@/utils/importFlomanjiPlayerCharacters";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  cardType: CardType;
  enableAIProcessing?: boolean;
  setEnableAIProcessing?: (enable: boolean) => void;
  fileType?: string | null;
}

export function FileUploader({
  onFileSelected,
  isProcessing,
  cardType,
  enableAIProcessing = false,
  setEnableAIProcessing = () => {},
  fileType
}: FileUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  const handleFlomanjiGearImport = async () => {
    try {
      toast.loading("Importing Flomanji gear cards...");
      const result = await importFlomanjiGearCards();
      if (result.success) {
        toast.success(`Successfully imported ${result.count} Flomanji gear cards`);
      } else {
        toast.error(`Failed to import Flomanji gear cards: ${result.errors?.[0] || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error importing Flomanji gear cards:", error);
      toast.error("Failed to import Flomanji gear cards");
    }
  };

  const handleFlomanjiCharacterImport = async () => {
    try {
      toast.loading("Importing Flomanji player characters...");
      const result = await importFlomanjiPlayerCharacters();
      if (result.success) {
        toast.success(`Successfully imported ${result.count} Flomanji player characters`);
      } else {
        toast.error(`Failed to import Flomanji player characters: ${result.errors?.[0] || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error importing Flomanji player characters:", error);
      toast.error("Failed to import Flomanji player characters");
    }
  };

  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="upload">File Upload</TabsTrigger>
        <TabsTrigger value="flomanji">Flomanji Card Sets</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload">
        <Card className="border-dashed border-2 p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <div className="flex flex-col items-center justify-center">
              <Import className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold">Upload Your Cards</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
                Select a JSON or Markdown file containing card data. 
                {fileType && <span className="block font-medium mt-1">Detected format: {fileType}</span>}
              </p>
            </div>
          </div>
          
          <Button variant="outline" className="relative" disabled={isProcessing}>
            Choose File
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              accept=".json,.md,.markdown" 
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </Button>
          
          <div className="mt-6 w-full">
            <TemplateDownloader cardType={cardType} />
          </div>
          
          <div className="mt-6 flex items-center space-x-2">
            <Switch
              id="ai-processing"
              checked={enableAIProcessing}
              onCheckedChange={setEnableAIProcessing}
            />
            <Label htmlFor="ai-processing" className="flex items-center cursor-pointer">
              <Bot className="h-4 w-4 mr-1" />
              <span>Enable AI assistance</span>
            </Label>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="flomanji">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Import Pre-defined Flomanji Cards</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Choose from our pre-defined Flomanji card sets to quickly populate your game.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border hover:border-primary/50 transition-colors">
              <h4 className="font-medium mb-2">Flomanji Gear Cards</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Import a collection of pre-defined Flomanji gear cards for your game.
              </p>
              <Button variant="outline" onClick={handleFlomanjiGearImport}>
                Import Gear Cards
              </Button>
            </Card>
            
            <Card className="p-4 border hover:border-primary/50 transition-colors">
              <h4 className="font-medium mb-2">Flomanji Player Characters</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Import the complete set of Flomanji player characters.
              </p>
              <Button variant="outline" onClick={handleFlomanjiCharacterImport}>
                Import Player Characters
              </Button>
            </Card>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
