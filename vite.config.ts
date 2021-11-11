import viteStylelint from '@amatlash/vite-plugin-stylelint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
    react(),
    viteStylelint()
  ]
})
