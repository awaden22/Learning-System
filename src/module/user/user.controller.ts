import express from "express";

import userService from "./user.service.js";

import logoutSchema, { updateProfileUserSchema } from "./user.validation.js";



import { successResponse } from "../../common/response/success.response.js";
import { authentication } from "../../Middlewares/authentication.middleware.js";
import chatController from "../../chat/chat.controller.js";
import { validation } from "../../Middlewares/validation.middleware.js";


const userController = express.Router();
userController.use("/:userId/chat", chatController)

userController.get("/", authentication(), async (req, res) => {

  const result = await userService.getUser(req.user)
  return successResponse({ res, data: result });
});

userController.post(
  "/logout",
  authentication(),
  validation(logoutSchema),
  async (req, res) => {
    const result = await userService.logout(
      req.user._id,
      req.Payload,
      req.body.logoutOptions,
    );
    return successResponse({ res, data: result });
  },
);

userController.get("/search", authentication(), async (req, res) => {
  console.log("SEARCH ROUTE");
  const result = await userService.serachUser(req.query.search as string)
  return successResponse({ res, data: result })
})

userController.get("/:id", authentication(), async (req, res) => {
  const result = await userService.getUserById(
    req.params.id as string
  )
  return successResponse({ res, data: result })
})

userController.patch("/update-profile", authentication(), validation(updateProfileUserSchema), async (req, res) => {
  const result = await userService.updateUser(req.body, req.user)
  return successResponse({ res, data: result })
})


export default userController;
