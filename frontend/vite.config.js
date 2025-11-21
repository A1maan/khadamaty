import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 5173,
=======
    port: 3000,
>>>>>>> origin/almaan
    open: true
  }
})
