import { z } from "zod";

// App validation
export const createAppSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters"),
  status: z.enum(["released", "coming_soon", "draft"]),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, "Version must be in format X.X.X"),
  icon: z.string().url().optional().default(""),
  platforms: z.array(z.enum(["android", "ios", "web", "watch"])).optional(),
  techStack: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  downloadUrl: z.string().url().optional(),
  apkUrl: z.string().url().optional(),
  ipaUrl: z.string().url().optional(),
  playStoreUrl: z.string().url().optional(),
  appStoreUrl: z.string().url().optional(),
  betaUrl: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  downloads: z.number().nonnegative().optional(),
});

export type CreateAppInput = z.infer<typeof createAppSchema>;

export const updateAppSchema = createAppSchema.partial();

export type UpdateAppInput = z.infer<typeof updateAppSchema>;

// Contact validation
export const createContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;

// Auth validation
export const loginRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type LoginRequestInput = z.infer<typeof loginRequestSchema>;

export const verifyOTPSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;

export const verifyOAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  googleId: z.string(),
});

export type VerifyOAuthInput = z.infer<typeof verifyOAuthSchema>;
