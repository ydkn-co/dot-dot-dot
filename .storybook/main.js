module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "storybook-builder-vite"
  },
  viteFinal: (config, { configType }) => {
    if (configType === "DEVELOPMENT") {
      config.server.port = 6001;
      config.server.https = false;
      config.server.host = true;
      config.server.hmr =  {
        port: 443,
        protocol: 'ws'
      }
    }

    return config
  },
}
