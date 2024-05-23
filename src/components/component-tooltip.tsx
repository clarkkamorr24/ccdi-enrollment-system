import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Status } from "@/types/status";

type ComponentTooltipProps = {
  children: React.ReactNode;
  type: Status;
};

export default function ComponentTooltip({
  children,
  type,
}: ComponentTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-black/70">
          <p className="text-[10px] capitalize">{type}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
