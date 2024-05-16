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
  const { handleDeleteSubject } = useSubjectContext();
  const { handleDeleteStudent } = useStudentContext();
  const { selectedStudentId } = useStudentContext();
  const { selectedSubjectId } = useSubjectContext();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm mx-auto space-y-4">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-ccdi-blue text-sm text-center">
            Are you sure you want to proceed?
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
