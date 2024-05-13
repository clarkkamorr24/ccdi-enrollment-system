import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type AttendanceButtonProps = {
  disabled?: boolean;
  type: "present" | "absent";
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
        "text-sm p-3",
        type === "present"
          ? "bg-ccdi-blue/70"
          : "bg-ccdi-red/70 hover:bg-ccdi-red/90"
      )}
      onClick={onClick}
      asChild
    >
      {children}
    </Button>
  );
}
