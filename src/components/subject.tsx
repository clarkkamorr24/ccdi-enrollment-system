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
import Action from "./action";

export default function SubjectsTable() {
  const { subjects } = useSubjectContext();

  return (
    <>
      {!subjects.length && <NoResultFound />}
      {subjects.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-ccdi-blue rounded-md hover:bg-ccdi-blue">
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
                  <Action id={subject.id} type="subject" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
