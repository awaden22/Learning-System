import z from "zod";
import { commonValidationFields } from "../../Middlewares/validation.middleware.js";


export const createReviewSchema = {
  body: z.object({
    course_id: commonValidationFields.id.min(1),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1).max(500),
  }),
};

export const updateReviewSchema = {
  body:
    z.object({
      rating: z.number().min(1).max(5).optional(),
      comment: z.string().min(1).max(500).optional(),
    }),

}