/**
 * LogManager - Comprehensive logging system for Flomanji
 * 
 * Features:
 * - Multiple log severity levels (debug, info, warn, error)
 * - Log retention with automatic rotation
 * - Session-based logging
 * - Persistent storage in localStorage
 * - JSON serialization for log entries
 */

// Constants for log management
const LOG_STORAGE_KEY = 'flomanji_application_logs';
const MAX_LOG_ENTRIES = 1000; // Maximum number of log entries to keep
const SESSION_ID = `session_${Date.now()}`; // Unique session ID

// Log level type
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Log entry structure
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
  sessionId: string;
}

/**
 * Logger singleton class
 */
class Logger {
  private logs: LogEntry[] = [];
  private initialized = false;

  /**
   * Initialize the logger
   */
  constructor() {
    this.loadLogs();
  }

  /**
   * Load existing logs from localStorage
   */
  private loadLogs(): void {
    try {
      const storedLogs = localStorage.getItem(LOG_STORAGE_KEY);
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
        this.initialized = true;
        this.debug('Logger initialized from localStorage', { entries: this.logs.length });
      } else {
        this.logs = [];
        this.initialized = true;
        this.debug('Logger initialized with empty log', { reason: 'No stored logs found' });
      }
    } catch (error) {
      this.logs = [];
      this.initialized = true;
      console.error('Failed to load logs from localStorage', error);
    }
  }

  /**
   * Save logs to localStorage with rotation if needed
   */
  private saveLogs(): void {
    try {
      // Rotate logs if needed (keep only the most recent entries)
      if (this.logs.length > MAX_LOG_ENTRIES) {
        this.logs = this.logs.slice(-MAX_LOG_ENTRIES);
      }
      
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs to localStorage', error);
    }
  }

  /**
   * Add a log entry
   */
  private log(level: LogLevel, message: string, details?: any): void {
    if (!this.initialized) {
      this.loadLogs();
    }
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
      sessionId: SESSION_ID
    };
    
    this.logs.push(entry);
    this.saveLogs();
    
    // Also log to console for development visibility
    const consoleMethod = level === 'error' ? 'error' : 
                        level === 'warn' ? 'warn' : 
                        level === 'info' ? 'info' : 'log';
                        
    console[consoleMethod](`[${level.toUpperCase()}] ${message}`, details || '');
  }

  /**
   * Log debug message
   */
  debug(message: string, details?: any): void {
    this.log('debug', message, details);
  }

  /**
   * Log info message
   */
  info(message: string, details?: any): void {
    this.log('info', message, details);
  }

  /**
   * Log warning message
   */
  warn(message: string, details?: any): void {
    this.log('warn', message, details);
  }

  /**
   * Log error message
   */
  error(message: string, details?: any): void {
    this.log('error', message, details);
  }

  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Get logs for the current session
   */
  getCurrentSessionLogs(): LogEntry[] {
    return this.logs.filter(log => log.sessionId === SESSION_ID);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
    this.saveLogs();
    this.info('Logs cleared', { timestamp: new Date().toISOString() });
  }

  /**
   * Record git operations that would be excluded by .gitignore
   * This is an alternative to modifying the .gitignore file directly
   */
  recordGitExclusion(pattern: string): void {
    this.info('Git exclusion pattern recorded', {
      pattern,
      description: 'This file/pattern would normally be excluded in .gitignore',
      timestamp: new Date().toISOString()
    });
  }
}

// Export singleton instance
export const logger = new Logger();

// Record the log files themselves as patterns that would be excluded from git
logger.recordGitExclusion('# Flomanji application logs');
logger.recordGitExclusion('*.log');
logger.recordGitExclusion('logs/');
logger.recordGitExclusion(`localStorage:${LOG_STORAGE_KEY}`);
