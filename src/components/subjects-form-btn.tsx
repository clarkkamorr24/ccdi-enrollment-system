import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Action } from "@/lib/types";

export default function SubjectsFormBtn({ action }: { action: Action }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="mt-5 self-end" size="sm">
      {pending
        ? action === "add"
          ? "Adding Subject..."
          : "Updating Subject..."
        : action === "edit"
        ? "Update Subject"
        : "Add Subject"}
    </Button>
  );
}
