import type z from "zod";
import type { createCategorySchema, updateCategorySchema } from "./category.validation.js";


export type CreateCategoryDto = z.infer<typeof createCategorySchema.body>;

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema.body>;

