import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Status } from "@/types/status";

type AttendanceButtonProps = {
  disabled?: boolean;
  type: Status;
  onClick?: () => void;
  children: React.ReactNode;
};
export default function AttendanceButton({
  disabled,
  type,
  onClick,
  children,
}: AttendanceButtonProps) {
  return (
    <Button
      disabled={disabled}
      size="sm"
      className={cn(
        "text-sm p-2",
        type === "present"
          ? "bg-ccdi-blue/70"
          : type === "absent"
          ? "bg-ccdi-red/70 hover:bg-ccdi-red/90"
          : "bg-black/30 hover:bg-black/50"
      )}
      onClick={onClick}
      asChild
    >
      {children}
    </Button>
  );
}
