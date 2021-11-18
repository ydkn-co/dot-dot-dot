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
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
