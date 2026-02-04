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
    port: 5173,
    host: true
  },
  // This ensures environment variables are properly loaded
  envDir: '.',
  define: {
    'process.env': {}
  }
})
