import * as z from "zod";

export const UserRole = {
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
} as const;

export type UserRoleType = keyof typeof UserRole;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    // role: z.enum(["user", "admin", "moderator"], {
    //   required_error: "Please select a role",
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type LoginFormType = z.infer<typeof loginSchema>;
export type SignupFormType = z.infer<typeof signupSchema>;
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
