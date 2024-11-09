import express from "express";
import {
  connectionTestUrl,
  matchQueryUrl,
} from "../utils/constants/els_api_url.js";
import {
  connectionTestEndpoint,
  queryEndpoint,
  root,
} from "../utils/constants/main_api_endpoint.js";
export const serverRouter = express.Router();

serverRouter.get(root, (req, res) => {
  res.send("Hello from server from gadget route");
});

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
