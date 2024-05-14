"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoResultFound from "./no-result-found";
import { useSubjectContext } from "@/hooks/useSubject";
import { getTime } from "@/utils/momentUtils";
import { Button } from "./ui/button";
import { AiFillFileExcel } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import SubjectConfirmationModal from "./subject-confirmation-modal";

export default function SubjectsTable() {
  const { subjects } = useSubjectContext();

  return (
    <>
      {!subjects.length && <NoResultFound />}
      {subjects.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-ccdi-blue/80 rounded-md hover:bg-ccdi-blue/80">
              <TableHead className="w-[350px] font-bold text-white">
                Subject
              </TableHead>
              <TableHead className="font-bold text-white">Schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell className="font-medium flex justify-between md:w-[80%] items-center">
                  {getTime(subject.start)} - {getTime(subject.end)}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <SubjectConfirmationModal
                          id={subject.id}
                          name={subject.name}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black/70 ">
                        <p className="text-[10px]">Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
