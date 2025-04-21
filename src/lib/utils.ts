import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random ID for simulations
export function simulateRandomId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Format a date string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString();
}

/**
 * Safely parses markdown to HTML with sanitization
 */
export function parseMarkdown(text: string): string {
  try {
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true,
      sanitize: true,
    });
    
    return marked(text);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return text;
  }
}
