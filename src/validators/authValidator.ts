import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6),
    name: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});
