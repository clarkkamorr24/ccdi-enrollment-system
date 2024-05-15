"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AiFillFileExcel } from "react-icons/ai";
import { Button } from "./ui/button";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useSubjectContext } from "@/hooks/useSubject";
import { Subject } from "@prisma/client";

type ConfirmationModalProps = {
  name?: Subject["name"];
  id?: Subject["id"];
};

export default function ConfirmationModal({
  name,
  id,
}: ConfirmationModalProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { handleDeleteSubject } = useSubjectContext();

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <p className="bg-ccdi-red/70 hover:bg-ccdi-red/90 rounded-md p-2">
          <AiFillFileExcel size={15} color="white" />
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-sm mx-auto space-y-4">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-ccdi-blue text-sm text-center">
            Are you sure you want to delete {name} subject?
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
                setIsFormOpen(false);
                if (!id) return;
                handleDeleteSubject(id);
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
