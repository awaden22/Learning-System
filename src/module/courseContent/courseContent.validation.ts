import z from "zod";
import { LevelEnum } from "../../common/enums/level.enums.js";

export const createCourseContentSchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100),
    course_id: z.string(),
 lecturesNumber: z.coerce.number().min(1),
time: z.coerce.number().min(1),
  }),
};
export const updateCourseContentSchema = {
  body: z.object({
    name: z.string().trim().min(3).max(100).optional(),
    lecturesNumber: z.coerce.number().min(1).optional(),
    time: z.coerce.number().min(1).optional(),
  }),
};
