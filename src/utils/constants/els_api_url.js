import { elasticsearchUrl } from "../../../configs.js";

// Server
export const connectionTestUrl = elasticsearchUrl;
export const matchQueryUrl =
  elasticsearchUrl + "/doraemon_gadgets/_search?pretty";
