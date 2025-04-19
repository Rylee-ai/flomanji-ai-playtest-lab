
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
              <Input type="number" placeholder="Difficulty Check" {...field} />
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
              <Textarea placeholder="NPC Actions" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
