import { defineProject } from "vitest/dist/config";

export default defineProject({
  test: {
    singleThread: true,
    globals: true,
    setupFiles: [".vitest/setupTests.ts"],
    name: "e2e-tests",
  },
});