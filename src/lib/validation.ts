import { z } from "zod";
export const authSchema = z.object({
  email: z.string().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
