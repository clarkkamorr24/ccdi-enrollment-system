import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Action } from "@/lib/types";

export default function StudentsFormBtn({ action }: { action: Action }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="mt-5 self-end" size="sm">
      {pending
        ? action === "add"
          ? "Adding Student..."
          : "Updating Student..."
        : action === "edit"
        ? "Update Student"
        : "Add Student"}
    </Button>
  );
}
