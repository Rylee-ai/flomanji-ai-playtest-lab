import React from "react";
import { GameCard } from "@/types/cards";
import { useCardForm } from "./hooks/useCardForm";
import { CardFormDialog } from "./CardFormDialog";
import { CardFormBody } from "./CardFormBody";
import { CardFormProps } from "@/types/forms/card-form";
import { useCardFormInit } from "./hooks/useCardFormInit";
import { CardVersion } from "@/types/cards/card-version";

interface CardFormProps {
  initialData?: GameCard;
  activeTab: CardType;
  onSubmit: (data: CardFormValues) => void;
  open: boolean;
  onClose: () => void;
  versionHistory?: CardVersion[];
}

export const CardForm = ({
  initialData,
  activeTab,
  onSubmit,
  open,
  onClose,
  versionHistory,
}: CardFormProps) => {
  const form = useCardForm(initialData);
  const isEditing = !!initialData;
  const type = form.watch("type");

  useCardFormInit(form, initialData, activeTab, isEditing);

  const renderVersionHistory = () => {
    if (!versionHistory || versionHistory.length === 0) return null;
    
    return (
      <div className="border-t mt-6 pt-6">
        <h3 className="text-lg font-semibold mb-4">Version History</h3>
        <div className="max-h-60 overflow-y-auto">
          <div className="space-y-3">
            {versionHistory.map((version, index) => (
              <div 
                key={version.id} 
                className="p-3 rounded-md border text-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">
                    Version {version.versionNumber}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {formatDateTime(version.timestamp)}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {version.changedBy}
                </div>
                {version.notes && (
                  <div className="mt-2 p-2 bg-muted rounded-sm text-xs">
                    {version.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <CardFormDialog open={open} onClose={onClose} isEditing={isEditing} initialData={initialData}>
      <CardFormBody
        form={form}
        onSubmit={onSubmit}
        isEditing={isEditing}
        type={type}
      />
      {renderVersionHistory()}
    </CardFormDialog>
  );
};
