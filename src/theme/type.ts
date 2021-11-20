import type { FlattenSimpleInterpolation } from 'styled-components'

import typography from '~/design-language/typography'
import { css } from '~/styled'

// eslint-disable-next-line max-len
const defaultStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  '"Fira Sans"',
  '"Droid Sans"',
  '"Helvetica Neue"',
  'sans-serif'
].join(', ')

type HeirarchyType = 'brand' | 'heading' | 'subheading' | 'text'

interface Heirarchy {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
}

const heirarchies: Record<HeirarchyType, Heirarchy> = {
  brand: {
    fontFamily: `${typography.fonts.display}, ${defaultStack}`,
    fontWeight: typography.weight.regular,
    lineHeight: typography.spacing.tighter
  },
  heading: {
    fontFamily: `${typography.fonts.voice}, ${defaultStack}`,
    fontWeight: typography.weight.bold,
    lineHeight: typography.spacing.tight
  },
  subheading: {
    fontFamily: `${typography.fonts.voice}, ${defaultStack}`,
    fontWeight: typography.weight.bold,
    lineHeight: typography.spacing.normal
  },
  text: {
    fontFamily: `${typography.fonts.universal}, ${defaultStack}`,
    fontWeight: typography.weight.regular,
    lineHeight: typography.spacing.loose
  }
}

const heirarchiesCss: Record<HeirarchyType, FlattenSimpleInterpolation> = Object
  .entries(heirarchies)
  .reduce((acc, [heirarchy, props]) => {
    return {
      ...acc,
      [heirarchy]: css`
        font-family: ${props.fontFamily};
        font-weight: ${props.fontWeight};
        line-height: ${props.lineHeight};
      `
    }
  }, {} as Record<HeirarchyType, FlattenSimpleInterpolation>)

export default {
  ...typography,
  heirarchies: heirarchiesCss
}
