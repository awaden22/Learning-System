
import express from "express";


import globalErrHandler from "./Middlewares/globalErr.middleware.js";
import { CLIENT_URL, SERVER_PORT } from "./config/config.service.js";
import testDBConnection from "./DB/connection.js";

import helmet from "helmet";
import cors from "cors";
import s3BuketService from "./common/S3Buket/s3.buket.service.js";
import { promisify } from "node:util";
import { pipeline } from "node:stream";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./common/swagger/swagger.js";



import realtimeGateway from "./realtime/realtime.gateway.js";
import authController from "./module/auth/auth.controller.js";
import userController from "./module/user/user.controller.js";
import categoryController from "./module/category/category.controller.js";
import instructorController from "./module/instructor/instructor.controller.js";
import courseController from "./module/course/course.controller.js";
import courseContentController from "./module/courseContent/courseContent.controller.js";
import cartController from "./module/cart/cart.controller.js";
import checkoutController from "./module/checkout/checkout.controller.js";
import paymentController from "./module/payment/payment.controller.js";
import reviewController from "./module/review/review.controller.js";

import dashboardController from "./module/Dashboard/dashboard.controller.js";
import landingController from "./module/landing/landing.controller.js";


import testRedisConnection from "./DB/Models/Redis/redis.coonection.js";


async function bootstrap() {
  const port = SERVER_PORT;
  const app: express.Express = express();

  app.use(helmet());
  
  app.use(
    cors({
      origin:CLIENT_URL
    })
  );

  app.use(
    "/payment/webhook",
    express.raw({
      type: "application/json",
    })
  );

  app.use(express.json());

  

  await testDBConnection();

  await testRedisConnection();


  // const authLimiter = rateLimit({
  //   windowMs: 15 * 60 * 1000,
  //   limit: 10,
  //   standardHeaders: "draft-8",
  //   legacyHeaders: false,
  //   message: {
  //     msg: "Too many authentication attempts. Please try again later.",
  //   },
  // });

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  app.get("/",(req,res)=>{
    return res.status(200).json({
      message:"done"
    })
  })

  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/category", categoryController);
  app.use("/instructor", instructorController);
  app.use("/course", courseController);
  app.use("/content", courseContentController);
  app.use("/cart", cartController);
  app.use("/checkout", checkoutController);
  app.use("/payment", paymentController);
  // app.use("/purchase", purchaseController);
  app.use("/review", reviewController);
  app.use("/dashboard", dashboardController);
  app.use("/landing", landingController);


  app.get("/uploads/*path", async (req, res) => {
    const { path } = req.params;
    const { fileName, download } = req.query;
    const key = req.params.path.join("/");
    const result = await s3BuketService.getFile(key);
    const pipePromise = promisify(pipeline);
    if (download == "true") {
      res.setHeader(
        "content-disposition",
        `attachment;fileName=${fileName || path[path.length - 1]}`,
      );
    }
    await pipePromise(result.Body as NodeJS.ReadableStream, res);
    // res.json(result);
  });
  app.get("/pre-signed-upload/*path", async (req, res) => {
    const { path } = req.params
    const { filename, download } = req.query
    const key = path.join("/");
    const result = await s3BuketService.createPreSigngetFile({
      key,
      filename: filename as string || (path[path.length - 1]) as string,
      download: download as string
    });


    return res.json(result);
  });


  app.use(globalErrHandler);
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`app listen on port ${port}`);
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});


  realtimeGateway.initializeIo(server)
}

export default bootstrap;
