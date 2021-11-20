import '~/theme/fonts.css'

import normalize from 'normalize.css'

import { createGlobalStyle } from '~/styled'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body,
  #root {
    height: 100vh;
    width: 100vw;
  }

  body {
    ${props => props.theme.type.heirarchies.text}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
