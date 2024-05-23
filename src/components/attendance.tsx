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
import { useStudentContext } from "@/hooks/useStudent";
import NoResultFound from "./no-result-found";
import Action from "./action";

export default function AttendanceTable() {
  const { students } = useStudentContext();
  const { handleMarkAs } = useAttendanceContext();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {!students.length && <NoResultFound />}
      {students.length > 0 && (
        <div className="h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-ccdi-blue/80 rounded-md hover:bg-ccdi-blue/80">
                <TableHead className="w-[200px] font-bold text-white">
                  Student ID
                </TableHead>
                <TableHead className="w-[250px] font-bold text-white">
                  Name
                </TableHead>
                <TableHead className="font-bold text-white pl-5">
                  Marked as
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.idNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell className="flex gap-x-2 justify-between">
                    <div className="flex">
                      {/* present */}
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
                            <p className="text-[10px]">Present</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {/* absent */}
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
                            <p className="text-[10px]">Absent</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      {/* late */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AttendanceButton
                              type="late"
                              onClick={async () =>
                                startTransition(async () => {
                                  await handleMarkAs(student.id, "late");
                                })
                              }
                            >
                              <span className="ml-2">🏃</span>
                            </AttendanceButton>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black/70">
                            <p className="text-[10px]">Late</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Action type="student" id={student.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
