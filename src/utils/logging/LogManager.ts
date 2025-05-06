
/**
 * LogManager - Provides persistent, rotating log functionality for the Flomanji application
 * 
 * Features:
 * - Maintains logs in localStorage with configurable retention
 * - Automatic log rotation based on size or entry count
 * - Log levels (debug, info, warn, error)
 * - Session tracking across browser refreshes
 */

import { v4 as uuidv4 } from 'uuid';

// Define log entry structure
export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
  sessionId: string;
  category?: string;
}

// Log levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Log storage configuration
interface LogManagerConfig {
  maxEntries: number;
  persistenceDays: number;
  minLevel: LogLevel;
  storageKey: string;
  sessionStorageKey: string;
}

/**
 * Manages application logging with persistence and rotation
 */
export class LogManager {
  private readonly config: LogManagerConfig;
  private sessionId: string;
  private logs: LogEntry[] = [];
  private isInitialized = false;
  
  constructor(config?: Partial<LogManagerConfig>) {
    // Default configuration
    this.config = {
      maxEntries: 1000,
      persistenceDays: 7,
      minLevel: 'info',
      storageKey: 'flomanji:application-logs',
      sessionStorageKey: 'flomanji:session-id',
      ...config
    };
    
    this.sessionId = this.getOrCreateSessionId();
  }
  
  /**
   * Initialize the log manager, loading any existing logs
   */
  public initialize(): void {
    if (this.isInitialized) return;
    
    try {
      this.loadLogs();
      this.rotateLogs();
      this.isInitialized = true;
      this.info('LogManager initialized', { sessionId: this.sessionId });
    } catch (error) {
      console.error('Failed to initialize LogManager:', error);
    }
  }
  
  /**
   * Log a debug message
   */
  public debug(message: string, details?: any): void {
    this.log('debug', message, details);
  }
  
  /**
   * Log an info message
   */
  public info(message: string, details?: any): void {
    this.log('info', message, details);
  }
  
  /**
   * Log a warning message
   */
  public warn(message: string, details?: any): void {
    this.log('warn', message, details);
  }
  
  /**
   * Log an error message
   */
  public error(message: string, details?: any): void {
    this.log('error', message, details);
  }
  
  /**
   * Retrieve all logs
   */
  public getLogs(): LogEntry[] {
    return [...this.logs];
  }
  
  /**
   * Retrieve logs filtered by level
   */
  public getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }
  
  /**
   * Retrieve logs for the current session
   */
  public getCurrentSessionLogs(): LogEntry[] {
    return this.logs.filter(log => log.sessionId === this.sessionId);
  }
  
  /**
   * Clear all logs
   */
  public clearLogs(): void {
    this.logs = [];
    localStorage.removeItem(this.config.storageKey);
    this.info('Logs cleared');
  }
  
  /**
   * Core logging function
   */
  private log(level: LogLevel, message: string, details?: any): void {
    if (!this.isInitialized) {
      this.initialize();
    }
    
    // Skip if below minimum log level
    const logLevels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    
    if (logLevels[level] < logLevels[this.config.minLevel]) {
      return;
    }
    
    const entry: LogEntry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
      sessionId: this.sessionId
    };
    
    // Add to in-memory logs
    this.logs.push(entry);
    
    // Ensure we don't exceed max entries
    if (this.logs.length > this.config.maxEntries) {
      this.logs = this.logs.slice(-this.config.maxEntries);
    }
    
    // Print to console with appropriate styling
    this.consoleLog(entry);
    
    // Save to localStorage
    this.saveLogs();
  }
  
  /**
   * Print log entry to console with appropriate styling
   */
  private consoleLog(entry: LogEntry): void {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const logPrefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;
    
    // Style based on log level
    switch (entry.level) {
      case 'debug':
        console.debug(`${logPrefix} ${entry.message}`, entry.details || '');
        break;
      case 'info':
        console.info(`${logPrefix} ${entry.message}`, entry.details || '');
        break;
      case 'warn':
        console.warn(`${logPrefix} ${entry.message}`, entry.details || '');
        break;
      case 'error':
        console.error(`${logPrefix} ${entry.message}`, entry.details || '');
        break;
    }
  }
  
  /**
   * Save logs to localStorage
   */
  private saveLogs(): void {
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
      // If localStorage is full, remove older logs and try again
      if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        this.logs = this.logs.slice(-Math.floor(this.config.maxEntries / 2));
        try {
          localStorage.setItem(this.config.storageKey, JSON.stringify(this.logs));
        } catch (retryError) {
          console.error('Failed to save logs after reducing size:', retryError);
        }
      }
    }
  }
  
  /**
   * Load logs from localStorage
   */
  private loadLogs(): void {
    try {
      const storedLogs = localStorage.getItem(this.config.storageKey);
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error);
      this.logs = [];
    }
  }
  
  /**
   * Rotate logs by removing entries older than the configured persistence period
   */
  private rotateLogs(): void {
    if (this.logs.length === 0) return;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.persistenceDays);
    
    const oldLength = this.logs.length;
    this.logs = this.logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= cutoffDate;
    });
    
    const removedCount = oldLength - this.logs.length;
    if (removedCount > 0) {
      console.info(`Log rotation: Removed ${removedCount} log entries older than ${this.config.persistenceDays} days`);
    }
    
    this.saveLogs();
  }
  
  /**
   * Get or create a session ID
   */
  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem(this.config.sessionStorageKey);
    
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem(this.config.sessionStorageKey, sessionId);
    }
    
    return sessionId;
  }
}

// Create a global instance with default settings
export const logger = new LogManager();

// Initialize the logger
logger.initialize();
