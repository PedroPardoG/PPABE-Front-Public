/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ppabe/',          // <-- CLAVE para desplegar en /ppabe/
  plugins: [react()],
  server: {
    port: 3010,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'lcovonly', 'text'],
    },
  },
})
