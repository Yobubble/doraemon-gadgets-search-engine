import dotenv from "dotenv";
dotenv.config();

// http://localhost:9200
export const elasticsearchUrl = process.env.ELS_HOST;
export const defaultPort = 3000;
