import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

export default function SubjectsFormBtn() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="mt-5 self-end" size="sm">
      {pending ? (
        <>
          {"Adding Subject..."}
          {/* <p className="ml-3 animate-spin">
            <AiOutlineLoading />
          </p>{" "} */}
        </>
      ) : (
        "Add Subject"
      )}
    </Button>
  );
}
