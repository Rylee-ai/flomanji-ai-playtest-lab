
import React from 'react';
import { SimulationConfig } from '@/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdvancedConfigTabProps {
  config: SimulationConfig;
  onConfigChange: (field: keyof SimulationConfig, value: any) => void;
}

/**
 * Tab for advanced simulation settings
 */
const AdvancedConfigTab: React.FC<AdvancedConfigTabProps> = ({
  config,
  onConfigChange
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="enableCritic" className="text-base">AI Critic Feedback</Label>
          <p className="text-sm text-muted-foreground">
            Enables detailed critique of the simulation run
          </p>
        </div>
        <Switch
          id="enableCritic"
          checked={config.enableCritic}
          onCheckedChange={(checked) => onConfigChange("enableCritic", checked)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="output-mode">Output Detail Level</Label>
        <Select
          value={config.outputMode || "full"}
          onValueChange={(value) => onConfigChange("outputMode", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select output mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Detail</SelectItem>
            <SelectItem value="concise">Concise</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="secretTraitor" className="text-base">Secret Traitor Mode</Label>
          <p className="text-sm text-muted-foreground">
            Randomly assigns a traitor among the players
          </p>
        </div>
        <Switch
          id="secretTraitor"
          checked={config.secretTraitor || false}
          onCheckedChange={(checked) => onConfigChange("secretTraitor", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="nightmareDifficulty" className="text-base">Nightmare Difficulty</Label>
          <p className="text-sm text-muted-foreground">
            Increases challenge level for experienced players
          </p>
        </div>
        <Switch
          id="nightmareDifficulty"
          checked={config.nightmareDifficulty || false}
          onCheckedChange={(checked) => onConfigChange("nightmareDifficulty", checked)}
        />
      </div>
    </div>
  );
};

export default AdvancedConfigTab;
