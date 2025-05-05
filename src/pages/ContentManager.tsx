
import React, { useState } from "react";
import GameContentManager from "@/components/admin/GameContentManager";
import { CardImporter } from "@/components/admin/import/CardImporter";
import { CardExporter } from "@/components/admin/cards/CardExporter";
import { useCardManagement } from "@/components/admin/hooks/useCardManagement";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { 
  formatCardError, 
  logCardOperation, 
  safeCardOperation 
} from "@/utils/error-handling/cardErrorHandler";
import { FileBasedModeNotice } from "@/components/admin/FileBasedModeNotice";

const ContentManager = () => {
  const {
    handleImport,
    activeTab,
    loadCards,
  } = useCardManagement();
  
  const [isImporting, setIsImporting] = useState(false);

  const handleCardImport = async (cards, results) => {
    logCardOperation("ContentManager: Import triggered", { 
      cardCount: cards.length, 
      cardType: activeTab 
    });
    
    if (isImporting) {
      toast.error("An import is already in progress. Please wait for it to complete.");
      return;
    }
    
    setIsImporting(true);
    
    try {
      await handleImport(cards, results);
      
      // Always reload cards to reflect the new imports
      await loadCards();
    } catch (error) {
      const formattedError = formatCardError(error, 'import');
      console.error("Error during import:", formattedError);
      toast.error(`Failed to import cards: ${formattedError.message}`);
      
      // Still try to reload cards to ensure UI is consistent
      try {
        await loadCards();
      } catch (err) {
        console.error("Error reloading cards after failed import:", err);
      }
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="container max-w-7xl py-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create, manage, and organize game card content
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" asChild disabled={isImporting}>
              <label>
                <Download className="h-4 w-4" />
                <span>Export</span>
                <CardExporter cardType={activeTab} />
              </label>
            </Button>
            
            <CardImporter 
              onImport={handleCardImport} 
              activeCardType={activeTab} 
              processingOptions={{
                batchSize: 50,
                continueOnError: true
              }}
            />
          </div>
        </div>
        
        <FileBasedModeNotice />
        
        <Tabs defaultValue="content" className="space-y-4">
          <TabsContent value="content" className="space-y-4 p-0 mt-0">
            <ErrorBoundary>
              <GameContentManager />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default ContentManager;
