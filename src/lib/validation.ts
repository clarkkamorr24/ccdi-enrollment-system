import moment from "moment";
import { z } from "zod";

export const subjectIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
export const studentIdSchema = z.string().regex(/^[0-9a-f]{24}$/);
// export const emailSchema = z.string().email("This is not a valid email.");
export const resetPasswordSchema = z.object({
  password: z.string().min(1, { message: "Required field." }),
  confirmPassword: z.string().min(1, { message: "Required field." }),
});

export type TResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().max(100),
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(50),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(50),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().max(100),
});

export const emailSchema = registerSchema.shape.email;

export type TAuth = z.infer<typeof registerSchema>;

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
  idNumber: z
    .string()
    .min(1, "Student ID should not be empty")
    .max(50)
    .refine(isNumber, {
      message: "Student ID must be a number",
    }),
  firstName: z.string().min(1, "First name should not be empty").max(50),
  middleName: z.string(),
  lastName: z.string().min(1, "Last name should not be empty").max(50),
  strand: z.string({
    required_error: "Please select a strand",
  }),
  semester: z.string({
    required_error: "You need to select a semester.",
  }),
});

export type TStudentValues = z.infer<typeof studentSchema>;
