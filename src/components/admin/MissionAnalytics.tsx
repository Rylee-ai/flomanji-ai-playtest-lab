
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MissionAnalytics as MissionAnalyticsType } from "@/types/cards/mission";
import { getAllMissionAnalytics, getMissionAnalytics } from "@/lib/mission-analytics";
import { MISSION_CARDS } from "@/lib/cards/mission-cards";

interface MissionAnalyticsProps {
  missionId?: string; // If provided, show analytics for specific mission
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const MissionAnalytics: React.FC<MissionAnalyticsProps> = ({ missionId }) => {
  // Get analytics data
  const analyticsData = missionId 
    ? getMissionAnalytics(missionId) 
    : getAllMissionAnalytics();
  
  const missionsWithData = missionId 
    ? (analyticsData ? [MISSION_CARDS.find(m => m.id === missionId)] : []) 
    : MISSION_CARDS.filter(m => getAllMissionAnalytics().some(a => a.missionId === m.id));
  
  if (!analyticsData || analyticsData.length === 0) {
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

  // Handle single mission view
  if (missionId) {
    const data = analyticsData as MissionAnalyticsType;
    const mission = MISSION_CARDS.find(m => m.id === missionId);
    
    if (!mission) {
      return <p>Mission not found</p>;
    }
    
    const successRateData = [
      { name: 'Success', value: data.aggregateStats.successRate * 100 },
      { name: 'Failure', value: (1 - data.aggregateStats.successRate) * 100 }
    ];

    const objectiveCompletionData = Object.entries(data.aggregateStats.objectiveCompletionRates).map(
      ([objective, rate]) => ({
        name: objective,
        value: rate * 100
      })
    );

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
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={successRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {successRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="objectives">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={objectiveCompletionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="runs">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {data.runs.map((run, index) => (
                  <div key={run.id || index} className="p-3 border rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">Run #{index + 1}</span>
                      <span className={run.completed ? "text-green-500" : "text-red-500"}>
                        {run.completed ? "Success" : "Failed"}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Rounds: {run.rounds}</p>
                      <p>Final Heat: {run.finalHeatLevel}</p>
                      <p>Objectives: {run.objectivesCompleted.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  // Handle multiple missions overview
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mission Analytics Overview</CardTitle>
        <CardDescription>
          Comparison of performance across all missions
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                {analyticsData.map((data: MissionAnalyticsType) => {
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
      </CardContent>
    </Card>
  );
};

export default MissionAnalytics;
