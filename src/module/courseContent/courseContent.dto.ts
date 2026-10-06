
import type z from "zod";
import type { createCourseContentSchema, updateCourseContentSchema } from "./courseContent.validation.js";



export type CreateCourseContentDto = z.infer<typeof createCourseContentSchema.body>;
export type UpdateCourseContentDto = z.infer<typeof updateCourseContentSchema.body>;

