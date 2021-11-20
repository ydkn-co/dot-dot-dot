import styled from '~/styled'

export const Wrapper = styled.div`
  ${props => props.theme.type.heirarchies.brand}
  align-items: center;
  color: ${props => props.theme.colors.accent};
  display: grid;
  font-size: 80px;
  letter-spacing: 4px;
  margin: 0;
  text-transform: uppercase;

  &::after {
    color: ${props => props.theme.colors.background.aqua[400]};
    content: 'Dot Dot Dot';
    font-weight: bold;
    letter-spacing: 4.2px;
    opacity: .2;
    position: absolute;
    z-index: -1;
  }
`
Wrapper.displayName = 'Logo.Wrapper'
