import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    base: import.meta.env?.VITE_BASE || '/',
    server: {
    proxy: {
      '/hangerserver':
          {
            target: 'http://localhost/',
            changeOrigin: true,
          }
    }
  }
})
