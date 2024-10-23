import express from "express";
import { defaultPort } from "./configs.js";
import { clientRouter } from "./src/client/client_router.js";
import { serverRouter } from "./src/server/server_router.js";

const app = express();

app.use(express.json());
app.use(express.static("public")); // [GF] serve static image
app.use("/", clientRouter);
app.use("/api", serverRouter);

app.listen(defaultPort, () => {
  console.log(`Example app listening on port ${defaultPort}`);
});
