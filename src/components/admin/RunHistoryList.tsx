
import React from "react";
import { MissionRunData } from "@/types/cards/mission";

interface RunHistoryListProps {
  runs: MissionRunData[];
}

const RunHistoryList: React.FC<RunHistoryListProps> = ({ runs }) => (
  <div className="space-y-2 max-h-96 overflow-y-auto">
    {runs.map((run, index) => (
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
);

export default RunHistoryList;
