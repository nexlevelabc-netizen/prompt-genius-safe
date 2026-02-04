import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    port: 5173, // Vite default port is 5173, NOT 4173
    host: true,
    open: true, // Auto-open browser
    cors: true,
    // Proxy API requests to backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // This ensures environment variables are properly loaded
  envDir: '.',
  define: {
    'process.env': {}
  }
})
