const path = require('path')
const { loadConfigFromFile, mergeConfig } = require('vite')
const svgrPlugin = require('vite-plugin-svgr')

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  framework: '@storybook/react',
  stories: [
    '../../src/**/*.story.@(js|jsx|ts|tsx)'
  ],
  async viteFinal(config) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    )

    const mergedParentConfig = mergeConfig(config, userConfig)

    const mergedConfig = {
      ...mergedParentConfig,
      plugins: [
        ...config.plugins,
        svgrPlugin()
      ],
      root: path.resolve(__dirname, '../')
    }

    return mergedConfig
  }
}
