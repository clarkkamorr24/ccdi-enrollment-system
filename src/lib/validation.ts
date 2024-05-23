import moment from "moment";
import { z } from "zod";

export const subjectIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
export const studentIdSchema = z.string().regex(/^[0-9a-f]{24}$/);

export const authSchema = z.object({
  username: z.string().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;

export const subjectSchema = z
  .object({
    name: z.string().min(1, "Subject name should not be empty").max(100),
    start: z.string().min(1, "Start time should not be empty").max(100),
    end: z.string().min(1, "End time should not be empty").max(100),
  })
  .refine(
    (data) => moment(data.end, "h:mm a").isAfter(moment(data.start, "h:mm a")),
    {
      message: "End time must be after start time",
      path: ["end"], // path of error
    }
  );

export type TSubjectValues = z.infer<typeof subjectSchema>;

const isNumber = (value: string) => /^\d+$/.test(value);

export const studentSchema = z.object({
  name: z.string().min(1, "Student name should not be empty").max(50),
  idNumber: z
    .string()
    .min(1, "Student ID should not be empty")
    .max(50)
    .refine(isNumber, {
      message: "Student ID must be a number",
    }),
});

export type TStudentValues = z.infer<typeof studentSchema>;
