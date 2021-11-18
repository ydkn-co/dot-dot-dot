import styled from '~/styled'

interface WrapperProps {
  size: string
}

export const Wrapper = styled.span<WrapperProps>`
  align-items: center;
  display: inline-grid;
  justify-items: center;

  svg {
    width: ${props => props.size};
  }
`
