import { experienceLevels } from "@/drizzle/schema";
import z from "zod";

export const jobInfoFormSchema = z.object({
    name: z.string().min(1, "Required"),
    title: z.string().optional(),
    experienceLevel: z.enum(experienceLevels),
    description: z.string().min(1, "Description is required"),
  });
  