
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MissionAnalytics as MissionAnalyticsType } from "@/types/cards/mission";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";
import MissionSuccessPieChart from "./MissionSuccessPieChart";
import ObjectiveCompletionBarChart from "./ObjectiveCompletionBarChart";
import RunHistoryList from "./RunHistoryList";
import MissionOverviewGrid from "./MissionOverviewGrid";

interface MissionAnalyticsProps {
  missionId?: string; // If provided, show analytics for specific mission
}

interface OverviewTabProps {
  data: MissionAnalyticsType;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">Success Rate</h3>
        <p className="text-3xl font-bold">{(data.aggregateStats.successRate * 100).toFixed(1)}%</p>
      </div>
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">Avg. Completion</h3>
        <p className="text-3xl font-bold">{data.aggregateStats.averageCompletionRounds.toFixed(1)} rounds</p>
      </div>
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-medium">Total Runs</h3>
        <p className="text-3xl font-bold">{data.runs.length}</p>
      </div>
    </div>

    <div className="h-80">
      <MissionSuccessPieChart successRate={data.aggregateStats.successRate} />
    </div>
  </>
);

interface ObjectivesTabProps {
  objectiveCompletionRates: Record<string, number>;
}

const ObjectivesTab: React.FC<ObjectivesTabProps> = ({ objectiveCompletionRates }) => (
  <div className="h-80">
    <ObjectiveCompletionBarChart objectiveCompletionRates={objectiveCompletionRates} />
  </div>
);

interface RunsTabProps {
  runs: MissionAnalyticsType["runs"];
}

const RunsTab: React.FC<RunsTabProps> = ({ runs }) => (
  <RunHistoryList runs={runs} />
);

const MultiMissionOverview: React.FC<{ analyticsData: MissionAnalyticsType[] }> = ({ analyticsData }) => (
  <>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={analyticsData.map((data: MissionAnalyticsType) => {
            const mission = MISSION_CARDS.find(m => m.id === data.missionId);
            return {
              name: mission?.name || data.missionId,
              successRate: data.aggregateStats.successRate * 100,
              avgRounds: data.aggregateStats.averageCompletionRounds,
              runs: data.runs.length
            };
          })}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="successRate" name="Success Rate (%)" fill="#8884d8" />
          <Bar dataKey="avgRounds" name="Avg. Rounds" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <MissionOverviewGrid analyticsData={analyticsData} />
  </>
);

const MissionAnalytics: React.FC<MissionAnalyticsProps> = ({ missionId }) => {
  const analyticsData = missionId
    ? getMissionAnalytics(missionId) 
    : getAllMissionAnalytics();

  if (
    !analyticsData 
    || (Array.isArray(analyticsData) && analyticsData.length === 0) 
    || (!Array.isArray(analyticsData) && (!analyticsData.runs || analyticsData.runs.length === 0))
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mission Analytics</CardTitle>
          <CardDescription>
            No simulation data available yet. Run mission simulations to generate analytics.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (missionId && !Array.isArray(analyticsData)) {
    const data = analyticsData as MissionAnalyticsType;
    const mission = MISSION_CARDS.find(m => m.id === missionId);
    if (!mission) {
      return <p>Mission not found</p>;
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{mission.name} Analytics</CardTitle>
          <CardDescription>
            Based on {data.runs.length} simulation runs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="runs">Run History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <OverviewTab data={data} />
            </TabsContent>

            <TabsContent value="objectives">
              <ObjectivesTab objectiveCompletionRates={data.aggregateStats.objectiveCompletionRates} />
            </TabsContent>

            <TabsContent value="runs">
              <RunsTab runs={data.runs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  if (Array.isArray(analyticsData)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mission Analytics Overview</CardTitle>
          <CardDescription>
            Comparison of performance across all missions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MultiMissionOverview analyticsData={analyticsData} />
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default MissionAnalytics;
