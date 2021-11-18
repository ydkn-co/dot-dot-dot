import path from 'path'
import { mergeConfig } from 'vite'

import parentConfig from '../vite.config'

// https://vitejs.dev/config/
export default mergeConfig(parentConfig, {
  root: path.resolve(__dirname, '../')
})
