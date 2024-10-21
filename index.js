import express from "express";
import { defaultPort } from "./configs.js";
import { clientRouter } from "./src/client/client_router.js";
import { serverRouter } from "./src/server/server_router.js";

const app = express();

app.use("/", clientRouter);
app.use("/api", serverRouter);
app.use(express.static("public/images")); // [GF] serve static image

app.listen(defaultPort, () => {
  console.log(`Example app listening on port ${defaultPort}`);
});
