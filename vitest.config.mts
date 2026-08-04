import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const testEnv = dotenv.parse(fs.readFileSync(path.join(rootDir, ".env.test")));

export default defineConfig({
  test: {
    environment: "node",
    env: testEnv,
    setupFiles: ["./vitest.setup.ts", "./vitest.setup.dom.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.join(rootDir, "src"),
    },
  },
});
