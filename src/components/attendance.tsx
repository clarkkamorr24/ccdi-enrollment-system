"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttendanceContext } from "@/hooks/useAttendance";
import AttendanceButton from "./attendance-button";
import { useTransition } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Student = {
  id: string;
  idNumber: string;
  name: string;
};

type AttendanceProps = {
  students: Student[];
};

export default function AttendanceTable({ students }: AttendanceProps) {
  const { handleMarkAs } = useAttendanceContext();
  const [isPending, startTransition] = useTransition();

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-ccdi-blue/80 rounded-md hover:bg-ccdi-blue/80">
          <TableHead className="w-[200px] font-bold text-white">
            Student ID
          </TableHead>
          <TableHead className="w-[300px] font-bold text-white">Name</TableHead>
          <TableHead className="font-bold text-white">Marked as</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xs">
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.idNumber}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell className="flex gap-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AttendanceButton
                      type="present"
                      onClick={async () =>
                        startTransition(async () => {
                          await handleMarkAs(student.id, "present");
                        })
                      }
                    >
                      <span className="ml-2">🙋‍♂️</span>
                    </AttendanceButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/70">
                    <p>Present</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AttendanceButton
                      type="absent"
                      onClick={async () =>
                        startTransition(async () => {
                          await handleMarkAs(student.id, "absent");
                        })
                      }
                    >
                      <span className="ml-2">🤦‍♂️</span>
                    </AttendanceButton>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/70">
                    <p>Absent</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
