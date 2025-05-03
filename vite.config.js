import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // put the dist direct to the backend folder
  // build: {
  //   outDir: '../mistertoy-backend/public', -- the path
  //   emptyOutDir: true,
  // },
})
