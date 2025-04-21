
import React from "react";
import { MissionSheet } from "@/types/cards/mission";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MissionOverviewTab from "./missions/MissionOverviewTab";
import MissionObjectivesTab from "./missions/MissionObjectivesTab";
import MissionRulesTab from "./missions/MissionRulesTab";

interface MissionRulesDisplayProps {
  mission: MissionSheet;
}

const MissionRulesDisplay: React.FC<MissionRulesDisplayProps> = ({ mission }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{mission.name}</CardTitle>
            <CardDescription>
              {mission.keywords.join(", ")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {mission.icons?.map((icon, i) => (
              <Badge key={i} variant="outline" title={icon.meaning}>{icon.symbol}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
            <TabsTrigger value="rules">Special Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <MissionOverviewTab mission={mission} />
          </TabsContent>
          <TabsContent value="objectives">
            <MissionObjectivesTab mission={mission} />
          </TabsContent>
          <TabsContent value="rules">
            <MissionRulesTab mission={mission} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MissionRulesDisplay;
