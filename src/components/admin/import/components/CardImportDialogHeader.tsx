
import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CardImportDialogHeaderProps {
  enableAIProcessing?: boolean;
  isProcessing?: boolean;
  showFlomanjiOptions?: boolean;
}

export function CardImportDialogHeader({ 
  enableAIProcessing = false,
  isProcessing = false,
  showFlomanjiOptions = true
}: CardImportDialogHeaderProps) {
  return (
    <DialogHeader className="space-y-2">
      <DialogTitle className="text-2xl flex items-center gap-2">
        Import Cards
        {enableAIProcessing && (
          <Badge variant="outline" className="ml-2 bg-primary/10">
            <Bot className="h-3 w-3 mr-1" /> 
            AI Assisted
          </Badge>
        )}
        {isProcessing && (
          <Badge variant="outline" className="ml-2 bg-muted/20">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing...
          </Badge>
        )}
      </DialogTitle>
      <DialogDescription>
        Upload JSON or Markdown files to import cards into your game, or choose from pre-defined Flomanji card sets.
        {enableAIProcessing && (
          <span className="block mt-1 text-xs">
            AI processing will analyze cards for consistency, quality, and game balance.
          </span>
        )}
      </DialogDescription>
    </DialogHeader>
  );
}
