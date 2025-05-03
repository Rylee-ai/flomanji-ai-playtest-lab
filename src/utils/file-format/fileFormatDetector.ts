
/**
 * Utility functions for detecting file formats and content types
 */

/**
 * Detects the format of a file based on extension and content
 * @param file The file to analyze
 * @returns Promise resolving to the detected format
 */
export const detectFileFormat = async (file: File): Promise<{ 
  format: "markdown" | "json-standard" | "json-transform" | "unknown",
  fileExtension: string
}> => {
  try {
    // Check file extension first
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || "";
    
    if (fileExtension === 'md') {
      console.log("Detected Markdown file");
      return { format: "markdown", fileExtension };
    }
    
    // For JSON files, analyze content to determine format
    if (fileExtension === 'json') {
      const text = await file.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Invalid JSON format:", error);
        return { format: "unknown", fileExtension };
      }
      
      // Check if this is standard format or needs transformation
      let detectedFormat: "json-standard" | "json-transform" = "json-standard";
      
      // Check structure to see if it needs transformation
      if (Array.isArray(data) && data.length > 0) {
        const firstItem = data[0];
        
        // If it has a title field instead of name, or type field in a specific format
        if (!firstItem.id && firstItem.title) {
          detectedFormat = "json-transform";
        }
        
        // If it has a type field that indicates specific card types
        if (firstItem.type && typeof firstItem.type === 'string') {
          const possibleType = firstItem.type.toLowerCase();
          
          if (possibleType.includes("consumable") || 
              possibleType.includes("tool") || 
              possibleType.includes("weapon")) {
            detectedFormat = "json-transform";
          }
        }
      }
      
      console.log("Detected JSON format:", detectedFormat);
      return { format: detectedFormat, fileExtension };
    }
    
    return { format: "unknown", fileExtension };
  } catch (error) {
    console.error("Error detecting file format:", error);
    return { format: "unknown", fileExtension: "" };
  }
};

/**
 * Check if a file is a valid importable type
 * @param file The file to check
 * @returns Whether the file is a valid importable type
 */
export const isValidFileType = (file: File): boolean => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return ['json', 'md'].includes(fileExtension || '');
};
