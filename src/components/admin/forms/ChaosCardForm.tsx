
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

interface ChaosCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const ChaosCardForm = ({ form }: ChaosCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="heatEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heat Effect</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Heat Change" 
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
        name="globalEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Global Effect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Effect on all players" 
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
