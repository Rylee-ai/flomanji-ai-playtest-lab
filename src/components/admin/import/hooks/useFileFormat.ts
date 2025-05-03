
import { useState } from "react";
import { FileFormatService } from "@/utils/file-format/FileFormatService";

/**
 * Hook for detecting and managing file format information
 */
export function useFileFormat() {
  const [fileFormat, setFileFormat] = useState<"markdown" | "json-standard" | "json-transform" | "unknown" | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

  /**
   * Analyze a file and detect its format
   */
  const analyzeFile = async (file: File): Promise<string> => {
    if (!file) return "unknown";
    
    try {
      const { format, fileExtension } = await FileFormatService.detectFileFormat(file);
      setFileFormat(format);
      setFileExtension(fileExtension);
      return format;
    } catch (error) {
      console.error("Error analyzing file:", error);
      setFileFormat("unknown");
      return "unknown";
    }
  };

  return {
    fileFormat,
    fileExtension,
    analyzeFile
  };
}
