
import express from "express";

import { successResponse } from "../../common/response/success.response.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import checkoutService from "./checkout.service.js";

const checkoutController = express.Router();

checkoutController.post(
  "/:id",
  authentication(),

  async (req, res) => {
    const result = await checkoutService.checkout(req.user._id.toString());
    return successResponse<any>({ res, data: result });
  }
);




export default checkoutController;
