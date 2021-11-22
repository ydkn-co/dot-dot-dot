import '~/utils/i18n'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~/components'
import withProviders from '~/hocs/withAllProviders'

ReactDOM.render(
  <React.StrictMode>
    {withProviders(<App />)}
  </React.StrictMode>,
  document.getElementById('root')
)
