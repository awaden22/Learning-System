import bootstrap from "./app.bootstrap.js";

bootstrap()
  .then(() => {
    console.log("BOOTSTRAP FINISHED");
  })
  .catch((err) => {
    console.error("BOOTSTRAP ERROR:", err);
  });