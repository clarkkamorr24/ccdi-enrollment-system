"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
  addAttendance,
  geAttendanceByStudentId,
  updateAttendance,
} from "@/actions/action";
import { getTodayDate } from "@/utils/getTodayDate";
import moment from "moment";

type Student = {
  id: string;
  idNumber: string;
  name: string;
};

type AttendanceProps = {
  students: Student[];
};

export default function Attendance({ students }: AttendanceProps) {
  const handleMarkAs = async (studentId: string, type: string) => {
    //get attendance by student id
    const attendance = await geAttendanceByStudentId(studentId);

    //get the today date
    const todayDate = getTodayDate();

    //check if the attendance already exists
    const filteredAttendance = attendance.some(
      (attendance) =>
        moment(attendance.createdAt).format("l") ===
        moment(todayDate).format("l")
    );

    //update attendance
    if (filteredAttendance) {
      const filterId = attendance.find(
        (attendance) =>
          moment(attendance.createdAt).format("l") ===
          moment(todayDate).format("l")
      );

      await updateAttendance(filterId?.id, type === "absent" ? false : true);
      return;
    }

    //proceed to add attendance
    const error = await addAttendance(
      studentId,
      type === "absent" ? false : true
    );
    if (error) {
      console.log("error", error);
      return;
    }
  };

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
              <Button
                size="sm"
                className="bg-ccdi-blue/70"
                onClick={async () => await handleMarkAs(student.id, "present")}
              >
                Present
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => await handleMarkAs(student.id, "absent")}
              >
                Absent
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
