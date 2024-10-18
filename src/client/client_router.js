import express from "express";
import { getHtmlFilePath } from "../utils/function.js";

export const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  // Resolve the path to the landing.html file
  const filePath = getHtmlFilePath("landing.html");

  res.sendFile(filePath);
});
