import path from "path";
import express from "express";
export const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  res.sendFile(path.join(import.meta.dirname, "../../public/landing.html"));
});
