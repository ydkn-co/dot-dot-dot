/**
 * Color – https://indeed.design/brand/color
 */

import flattenObject from '~/utils/flattenObject'

const color = {
  foundational: {
    indeedBlue: '#003a9b',
    charcoal: '#2d2d2d',
    white: '#fff'
  },
  functional: {
    blue800: '#2557a7',
    magenta800: '#9d2b6b',
    nuetral1000: '#2d2d2d',
    nuetral800: '#595959',
    alerts: {
      green: '#1f662c',
      red: '#a9252b'
    }
  },
  expressive: {
    green: {
      100: '#f5fbf9',
      200: '#e6f5f1',
      300: '#cde8e1',
      400: '#b9dad0',
      500: '#7bbfae',
      600: '#4ca28f',
      700: '#358171',
      800: '#2b6256',
      900: '#234840',
      1000: '#19332d'
    },
    aqua: {
      100: '#f5fafe',
      200: '#e8f3fb',
      300: '#cde5f9',
      400: '#b6d6ee',
      500: '#7abbdf',
      600: '#409ec8',
      700: '#237ea3',
      800: '#1f5f7b',
      900: '#1d455c',
      1000: '#123141'
    },
    blue: {
      100: '#f8f9fe',
      200: '#eef1fd',
      300: '#dbe2fd',
      400: '#c7d2f6',
      500: '#9bb1f0',
      600: '#6792f0',
      700: '#3f72d3',
      800: '#2557a7',
      900: '#164081',
      1000: '#0d2d5e'
    },
    purple: {
      100: '#f9f9fe',
      200: '#f2f1fd',
      300: '#e2e0fd',
      400: '#d2cdf6',
      500: '#b1abf4',
      600: '#9288ee',
      700: '#7461e7',
      800: '#5644bf',
      900: '#3f2f9b',
      1000: '#2c2071'
    },
    magenta: {
      100: '#fdf8fa',
      200: '#fceef4',
      300: '#f8dae8',
      400: '#f3c7d9',
      500: '#ee99bf',
      600: '#e767a8',
      700: '#c64289',
      800: '#9d2b6b',
      900: '#74234e',
      1000: '#4e1c36'
    },
    orange: {
      100: '#fef8f7',
      200: '#fcefeb',
      300: '#f8ddd3',
      400: '#f7c7b8',
      500: '#f39e78',
      600: '#df7838',
      700: '#b45f2b',
      800: '#89471f',
      900: '#623721',
      1000: '#462515'
    },
    earth: {
      100: '#fef8f4',
      200: '#fcf0e5',
      300: '#f8dec5',
      400: '#f5cb9d',
      500: '#e0a961',
      600: '#c08a38',
      700: '#996e2c',
      800: '#725324',
      900: '#553d1c',
      1000: '#3d2b12'
    },
    nuetral: {
      100: '#faf9f8',
      200: '#f3f2f1',
      300: '#e4e2e0',
      400: '#d4d2d0',
      500: '#b4b2b1',
      600: '#949494',
      700: '#767676',
      800: '#595959',
      900: '#424242',
      1000: '#2d2d2d'
    }
  }
}

export default color

export type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000

export const collectExpressiveColorsByWeight = (
  weight: Weight
) : string[] => Object
  .values(color.expressive)
  .reduce(
    (acc: string[], colors) => {
      // eslint-disable-next-line security/detect-object-injection
      const color = colors[weight]
      return color ? [...acc, color] : acc
    },
    []
  )

export const colorMap = flattenObject(color)
