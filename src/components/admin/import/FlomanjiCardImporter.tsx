
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download } from "lucide-react";
import { importFlomanjiGearCards } from "@/utils/importFlomanjiCards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FlomanjiCardImporterProps {
  onComplete?: () => void;
}

export function FlomanjiCardImporter({ onComplete }: FlomanjiCardImporterProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [importResult, setImportResult] = useState<{
    success?: boolean;
    count?: number;
    errors?: string[];
  }>({});

  const handleImport = async () => {
    setIsImporting(true);
    setImportProgress(0);
    
    try {
      // Use interval to simulate progress since we can't get real-time updates
      const progressInterval = setInterval(() => {
        setImportProgress((prev) => Math.min(prev + 5, 95));
      }, 200);
      
      // Perform the import
      const result = await importFlomanjiGearCards();
      
      // Clear interval and set final progress
      clearInterval(progressInterval);
      setImportProgress(100);
      
      // Set results
      setImportResult(result);
      setIsDialogOpen(true);
      
      // Call the completion callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error importing cards:", error);
      setImportResult({
        success: false,
        count: 0,
        errors: [error instanceof Error ? error.message : "Unknown error occurred"]
      });
      setIsDialogOpen(true);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleImport}
        disabled={isImporting}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        <span>Import Flomanji Cards</span>
        {isImporting && <span className="ml-2 text-xs">{importProgress}%</span>}
      </Button>

      {isImporting && (
        <Progress value={importProgress} className="h-1 mt-2" />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {importResult.success
                ? "Cards Imported Successfully"
                : "Import Completed with Issues"}
            </DialogTitle>
            <DialogDescription>
              {importResult.success
                ? `Successfully imported ${importResult.count} Flomanji gear cards into the database.`
                : "There were some issues importing the cards."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center gap-2">
              <Badge variant={importResult.success ? "success" : "destructive"}>
                {importResult.success ? "Success" : "Issues Detected"}
              </Badge>
              <span>{importResult.count || 0} cards processed</span>
            </div>
            
            {importResult.errors && importResult.errors.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Errors:</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {importResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
