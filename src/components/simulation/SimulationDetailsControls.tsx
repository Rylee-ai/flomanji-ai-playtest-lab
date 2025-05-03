
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Download, Clipboard, FileText, FilePdf } from "lucide-react";
import { showSuccessToast } from "@/lib/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SimulationResult } from "@/types";
import { SimulationExporter } from "@/lib/simulation/export/SimulationExporter";

interface SimulationDetailsControlsProps {
  simulationId: string;
  simulation: SimulationResult;
  showPrompts: boolean;
  onTogglePrompts: () => void;
  onExportData: () => void;
  onBack?: () => void;
}

const SimulationDetailsControls = ({ 
  simulationId, 
  simulation,
  showPrompts, 
  onTogglePrompts, 
  onExportData,
  onBack
}: SimulationDetailsControlsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(simulationId);
    showSuccessToast("Simulation ID has been copied to clipboard");
  };
  
  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      SimulationExporter.exportToPdf(simulation);
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleExportMarkdown = () => {
    setIsExporting(true);
    try {
      SimulationExporter.exportToMarkdown(simulation);
    } finally {
      setIsExporting(false);
    }
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isExporting}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportPdf}>
              <FilePdf className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportMarkdown}>
              <FileText className="mr-2 h-4 w-4" />
              Export as Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export Raw JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" onClick={copyIdToClipboard} title="Copy simulation ID">
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SimulationDetailsControls;
