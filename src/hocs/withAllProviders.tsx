import * as React from 'react'

import { GameProvider } from '~/app/game'
import { SettingsProvider } from '~/app/settings'
import GlobalStyles from '~/GlobalStyles'
import { ThemeProvider } from '~/styled'
import theme from '~/theme'

export const AllProviders: React.FC = ({ children }) => (
  <ThemeProvider
    theme={theme}
  >
    <GlobalStyles />
    <SettingsProvider>
      <GameProvider >
        {children}
      </GameProvider>
    </SettingsProvider>
  </ThemeProvider>
)

const withAllProviders = (element: React.ReactElement): React.ReactElement => (
  <AllProviders>
    {element}
  </AllProviders>
)

export default withAllProviders
