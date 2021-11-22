import styled from '~/utils/styled'

export const Container = styled.span`
  align-items: center;
  display: inline-grid;
  justify-items: center;

  svg {
    width: ${props => props.theme.assets.icons.sizes.md};
  }
`
