
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimulationConfig } from "@/types";
import { Badge } from "@/components/ui/badge";
import { validatePlayerCountForMission, getMissionScaling } from "@/lib/simulation/mission-validator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BasicSettingsProps {
  config: SimulationConfig;
  onConfigChange: (field: keyof SimulationConfig, value: any) => void;
  onPlayerCountChange: (value: number) => void;
  selectedMission?: any; // Using any here to avoid circular dependencies
}

const MISSION_TYPE_LABELS: Record<string, string> = {
  exploration: "Exploration",
  escape: "Escape",
  escort: "Escort",
  collection: "Collection",
  boss: "Boss Fight",
  solo: "Solo Automa"
};

const BasicSettings = ({ 
  config, 
  onConfigChange, 
  onPlayerCountChange,
  selectedMission 
}: BasicSettingsProps) => {
  // If players is 1, lock missionType to "solo"
  const isSoloMode = config.players === 1;
  const safeMissionType = isSoloMode ? "solo" : (config.missionType !== "solo" ? config.missionType : "exploration");
  
  // Get mission validation if available
  const playerCountValidation = selectedMission 
    ? validatePlayerCountForMission(config.players || 2, selectedMission) 
    : { valid: true };
  
  // Get mission scaling if available
  const scalingInfo = selectedMission 
    ? getMissionScaling(config.players || 2, selectedMission) 
    : "";

  // Sync the displayed type label (for slider, select, etc.)
  useEffect(() => {
    if (isSoloMode && config.missionType !== "solo") {
      onConfigChange("missionType", "solo");
    }
    if (!isSoloMode && config.missionType === "solo") {
      onConfigChange("missionType", "exploration");
    }
    // Only run on relevant dependency change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.players]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="scenario">Scenario Prompt</Label>
        <Textarea 
          id="scenario"
          value={config.scenarioPrompt}
          onChange={(e) => onConfigChange("scenarioPrompt", e.target.value)}
          placeholder="Describe the scenario or starting situation..."
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          Describe the initial scenario, setting, or specific test case you want to simulate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="rounds">Number of Rounds: {config.rounds}</Label>
          <Slider
            id="rounds"
            defaultValue={[config.rounds]}
            min={1}
            max={15}
            step={1}
            onValueChange={(value) => onConfigChange("rounds", value[0])}
          />
          <p className="text-sm text-muted-foreground">
            How many interaction rounds to simulate (1-15). Higher values provide more testing data.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="players">Number of Players: {config.players}</Label>
            {!playerCountValidation.valid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <Badge variant="outline" className="text-amber-500 border-amber-500">
                      <Info className="h-3 w-3 mr-1" /> Warning
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{playerCountValidation.message}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <Slider
            id="players"
            defaultValue={[config.players]}
            min={1}
            max={6}
            step={1}
            value={[config.players || 1]} // Always controlled
            onValueChange={(value) => onPlayerCountChange(value[0])}
            disabled={config.missionType === "solo"}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>
              How many AI player characters to simulate (1-6). If selecting 1, solo Automa is enabled.
            </p>
            {scalingInfo && (
              <Badge variant="outline" className="ml-2">
                {scalingInfo}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startingHeat">Starting Heat: {config.startingHeat || 0}</Label>
          <Slider
            id="startingHeat"
            defaultValue={[config.startingHeat || 0]}
            min={0}
            max={8}
            step={1}
            onValueChange={(value) => onConfigChange("startingHeat", value[0])}
          />
          <p className="text-sm text-muted-foreground">
            Set the initial Heat level (0-8). Higher values create more urgency.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="missionType">Mission Type</Label>
          <Select 
            value={safeMissionType as string}
            onValueChange={(value) => {
              // If user selects "solo", force players to 1 (and lock slider)
              if (value === "solo") {
                onConfigChange("players", 1);
                onConfigChange("missionType", "solo");
              } else {
                // Restore standard mission type if not in solo
                if (config.players === 1 && config.missionType === "solo") {
                  onConfigChange("players", 2);
                }
                onConfigChange("missionType", value);
              }
            }}
            disabled={isSoloMode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mission type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exploration" disabled={isSoloMode}>Exploration</SelectItem>
              <SelectItem value="escape" disabled={isSoloMode}>Escape</SelectItem>
              <SelectItem value="escort" disabled={isSoloMode}>Escort</SelectItem>
              <SelectItem value="collection" disabled={isSoloMode}>Collection</SelectItem>
              <SelectItem value="boss" disabled={isSoloMode}>Boss Fight</SelectItem>
              <SelectItem value="solo">Solo Automa</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            {isSoloMode
              ? "Solo Automa mission enabled for 1 player."
              : "The primary mission objective type."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicSettings;
