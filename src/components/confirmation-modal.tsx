"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useSubjectContext } from "@/hooks/useSubject";
import { Classification } from "@/lib/types";
import { useStudentContext } from "@/hooks/useStudent";

type ConfirmationModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  type: Classification;
};

export default function ConfirmationModal({
  isOpen = false,
  setIsOpen,
  type,
}: ConfirmationModalProps) {
  const { handleDeleteSubject, selectedSubjectId, selectedSubject } =
    useSubjectContext();
  const { handleDeleteStudent, selectedStudentId, selectedStudent } =
    useStudentContext();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm mx-auto space-y-4">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-ccdi-blue text-sm text-center px-4">
            {type === "student" && (
              <p className="text-sm text-ccdi-blue">
                {selectedStudent?.firstName} {selectedStudent?.middleName}{" "}
                {selectedStudent?.lastName} will be removed from the weekly
                record as well.
              </p>
            )}
            Are you sure you want to delete{" "}
            {type === "subject" && selectedSubject?.name}
            {"?"}
          </DialogTitle>
          <DialogDescription className="text-center space-x-2">
            <DialogClose asChild>
              <Button className="text-white" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className=" text-white px-4"
              size="sm"
              variant="destructive"
              onClick={async () => {
                setIsOpen(false);
                {
                  type === "subject" && handleDeleteSubject(selectedSubjectId!);
                }
                {
                  type === "student" && handleDeleteStudent(selectedStudentId!);
                }
              }}
            >
              Yes
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
