
import React from "react";
import { Button } from "@/components/ui/button";
import { CardDisplay } from "@/components/cards/CardDisplay";
import { GameCard } from "@/types/cards";

interface CardPreviewModalProps {
  card: GameCard;
  onClose: () => void;
}

export const CardPreviewModal = ({ card, onClose }: CardPreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Card Preview</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <div className="flex justify-center">
          <CardDisplay card={card} showDetails={true} />
        </div>
      </div>
    </div>
  );
};
