
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "../CardForm";

interface NPCCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const NPCCardForm = ({ form }: NPCCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="checkDC"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Check DC</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Difficulty Check" 
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
        name="actions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Actions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="NPC Actions" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
