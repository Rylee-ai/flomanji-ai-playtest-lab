
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
import { CardFormValues } from "@/types/forms/card-form";

interface FlomanjifiedCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const FlomanjifiedCardForm = ({ form }: FlomanjifiedCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="originalRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Original Role</FormLabel>
            <FormControl>
              <Input 
                placeholder="Original character role" 
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
        name="chaosAction"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chaos Action</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Action during chaos phase" 
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
        name="specialAbility"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Ability</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Special ability description" 
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
