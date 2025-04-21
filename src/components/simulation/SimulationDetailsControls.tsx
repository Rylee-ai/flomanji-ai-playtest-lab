
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Download, Clipboard } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface SimulationDetailsControlsProps {
  simulationId: string;
  showPrompts: boolean;
  onTogglePrompts: () => void;
  onExportData: () => void;
  onBack?: () => void;
}

const SimulationDetailsControls = ({ 
  simulationId, 
  showPrompts, 
  onTogglePrompts, 
  onExportData,
  onBack
}: SimulationDetailsControlsProps) => {
  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(simulationId);
    toast({
      title: "ID copied",
      description: "Simulation ID has been copied to clipboard",
    });
  };

  return (
    <div className="flex items-center justify-between">
      {onBack && (
        <Button variant="outline" size="sm" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="show-prompts" checked={showPrompts} onCheckedChange={onTogglePrompts} />
          <Label htmlFor="show-prompts">Debug Mode</Label>
        </div>
        
        <Button variant="outline" size="sm" onClick={onExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        
        <Button variant="ghost" size="icon" onClick={copyIdToClipboard} title="Copy simulation ID">
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SimulationDetailsControls;
