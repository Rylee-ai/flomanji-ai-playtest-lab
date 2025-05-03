
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";
import { CardBulkImport } from "@/components/admin/forms/CardBulkImport";
import { CardExporter } from "@/components/admin/cards/CardExporter";
import { useCardManagement } from "@/components/admin/hooks/useCardManagement";
import { CardType } from "@/types/cards";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const ContentManager = () => {
  const {
    handleImport,
    activeTab,
  } = useCardManagement();

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Flomanji Content Manager</h1>
            <div className="text-sm text-muted-foreground mt-1">
              Create and manage game cards, characters, missions, and content
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CardBulkImport onImport={handleImport} />
            <CardExporter cardType={activeTab as CardType} />
          </div>
        </div>
        
        <p className="mt-2">
          Use the tabs below to view and edit different card types. The system supports all card types 
          from the Flomanji game, including player characters, NPCs, hazards, treasures, and more.
        </p>
      </div>
      
      <GameContentManager />
    </div>
  );
};

export default ContentManager;
