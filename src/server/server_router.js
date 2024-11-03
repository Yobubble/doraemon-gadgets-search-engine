import express from "express";
import {
  connectionTestUrl,
  matchQueryUrl,
} from "../utils/constants/els_api_url.js";
import {
  connectionTestEndpoint,
  queryEndpoint,
  queryMockEndpoint,
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
        fuzziness: "AUTO",
        type: "best_fields",
        operator: "or",
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
