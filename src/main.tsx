import 'normalize.css'
import './index.css'
import '~/utils/i18n'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~/app'
import { GameProvider } from '~/app/game/store'
import { SettingsProvider } from '~/app/settings/store'

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <GameProvider >
        <App />
      </GameProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
