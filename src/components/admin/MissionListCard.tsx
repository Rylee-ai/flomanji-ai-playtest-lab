
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MissionAnalytics } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

interface MissionListCardProps {
  analyticsData: MissionAnalytics[];
}

const MissionListCard: React.FC<MissionListCardProps> = ({ analyticsData }) => (
  <Card>
    <CardHeader>
      <CardTitle>Mission Analytics Overview</CardTitle>
      <CardDescription>
        Comparison of performance across all missions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        {/* Chart overview moved to MissionAnalytics.tsx for DRY */}
      </div>
    </CardContent>
  </Card>
);

export default MissionListCard;
