
import React from "react";
import GameContentManager from "@/components/admin/GameContentManager";

const ContentManager = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Flomanji Content Manager</h1>
        <div className="text-sm text-muted-foreground">
          Create and manage game cards, missions, and content
        </div>
      </div>
      <GameContentManager />
    </div>
  );
};

export default ContentManager;
