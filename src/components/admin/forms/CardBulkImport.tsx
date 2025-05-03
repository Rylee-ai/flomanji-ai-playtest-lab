
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { processImportedCards } from "@/utils/cardImport";
import { CardFormValues } from "@/types/forms/card-form";
import { Upload, AlertTriangle, FileJson } from "lucide-react";
import { CardType } from "@/types/cards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardImportResult } from "@/types/cards/card-version";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CardBulkImportProps {
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
}

export const CardBulkImport = ({ onImport }: CardBulkImportProps) => {
  const [cardType, setCardType] = useState<CardType>('gear');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);
  const [processedCards, setProcessedCards] = useState<CardFormValues[]>([]);
  const [importResults, setImportResults] = useState<CardImportResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset state
    setIsProcessing(true);
    setProcessProgress(0);
    setProcessedCards([]);
    setImportResults(null);
    setValidationErrors([]);

    try {
      // Basic validation
      if (!file.name.endsWith('.json')) {
        toast.error('Only JSON files are supported');
        setIsProcessing(false);
        return;
      }

      const text = await file.text();
      let jsonData;
      
      try {
        jsonData = JSON.parse(text);
      } catch (error) {
        toast.error('Invalid JSON file format');
        setIsProcessing(false);
        return;
      }

      // Progress simulation for better UX
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress > 90) {
          clearInterval(progressInterval);
        }
        setProcessProgress(progress);
      }, 100);

      // Process the cards
      const processedCards = processImportedCards(jsonData, cardType);
      
      // Validate cards
      const errors: string[] = [];
      processedCards.forEach((card, index) => {
        if (!card.name) errors.push(`Card #${index + 1}: Missing name`);
        if (!card.type) errors.push(`Card #${index + 1}: Missing type`);
      });
      
      setValidationErrors(errors);
      
      // Clear progress interval
      clearInterval(progressInterval);
      setProcessProgress(100);
      
      // Create import results
      const results: CardImportResult = {
        imported: errors.length > 0 ? 0 : processedCards.length,
        updated: 0, // We don't track updates yet
        failed: errors.length > 0 ? processedCards.length : 0,
        errors: errors.map(error => ({ name: 'Validation error', error }))
      };
      
      setImportResults(results);
      setProcessedCards(processedCards as CardFormValues[]);
      
      // Show success or error
      if (errors.length > 0) {
        setShowResults(true);
      } else {
        toast.success(`Successfully processed ${processedCards.length} ${cardType} cards`);
        onImport(processedCards as CardFormValues[], results);
      }
    } catch (error) {
      console.error('Error importing cards:', error);
      toast.error(`Failed to import ${cardType} cards. Please check the file format.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteImport = () => {
    if (importResults && processedCards.length > 0 && validationErrors.length === 0) {
      onImport(processedCards, importResults);
    }
    setShowResults(false);
  };

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
        onChange={handleFileUpload}
        className="hidden"
        id="card-import"
        disabled={isProcessing}
      />
      <label htmlFor="card-import">
        <Button variant="outline" type="button" disabled={isProcessing} asChild>
          <span className="flex items-center space-x-2">
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Import {cardType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Cards</span>
              </>
            )}
          </span>
        </Button>
      </label>
      
      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Results</DialogTitle>
            <DialogDescription>
              Review the results of your card import.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {validationErrors.length > 0 ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Import failed</AlertTitle>
                <AlertDescription>
                  <p>The following errors were found:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {validationErrors.slice(0, 5).map((error, index) => (
                      <li key={index} className="text-sm">{error}</li>
                    ))}
                    {validationErrors.length > 5 && (
                      <li className="text-sm">And {validationErrors.length - 5} more errors...</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-50 dark:bg-green-900/20">
                <FileJson className="h-4 w-4" />
                <AlertTitle>Import successful</AlertTitle>
                <AlertDescription>
                  <p>Successfully processed {processedCards.length} {cardType} cards.</p>
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <DialogFooter>
            {validationErrors.length > 0 ? (
              <Button onClick={() => setShowResults(false)}>
                Close
              </Button>
            ) : (
              <Button onClick={handleCompleteImport}>
                Complete Import
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
