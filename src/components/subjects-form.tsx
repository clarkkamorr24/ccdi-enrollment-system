import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import SubjectsFormBtn from "./subjects-form-btn";

export default function SubjectsForm() {
  return (
    <form className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Subject Name</Label>
          <Input id="teacherId" name="name" />
        </div>
        <p className="text-sm font-bold text-ccdi-blue">Set your schedule</p>
        <div className="flex gap-x-2">
          <div className="space-y-1 w-full">
            <Label htmlFor="start">Start</Label>
            <Input id="start" name="start" type="time" className="relative" />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="end">End</Label>
            <Input id="end" name="end" type="time" className="relative" />
          </div>
        </div>
      </div>
      <SubjectsFormBtn />
    </form>
  );
}
