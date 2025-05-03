
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Download, Clipboard, FileText, File, Settings } from "lucide-react";
import { showSuccessToast } from "@/lib/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SimulationResult } from "@/types";
import { SimulationExporter, ExportOptions, defaultExportOptions } from "@/lib/simulation/export/SimulationExporter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [exportOptions, setExportOptions] = useState<ExportOptions>({...defaultExportOptions});
  const [exportFormat, setExportFormat] = useState<'pdf' | 'markdown'>('pdf');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  
  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(simulationId);
    showSuccessToast("Simulation ID has been copied to clipboard");
  };
  
  const handleExport = () => {
    setIsExporting(true);
    try {
      if (exportFormat === 'pdf') {
        SimulationExporter.exportToPdf(simulation, exportOptions);
      } else {
        SimulationExporter.exportToMarkdown(simulation, exportOptions);
      }
    } finally {
      setIsExporting(false);
      setExportDialogOpen(false);
    }
  };
  
  const hasTrainingData = !!simulation.trainingData;
  const hasCriticFeedback = !!simulation.criticFeedback;
  const hasAnnotations = !!simulation.annotations && simulation.annotations.trim().length > 0;

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
        
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isExporting}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => {
                  setExportFormat('pdf');
                  setExportOptions({...defaultExportOptions});
                }}>
                  <File className="mr-2 h-4 w-4" />
                  Custom PDF Export...
                </DropdownMenuItem>
              </DialogTrigger>
              
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => {
                  setExportFormat('markdown');
                  setExportOptions({...defaultExportOptions});
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  Custom Markdown Export...
                </DropdownMenuItem>
              </DialogTrigger>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => {
                setIsExporting(true);
                try {
                  SimulationExporter.exportToPdf(simulation);
                } finally {
                  setIsExporting(false);
                }
              }}>
                <File className="mr-2 h-4 w-4" />
                Quick PDF Export
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => {
                setIsExporting(true);
                try {
                  SimulationExporter.exportToMarkdown(simulation);
                } finally {
                  setIsExporting(false);
                }
              }}>
                <FileText className="mr-2 h-4 w-4" />
                Quick Markdown Export
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export Raw JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Custom {exportFormat === 'pdf' ? 'PDF' : 'Markdown'} Export</DialogTitle>
              <DialogDescription>
                Select content sections to include in your {exportFormat === 'pdf' ? 'PDF' : 'Markdown'} export file.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-5 py-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-metadata" 
                    checked={exportOptions.includeMetadata}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeMetadata: !!checked})
                    } 
                  />
                  <Label htmlFor="include-metadata">
                    Basic Metadata (ID, date, rounds, players)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-log" 
                    checked={exportOptions.includeLog}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeLog: !!checked})
                    } 
                  />
                  <Label htmlFor="include-log">
                    Simulation Log
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-annotations" 
                    disabled={!hasAnnotations}
                    checked={exportOptions.includeAnnotations && hasAnnotations}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeAnnotations: !!checked})
                    } 
                  />
                  <Label htmlFor="include-annotations" className={!hasAnnotations ? "text-muted-foreground" : ""}>
                    Notes & Annotations {!hasAnnotations && "(None available)"}
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-critic-feedback" 
                    disabled={!hasCriticFeedback}
                    checked={exportOptions.includeCriticFeedback && hasCriticFeedback}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeCriticFeedback: !!checked})
                    } 
                  />
                  <Label htmlFor="include-critic-feedback" className={!hasCriticFeedback ? "text-muted-foreground" : ""}>
                    Critic Feedback {!hasCriticFeedback && "(None available)"}
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="include-training-stats" 
                    disabled={!hasTrainingData}
                    checked={exportOptions.includeTrainingStats && hasTrainingData}
                    onCheckedChange={(checked) => 
                      setExportOptions({...exportOptions, includeTrainingStats: !!checked})
                    } 
                  />
                  <Label htmlFor="include-training-stats" className={!hasTrainingData ? "text-muted-foreground" : ""}>
                    Training Statistics {!hasTrainingData && "(None available)"}
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              
              <Button type="button" onClick={handleExport} disabled={isExporting}>
                Export {exportFormat === 'pdf' ? 'PDF' : 'Markdown'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button variant="ghost" size="icon" onClick={copyIdToClipboard} title="Copy simulation ID">
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SimulationDetailsControls;
