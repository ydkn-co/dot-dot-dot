import * as React from 'react'

import GlobalStyles from '~/GlobalStyles'
import { AppStateProvider } from '~/store'
import { ThemeProvider } from '~/styled'
import theme from '~/theme'

export const AllProviders: React.FC = ({ children }) => (
  <ThemeProvider
    theme={theme}
  >
    <GlobalStyles />
    <AppStateProvider >
      {children}
    </AppStateProvider>
  </ThemeProvider>
)

const withAllProviders = (element: React.ReactElement): React.ReactElement => (
  <AllProviders>
    {element}
  </AllProviders>
)

export default withAllProviders
