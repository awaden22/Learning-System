import express from "express";
import { successResponse } from "../../common/response/success.response.js";
import dashboardService from "./dashboard.service.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";
import { RoleEnum } from "../../common/enums/user.enums.js";



const dashboardController = express.Router();

dashboardController.get("/",
  authentication(),
  authorization([RoleEnum.Admin]),
  async (req, res) => {
  const result = await dashboardService.getDashboard();

  return successResponse<any>({
    res,
    data: result,
  });
});



export default dashboardController;
