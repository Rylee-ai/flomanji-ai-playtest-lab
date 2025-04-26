
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CardFormValues } from "@/types/forms/card-form";
import { MissionObjective } from './MissionObjective';

interface MissionObjectivesProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionObjectives = ({ form }: MissionObjectivesProps) => {
  const objectives = form.watch('objectives') || [];

  const addObjective = () => {
    const currentObjectives = form.getValues('objectives') || [];
    form.setValue('objectives', [...currentObjectives, { 
      description: "", 
      required: true,
      reward: "",
      completionCheck: "",
      difficultyLevel: 1
    }]);
  };

  const removeObjective = (index: number) => {
    const currentObjectives = form.getValues('objectives') || [];
    form.setValue('objectives', currentObjectives.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Mission Objectives</FormLabel>
        <Button type="button" variant="outline" size="sm" onClick={addObjective}>
          <Plus className="h-4 w-4 mr-1" />
          Add Objective
        </Button>
      </div>

      {objectives.map((_, index) => (
        <MissionObjective
          key={index}
          form={form}
          index={index}
          onRemove={() => removeObjective(index)}
        />
      ))}
    </div>
  );
};
