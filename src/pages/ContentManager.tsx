
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";

const ContentManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Content Manager</h1>
      </div>
      <GameContentManager />
    </div>
  );
};

export default ContentManager;
