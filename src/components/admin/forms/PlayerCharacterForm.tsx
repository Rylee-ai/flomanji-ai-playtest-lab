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
import { CardFormValues } from "../CardForm";
import { Textarea } from "@/components/ui/textarea";

interface PlayerCharacterFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const PlayerCharacterForm = ({ form }: PlayerCharacterFormProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <Input placeholder="Character Role" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-5 gap-2">
        <FormField
          control={form.control}
          name="stats.brawn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brawn</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={5} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stats.moxie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moxie</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={5} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stats.charm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charm</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={5} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stats.grit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grit</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={5} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stats.weirdSense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weird</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={5} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="ability.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ability Name</FormLabel>
            <FormControl>
              <Input placeholder="Ability Name" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ability.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ability Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Ability Description" {...field} value={field.value || ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="health"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Health</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={10} {...field} value={field.value || 5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weirdness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weirdness</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={10} {...field} value={field.value || 0} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="luck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Luck</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={10} {...field} value={field.value || 5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Starter gear would be handled by a complex field array but we'll keep it simple for now */}
    </>
  );
};
