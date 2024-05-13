import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const teachers = [
  {
    teacherId: "INV001",
    name: "Teacher 1",
  },
  {
    teacherId: "INV002",
    name: "Teacher 2",
  },
  {
    teacherId: "INV003",
    name: "Teacher 3",
  },
  {
    teacherId: "INV004",
    name: "Teacher 4",
  },
  {
    teacherId: "INV005",
    name: "Teacher 5",
  },
  {
    teacherId: "INV006",
    name: "Teacher 6",
  },
  {
    teacherId: "INV007",
    name: "Teacher 7",
  },
  {
    teacherId: "INV008",
    name: "Teacher 8",
  },
  {
    teacherId: "INV009",
    name: "Teacher 9",
  },
  {
    teacherId: "INV010",
    name: "Teacher 10",
  },
];

export default function Teachers() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Teachers ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.teacherId}>
            <TableCell className="font-medium">{teacher.teacherId}</TableCell>
            <TableCell>{teacher.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
