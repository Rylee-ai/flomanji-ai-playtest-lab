
import React from 'react';
import LogViewer from '@/components/debug/LogViewer';

const Debug = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Debug Tools</h1>
      </div>
      
      <div className="grid gap-6">
        <LogViewer />
      </div>
    </div>
  );
};

export default Debug;
