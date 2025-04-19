
import React from "react";
import { Button } from "@/components/ui/button";
import { CardDisplay } from "@/components/cards/CardDisplay";
import { GameCard } from "@/types/cards";
import { Edit } from "lucide-react";

interface CardPreviewModalProps {
  card: GameCard;
  onClose: () => void;
  onEdit: () => void;
}

export const CardPreviewModal = ({ card, onClose, onEdit }: CardPreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Card Preview</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <CardDisplay card={card} showDetails={true} />
        </div>
      </div>
    </div>
  );
};
