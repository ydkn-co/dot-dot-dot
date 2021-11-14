import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: 'import { jsx } from \'@emotion/react\''
  },
  plugins: [
    svgPlugin(),
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ]
})
