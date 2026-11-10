import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/start/config'

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
  ],
  server: {
    port: 3000,
  },
})