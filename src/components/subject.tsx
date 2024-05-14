import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTime } from "@/utils/momentUtils";

export type Subject = {
  id: string;
  name: string;
  start: string;
  end: string;
};

export type SubjectsTableProps = {
  subjects: Subject[];
};

export default function SubjectsTable({ subjects }: SubjectsTableProps) {
  return (
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
  );
}
