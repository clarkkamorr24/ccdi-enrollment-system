"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import SubjectsFormBtn from "./subjects-form-btn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSubjectValues, subjectSchema } from "@/lib/validation";
import { useSubjectContext } from "@/hooks/useSubject";
import { Action } from "@/lib/types";

type SubjectsFormProps = {
  action: Action;
  onFormSubmission: () => void;
};

export default function SubjectsForm({
  onFormSubmission,
  action,
}: SubjectsFormProps) {
  const { handleAddSubject, selectedSubject, handleEditSubject } =
    useSubjectContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TSubjectValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues:
      action === "edit"
        ? {
            name: selectedSubject?.name,
            start: selectedSubject?.start,
            end: selectedSubject?.end,
          }
        : undefined,
  });

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const subjectData = getValues();
        if (action === "add") {
          await handleAddSubject(subjectData);
        } else if (action === "edit") {
          await handleEditSubject(selectedSubject!.id, subjectData);
        }

        onFormSubmission();
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Subject Name</Label>
          <Input id="name" {...register("name")} autoComplete="off" />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <p className="text-sm font-bold text-ccdi-blue">Set your schedule</p>
        <div className="flex gap-x-2">
          <div className="space-y-1 w-full">
            <Label htmlFor="start">Start</Label>
            <Input
              id="start"
              type="time"
              className="relative"
              {...register("start")}
            />
            {errors.start && (
              <p className="text-red-500 text-xs">{errors.start.message}</p>
            )}
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="end">End</Label>
            <Input
              id="end"
              type="time"
              className="relative"
              {...register("end")}
            />
            {errors.end && (
              <p className="text-red-500 text-xs">{errors.end.message}</p>
            )}
          </div>
        </div>
      </div>
      <SubjectsFormBtn action={action} />
    </form>
  );
}
