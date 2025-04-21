
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { MissionAnalytics } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

interface MissionOverviewGridProps {
  analyticsData: MissionAnalytics[];
}

const MissionOverviewGrid: React.FC<MissionOverviewGridProps> = ({ analyticsData }) => {
  const missionsWithData = MISSION_CARDS.filter(m => analyticsData.some(a => a.missionId === m.id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {missionsWithData.map(mission => mission && (
        <Card key={mission.id} className="hover:bg-accent/50 transition-colors">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{mission.name}</CardTitle>
            <CardDescription>
              {mission.keywords.join(", ")}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {analyticsData.map((data) => {
              if (data.missionId === mission.id) {
                return (
                  <div key={mission.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate:</span>
                      <span className="font-medium">{(data.aggregateStats.successRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Rounds:</span>
                      <span className="font-medium">{data.aggregateStats.averageCompletionRounds.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Runs:</span>
                      <span className="font-medium">{data.runs.length}</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MissionOverviewGrid;
