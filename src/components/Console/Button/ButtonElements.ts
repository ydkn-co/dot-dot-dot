import styled from '~/utils/styled'

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 4px solid ${props => props.theme.colors.background};
  border-radius: 10px;
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  display: grid;
  font-weight: bold;
  gap: 10px;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  padding: 10px 15px;

  * {
    fill: ${props => props.theme.colors.background};
  }
`
