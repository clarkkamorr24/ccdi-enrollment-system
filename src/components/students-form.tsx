"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TStudentValues, studentSchema } from "@/lib/validation";
import StudentsFormBtn from "./students-form-btn";
import { useStudentContext } from "@/hooks/useStudent";

type StudentsFormProps = {
  onFormSubmission: () => void;
};

export default function StudentsForm({ onFormSubmission }: StudentsFormProps) {
  const { handleAddStudent } = useStudentContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TStudentValues>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const studentData = getValues();

        await handleAddStudent(studentData);

        onFormSubmission();
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="idNumber">Student ID</Label>
          <Input id="idNumber" {...register("idNumber")} />
          {errors.idNumber && (
            <p className="text-red-500 text-xs">{errors.idNumber.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Student Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
      </div>
      <StudentsFormBtn />
    </form>
  );
}
