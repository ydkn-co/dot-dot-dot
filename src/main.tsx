import 'normalize.css'
import './index.css'
import './utils/i18n'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './layouts/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
