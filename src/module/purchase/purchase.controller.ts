// import express from "express";

// import { successResponse } from "../../common/response/success.response.js";
// import purchaseService from "./purchase.service.js";
// import { authentication } from "../../Middlewares/authentication.middleware.js";



// const purchaseController = express.Router();

// purchaseController.post("/:id",
//   authentication(),
//   async (req, res) => {
//   const result = await purchaseService.createPurchases(req.params.id as string ,req.user._id.toString());

//   return successResponse<any>({
//     res,
//     data: result,
//   });
// });



// export default purchaseController;
