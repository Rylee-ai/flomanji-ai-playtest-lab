
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

export interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

export function FileUploader({ onFileSelected, isProcessing }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!['json', 'md'].includes(fileExtension || '')) {
      toast.error('Only JSON and Markdown files are supported');
      return;
    }

    onFileSelected(file);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,.md"
      />

      <div className="space-y-2">
        <div className="flex justify-center">
          <FileUp className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium">
          Drag and drop your file or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          Supported formats: JSON, Markdown
        </p>
        <Button
          variant="secondary"
          className="mt-2"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Select File
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
