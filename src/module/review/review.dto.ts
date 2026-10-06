


import { z } from "zod";
import type { createReviewSchema, updateReviewSchema } from "./review.validation.js";


export type createReviewDto = z.infer<typeof createReviewSchema.body>;
export type updateReviewDto = z.infer<typeof updateReviewSchema.body>; 