import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        workshop: resolve(__dirname, 'workshop/index.html'),
        live: resolve(__dirname, 'live/index.html'),
      }
    }
  }
})
