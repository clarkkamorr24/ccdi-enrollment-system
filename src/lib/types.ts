import { Subject } from "@prisma/client";

export type SubjectType = Omit<
  Subject,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
