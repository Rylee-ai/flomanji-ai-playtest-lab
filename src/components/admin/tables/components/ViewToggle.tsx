
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table as TableIcon, FileJson } from "lucide-react";
import { CardType, GameCard } from "@/types/cards";
import { CardExporter } from "../../cards/CardExporter";
import { CardBulkEditor } from "../../forms/CardBulkEditor";
import { CardDataTransformer } from "../../forms/CardDataTransformer";

interface ViewToggleProps {
  view: "table" | "grid";
  setView: (view: "table" | "grid") => void;
  selectedCards: GameCard[];
  activeTab: CardType;
  onBulkEditComplete: (updatedCards: GameCard[]) => void;
}

export const ViewToggle = ({
  view,
  setView,
  selectedCards,
  activeTab,
  onBulkEditComplete,
}: ViewToggleProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        {selectedCards.length > 0 && (
          <>
            <span className="text-sm font-medium">{selectedCards.length} selected</span>
            <CardBulkEditor 
              selectedCards={selectedCards} 
              onEditComplete={onBulkEditComplete}
            />
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <CardExporter 
          cardType={activeTab} 
          onExportComplete={(format, count) => {
            console.log(`Exported ${count} cards in ${format} format`);
          }}
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setView(view === 'table' ? 'grid' : 'table')}
        >
          {view === 'table' ? (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid View
            </>
          ) : (
            <>
              <TableIcon className="h-4 w-4 mr-2" />
              Table View
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
