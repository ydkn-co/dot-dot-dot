import { css } from '~/utils/styled'

export default {
  md: (content: TemplateStringsArray) => `
    @media (min-width: 768px) {
      ${css`${content}`}
    }
  `
}
