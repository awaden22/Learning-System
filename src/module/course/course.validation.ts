import z from "zod";
import { LevelEnum } from "../../common/enums/level.enums.js";

export const createCourseSchema = {
  body: z.object({
    courseName: z.string().trim().min(3).max(100),

    category_id: z.string(),

    instructor_id: z.string(),

    level: z.coerce.number().refine(
      (value) => Object.values(LevelEnum).includes(value),
      {
        message: "Invalid level"
      }
    ),

    cost: z.coerce.number().min(1),

    totalHours: z.coerce.number().min(1),

    description: z.string().trim().min(3).max(500),

    certification: z.string().trim().optional(),
  }),
};

export const updateCourseSchema = {
  body: z.object({
    courseName: z.string().trim().min(3).max(100).optional(),

    category_id: z.string().optional(),

    instructor_id: z.string().optional(),

    cost: z.coerce.number().min(1).optional(),

    level: z.coerce.number().refine(
      (value) => Object.values(LevelEnum).includes(value),
      {
        message: "Invalid level"
      }
    ).optional(),

    totalHours: z.coerce.number().min(1).optional(),

    description: z.string().trim().min(3).max(500).optional(),

    certification: z.string().trim().optional(),
  }),
};