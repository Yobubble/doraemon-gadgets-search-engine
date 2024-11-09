import express from "express";
import { getHtmlFilePath } from "../utils/function.js";

export const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  const filePath = getHtmlFilePath("landing.html");
  res.sendFile(filePath);
});

clientRouter.get("/members", (req, res) => {
  const filePath = getHtmlFilePath("member.html");
  res.sendFile(filePath);
});

clientRouter.get("/search", (req, res) => {
  const filePath = getHtmlFilePath("search.html");
  res.sendFile(filePath);
});
