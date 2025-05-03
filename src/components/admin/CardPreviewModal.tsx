
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardDisplay } from "../cards/CardDisplay";
import { GameCard } from "@/types/cards";
import { Edit, Clock, Trash, History } from "lucide-react";
import { CardVersion } from "@/types/cards/card-version";
import { CardService } from "@/services/CardService";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/date";

interface CardPreviewModalProps {
  card: GameCard;
  onClose: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

export const CardPreviewModal = ({ card, onClose, onEdit, onDelete }: CardPreviewModalProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [versionHistory, setVersionHistory] = useState<CardVersion[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleViewHistory = async () => {
    setLoadingHistory(true);
    try {
      const history = await CardService.getCardVersionHistory(card.id);
      setVersionHistory(history);
      setShowHistory(true);
    } catch (error) {
      console.error("Error loading card history:", error);
      toast.error("Failed to load card history");
    } finally {
      setLoadingHistory(false);
    }
  };

  const renderVersionHistory = () => {
    if (!showHistory) return null;

    return (
      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <History className="h-4 w-4" />
          Version History
        </h3>
        
        {loadingHistory ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {versionHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">No version history available</p>
            ) : (
              versionHistory.map((version) => (
                <div key={version.id} className="border rounded-md p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Version {version.versionNumber}</span>
                    <span className="text-muted-foreground text-xs">
                      {formatDateTime(version.timestamp)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Changed by: {version.changedBy}
                  </div>
                  {version.notes && (
                    <div className="mt-2 text-xs bg-muted p-2 rounded">
                      {version.notes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={!!card} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Card Preview</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <CardDisplay card={card} showDetails={true} />
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Card Details</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">ID</dt>
                  <dd className="text-sm">{card.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                  <dd className="text-sm capitalize">{card.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Keywords</dt>
                  <dd className="text-sm">{card.keywords.join(", ")}</dd>
                </div>
              </dl>
            </div>
            
            {card.adminNotes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Admin Notes</h3>
                <p className="text-sm whitespace-pre-wrap">{card.adminNotes}</p>
              </div>
            )}
            
            {renderVersionHistory()}
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewHistory}
            disabled={loadingHistory || showHistory}
            className="gap-2"
          >
            <Clock className="h-4 w-4" />
            View History
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="gap-2"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
