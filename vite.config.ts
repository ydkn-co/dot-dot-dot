import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: [
    '**/*.woff'
  ],
  plugins: [
    svgPlugin(),
    react()
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
