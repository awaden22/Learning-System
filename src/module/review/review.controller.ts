
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";


import reviewService from "./review.service.js";
import { createReviewSchema, updateReviewSchema } from "./review.validation.js";

const reviewController = express.Router();

reviewController.post(
  "/createReview",
  authentication(),
  authorization([RoleEnum.User]),

  validation(createReviewSchema),
  async (req, res) => {
    const result = await reviewService.createReview(req.body,req.user._id.toString());
    return successResponse<any>({ res, data: result });
  }
);

reviewController.get(
  "/:id",
  async (req, res) => {
    const result = await reviewService.getCourseReviews(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);


reviewController.delete(
  "/:id",
  authentication(),
  authorization([RoleEnum.User]),

  async (req, res) => {
    const result = await reviewService.deleteReview(req.params.id as string,req.user._id.toString())
    return successResponse<any>({ res, data: result });
  }
);

reviewController.patch(
  "/:id",
  authentication(),
  authorization([RoleEnum.User]),
  
  validation(updateReviewSchema),
  async (req, res) => {
    const result = await reviewService.updateReview(req.body,req.user._id.toString(),req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);





export default reviewController;
