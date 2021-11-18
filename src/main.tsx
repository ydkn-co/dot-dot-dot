import 'normalize.css'
import './index.css'
import '~/utils/i18n'

import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import App from '~/app'
import { GameProvider } from '~/app/game'
import { SettingsProvider } from '~/app/settings'
import theme from '~/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <SettingsProvider>
        <GameProvider >
          <App />
        </GameProvider>
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
