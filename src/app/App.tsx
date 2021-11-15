import * as React from 'react'

import Game from '~/app/game'
import { SettingsProvider } from '~/app/settings/store'

import { Page } from './elements'

const App: React.FC = () => (
  <SettingsProvider>
    <Page>
      <Game />
    </Page>
  </SettingsProvider>
)

export default App
