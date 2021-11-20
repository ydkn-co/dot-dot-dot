import color from '~/design-language/color'

const { expressive: allExpressiveColors } = color

// Discard the colors we don't want to use
const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  earth,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nuetral,
  ...selectExpressiveColors
} = allExpressiveColors

export default {
  background: 'rgba(255, 255, 255, 0.5)',
  expressive: selectExpressiveColors,
  primary: 'var(--ddd-game-background-color)',
  secondary: '#05a',
  text: 'rgba(255, 255, 255, 0.5)'
}
