import * as React from 'react'

import { GameProvider } from '~/components/Game'
import GlobalStyles from '~/GlobalStyles'
import theme from '~/theme'
import { ThemeProvider } from '~/utils/styled'

export const AllProviders: React.FC = ({ children }) => (
  <ThemeProvider
    theme={theme}
  >
    <GlobalStyles />
    <GameProvider >
      {children}
    </GameProvider>
  </ThemeProvider>
)

const withAllProviders = (element: React.ReactElement): React.ReactElement => (
  <AllProviders>
    {element}
  </AllProviders>
)

export default withAllProviders
