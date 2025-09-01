import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CONFIG } from './src/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: CONFIG.uiPort
  }
})
