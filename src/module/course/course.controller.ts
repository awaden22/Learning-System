
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";
import cloudFileUpload from "../../multer/multer.config.js";
import { createCourseSchema, updateCourseSchema } from "./course.validation.js";
import courseService from "./course.service.js";

const courseController = express.Router();

courseController.post(
  "/createCourse",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(createCourseSchema),
  async (req, res) => {
    const result = await courseService.createCourse(req.body, req.file as Express.Multer.File);
    return successResponse<any>({ res, data: result });
  }
);

courseController.get(
  "/top",
  async (req, res) => {
    const result = await courseService.getTopCourses();
    return successResponse<any>({ res, data: result });
  }
);

courseController.get(
  "/similar/:id",
  async (req, res) => {
    const result = await courseService.getSimilarCourses(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);

courseController.get(
  "/category/:categoryId",
  async (req, res) => {

    const result = await courseService.getAllCourse(
      req.query.size ? Number(req.query.size) : 10,
      req.query.page ? Number(req.query.page) : 1,
      req.query.courseName
        ? String(req.query.courseName)
        : undefined,
      req.params.categoryId,
      req.query.rate
        ? Number(req.query.rate)
        : undefined,
      req.query.price
        ? Number(req.query.price)
        : undefined,
    );

    return successResponse<any>({
      res,
      data: result
    });
  }
);

courseController.get(
  "/:id",
  async (req, res) => {
    const result = await courseService.getCourse(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);

courseController.delete(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),

  async (req, res) => {
    const result = await courseService.deletecourse(req.params.id as string)
    return successResponse<any>({ res, data: result });
  }
);

courseController.patch(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(updateCourseSchema),
  async (req, res) => {
    const result = await courseService.updateCourse(req.body, req.params.id as string, req.file as Express.Multer.File);
    return successResponse<any>({ res, data: result });
  }
);

export default courseController;
