
import { useState } from "react";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

export const FileUploader = ({ onFileSelected, isProcessing }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelected(file);
  };

  // Function to programmatically click the hidden file input
  const triggerFileInput = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div 
      className="space-y-4"
      onDragEnter={handleDrag}
    >
      <div 
        className={`
          flex flex-col items-center justify-center w-full h-32 
          border-2 border-dashed rounded-lg 
          cursor-pointer 
          ${dragActive ? "border-primary bg-primary/5" : "border-gray-300"}
          transition-all duration-200 ease-in-out
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            JSON (.json) or Markdown (.md) files
          </p>
        </div>
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".json,.md"
          onChange={handleChange}
        />
      </div>
      
      {selectedFile && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground ml-auto">
              {Math.round(selectedFile.size / 1024)} KB
            </p>
          </div>
          
          {isProcessing && (
            <Progress value={50} className="h-1" />
          )}
        </div>
      )}
      
      <Alert className="bg-muted/50">
        <AlertDescription className="text-xs text-muted-foreground">
          Upload a JSON file or a Markdown file (.md) containing card data. 
          Markdown files should follow the template format with clearly marked sections for each card property.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2" 
          disabled={isProcessing}
          onClick={triggerFileInput}
          type="button"
        >
          <Upload className="h-4 w-4" />
          <span>Select File</span>
        </Button>
      </div>
    </div>
  );
};
