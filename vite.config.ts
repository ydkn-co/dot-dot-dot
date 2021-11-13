import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgPlugin(),
    react()
  ]
})
