"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TStudentValues, studentSchema } from "@/lib/validation";
import StudentsFormBtn from "./students-form-btn";
import { useStudentContext } from "@/hooks/useStudent";
import { Action } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import ComponentSelect from "./component-select";
import { strand } from "@/utils/strand";
import { semesters } from "@/utils/semester";

type StudentsFormProps = {
  action: Action;
  onFormSubmission: () => void;
};

export default function StudentsForm({
  onFormSubmission,
  action,
}: StudentsFormProps) {
  const { error, handleAddStudent, handleEditStudent, selectedStudent } =
    useStudentContext();

  const {
    register,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<TStudentValues>({
    resolver: zodResolver(studentSchema),
    defaultValues:
      action === "edit"
        ? {
            firstName: selectedStudent?.firstName,
            middleName: selectedStudent?.middleName,
            lastName: selectedStudent?.lastName,
            strand: selectedStudent?.strand,
            semester: selectedStudent?.semester,
            idNumber: selectedStudent?.idNumber,
          }
        : undefined,
  });
  return (
    <form
      className="flex flex-col"
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const studentData = getValues();

        if (action === "add") {
          const response = await handleAddStudent(studentData);
          if (!response) {
            onFormSubmission();
          }
        } else if (action === "edit") {
          const response = await handleEditStudent(
            selectedStudent!.id,
            studentData
          );
          if (!response) {
            onFormSubmission();
          }
        }
      }}
    >
      <div className="space-y-3">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="space-y-1">
          <Label htmlFor="idNumber">ID Number</Label>
          <Input id="idNumber" {...register("idNumber")} />
          {errors.idNumber && (
            <p className="text-red-500 text-xs">{errors.idNumber.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} autoComplete="off" />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="middleName">Middle Name (optional)</Label>
          <Input id="middleName" {...register("middleName")} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName.message}</p>
          )}
        </div>
        <section className="flex gap-x-4">
          <div className="space-y-1 w-full">
            <span className="text-sm font-medium leading-none">Strand</span>
            <Controller
              control={control}
              name="strand"
              render={({ field }) => (
                <ComponentSelect
                  name="strand"
                  label="Strand"
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="Select Strand"
                  items={strand}
                />
              )}
            />
            {errors.strand && (
              <p className="text-red-500 text-xs">{errors.strand.message}</p>
            )}
          </div>
          <div className="space-y-2 w-full">
            <span className="text-sm font-medium leading-none">Semester</span>
            <Controller
              control={control}
              name="semester"
              render={({ field }) => (
                <RadioGroup
                  name="semester"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex"
                >
                  {semesters.map((semester) => (
                    <div
                      className="flex items-center space-x-2"
                      key={semester.id}
                    >
                      <RadioGroupItem
                        value={semester.value}
                        id={semester.value}
                        className="w-7 h-7"
                      />
                      <Label htmlFor="first">{semester.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.semester && (
              <p className="text-red-500 text-xs">{errors.semester.message}</p>
            )}
          </div>
        </section>
      </div>
      <StudentsFormBtn action={action} />
    </form>
  );
}
