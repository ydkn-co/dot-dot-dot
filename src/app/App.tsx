import * as React from 'react'

import Game from '~/app/game'
import { AppProvider } from '~/store'

import { Page } from './elements'

const App: React.FC = () => (
  <AppProvider>
    <Page>
      <Game />
    </Page>
  </AppProvider>
)

export default App
