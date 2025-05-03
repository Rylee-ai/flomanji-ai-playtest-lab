
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
      await handleImport(cards, results);
      toast.success(`Successfully imported ${cards.length} cards`);
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
          
          <CardImporter onImport={handleCardImport} activeCardType={activeTab} />
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
