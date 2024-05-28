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
import { useStudentContext } from "@/hooks/useStudent";
import NoResultFound from "./no-result-found";
import Action from "./action";
import ComponentTooltip from "./component-tooltip";

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
            <TableHeader className="sticky top-0 z-50 bg-ccdi-blue ">
              <TableRow className="hover:bg-ccdi-blue">
                <TableHead className="w-[150px] font-bold text-white">
                  Student ID
                </TableHead>
                <TableHead className="w-[250px] font-bold text-white">
                  Name
                </TableHead>
                <TableHead className="w-[150px] font-bold text-white">
                  Strand/Semester
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
                  <TableCell>
                    <span className="capitalize">{student.lastName}</span>,{" "}
                    <span className="capitalize">{student.firstName}</span>{" "}
                    <span className="capitalize">{student.middleName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="uppercase flex gap-x-2">
                      <p className="w-[40px]">{student.strand}</p>-
                      <p>{student.semester === "first" ? "1st" : "2nd"}</p>
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-x-2 justify-between">
                    <div className="flex">
                      {/* present */}
                      <ComponentTooltip type="present">
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
                      </ComponentTooltip>

                      {/* absent */}
                      <ComponentTooltip type="absent">
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
                      </ComponentTooltip>

                      {/* late */}
                      <ComponentTooltip type="late">
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
                      </ComponentTooltip>
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
