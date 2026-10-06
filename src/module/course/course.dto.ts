
import type z from "zod";
import type { createCourseSchema, updateCourseSchema } from "./course.validation.js";



export type CreateCourseDto = z.infer<typeof createCourseSchema.body>;
export type UpdateCourseDto = z.infer<typeof updateCourseSchema.body>;

