
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";
import { CardImporter } from "@/components/admin/import/CardImporter";
import { CardExporter } from "@/components/admin/cards/CardExporter";
import { useCardManagement } from "@/components/admin/hooks/useCardManagement";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";

const ContentManager = () => {
  const {
    handleImport,
    activeTab,
    loadCards,
  } = useCardManagement();

  const handleCardImport = async (cards, results) => {
    console.log("ContentManager: Import triggered with", cards.length, "cards");
    try {
      // Use batch size of 50 for large card sets
      const batchSize = 50;
      
      if (cards.length > batchSize) {
        // For large imports, split into chunks
        const chunkedCards = [];
        for (let i = 0; i < cards.length; i += batchSize) {
          chunkedCards.push(cards.slice(i, Math.min(i + batchSize, cards.length)));
        }
        
        toast.info(`Processing ${cards.length} cards in ${chunkedCards.length} batches...`);
        
        let successCount = 0;
        for (let i = 0; i < chunkedCards.length; i++) {
          const batch = chunkedCards[i];
          const batchResults = {
            ...results,
            imported: batch.length
          };
          
          toast.loading(`Importing batch ${i+1}/${chunkedCards.length}...`);
          await handleImport(batch, batchResults);
          successCount += batch.length;
          
          toast.success(`Batch ${i+1} complete. ${successCount}/${cards.length} cards imported`);
        }
        
        toast.success(`Successfully imported ${successCount} cards in ${chunkedCards.length} batches`);
      } else {
        // For smaller imports, handle all at once
        await handleImport(cards, results);
        toast.success(`Successfully imported ${cards.length} cards`);
      }
      
      // Reload cards to reflect the new imports
      loadCards();
    } catch (error) {
      console.error("Error during import:", error);
      toast.error("Failed to import cards. Please try again.");
    }
  };

  return (
    <div className="container max-w-7xl py-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, manage, and organize game card content
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2" asChild>
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
      
      <Tabs defaultValue="content" className="space-y-4">
        <TabsContent value="content" className="space-y-4 p-0 mt-0">
          <GameContentManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
