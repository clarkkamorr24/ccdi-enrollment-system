import { Button } from "./ui/button";
import { AiFillFilter } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FilterForm from "./filter-form";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useAttendanceContext } from "@/hooks/useAttendance";

export default function Filter() {
  const { selectedSemesters, selectedStrands } = useAttendanceContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filterLength = selectedSemesters.length + selectedStrands.length;

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="absolute right-0 bg-ccdi-blue/80 hover:bg-ccdi-blue h-6 flex md:text-xs text-[10px] gap-x-1"
          >
            Filter {filterLength > 0 && `(${filterLength})`}
            <AiFillFilter />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base">Filter attendance</DialogTitle>
          </DialogHeader>
          <FilterForm
            onFormSubmission={() => {
              flushSync(() => {
                setIsModalOpen(false);
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
