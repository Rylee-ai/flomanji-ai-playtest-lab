
import React from "react";
import { MissionSheet } from "@/types/cards/mission";
import { Badge } from "@/components/ui/badge";

interface MissionOverviewTabProps {
  mission: MissionSheet;
}

const MissionOverviewTab: React.FC<MissionOverviewTabProps> = ({ mission }) => (
  <div className="space-y-4 pt-4">
    <div>
      <h3 className="font-medium mb-1">Mission Hook</h3>
      <p>{mission.hook}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium mb-1">Map Layout</h3>
        <p>{mission.mapLayout}</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Starting Heat</h3>
        <p>{mission.startingHeat}</p>
      </div>
    </div>
    <div>
      <h3 className="font-medium mb-1">Extraction Point</h3>
      <p>{mission.extractionRegion}</p>
    </div>
    {mission.scaling && (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-1">Small Group Scaling</h3>
          <p>{mission.scaling.small}</p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Large Group Scaling</h3>
          <p>{mission.scaling.large}</p>
        </div>
      </div>
    )}
    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="font-medium mb-1">Difficulty</h3>
        <p>{mission.difficultyRating ? `${mission.difficultyRating}/10` : 'Not rated'}</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Est. Duration</h3>
        <div className="flex items-center gap-1">
          <p>{mission.estimatedDuration ? `${mission.estimatedDuration} rounds` : 'Unknown'}</p>
          {mission.estimatedDuration && mission.estimatedDuration < 8 && (
            <Badge variant="outline" className="text-xs">Testing</Badge>
          )}
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-1">Players</h3>
        <p>{mission.recommendedPlayerCount?.join(', ') || 'Any'}</p>
      </div>
    </div>
  </div>
);

export default MissionOverviewTab;
