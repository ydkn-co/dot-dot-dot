import '~/theme/fonts.css'

import normalize from 'normalize.css'

import { createGlobalStyle } from '~/utils/styled'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body,
  #root {
    height: 100vh;
    width: 100vw;
    min-width: 300px;
    overscroll-behavior: none;
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
