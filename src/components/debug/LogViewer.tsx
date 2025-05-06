
import React, { useState, useEffect } from 'react';
import { logger, LogEntry, LogLevel } from '@/utils/logging';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Download, RefreshCw } from 'lucide-react';

/**
 * Log viewer component for debugging
 */
const LogViewer = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<LogLevel | 'all'>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  useEffect(() => {
    // Initial load
    loadLogs();
    
    // Set up auto-refresh if enabled
    let interval: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      interval = setInterval(loadLogs, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);
  
  const loadLogs = () => {
    const allLogs = logger.getLogs();
    setLogs(allLogs.reverse()); // Show newest first
  };
  
  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      logger.clearLogs();
      setLogs([]);
    }
  };
  
  const downloadLogs = () => {
    const logData = JSON.stringify(logs.slice().reverse(), null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `flomanji-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const filteredLogs = activeTab === 'all' 
    ? logs 
    : logs.filter(log => log.level === activeTab);
  
  const logLevelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {} as Record<LogLevel, number>);
  
  const getLogLevelColor = (level: LogLevel): string => {
    switch (level) {
      case 'debug': return 'bg-gray-200 text-gray-800';
      case 'info': return 'bg-blue-500 text-white';
      case 'warn': return 'bg-amber-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Application Logs</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="auto-refresh" 
              checked={autoRefresh} 
              onCheckedChange={(checked) => setAutoRefresh(!!checked)} 
            />
            <label htmlFor="auto-refresh" className="text-sm font-medium">
              Auto-refresh
            </label>
          </div>
          <Button variant="outline" size="sm" onClick={loadLogs}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={downloadLogs}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as LogLevel | 'all')}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all" className="relative">
              All
              <Badge variant="secondary" className="ml-1">
                {logs.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="debug" className="relative">
              Debug
              <Badge variant="secondary" className="ml-1">
                {logLevelCounts.debug || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="info" className="relative">
              Info
              <Badge variant="secondary" className="ml-1">
                {logLevelCounts.info || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="warn" className="relative">
              Warnings
              <Badge variant="secondary" className="ml-1">
                {logLevelCounts.warn || 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="error" className="relative">
              Errors
              <Badge variant="secondary" className="ml-1">
                {logLevelCounts.error || 0}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[500px] rounded border">
              {filteredLogs.length > 0 ? (
                <div className="divide-y">
                  {filteredLogs.map(log => (
                    <div key={log.id} className="p-3 hover:bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Badge className={`mr-2 uppercase text-xs ${getLogLevelColor(log.level)}`}>
                            {log.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                          Session: {log.sessionId.substring(0, 8)}
                        </span>
                      </div>
                      <div className="font-medium">{log.message}</div>
                      {log.details && (
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                          {typeof log.details === 'object' 
                            ? JSON.stringify(log.details, null, 2)
                            : String(log.details)
                          }
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4 text-center">
                  <div className="text-muted-foreground">
                    No logs to display for the selected filter
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LogViewer;
