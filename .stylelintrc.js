/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  configBasedir: path.resolve(__dirname),
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order'
  ],
  rules: {
    indentation: 2,
    'order/order': [
      'custom-properties',
      'declarations'
    ],
    'order/properties-alphabetical-order': true,
    'plugin/no-unsupported-browser-features': [
      true
    ],
    'selector-class-pattern': [
      '[A-Z]([A-z0-9]+)?(__([a-z0-9]+?)+)?(--([a-z0-9]+?)+){0,2}$',
      {
        resolveNestedSelectors: true
      }
    ],
    'selector-max-id': 1
  }
}
