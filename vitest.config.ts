import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(process.cwd(), "src"),
      "server-only": resolve(process.cwd(), "tests/stubs/server-only.ts"),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
  },
});
