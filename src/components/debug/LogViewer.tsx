
import React, { useState, useEffect } from 'react';
import { log } from '@/utils/logging';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Log entry display component
const LogEntry = ({ entry }) => {
  const { timestamp, level, message, details, sessionId } = entry;
  
  // Format the timestamp for display
  const formattedTime = new Date(timestamp).toLocaleTimeString();
  
  // Determine styling based on log level
  const levelStyles = {
    debug: 'text-gray-500',
    info: 'text-blue-500',
    warn: 'text-amber-500',
    error: 'text-red-500'
  };
  
  return (
    <div className="border-b border-gray-700 py-2">
      <div className="flex justify-between">
        <span className={`font-medium ${levelStyles[level]}`}>
          [{level.toUpperCase()}]
        </span>
        <span className="text-gray-400 text-sm">
          {formattedTime} - {sessionId.substring(0, 8)}
        </span>
      </div>
      <div className="mt-1">
        {message}
      </div>
      {details && (
        <pre className="mt-1 text-sm bg-gray-800 p-2 rounded overflow-x-auto">
          {typeof details === 'object' 
            ? JSON.stringify(details, null, 2)
            : details}
        </pre>
      )}
    </div>
  );
};

// Log filter component
const LogFilter = ({ activeLevel, setActiveLevel }) => {
  const levels = ['all', 'debug', 'info', 'warn', 'error'];
  
  return (
    <div className="flex space-x-2 mb-4">
      {levels.map(level => (
        <Button
          key={level}
          variant={level === activeLevel ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveLevel(level)}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </Button>
      ))}
    </div>
  );
};

// Git exclusions component
const GitExclusions = () => {
  // Get all logs that have git exclusion info
  const exclusionLogs = log.getAll().filter(
    entry => entry.message === 'Git exclusion pattern recorded'
  );
  
  if (exclusionLogs.length === 0) {
    return <div className="text-gray-400">No git exclusions recorded</div>;
  }
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-2">Git Exclusions</h3>
      <div className="bg-gray-800 p-3 rounded">
        {exclusionLogs.map((entry, index) => (
          <div key={index} className="font-mono">
            {entry.details?.pattern}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-2">
        These patterns would normally be added to .gitignore to exclude files from version control.
        Since .gitignore is read-only, they're being tracked here instead.
      </p>
    </div>
  );
};

// Main LogViewer component
const LogViewer = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [activeLevel, setActiveLevel] = useState('all');
  const [logs, setLogs] = useState([]);
  
  // Update logs when tab or filter changes
  useEffect(() => {
    const allLogs = activeTab === 'current' ? log.getSession() : log.getAll();
    
    // Apply level filter if not 'all'
    const filteredLogs = activeLevel === 'all'
      ? allLogs
      : allLogs.filter(entry => entry.level === activeLevel);
    
    setLogs(filteredLogs);
  }, [activeTab, activeLevel]);
  
  // Clear logs
  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      log.info('Logs cleared by user');
      // Wait a moment so the clear message gets logged before clearing
      setTimeout(() => {
        log.clearAll();
        setLogs([]);
      }, 100);
    }
  };
  
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg">
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Application Logs</h2>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClearLogs}
          >
            Clear Logs
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="current" onValueChange={setActiveTab}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="current">Current Session</TabsTrigger>
              <TabsTrigger value="all">All Logs</TabsTrigger>
              <TabsTrigger value="git">Git Exclusions</TabsTrigger>
            </TabsList>
            
            {activeTab !== 'git' && (
              <div className="flex justify-end">
                <LogFilter activeLevel={activeLevel} setActiveLevel={setActiveLevel} />
              </div>
            )}
          </div>
        </div>
        
        <TabsContent value="current" className="p-0">
          <ScrollArea className="h-[500px] p-4">
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs.map((entry, index) => (
                  <LogEntry key={index} entry={entry} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No logs for current session
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="all" className="p-0">
          <ScrollArea className="h-[500px] p-4">
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs.map((entry, index) => (
                  <LogEntry key={index} entry={entry} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No logs available
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="git" className="p-4">
          <GitExclusions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogViewer;
