
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CardFormValues } from "@/types/forms/card-form";
import { MissionBasicInfo } from './mission/MissionBasicInfo';
import { MissionObjectives } from './mission/MissionObjectives';
import { MissionScaling } from './mission/MissionScaling';

interface MissionCardFormProps {
  form: UseFormReturn<CardFormValues>;
}

export const MissionCardForm = ({ form }: MissionCardFormProps) => {
  return (
    <div className="space-y-6">
      <MissionBasicInfo form={form} />
      <MissionObjectives form={form} />
      <MissionScaling form={form} />
    </div>
  );
};
