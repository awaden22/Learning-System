
import  express  from "express"
import landingService from "./landing.service.js";
import { successResponse } from "../../common/response/success.response.js";

const landingController = express.Router()

landingController.get(
  "/",

  async (req, res) => {
    const result = await landingService.getLanding(
    
    );
    return successResponse<any>({ res, data: result });
  }
);


export default landingController;