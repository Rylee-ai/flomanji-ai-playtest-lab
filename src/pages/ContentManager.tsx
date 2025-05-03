
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";
import { CardImporter } from "@/components/admin/import/CardImporter";
import { CardExporter } from "@/components/admin/cards/CardExporter";
import { useCardManagement } from "@/components/admin/hooks/useCardManagement";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const ContentManager = () => {
  const {
    handleImport,
    activeTab,
  } = useCardManagement();

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
          
          <CardImporter onImport={handleImport} activeCardType={activeTab} />
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
