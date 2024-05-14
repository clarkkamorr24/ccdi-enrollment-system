import moment from "moment";
import { z } from "zod";

export const subjectIdSchema = z.string().cuid();

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
