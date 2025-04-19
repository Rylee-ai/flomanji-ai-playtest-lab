
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

interface SecretCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const SecretCardForm = ({ form }: SecretCardFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="alignment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alignment</FormLabel>
            <FormControl>
              <Input 
                placeholder="saboteur or innocent" 
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
        name="winCondition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Win Condition</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Condition to win" 
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
