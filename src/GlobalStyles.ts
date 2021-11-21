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

  /**
   * This is a hack to get around styled components not properly observing this
   * style during it's compilation.
   */
  /* input[type=range] {
    appearance: none;
    background: ${props => props.theme.colors.background};
    border: none;
    border-radius: 2px;
    height: 10px;
    outline: none;
    transition: opacity .2s;
    width: 100%;

    &::-webkit-slider-thumb {
      appearance: none;
      aspect-ratio: 1 / 1;
      background: ${props => props.theme.colors.background};
      border-radius: 50%;
      cursor: pointer;
      width: 20px;
    }
  } */
`

export default GlobalStyle
