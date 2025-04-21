import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, PencilIcon, Save } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getSimulationById, updateSimulationAnnotations } from "@/lib/api";
import { SimulationResult, AgentMessage } from "@/types";
import { toast } from "@/components/ui/sonner";

const AgentBubble: React.FC<{ message: AgentMessage }> = ({ message }) => {
  const bgColorClass = 
    message.role === 'GM' 
      ? 'bg-primary text-primary-foreground'
      : message.role === 'Player'
        ? 'bg-secondary text-secondary-foreground'
        : 'bg-accent text-accent-foreground';
  
  return (
    <div className={`p-4 rounded-lg ${bgColorClass} mb-4`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">{message.role}</span>
        {message.timestamp && (
          <span className="text-xs opacity-70">{formatDate(message.timestamp)}</span>
        )}
      </div>
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
};

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [annotations, setAnnotations] = useState("");
  const [editingAnnotations, setEditingAnnotations] = useState(false);

  useEffect(() => {
    if (id) {
      const simulationData = getSimulationById(id);
      if (simulationData) {
        setSimulation(simulationData);
        setAnnotations(simulationData.annotations || "");
      }
    }
  }, [id]);

  const handleSaveAnnotations = () => {
    if (id) {
      const success = updateSimulationAnnotations(id, annotations);
      if (success) {
        toast.success("Annotations saved successfully");
        setEditingAnnotations(false);
        // Update local state
        if (simulation) {
          setSimulation({
            ...simulation,
            annotations
          });
        }
      } else {
        toast.error("Failed to save annotations");
      }
    }
  };

  if (!simulation) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-muted-foreground mb-4">
          Simulation not found or still loading...
        </p>
        <Button asChild>
          <Link to="/simulations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Simulations
          </Link>
        </Button>
      </div>
    );
  }

  const { scenario, timestamp, rounds, log, criticFeedback } = simulation;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link to="/simulations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Simulations
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{scenario}</h1>
          <p className="text-muted-foreground">
            {formatDate(timestamp)} • {rounds} rounds • {log.length} messages
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="transcript">
        <TabsList>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="critique">Critique</TabsTrigger>
          <TabsTrigger value="annotations">Annotations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcript" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Transcript</CardTitle>
              <CardDescription>
                Complete record of the simulation session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {log.map((message, index) => (
                  <AgentBubble key={index} message={message} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="critique" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Critic Feedback</CardTitle>
              <CardDescription>
                Analysis of the game session by the critic agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {criticFeedback ? (
                <div className="p-4 bg-accent rounded-lg whitespace-pre-line">
                  {criticFeedback}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No critic feedback available for this simulation.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="annotations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Annotations</CardTitle>
                  <CardDescription>
                    Your notes and observations about this simulation
                  </CardDescription>
                </div>
                {!editingAnnotations ? (
                  <Button variant="outline" size="sm" onClick={() => setEditingAnnotations(true)}>
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSaveAnnotations}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editingAnnotations ? (
                <Textarea
                  value={annotations}
                  onChange={(e) => setAnnotations(e.target.value)}
                  placeholder="Add your observations, notes, or ideas about this simulation..."
                  className="min-h-[200px]"
                />
              ) : annotations ? (
                <div className="p-4 bg-secondary rounded-lg whitespace-pre-line">
                  {annotations}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No annotations yet. Click edit to add your notes.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationDetail;
