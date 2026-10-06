import z from "zod";
import { InstructorEnums } from "../../common/enums/instructor.enums.js";



export const createInstructorSchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(3).max(500),
      jobTittle: z.coerce.number().int().pipe(
      z.enum(InstructorEnums)
    ),

  }),
};
export const updateInstructorSchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100).optional(),
    description: z.string().trim().min(3).max(500).optional(),
    jobTittle: z.enum(InstructorEnums).optional(),

  }),
};


