import express from "express";
import { connectionTestUrl, matchQueryUrl } from "../utils/constant.js";
export const serverRouter = express.Router();

// Root of server
serverRouter.get("/", (req, res) => {
  res.send("Hello from server from gadget route");
});

// Test connection with Elasticsearch
serverRouter.get("/elastic", async (req, res) => {
  const response = await fetch(connectionTestUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  res.send(data);
});

// Find related documents
// body
// {
//   "query_message" : "",
// }
serverRouter.post("/elastic/query", async (req, res) => {
  const body = req.body;
  const elsBody = {
    query: {
      multi_match: {
        query: body.query_message,
        fields: ["description", "eng_name"],
        // TODO: more configuration possible here
      },
    },
  };

  const response = await fetch(matchQueryUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(elsBody),
  });
  const data = await response.json();

  res.send(data);
});

// TODO: Analyzer Customization
