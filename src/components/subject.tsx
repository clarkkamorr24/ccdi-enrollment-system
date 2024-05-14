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

export default function SubjectsTable() {
  const { subjects } = useSubjectContext();

  return (
    <>
      {!subjects.length && <NoResultFound />}
      {subjects.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-ccdi-blue/80 rounded-md hover:bg-ccdi-blue/80">
              <TableHead className="w-[400px] font-bold text-white">
                Subject
              </TableHead>
              <TableHead className="font-bold text-white">Schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell className="font-medium">
                  {getTime(subject.start)} - {getTime(subject.end)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
