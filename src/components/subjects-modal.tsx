"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubjectsForm from "./subjects-form";
import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import { flushSync } from "react-dom";

export function SubjectsModal() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute right-0 h bg-ccdi-blue/80 hover:bg-ccdi-blue"
          size="sm"
          variant="destructive"
        >
          <AiFillFileAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-ccdi-blue">Add a Subject</DialogTitle>
        </DialogHeader>
        <SubjectsForm
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
        {/* here */}
      </DialogContent>
    </Dialog>
  );
}