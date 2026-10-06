
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";


import cartService from "./cart.service.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";


const cartController = express.Router();

cartController.post(
  "/:id",
  authentication(),
  authorization([RoleEnum.User]),
  async (req, res) => {
    const result = await cartService.addToCart(req.params.id as string, req.user._id.toString());
    return successResponse<any>({ res, data: result });
  }
);

cartController.get(
  "/:id",
  async (req, res) => {
    const result = await cartService.getCart(req.params.id as string);
    return successResponse<any>({ res, data: result });
  }
);

cartController.delete(
  "/remove/:idUser/:courseId",
  authentication(),


  async (req, res) => {
    const result = await cartService.removeFromCart(req.params.idUser as string,req.params.courseId as string)
    return successResponse<any>({ res, data: result });
  }
);

cartController.delete(
  "/:userId",
  authentication(),
  
  async (req, res) => {
    const result = await cartService.clearCart(req.params.userId as string );
    return successResponse<any>({ res, data: result });
  }
);





export default cartController;
