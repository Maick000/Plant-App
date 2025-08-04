import { z } from "zod";
import { Types } from "mongoose";

export const plantSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters long")
    .trim(),
  family: z
    .string({
      required_error: "Family is required",
      invalid_type_error: "Family must be a string",
    })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters long")
    .trim(),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty")
    .max(300, "Description must be at most 300 characters long"),
  adquisitionDate: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.trim() === "") return undefined;
        const date = new Date(val);
        return isNaN(date.getTime()) ? undefined : date;
      }
      return val;
    },
    z
      .date({
        invalid_type_error: "Adquisition date must be a valid date",
      })
      .max(new Date(), "Adquisition date cannot be in the future")
      .optional()
  ),
});

export const updatePlantSchema = plantSchema.partial();

export const plantIdSchema = z.object({
  id: z
    .string({
      required_error: "Plant ID is required",
      invalid_type_error: "Plant ID must be a string",
    })
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid plant ID",
    }),
});
