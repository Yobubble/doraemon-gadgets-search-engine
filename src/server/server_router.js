import express from "express";
export const serverRouter = express.Router();

serverRouter.get("/", (req, res) => {
  res.send("Hello from server from gadget route");
});
