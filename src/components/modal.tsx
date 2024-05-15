"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import { flushSync } from "react-dom";
import SubjectsForm from "./subjects-form";
import StudentsForm from "./students-form";

type ModalProps = {
  modalType: "subject" | "student";
};

export default function Modal({ modalType }: ModalProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute right-0 bg-ccdi-blue/80 hover:bg-ccdi-blue h-8"
          size="sm"
          variant="destructive"
        >
          {modalType === "subject" ? (
            <AiFillFileAdd size={20} />
          ) : (
            <AiOutlineUserAdd size={20} />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-ccdi-blue">
            {modalType === "subject" ? "Add a Subject" : "Add a Student"}
          </DialogTitle>
        </DialogHeader>

        {modalType === "subject" && (
          <SubjectsForm
            onFormSubmission={() => {
              flushSync(() => {
                setIsFormOpen(false);
              });
            }}
          />
        )}

        {modalType === "student" && (
          <StudentsForm
            onFormSubmission={() => {
              flushSync(() => {
                setIsFormOpen(false);
              });
            }}
          />
        )}

        {/* here */}
      </DialogContent>
    </Dialog>
  );
}
