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
          <TableHead className="w-[300px]">Student ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Marked as</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.idNumber}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell className="space-x-2 text-center">
              <AttendanceButton
                type="present"
                onClick={async () =>
                  startTransition(async () => {
                    await handleMarkAs(student.id, "present");
                  })
                }
              >
                Present
              </AttendanceButton>
              <AttendanceButton
                type="absent"
                onClick={async () =>
                  startTransition(async () => {
                    await handleMarkAs(student.id, "absent");
                  })
                }
              >
                Absent
              </AttendanceButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
