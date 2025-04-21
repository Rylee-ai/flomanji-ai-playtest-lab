
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { MissionSheet } from "@/types/cards/mission";

interface MissionSelectionGridProps {
  missions: MissionSheet[];
  selectedMission: MissionSheet;
  onMissionSelect: (mission: MissionSheet) => void;
  missionAnalytics: any[]; // Array of analytics, could be typed further
}

const MissionSelectionGrid: React.FC<MissionSelectionGridProps> = ({
  missions,
  selectedMission,
  onMissionSelect,
  missionAnalytics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {missions.map((mission) => {
        const analytics = missionAnalytics.find(a => a.missionId === mission.id);

        return (
          <Card
            key={mission.id}
            className={`cursor-pointer hover:bg-accent/50 transition-colors ${selectedMission?.id === mission.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => onMissionSelect(mission)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{mission.name}</CardTitle>
                  <CardDescription>{mission.keywords.join(", ")}</CardDescription>
                </div>
                <div className="flex gap-1">
                  {mission.icons?.slice(0, 2).map((icon, i) => (
                    <span key={i} title={icon.meaning}>{icon.symbol}</span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2">{mission.hook}</p>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <div className="text-xs">Heat: {mission.startingHeat}</div>
              <div className="text-xs">
                Difficulty: {mission.difficultyRating ? `${mission.difficultyRating}/10` : 'N/A'}
              </div>
              {analytics && (
                <div className="text-xs">
                  Success: {(analytics.aggregateStats.successRate * 100).toFixed(0)}%
                </div>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default MissionSelectionGrid;
