
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";
import { CardBulkImport } from "@/components/admin/forms/CardBulkImport";
import { CardFormValues } from "@/types/forms/card-form";
import { toast } from "sonner";

const ContentManager = () => {
  const handleBulkImport = (cards: CardFormValues[]) => {
    // Here you would typically save the cards to your database
    // For now, we just show a success message
    toast.success(`Processed ${cards.length} cards for import`);
    console.log('Imported cards:', cards);
  };

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
          <CardBulkImport onImport={handleBulkImport} />
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

