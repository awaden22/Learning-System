import { authPaths } from "./paths/auth.paths.js";
import { cartPaths } from "./paths/cart.paths.js";
import { categoryPaths } from "./paths/category.paths.js";
import { checkoutPaths } from "./paths/checkout.paths.js";
import { coursePaths } from "./paths/course.paths.js";
import { courseContentPaths } from "./paths/courseContent.paths.js";
import { dashboardPaths } from "./paths/dashboard.paths.js";
import { instructorPaths } from "./paths/instructor.paths.js";
import { landingPaths } from "./paths/landing.paths.js";
import { paymentPaths } from "./paths/payment.paths.js";
import { reviewPaths } from "./paths/review.paths.js";
import { userPaths } from "./paths/user.paths.js";


const swaggerSpec = {
  openapi: "3.0.3",

  info: {
    title: "Learning System API",
    version: "1.0.0",
    description: "REST API documentation for Learning System",
  },

  servers: [
    {
      url: "http://localhost:3004",
    },
  ],

  tags: [
    { name: "Auth" },
    { name: "User" },
    { name: "Category" },
    { name: "Instructor" },
    { name: "Course" },
    { name: "Course Content" },
    { name: "Cart" },
    { name: "Checkout" },
    { name: "Payment" },
    { name: "Review" },
    { name: "Dashboard" },
    { name: "Landing" },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...instructorPaths,
    ...coursePaths,
    ...courseContentPaths,
    ...cartPaths,
    ...checkoutPaths,
    ...paymentPaths,
    ...reviewPaths,
    ...dashboardPaths,
    ...landingPaths,
  },
};

export default swaggerSpec;