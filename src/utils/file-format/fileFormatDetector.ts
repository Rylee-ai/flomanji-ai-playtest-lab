
import { FileFormatService } from "./FileFormatService";

/**
 * Utility functions for detecting file formats and types
 * These are wrapper functions for backward compatibility
 */

/**
 * Detect if a file is a valid import file type
 * @param file The file to check
 * @returns Whether the file is a valid type
 */
export const isValidFileType = (file: File): boolean => {
  return FileFormatService.isValidFileType(file);
};

/**
 * Detect the format of a file for import processing
 * @param file The file to analyze
 * @returns The detected format and extension
 */
export const detectFileFormat = async (file: File): Promise<{
  format: "markdown" | "json-standard" | "json-transform" | "unknown";
  fileExtension: string;
}> => {
  return FileFormatService.detectFileFormat(file);
};
