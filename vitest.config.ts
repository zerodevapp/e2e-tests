import { configDefaults, defineProject } from "vitest/config";

export default defineProject({
  test: {
    globals: true,
    setupFiles: [".vitest/setupTests.ts"],
    exclude: [...configDefaults.exclude, "../**/*.test.ts", "../**/*.spec.ts"],
    name: "e2e-tests",
    maxConcurrency: 10
  },
});