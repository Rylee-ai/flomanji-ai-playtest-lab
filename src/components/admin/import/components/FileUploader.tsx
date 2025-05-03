
import React from "react";
import { FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  accept?: string;
  className?: string;
}

export const FileUploader = ({
  onFileSelected,
  isProcessing,
  accept = ".json",
  className = "",
}: FileUploaderProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors ${className}`}
      >
        <div className="flex flex-col items-center space-y-4">
          <FileJson className="h-10 w-10 text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Drag and drop your file here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JSON files with card data
            </p>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileUpload}
            className="hidden"
            id="card-import"
            disabled={isProcessing}
          />
          <label htmlFor="card-import">
            <Button variant="outline" type="button" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Select File"}
            </Button>
          </label>
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2">
          <p className="text-sm">Processing file...</p>
          <Progress value={40} className="h-2" />
        </div>
      )}
    </div>
  );
};
