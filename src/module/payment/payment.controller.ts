import express from "express";
import paymentService from "./payment.service.js";
import { successResponse } from "../../common/response/success.response.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";



const paymentController = express.Router();

paymentController.post("/webhook", async (req, res) => {
  const result = await paymentService.webhook(req);

  return successResponse<any>({
    res,
    data: result,
  });
});


paymentController.post("/:id", 
  authentication(),
  async (req, res) => {
  const result = await paymentService.createPayment(req.params.id as string);

  return successResponse<any>({
    res,
    data: result,
  });
});



export default paymentController;
