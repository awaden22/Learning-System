import type z from "zod";
import type { createInstructorSchema, updateInstructorSchema } from "./instructor.validation.js";



export type CreateIntructorDto = z.infer<typeof createInstructorSchema.body>;

export type UpdateIntructorDto = z.infer<typeof updateInstructorSchema.body>;

