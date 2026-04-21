/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/padron-beneficiarios/',          // <-- CLAVE para desplegar en /ppabe/
  plugins: [react()],
  server: {
    port: 3011,
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
