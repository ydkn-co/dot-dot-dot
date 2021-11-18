import designLanguage from '~/design-language'

const { expressive: allExpressiveColors } = designLanguage.color

// Discard the colors we don't want to use
const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  earth,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nuetral,
  ...selectExpressiveColors
} = allExpressiveColors

export default {
  accent: allExpressiveColors.blue[700],
  background: selectExpressiveColors
}
