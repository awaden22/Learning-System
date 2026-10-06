
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";
import cloudFileUpload from "../../multer/multer.config.js";
import { createCourseContentSchema } from "./courseContent.validation.js";
import courseContentService from "./courseContent.service.js";


const courseContentController = express.Router();

courseContentController.post(
  "/",
  authentication(),
  authorization([RoleEnum.Admin]),
  validation(createCourseContentSchema),
  async (req, res) => {
    const result = await courseContentService.createCourseContent(req.body);
    return successResponse<any>({ res, data: result });
  }
);

courseContentController.get(
  "/all/:id",

  async (req, res) => {
    const result = await courseContentService.getAllCourseContent(req.params.id    )
    return successResponse<any>({ res, data: result });
  }
);

courseContentController.delete(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),

  async (req, res) => {
    const result = await courseContentService.deleteContent(req.params.id as string)
    return successResponse<any>({ res, data: result });
  }
);

courseContentController.patch(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),

  async (req, res) => {
    const result = await courseContentService.updateContent(req.body,req.params.id as string );
    return successResponse<any>({ res, data: result });
  }
);

courseContentController.get(
  "/other/:id",
  async (req, res) => {
    const result = await courseContentService.getOtherContents(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);

courseContentController.get(
  "/:id",
  async (req, res) => {
    const result = await courseContentService.getContent(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);



export default courseContentController;
