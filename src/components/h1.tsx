import { cn } from "@/lib/utils";

type H1Props = {
  className?: string;
  children: React.ReactNode;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("font-medium text-2xl leading-6", className)}>
      {children}
    </h1>
  );
}
