
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CardFormValues } from "@/types/forms/card-form";

interface MissionScalingProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionScaling = ({ form }: MissionScalingProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="scaling.small"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Small Group Scaling</FormLabel>
            <FormControl>
              <Textarea placeholder="Adjustments for 1-2 players" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="scaling.large"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Large Group Scaling</FormLabel>
            <FormControl>
              <Textarea placeholder="Adjustments for 4+ players" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="recommendedPlayerCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recommended Player Count</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 2-4" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="estimatedDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimated Duration (rounds)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Expected number of rounds" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="difficultyRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Difficulty Rating (1-10)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min={1}
                max={10}
                placeholder="Overall difficulty" 
                {...field}
                value={field.value || ""}
                onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
