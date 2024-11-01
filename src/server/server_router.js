import express from "express";
import https from "https";
import {
  connectionTestUrl,
  matchQueryUrl,
} from "../utils/constants/els_api_url.js";
import {
  connectionTestEndpoint,
  queryEndpoint,
  queryMockEndpoint,
  imageProxy,
  root,
} from "../utils/constants/main_api_endpoint.js";
import { mock1 } from "../utils/mock_data.js";
export const serverRouter = express.Router();

// Root of server
serverRouter.get(root, (req, res) => {
  res.send("Hello from server from gadget route");
});

// Test connection with Elasticsearch
serverRouter.get(connectionTestEndpoint, async (req, res) => {
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
serverRouter.post(queryEndpoint, async (req, res) => {
  const body = req.body;
  const elsBody = {
    query: {
      multi_match: {
        query: body.query_message,
        fields: ["description", "eng_name"],
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

  res.send({
    count: data.hits.total.value,
    data: data.hits.hits,
  });
});

serverRouter.post(queryMockEndpoint, (req, res) => {
  const body = req.body;
  console.log("POST Body: ", body);
  //console.log(JSON.stringify(mock1));
  res.send(JSON.stringify(mock1));
});
// TODO: Analyzer Customization

serverRouter.get(imageProxy, (req, res) => {
  const imageUrl = req.query.url;
  console.log("Requested image URL:", imageUrl); // Log the requested URL

  https
    .get(imageUrl, (response) => {
      const contentType = response.headers["content-type"];
      console.log("Content Type:", contentType); // Log the content type

      res.set("Content-Type", contentType); // Set the correct content type

      // Pipe the response directly to the client
      response.pipe(res);
    })
    .on("error", (error) => {
      console.error("Error fetching image:", error); // Log the error for debugging
      res.status(500).send("Error fetching image");
    });
});
