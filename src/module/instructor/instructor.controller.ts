
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";
import cloudFileUpload from "../../multer/multer.config.js";
import { createInstructorSchema, updateInstructorSchema } from "./instructor.validation.js";
import instructorService from "./instructor.service.js";



const instructorController = express.Router();

instructorController.post(
  "/",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(createInstructorSchema),
  async (req, res) => {
    const result = await instructorService.createInstructor(req.body, req.file as Express.Multer.File,);
    return successResponse<any>({ res, data: result });
  }
);

instructorController.get(
  "/top",

  async (req, res) => {
    const result = await instructorService.getTopInstructors(

    );
    return successResponse<any>({ res, data: result });
  }
);

instructorController.get(
  "/",

  async (req, res) => {
    const result = await instructorService.getAllInstructor(
      Number(req.query.size) || 3,
      Number(req.query.page) || 1,
      req.query.name as string,
      req.query.jobTittle as string
    );
    return successResponse<any>({ res, data: result });
  }
);

instructorController.get(
  "/:id",


  async (req, res) => {
    const result = await instructorService.getinstructor(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);

instructorController.patch(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(updateInstructorSchema),
  async (req, res) => {
    const result = await instructorService.updateInstructor(
      req.body,
      req.params.id as string,
      req.file as Express.Multer.File
    );

    return successResponse<any>({
      res,
      data: result
    });
  }
);

instructorController.delete(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),

  async (req, res) => {
    const result = await instructorService.deleteInstructor(req.params.id as string)
    return successResponse<any>({ res, data: result });
  }
);




export default instructorController;
