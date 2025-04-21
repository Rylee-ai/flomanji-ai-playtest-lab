
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ObjectiveCompletionBarChartProps {
  objectiveCompletionRates: Record<string, number>;
}

const ObjectiveCompletionBarChart: React.FC<ObjectiveCompletionBarChartProps> = ({ objectiveCompletionRates }) => {
  const data = Object.entries(objectiveCompletionRates).map(([objective, rate]) => ({
    name: objective,
    value: rate * 100
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
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
  );
};

export default ObjectiveCompletionBarChart;
