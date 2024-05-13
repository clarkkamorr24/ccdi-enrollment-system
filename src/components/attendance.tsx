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

export default function Attendance({ students }: AttendanceProps) {
  const { handleMarkAs } = useAttendanceContext();
  const [isPending, startTransition] = useTransition();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] font-bold">Student ID</TableHead>
          <TableHead className="font-bold">Name</TableHead>
          <TableHead className="font-bold">Marked as</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.idNumber}</TableCell>
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
