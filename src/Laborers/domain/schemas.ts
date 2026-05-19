import { z } from "zod";

export const LaborerSchema = z.object({
  id: z.string().min(1, "ID is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  hireDate: z
    .string()
    .min(1, "Hire date is required")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Hire date cannot be in the future",
    }),
  role: z.enum(["user", "supervisor", "admin"], "Invalid role"),
  picture: z.string().url("Picture must be a valid URL"),
});

export type LaborerFormData = z.infer<typeof LaborerSchema>;
