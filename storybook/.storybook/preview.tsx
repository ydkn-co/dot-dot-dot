import withAllProviders from '../../src/hocs/withAllProviders'
import { colorMap } from '../../src/design-language/color'

export const decorators = [
  (Story) => withAllProviders(<Story />)
]

console.log(Object.entries(colorMap).map(([key, value]) => ({
  color: value,
  title: key,
})))

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    presetColors: Object.entries(colorMap).map(([key, value]) => ({
      color: value,
      title: key,
    })),
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
