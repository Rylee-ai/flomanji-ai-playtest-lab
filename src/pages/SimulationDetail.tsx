
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getSimulationById } from "@/lib/storage";
import { SimulationResult } from "@/types";
import SimulationDetails from "@/components/simulation/SimulationDetails";

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      try {
        const result = getSimulationById(id);
        if (result) {
          setSimulation(result);
        } else {
          setError("Simulation not found");
        }
      } catch (e) {
        console.error("Error loading simulation:", e);
        setError("Failed to load simulation");
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          Simulation Details
        </h1>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading simulation...</div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      ) : simulation ? (
        <SimulationDetails simulation={simulation} />
      ) : (
        <div className="bg-amber-50 text-amber-800 p-4 rounded-lg">
          No simulation data found
        </div>
      )}
    </div>
  );
};

export default SimulationDetail;
