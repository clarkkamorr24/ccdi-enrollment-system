import { Student, Subject } from "@prisma/client";

export type SubjectType = Omit<
  Subject,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type StudentType = Omit<
  Student,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
