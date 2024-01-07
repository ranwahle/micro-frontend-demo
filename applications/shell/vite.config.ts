import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env?.VITE_BASE || '/',
  server: {
    proxy: {
      '/shellserver':
        {
            target: 'http://localhost/',
            changeOrigin: true,
      },
      '/hanger': {
        target: 'http://localhost/',
            changeOrigin: true,
      },
      '/washingmachine': {
        target: 'http://localhost/',
            changeOrigin: true,
      
      }
    }
  }
})
