
import React from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  isProcessing: boolean;
  progress: number;
}

export const ProgressIndicator = ({ isProcessing, progress }: ProgressIndicatorProps) => {
  if (!isProcessing) return null;
  
  return (
    <div className="mt-2">
      <Progress value={progress} className="h-1" />
      <p className="text-xs text-muted-foreground text-center mt-1">
        {progress < 100 ? "Processing..." : "Completed"}
      </p>
    </div>
  );
};
