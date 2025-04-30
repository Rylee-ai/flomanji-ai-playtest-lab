
import React from 'react';
import { SimulationConfig } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MissionConfigTabProps {
  config: SimulationConfig;
  onConfigChange: (field: keyof SimulationConfig, value: any) => void;
  onPlayerCountChange: (value: number) => void;
  selectedMission: any;
}

/**
 * Tab for mission configuration settings
 */
const MissionConfigTab: React.FC<MissionConfigTabProps> = ({
  config,
  onConfigChange,
  onPlayerCountChange,
  selectedMission
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="players">Player Count</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="players"
            min={1}
            max={6}
            step={1}
            value={[config.players || 2]}
            onValueChange={([value]) => onPlayerCountChange(value)}
            className="flex-1"
          />
          <span className="w-8 text-center">{config.players}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="missionType">Mission Type</Label>
        <Select
          value={config.missionType || "exploration"}
          onValueChange={(value) => onConfigChange("missionType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select mission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exploration">Exploration</SelectItem>
            <SelectItem value="extraction">Extraction</SelectItem>
            <SelectItem value="solo" disabled={config.players !== 1}>
              Solo
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rounds">Number of Rounds</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="rounds"
            min={1}
            max={10}
            step={1}
            value={[config.rounds || 5]}
            onValueChange={([value]) => onConfigChange("rounds", value)}
            className="flex-1"
          />
          <span className="w-8 text-center">{config.rounds}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="heat">Starting Heat</Label>
        <div className="flex items-center gap-2">
          <Slider
            id="heat"
            min={1}
            max={8}
            step={1}
            value={[config.startingHeat || selectedMission?.startingHeat || 2]}
            onValueChange={([value]) => onConfigChange("startingHeat", value)}
            className="flex-1"
          />
          <span className="w-8 text-center">{config.startingHeat}</span>
        </div>
      </div>
    </div>
  );
};

export default MissionConfigTab;
