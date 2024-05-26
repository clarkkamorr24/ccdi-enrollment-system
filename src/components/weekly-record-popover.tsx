import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import { useState } from "react";
import { TDay } from "@/types/record";
import { useAttendanceContext } from "@/hooks/useAttendance";
import { getDate } from "@/utils/getDate";
import ComponentSelect from "./component-select";
import { statusItems } from "@/utils/status";

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
          <ComponentSelect
            defaultValue={status}
            onChange={(e: any) => setIsPresent(e)}
            label="Status"
            placeholder="Select Status"
            items={statusItems}
          />
          <Button
            size="sm"
            className="h-9"
            onClick={async () => {
              await handleUpdateAs(
                studentId,
                attendanceId as string,
                dateFormatted,
                isPresent
              );
              setIsOpen(false);
            }}
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
