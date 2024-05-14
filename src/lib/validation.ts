import moment from "moment";
import { z } from "zod";
export const authSchema = z.object({
  username: z.string().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;

export const subjectSchema = z
  .object({
    name: z.string().min(1, "Subject name should not be empty").max(100),
    start: z.string().max(100),
    end: z.string().max(100),
  })
  .refine((data) => moment(data.end).isAfter(moment(data.start)), {
    message: "End time must be after start time",
    path: ["end"], // path of error
  });

export type TSubject = z.infer<typeof subjectSchema>;
