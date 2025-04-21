
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// This component will handle saving/loading agent configurations
const AgentLibrary = () => {
  const [savedConfigs, setSavedConfigs] = useState([
    { id: "1", name: "Default Configuration", date: "Apr 15, 2025" },
    { id: "2", name: "Horror-Focused GM", date: "Apr 16, 2025" },
    { id: "3", name: "Beginner-Friendly Setup", date: "Apr 18, 2025" },
  ]);
  
  const [newConfigName, setNewConfigName] = useState("");
  
  const handleSaveCurrentConfig = () => {
    if (!newConfigName.trim()) {
      toast.error("Please enter a name for this configuration");
      return;
    }
    
    // In a real implementation, this would save the current config to localStorage or database
    const newConfig = {
      id: Date.now().toString(),
      name: newConfigName,
      date: new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).format(new Date())
    };
    
    setSavedConfigs([...savedConfigs, newConfig]);
    setNewConfigName("");
    toast.success("Configuration saved to library");
  };
  
  const handleLoadConfig = (configId: string) => {
    // In a real implementation, this would load the selected config
    const config = savedConfigs.find(c => c.id === configId);
    if (config) {
      toast.success(`Loaded configuration: ${config.name}`);
    }
  };
  
  const handleDeleteConfig = (configId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const configToDelete = savedConfigs.find(c => c.id === configId);
    if (configToDelete) {
      setSavedConfigs(savedConfigs.filter(c => c.id !== configId));
      toast.success(`Deleted configuration: ${configToDelete.name}`);
    }
  };
  
  const handleExportAllConfigs = () => {
    // In a real implementation, this would export all configs to a JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedConfigs));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "flomanji-agent-configs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success("Exported all configurations");
  };
  
  const handleImportConfigs = () => {
    // This is a placeholder - in a real implementation, this would open a file dialog
    toast.info("Import functionality would be implemented here");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Configuration Library</CardTitle>
        <CardDescription>
          Save and load agent configurations for different game styles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="new-config-name">Save Current Configuration</Label>
          <div className="flex gap-2">
            <Input
              id="new-config-name"
              value={newConfigName}
              onChange={(e) => setNewConfigName(e.target.value)}
              placeholder="Enter a name for this configuration"
            />
            <Button onClick={handleSaveCurrentConfig}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Saved Configurations</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportAllConfigs}>
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
              <Button variant="outline" size="sm" onClick={handleImportConfigs}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
          
          <div className="grid gap-2">
            {savedConfigs.map((config) => (
              <div 
                key={config.id}
                onClick={() => handleLoadConfig(config.id)}
                className="flex justify-between items-center p-3 rounded-md border hover:bg-accent cursor-pointer"
              >
                <div>
                  <p className="font-medium">{config.name}</p>
                  <p className="text-xs text-muted-foreground">{config.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleLoadConfig(config.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={(e) => handleDeleteConfig(config.id, e)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            
            {savedConfigs.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No saved configurations yet
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentLibrary;
