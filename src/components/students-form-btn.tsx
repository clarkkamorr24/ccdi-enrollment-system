import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function StudentsFormBtn() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="mt-5 self-end" size="sm">
      {pending ? "Adding Student..." : "Add Student"}
    </Button>
  );
}
