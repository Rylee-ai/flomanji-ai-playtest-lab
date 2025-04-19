
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CardFormValues } from "../CardForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="saboteur">Saboteur</SelectItem>
                <SelectItem value="innocent">Innocent</SelectItem>
              </SelectContent>
            </Select>
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
                placeholder="Condition to win (e.g., If Heat reaches 10...)" 
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
