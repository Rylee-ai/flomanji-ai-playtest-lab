
import { useState } from "react";
import { FileFormatService } from "@/utils/file-format/FileFormatService";

/**
 * Custom hook for file format detection
 */
export function useFileFormat() {
  const [fileFormat, setFileFormat] = useState<"markdown" | "json-standard" | "json-transform" | "unknown" | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Analyze a file to determine its format
   * @param file The file to analyze
   * @returns The detected format
   */
  const analyzeFile = async (file: File) => {
    if (!file) {
      return null;
    }
    
    setIsAnalyzing(true);
    
    try {
      console.log(`Analyzing file: ${file.name}`);
      
      // Check file validity first
      const validation = FileFormatService.isValidFileType(file);
      if (!validation) {
        console.error("Invalid file type");
        setFileFormat("unknown");
        setFileExtension("");
        return "unknown";
      }
      
      // Detect the format
      const { format, fileExtension: extension } = await FileFormatService.detectFileFormat(file);
      
      console.log(`Detected format: ${format}, extension: ${extension}`);
      setFileFormat(format);
      setFileExtension(extension);
      
      return format;
    } catch (error) {
      console.error("Error analyzing file:", error);
      setFileFormat("unknown");
      setFileExtension("");
      return "unknown";
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    fileFormat,
    fileExtension,
    isAnalyzing,
    analyzeFile
  };
}
