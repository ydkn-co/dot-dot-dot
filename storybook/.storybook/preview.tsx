import withAllProviders from '../../src/hocs/withAllProviders'

export const decorators = [
  (Story) => withAllProviders(<Story />)
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
