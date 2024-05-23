import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Status } from "@/types/status";
import moment from "moment";
import { useState } from "react";
import { TDay } from "@/types/record";
import { useAttendanceContext } from "@/hooks/useAttendance";
import { getDate } from "@/utils/getDate";

type WeeklyRecordPopoverProps = {
  attendance: TDay;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function WeeklyRecordPopover({
  children,
  onClick,
  attendance,
}: WeeklyRecordPopoverProps) {
  const { handleUpdateAs } = useAttendanceContext();
  const { attendanceId, studentId, status, date } = attendance;
  const dateFormatted = getDate(new Date(date.format("l")));
  const [isPresent, setIsPresent] = useState(status);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger onClick={onClick} asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid gap-4 text-sm">
          <div className="space-y-2 text-center">
            <h4 className="font-medium leading-none">Update Status</h4>
            <h5 className="text-xs">
              {moment(date).format("dddd, MMMM Do YYYY")}
            </h5>
          </div>
          <Select
            defaultValue={status}
            onValueChange={(e: Status) => setIsPresent(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="h-9"
            onClick={async () => {
              await handleUpdateAs(
                studentId,
                attendanceId,
                dateFormatted,
                isPresent
              );
              setIsOpen(false);
            }}
          >
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
