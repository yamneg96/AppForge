import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000),
})

export type ContactForm = z.infer<typeof contactSchema>

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export type LoginForm = z.infer<typeof loginSchema>

export const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
})

export type OTPForm = z.infer<typeof otpSchema>
