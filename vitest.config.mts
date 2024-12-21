import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ".vitest/setup.ts",
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      include: [
        "src/app/**/components/*",
        "src/app/**/hooks/*",
        "src/lib/**/*",
        "src/components/**/*",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "src/components/ui/**/*",
        "src/prisma/**/*",
      ],
    },
  },
});
