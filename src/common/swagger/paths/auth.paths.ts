export const authPaths = {
  "/auth/signup": {
    post: {
      tags: ["Auth"],
      summary: "Signup",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },
      responses: {
        201: { description: "User created successfully" },
        400: { description: "Validation error" },
      },
    },
  },

  "/auth/confirm-email-otp": {
    post: {
      tags: ["Auth"],
      summary: "Confirm email OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Email confirmed" },
      },
    },
  },

  "/auth/resend-confirm-email-otp": {
    post: {
      tags: ["Auth"],
      summary: "Resend confirmation OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "OTP sent" },
      },
    },
  },

  "/auth/send-forget-password-otp": {
    post: {
      tags: ["Auth"],
      summary: "Send forget password OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "OTP sent" },
      },
    },
  },

  "/auth/resend-forget-password-otp": {
    post: {
      tags: ["Auth"],
      summary: "Resend forget password OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "OTP sent" },
      },
    },
  },

  "/auth/verify-forget-password-otp": {
    post: {
      tags: ["Auth"],
      summary: "Verify forget password OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "OTP verified" },
      },
    },
  },

  "/auth/reset-forget-password-otp": {
    post: {
      tags: ["Auth"],
      summary: "Reset password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Password reset successfully" },
      },
    },
  },

  "/auth/signup/gmail": {
    post: {
      tags: ["Auth"],
      summary: "Signup with Google",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        201: { description: "Google signup successful" },
      },
    },
  },

  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { type: "object" },
          },
        },
      },
      responses: {
        200: { description: "Login successful" },
      },
    },
  },
};