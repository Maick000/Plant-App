import { z } from "zod";
import {Types} from "mongoose"

const lowercaseString = (value) => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }
  return value;
};

export const registerSchema = z.object({
  name: z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "Name must be at least 3 characters long")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
  ),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.preprocess(
    (val) => lowercaseString(val),
    z.email({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
      message: "Invalid email format",
    })
  ),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be at most 30 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const loginSchema = z.object({
  email: z.preprocess(
    (val) => lowercaseString(val),
    z.email({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
      message: "Invalid email format",
    })
  ),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const updateProfileSchema = registerSchema.partial()

export const profileIdSchema = z.object({
    id: z
    .string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string"})
    .refine(val => Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
    })
});