
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CardService } from '@/services/CardService';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GameCard, CardType } from '@/types/cards';
import { Download, FileJson, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/utils/date';

interface CardExporterProps {
  cards?: GameCard[];
  cardType?: CardType;
  onExportComplete?: (format: string, count: number) => void;
}

export const CardExporter = ({ cards, cardType, onExportComplete }: CardExporterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [includeVersionHistory, setIncludeVersionHistory] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeImages, setIncludeImages] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      let dataToExport: GameCard[] = [];
      
      // Get cards if not provided
      if (!cards) {
        if (cardType) {
          dataToExport = await CardService.getCardsByType(cardType);
        } else {
          dataToExport = await CardService.getAllCards();
        }
      } else {
        dataToExport = cards;
      }
      
      if (dataToExport.length === 0) {
        toast.error('No cards to export');
        setIsExporting(false);
        return;
      }
      
      // Clean up data based on options
      if (!includeMetadata) {
        dataToExport = dataToExport.map(card => {
          const { adminNotes, imageUrl, isProtectedAsset, ...cleanCard } = card;
          return cleanCard as GameCard;
        });
      }
      
      // Perform the export
      if (exportFormat === 'json') {
        const jsonData = CardService.exportCardsToJSON(dataToExport);
        downloadFile(
          jsonData,
          `flomanji-cards-${cardType || 'all'}-${formatDate(new Date())}.json`,
          'application/json'
        );
      } else if (exportFormat === 'csv') {
        // Convert to CSV format (simplified implementation)
        const headers = ['id', 'name', 'type', 'keywords', 'rules', 'flavor'];
        const csvRows = [headers.join(',')];
        
        dataToExport.forEach(card => {
          const row = [
            card.id,
            `"${card.name.replace(/"/g, '""')}"`, // Escape quotes
            card.type,
            `"${card.keywords.join(', ').replace(/"/g, '""')}"`,
            `"${(Array.isArray(card.rules) ? card.rules.join('\n') : card.rules).replace(/"/g, '""')}"`,
            `"${card.flavor.replace(/"/g, '""')}"`
          ];
          csvRows.push(row.join(','));
        });
        
        downloadFile(
          csvRows.join('\n'),
          `flomanji-cards-${cardType || 'all'}-${formatDate(new Date())}.csv`,
          'text/csv'
        );
      }
      
      toast.success(`Successfully exported ${dataToExport.length} cards`);
      onExportComplete?.(exportFormat, dataToExport.length);
      setIsOpen(false);
    } catch (error) {
      console.error('Error exporting cards:', error);
      toast.error('Failed to export cards');
    } finally {
      setIsExporting(false);
    }
  };
  
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export Cards
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Cards</DialogTitle>
            <DialogDescription>
              Export {cardType ? `${cardType} cards` : 'all cards'} to a file format of your choice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Export Format</h4>
              <RadioGroup
                value={exportFormat}
                onValueChange={(value) => setExportFormat(value as 'json' | 'csv')}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="json" id="json" />
                  <Label htmlFor="json" className="flex items-center gap-1">
                    <FileJson className="h-4 w-4" /> JSON
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> CSV
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Options</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-metadata"
                    checked={includeMetadata}
                    onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
                  />
                  <Label htmlFor="include-metadata">Include metadata (admin notes, etc.)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-images"
                    checked={includeImages}
                    onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
                  />
                  <Label htmlFor="include-images">Include image URLs</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-version-history"
                    checked={includeVersionHistory}
                    onCheckedChange={(checked) => setIncludeVersionHistory(checked as boolean)}
                    disabled={true} // Not implemented yet
                  />
                  <Label 
                    htmlFor="include-version-history" 
                    className="text-muted-foreground"
                  >Include version history (coming soon)</Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
