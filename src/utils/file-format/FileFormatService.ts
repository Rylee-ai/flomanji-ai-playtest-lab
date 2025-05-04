
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
    
    // Check file size (50 MB limit)
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
    if (file.size > MAX_FILE_SIZE) {
      console.error(`File size (${file.size} bytes) exceeds maximum of ${MAX_FILE_SIZE} bytes`);
      return false;
    }
    
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
        // Read a sample of the file (first 10KB) for quick format detection
        const sampleSize = Math.min(10 * 1024, file.size); // 10KB or file size, whichever is smaller
        const sampleBlob = file.slice(0, sampleSize);
        const sampleText = await sampleBlob.text();
        
        try {
          // Try to parse as JSON
          const sample = JSON.parse(sampleText.trim());
          
          // Determine format based on content structure
          let format: "json-standard" | "json-transform" = "json-standard";
          
          // If it's an array, check the first item
          if (Array.isArray(sample) && sample.length > 0) {
            const firstItem = sample[0];
            
            // Check for signs this is an external format needing transformation
            if (
              // External format usually has title instead of name
              (firstItem.title && !firstItem.name) ||
              // Or has a type field that looks like an external format description
              (firstItem.type && typeof firstItem.type === 'string' && 
               /gear|treasure|hazard/i.test(firstItem.type) && 
               firstItem.type.includes(' ')) ||
              // Check for external formats with different structure
              (firstItem.card_type || firstItem.card_name || firstItem.description)
            ) {
              format = "json-transform";
              console.log("Detected external format requiring transformation");
            }
          }
          
          return { format, fileExtension };
        } catch (parseError) {
          console.error("Error parsing JSON sample:", parseError);
          // If we can't parse it as JSON, it might be malformed
          return { format: "unknown", fileExtension };
        }
      }
      
      // Unrecognized format
      return { format: "unknown", fileExtension };
    } catch (error) {
      console.error("Error detecting file format:", error);
      return { format: "unknown", fileExtension: "" };
    }
  }
  
  /**
   * Perform deeper analysis of file content for ambiguous formats
   * @param file The file to analyze in depth
   * @returns Details about the file content structure
   */
  static async analyzeFileContent(file: File): Promise<{
    estimatedCardCount: number;
    detectedFields: string[];
    formatConfidence: 'high' | 'medium' | 'low';
    recommendedProcessor: "markdown" | "json-standard" | "json-transform" | "unknown";
  }> {
    try {
      const fileText = await file.text();
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      // For Markdown files
      if (fileExtension === 'md') {
        // Count potential card entries by looking for card markers
        const titleMatches = fileText.match(/\*\s*\*\*Title:\*\*/gi) || [];
        const numberedMatches = fileText.match(/^\d+\.\s+/gm) || [];
        
        const estimatedCardCount = Math.max(titleMatches.length, numberedMatches.length);
        
        // Detect common fields in markdown
        const detectedFields = [];
        if (fileText.includes('**Title:**')) detectedFields.push('title');
        if (fileText.includes('**Type:**')) detectedFields.push('type');
        if (fileText.includes('**Keywords:**')) detectedFields.push('keywords');
        if (fileText.includes('**Rules:**')) detectedFields.push('rules');
        if (fileText.includes('**Flavor:**')) detectedFields.push('flavor');
        
        // Determine confidence
        const formatConfidence = detectedFields.length >= 3 ? 'high' : 
                               detectedFields.length >= 1 ? 'medium' : 'low';
        
        return {
          estimatedCardCount,
          detectedFields,
          formatConfidence,
          recommendedProcessor: 'markdown'
        };
      }
      
      // For JSON files
      if (fileExtension === 'json') {
        try {
          const data = JSON.parse(fileText);
          
          if (Array.isArray(data)) {
            const estimatedCardCount = data.length;
            
            // Sample the first item to detect fields
            const detectedFields = data.length > 0 
              ? Object.keys(data[0])
              : [];
            
            // Check if fields align more with standard or transform format
            const standardFormatFields = ['name', 'type', 'rules', 'keywords', 'icons'];
            const transformFormatFields = ['title', 'description', 'card_type', 'card_name'];
            
            let standardMatches = 0;
            let transformMatches = 0;
            
            detectedFields.forEach(field => {
              if (standardFormatFields.includes(field)) standardMatches++;
              if (transformFormatFields.includes(field)) transformMatches++;
            });
            
            const recommendedProcessor = transformMatches > standardMatches 
              ? 'json-transform' 
              : 'json-standard';
              
            // Determine confidence
            const formatConfidence = Math.max(standardMatches, transformMatches) >= 3 ? 'high' :
                                  Math.max(standardMatches, transformMatches) >= 1 ? 'medium' : 'low';
            
            return {
              estimatedCardCount,
              detectedFields,
              formatConfidence,
              recommendedProcessor
            };
          }
        } catch (error) {
          console.error("Error parsing JSON during deep analysis:", error);
        }
      }
      
      // Default fallback
      return {
        estimatedCardCount: 0,
        detectedFields: [],
        formatConfidence: 'low',
        recommendedProcessor: 'unknown'
      };
      
    } catch (error) {
      console.error("Error during deep file analysis:", error);
      return {
        estimatedCardCount: 0,
        detectedFields: [],
        formatConfidence: 'low',
        recommendedProcessor: 'unknown'
      };
    }
  }
}
