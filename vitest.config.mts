import { defineConfig } from 'vitest/config'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup.ts',
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'istanbul',
      include: ['src/app/**/*', 'src/lib/**/*'],
    },
  },
})
