import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/react-workspace/calculator/',
  build: {
    outDir: 'dist'  // Change back to default dist directory
  },
  server: {
    watch: {
      usePolling: true
    },
  }
})
