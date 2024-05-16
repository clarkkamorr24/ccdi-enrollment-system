"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiFillFileAdd } from "react-icons/ai";
import { flushSync } from "react-dom";
import SubjectsForm from "./subjects-form";
import StudentsForm from "./students-form";
import { Action, Classification } from "@/lib/types";

type ModalProps = {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  modalType?: Classification;
  action: Action;
};

export default function Modal({
  action,
  modalType,
  isModalOpen,
  setIsModalOpen,
}: ModalProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {action === "add" && (
        <DialogTrigger asChild>
          <Button
            className="absolute right-0 bg-ccdi-blue/80 hover:bg-ccdi-blue h-8"
            size="sm"
            variant="destructive"
          >
            <AiFillFileAdd size={20} />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-ccdi-blue">
            {modalType === "subject"
              ? `${action === "edit" ? "Edit Subject" : "Add a Subject"}`
              : `${action === "edit" ? "Edit Student" : "Add a Student"}`}
          </DialogTitle>
        </DialogHeader>

        {modalType === "subject" && (
          <SubjectsForm
            action={action}
            onFormSubmission={() => {
              flushSync(() => {
                setIsModalOpen(false);
              });
            }}
          />
        )}

        {modalType === "student" && (
          <StudentsForm
            action={action}
            onFormSubmission={() => {
              flushSync(() => {
                setIsModalOpen(false);
              });
            }}
          />
        )}

        {/* here */}
      </DialogContent>
    </Dialog>
  );
}
