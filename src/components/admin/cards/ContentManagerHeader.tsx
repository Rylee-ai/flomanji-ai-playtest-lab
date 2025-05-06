
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { CardImporter } from "../import/CardImporter";
import { CardImportResult } from "@/types/cards/card-version";
import { CardFormValues } from "@/types/forms/card-form";
import { CardType } from "@/types/cards";

interface ContentManagerHeaderProps {
  onAddNew: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onImport: (cards: CardFormValues[], results: CardImportResult) => void;
  activeTab: CardType;
}

export const ContentManagerHeader: React.FC<ContentManagerHeaderProps> = ({
  onAddNew,
  onRefresh,
  isRefreshing,
  onImport,
  activeTab
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Card Collection</h2>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
        </Button>
        <CardImporter
          onImport={onImport}
          activeCardType={activeTab}
          processingOptions={{
            batchSize: 10,
            continueOnError: true
          }}
        />
        <Button size="sm" onClick={onAddNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Card
        </Button>
      </div>
    </div>
  );
};
