
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "@/types/forms/card-form";

interface HazardDifficultyClassesProps {
  form: UseFormReturn<CardFormValues>;
}

export const HazardDifficultyClasses = ({ form }: HazardDifficultyClassesProps) => {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <FormLabel>Difficulty Classes</FormLabel>
      
      <FormField
        control={form.control}
        name="difficultyClasses.fight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fight DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Fight DC" 
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
        name="difficultyClasses.flee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flee DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Flee DC" 
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
        name="difficultyClasses.negotiate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Negotiate DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Negotiate DC" 
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
        name="difficultyClasses.outsmart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outsmart DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Outsmart DC" 
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
