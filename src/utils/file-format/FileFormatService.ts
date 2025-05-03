
/**
 * Service for detecting and handling file formats
 */
export class FileFormatService {
  /**
   * Detect if a file is a valid import file type
   * @param file The file to check
   * @returns Whether the file is a valid type
   */
  static isValidFileType(file: File): boolean {
    if (!file) return false;
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return ['json', 'md'].includes(fileExtension || '');
  }

  /**
   * Detect the format of a file for import processing
   * @param file The file to analyze
   * @returns The detected format and extension
   */
  static async detectFileFormat(file: File): Promise<{
    format: "markdown" | "json-standard" | "json-transform" | "unknown";
    fileExtension: string;
  }> {
    if (!file) {
      return { format: "unknown", fileExtension: "" };
    }
    
    try {
      // Check file extension first
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || "";
      
      // Handle markdown files
      if (fileExtension === 'md') {
        return { format: "markdown", fileExtension };
      }
      
      // Handle JSON files
      if (fileExtension === 'json') {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // Check if this is standard format or needs transformation
        let format: "json-standard" | "json-transform" = "json-standard";
        
        // If it has fields that look like external data, mark for transformation
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0];
          
          // Check for signs this is an external format needing transformation
          if (
            // External format usually has title instead of name
            (firstItem.title && !firstItem.name) ||
            // Or has a type field that looks like an external format description
            (firstItem.type && typeof firstItem.type === 'string' && 
             /gear|treasure|hazard/i.test(firstItem.type) && 
             firstItem.type.includes(' '))
          ) {
            format = "json-transform";
          }
        }
        
        return { format, fileExtension };
      }
      
      return { format: "unknown", fileExtension };
    } catch (error) {
      console.error("Error detecting file format:", error);
      return { format: "unknown", fileExtension: "" };
    }
  }
}
