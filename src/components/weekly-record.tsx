import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { weekdays } from "@/utils/weekdays";

const lists = [
  {
    name: "John Doe",
    monday: "present",
    tuesday: "present",
    wednesday: "present",
    thursday: "present",
    friday: "present",
    saturday: "present",
    sunday: "present",
  },
  {
    name: "Jane Doe",
    monday: "present",
    tuesday: "present",
    wednesday: "present",
    thursday: "present",
    friday: "present",
    saturday: "present",
    sunday: "present",
  },
];

export default function WeeklyRecord() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          {weekdays.map((weekday) => (
            <TableHead key={weekday}>{weekday}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {lists.map((list) => (
          <TableRow key={list.name}>
            <TableCell className="font-medium">{list.name}</TableCell>
            <TableCell className="font-medium">{list.monday}</TableCell>
            <TableCell className="font-medium">{list.tuesday}</TableCell>
            <TableCell className="font-medium">{list.wednesday}</TableCell>
            <TableCell className="font-medium">{list.thursday}</TableCell>
            <TableCell className="font-medium">{list.friday}</TableCell>
            <TableCell className="font-medium">{list.saturday}</TableCell>
            <TableCell className="font-medium">{list.sunday}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
