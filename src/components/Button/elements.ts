import styled, { css } from 'styled-components'

export const Button = styled.button`
  border: 5px solid var(--ddd-blue);
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;

  svg {
    width: 36px;
  }
`
export const iconStyles = css`
  display: grid;
  height: auto;
  width: 100%;

  * {
    fill: #333;
  }
`
