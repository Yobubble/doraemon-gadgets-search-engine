import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getHtmlFilePath(relativePath) {
  return path.join(__dirname, "../../public", relativePath);
}
