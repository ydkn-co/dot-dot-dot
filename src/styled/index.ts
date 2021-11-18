import baseStyled, {
  ThemedStyledInterface,
  useTheme as baseUseTheme
} from 'styled-components'

import theme from '~/theme'

export type Theme = typeof theme;
const styled = baseStyled as ThemedStyledInterface<Theme>

export default styled

export * from 'styled-components'

export const useCurrentTheme = (): Theme => baseUseTheme() as Theme
