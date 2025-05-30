
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table as TableIcon, Search } from "lucide-react";
import { CardType, GameCard } from "@/types/cards";
import { CardBulkEditor } from "../../forms/CardBulkEditor";
import { Input } from "@/components/ui/input";

interface ViewToggleProps {
  view: "table" | "grid";
  setView: (view: "table" | "grid") => void;
  selectedCards: GameCard[];
  activeTab: CardType;
  onBulkEditComplete: (updatedCards: GameCard[]) => void;
  onSearch?: (query: string) => void;
}

export const ViewToggle = ({
  view,
  setView,
  selectedCards,
  activeTab,
  onBulkEditComplete,
  onSearch
}: ViewToggleProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 p-2 sm:p-4 bg-background">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {selectedCards.length > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedCards.length} selected</span>
            <CardBulkEditor 
              selectedCards={selectedCards} 
              onEditComplete={onBulkEditComplete}
            />
          </div>
        ) : (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cards..."
              className="pl-8 h-9 w-full"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="sm"
          className={view === 'grid' ? 'bg-secondary' : ''}
          onClick={() => setView('grid')}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Grid</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={view === 'table' ? 'bg-secondary' : ''}
          onClick={() => setView('table')}
        >
          <TableIcon className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Table</span>
        </Button>
      </div>
    </div>
  );
};
