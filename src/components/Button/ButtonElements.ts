import styled, { css } from '~/styled'

export const Button = styled.button`
  align-items: center;
  border: 5px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  padding: 10px 15px;
`
export const iconStyles = css`
  display: grid;
  height: auto;
  width: 100%;

  * {
    fill: #333;
  }
`
