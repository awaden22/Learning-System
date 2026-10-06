import {
  confirmEmailSchema,
  forgetPasswordSchema,
  loginSchema,
  resendConfirmEmailSchema,
  resendForgetPasswordSchema,
  SignupGoogleSchema,
  signupSchema,
  resetPasswordSchema,
  verifyOtpForgetPasswordSchema,
} from "./auth.validation.js";
import express from "express";
import authService from "./auth.service.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { successResponse } from "../../common/response/success.response.js";
import { rateLimit } from "express-rate-limit";


const authController = express.Router();


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

authController.post(
  "/signup", 
  validation(signupSchema),
   async (req, res) => {
  const result = await authService.signup(req.body);
  return successResponse<any>({ res, data: result });
}
);

authController.post(
  "/confirm-email-otp",
  validation(confirmEmailSchema),
  async (req, res) => {
    await authService.confirmEmail(req.body);
    return successResponse<any>({ res, msg: "email confirm successful" });
  },
);

authController.post(
  "/resend-confirm-email-otp",
  validation(resendConfirmEmailSchema),
  async (req, res) => {
    await authService.resendConfirmEmailOtp(req.body);
    return successResponse<any>({ res, msg: "check your inbox" });
  },
);

authController.post(
  "/send-forget-password-otp",
  validation(forgetPasswordSchema),
  async (req, res) => {
    await authService.sendOtpForgetPassword(req.body);

    return successResponse<any>({ res, msg: "check your inbox" });
  },
);

authController.post(
  "/resend-forget-password-otp",
  validation(resendForgetPasswordSchema),
  async (req, res) => {
    await authService.resendForgetPasswordOtp(req.body);
    return successResponse<any>({ res, msg: "check your inbox" });
  },
);

authController.post(
  "/verify-forget-password-otp",
  validation(verifyOtpForgetPasswordSchema),
  async (req, res) => {
    await authService.verifyOtpForgetPassword(req.body);
    return successResponse<any>({ res, msg: "done " });
  },
);

authController.post(
  "/reset-forget-password-otp",
  validation(resetPasswordSchema),
  async (req, res) => {
    await authService.resetPassword(req.body);
    return successResponse<any>({ res, msg: "done" });
  },
);

authController.post(
  "/signup/gmail",
  validation(SignupGoogleSchema),
  async (req, res) => {
    const { status, result } = await authService.signupWithGoogle(
      req.body.idToken,
    );
    return successResponse({ res, statusCode: status, data: result });
  },
);

authController.post(
  "/login",
  loginLimiter,
   validation(loginSchema),
    async (req, res) => {
  const result = await authService.login(req.body);
  return successResponse({ res, data: result });
}
);

export default authController;
