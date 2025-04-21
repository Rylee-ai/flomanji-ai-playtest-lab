
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimulationConfig } from "@/types";

interface AdvancedSettingsProps {
  config: SimulationConfig;
  onConfigChange: (field: keyof SimulationConfig, value: any) => void;
}

const AdvancedSettings = ({ config, onConfigChange }: AdvancedSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="critic">Enable Critic</Label>
          <p className="text-sm text-muted-foreground">
            Include AI critic feedback at the end of the simulation.
          </p>
        </div>
        <Switch
          id="critic"
          checked={config.enableCritic}
          onCheckedChange={(checked) => onConfigChange("enableCritic", checked)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="outputMode">Output Mode</Label>
        <Select 
          value={config.outputMode as string} 
          onValueChange={(value) => onConfigChange("outputMode", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select output mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full (Complete dialogue)</SelectItem>
            <SelectItem value="narrative-only">Narrative Only (GM summarizes)</SelectItem>
            <SelectItem value="minimal">Minimal (Core outcomes only)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          How detailed you want the simulation output to be.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="optionalModules">Optional Modules</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="secretTraitor"
              checked={config.secretTraitor || false}
              onCheckedChange={(checked) => onConfigChange("secretTraitor" as keyof SimulationConfig, checked)}
            />
            <Label htmlFor="secretTraitor" className="cursor-pointer">Secret Traitor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="arcadeModule"
              checked={config.arcadeModule || false}
              onCheckedChange={(checked) => onConfigChange("arcadeModule" as keyof SimulationConfig, checked)}
            />
            <Label htmlFor="arcadeModule" className="cursor-pointer">Video Game Arcade</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="nightmareDifficulty"
              checked={config.nightmareDifficulty || false}
              onCheckedChange={(checked) => onConfigChange("nightmareDifficulty" as keyof SimulationConfig, checked)}
            />
            <Label htmlFor="nightmareDifficulty" className="cursor-pointer">Nightmare Difficulty</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="competitiveMode"
              checked={config.competitiveMode || false}
              onCheckedChange={(checked) => onConfigChange("competitiveMode" as keyof SimulationConfig, checked)}
            />
            <Label htmlFor="competitiveMode" className="cursor-pointer">Competitive Mode</Label>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Optional game modules that modify gameplay mechanics.
        </p>
      </div>
    </div>
  );
};

export default AdvancedSettings;
