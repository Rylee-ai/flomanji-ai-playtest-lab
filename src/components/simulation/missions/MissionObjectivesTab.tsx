
import React from "react";
import { MissionSheet } from "@/types/cards/mission";
import { Badge } from "@/components/ui/badge";

interface MissionObjectivesTabProps {
  mission: MissionSheet;
}

const MissionObjectivesTab: React.FC<MissionObjectivesTabProps> = ({ mission }) => (
  <div className="space-y-4 pt-4">
    {mission.objectives.map((objective, index) => (
      <div key={index} className="border p-3 rounded-md">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium">{objective.description}</h3>
          <Badge variant={objective.required ? "default" : "outline"}>
            {objective.required ? "Required" : "Optional"}
          </Badge>
        </div>
        {objective.difficultyLevel && (
          <div className="text-xs text-muted-foreground mb-1">
            Difficulty: {objective.difficultyLevel}/5
          </div>
        )}
        {objective.reward && (
          <div className="bg-secondary/50 p-2 rounded text-sm">
            <span className="font-medium">Reward:</span> {objective.reward}
          </div>
        )}
        {objective.completionCheck && (
          <div className="mt-2 text-sm">
            <span className="font-medium">How to complete:</span> {objective.completionCheck}
          </div>
        )}
      </div>
    ))}
    {mission.phases && (
      <div className="mt-6">
        <h3 className="font-medium mb-2">Mission Phases</h3>
        {mission.phases.map((phase, index) => (
          <div key={index} className="border p-3 rounded-md mb-3">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{phase.name}</h4>
              {phase.timeLimit && (
                <Badge variant="outline">
                  {phase.timeLimit} {phase.timeLimit === 1 ? 'round' : 'rounds'}
                </Badge>
              )}
            </div>
            <p className="text-sm mb-2">{phase.description}</p>
            <div className="space-y-2">
              {phase.objectives.map((obj, idx) => (
                <div key={idx} className="bg-secondary/20 p-2 rounded text-sm">
                  <div className="flex items-center gap-2">
                    <span>{obj.description}</span>
                    {obj.required && <Badge variant="secondary">Required</Badge>}
                  </div>
                  {obj.reward && <div className="text-xs mt-1">Reward: {obj.reward}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default MissionObjectivesTab;
