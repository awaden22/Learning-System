
import express from "express";
import { createCategorySchema, updateCategorySchema } from "./category.validation.js";
import categoryService from "./category.service.js";
import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";
import cloudFileUpload from "../../multer/multer.config.js";



const categoryController = express.Router();

categoryController.post(
  "/",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(createCategorySchema),
  async (req, res) => {
    
    const result = await categoryService.createCategory(req.body, req.file as Express.Multer.File,);
    return successResponse<any>({ res, data: result });
  }
);
categoryController.get(
  "/:id",


  async (req, res) => {
    const result = await categoryService.getCategory(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);
categoryController.get(
  "/",

  async (req, res) => {
    const size = Number(req.query.size) || 4;
    const page = Number(req.query.page) || 1;
    const result = await categoryService.getAllCategory(size,page)
    return successResponse<any>({ res, data: result });
  }
);
categoryController.delete(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),

  async (req, res) => {
    const result = await categoryService.deleteCategory(req.params.id as string)
    return successResponse<any>({ res, data: result });
  }
);
categoryController.patch(
  "/:id",
  authentication(),
  authorization([RoleEnum.Admin]),
  cloudFileUpload({}).single("image"),
  validation(updateCategorySchema),
  async (req, res) => {
    const result = await categoryService.updateCategory(
      req.body,
      req.params.id as string,
      req.file
    );

    return successResponse({ res, data: result });
  }
);


export default categoryController;
