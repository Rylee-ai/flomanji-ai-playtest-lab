import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSimulationById, updateSimulationAnnotations } from '@/lib/storage';
import { AgentMessage } from '@/types'; // Ensure proper import

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [simulation, setSimulation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const simulationData = getSimulationById(id);
      if (simulationData) {
        setSimulation(simulationData);
        setAnnotations(simulationData.annotations || '');
      }
      setLoading(false);
    }
  }, [id]);

  const handleSaveAnnotations = () => {
    if (id) {
      setIsSaving(true);
      const success = updateSimulationAnnotations(id, annotations);
      if (success) {
        setSimulation(prev => ({ ...prev, annotations }));
      }
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading simulation data...</div>;
  }

  if (!simulation) {
    return <div className="p-8 text-center">Simulation not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Simulation Results</h1>
      
      <div className="bg-card rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Scenario</h2>
        <p className="mb-4">{simulation.scenario}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-medium">Date</h3>
            <p>{new Date(simulation.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-medium">Rounds</h3>
            <p>{simulation.rounds}</p>
          </div>
        </div>
        
        {simulation.missionOutcome && (
          <div className="mb-4">
            <h3 className="font-medium">Mission Outcome</h3>
            <div className={`inline-block px-2 py-1 rounded text-sm ${
              simulation.missionOutcome === 'success' ? 'bg-green-100 text-green-800' :
              simulation.missionOutcome === 'partial' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {simulation.missionOutcome.charAt(0).toUpperCase() + simulation.missionOutcome.slice(1)}
            </div>
          </div>
        )}
      </div>
      
      {simulation.keyEvents && simulation.keyEvents.length > 0 && (
        <div className="bg-card rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Events</h2>
          <div className="space-y-2">
            {simulation.keyEvents.map((event: any, index: number) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-1">
                <div className="font-medium">Round {event.round}</div>
                <div>{event.description}</div>
                {event.impact && <div className="text-sm text-muted-foreground mt-1">{event.impact}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-card rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Simulation Log</h2>
        <div className="space-y-4">
          {simulation.log.map((entry: AgentMessage, index: number) => (
            <div key={index} className={`p-3 rounded-lg ${
              entry.role === 'GM' ? 'bg-primary/10' :
              entry.role === 'Critic' ? 'bg-yellow-100' :
              'bg-muted'
            }`}>
              <div className="font-semibold mb-1">{entry.role}</div>
              <div className="whitespace-pre-wrap">{entry.content}</div>
            </div>
          ))}
        </div>
      </div>
      
      {simulation.criticFeedback && (
        <div className="bg-card rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Critic Feedback</h2>
          <div className="whitespace-pre-wrap">{simulation.criticFeedback}</div>
        </div>
      )}
      
      <div className="bg-card rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Notes</h2>
        <textarea
          className="w-full min-h-[100px] p-2 border rounded"
          value={annotations}
          onChange={(e) => setAnnotations(e.target.value)}
          placeholder="Add your notes about this simulation..."
        />
        <button
          className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded"
          onClick={handleSaveAnnotations}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>
    </div>
  );
};

export default SimulationDetail;
