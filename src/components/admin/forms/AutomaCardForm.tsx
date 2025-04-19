
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

interface AutomaCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const AutomaCardForm = ({ form }: AutomaCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="movement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Movement</FormLabel>
            <FormControl>
              <Input 
                placeholder="Movement pattern" 
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="combatBonus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Combat Bonus</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Combat bonus modifier" 
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
        name="specialEffect"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Effect</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Special effect description" 
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
